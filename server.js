// Asta Security — static site + passive website security scan API.
// Zero dependencies; requires Node 18+ (global fetch).
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const dns = require('node:dns').promises;
const net = require('node:net');
const tls = require('node:tls');
const { config, checkProduction } = require('./config');
const { normalizeEmail, breachReport } = require('./breach-check');
const verify = require('./verify');

const PORT = config.port;
const PUBLIC_DIR = path.join(__dirname, 'public');
const TIMEOUT_MS = 8000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
};

// Our own security headers: the site should pass its own scanner.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self' https://api.pwnedpasswords.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ');

const SECURITY_HEADERS = {
  'content-security-policy': CSP,
  'strict-transport-security': 'max-age=31536000; includeSubDomains',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'cross-origin-opener-policy': 'same-origin',
};

// ---------- rate limiting (in memory) ----------
const hits = new Map();
function rateLimited(key, limit = 10, windowMs = 60_000) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  return list.length > limit;
}

// Drop rate-limit entries older than the longest window so memory stays flat.
setInterval(() => {
  const cutoff = Date.now() - 10 * 60_000;
  for (const [key, list] of hits) {
    if (!list.length || list[list.length - 1] < cutoff) hits.delete(key);
  }
}, 60_000).unref();

function clientIp(req) {
  if (config.trustProxy) {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress;
}

// ---------- SSRF guard: only scan public internet hosts ----------
function isPrivateAddress(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    return (
      a === 0 || a === 10 || a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19)) ||
      a >= 224
    );
  }
  const v6 = ip.toLowerCase();
  if (v6.startsWith('::ffff:')) return isPrivateAddress(v6.slice(7));
  return (
    v6 === '::' || v6 === '::1' ||
    v6.startsWith('fc') || v6.startsWith('fd') ||
    v6.startsWith('fe80') || v6.startsWith('ff')
  );
}

function normalizeTarget(input) {
  let raw = String(input || '').trim();
  if (!raw) throw new Error('Enter a website address.');
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  const url = new URL(raw);
  if (!url.hostname.includes('.') || net.isIP(url.hostname)) {
    throw new Error('Enter a public domain name, like example.com.');
  }
  if (url.port && url.port !== '443' && url.port !== '80') {
    throw new Error('Only standard web ports are scanned.');
  }
  return url.hostname.toLowerCase();
}

async function assertPublicHost(host) {
  const records = await dns.lookup(host, { all: true }).catch(() => []);
  if (!records.length) throw new Error(`Could not resolve ${host}.`);
  if (records.some((r) => isPrivateAddress(r.address))) {
    throw new Error('That address points to a private network and cannot be scanned.');
  }
}

// ---------- checks ----------
async function fetchHead(url) {
  const res = await fetch(url, {
    method: 'GET',
    redirect: 'manual',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { 'user-agent': 'AstaSecurityScanner/1.0 (+passive header check)' },
  });
  res.body?.cancel().catch(() => {});
  return res;
}

// Follow redirects by hand (max 5) so every hop passes the private-network guard,
// and grade the headers of the page visitors actually land on.
async function fetchFinal(url) {
  for (let hop = 0; hop < 5; hop++) {
    const res = await fetchHead(url);
    const loc = res.headers.get('location');
    if (res.status < 300 || res.status >= 400 || !loc) return { res, url };
    const next = new URL(loc, url);
    if (next.protocol !== 'https:') return { res, url };
    await assertPublicHost(next.hostname);
    url = next.href;
  }
  throw new Error('Too many redirects.');
}

function certInfo(host) {
  return new Promise((resolve) => {
    const socket = tls.connect({ host, port: 443, servername: host, timeout: TIMEOUT_MS }, () => {
      const cert = socket.getPeerCertificate();
      resolve({
        authorized: socket.authorized,
        error: socket.authorizationError ? String(socket.authorizationError) : null,
        protocol: socket.getProtocol(),
        validTo: cert?.valid_to ? new Date(cert.valid_to) : null,
        issuer: cert?.issuer?.O || cert?.issuer?.CN || null,
      });
      socket.end();
    });
    socket.setTimeout(TIMEOUT_MS, () => { socket.destroy(); resolve(null); });
    socket.on('error', () => resolve(null));
  });
}

function check(id, title, status, detail, fix) {
  return { id, title, status, detail, fix: status === 'pass' ? null : fix };
}

async function scan(host) {
  await assertPublicHost(host);
  const findings = [];

  const [cert, final, httpRes] = await Promise.all([
    certInfo(host),
    fetchFinal(`https://${host}/`).catch(() => null),
    fetchHead(`http://${host}/`).catch(() => null),
  ]);

  // TLS certificate
  if (!cert) {
    findings.push(check('tls', 'HTTPS available', 'fail',
      'The site did not accept a secure (HTTPS) connection.',
      'Install a TLS certificate (free from Let’s Encrypt) and serve the site over HTTPS.'));
  } else {
    const days = cert.validTo ? Math.floor((cert.validTo - Date.now()) / 86_400_000) : null;
    if (!cert.authorized) {
      findings.push(check('tls', 'Valid TLS certificate', 'fail',
        `Browsers will show a warning: ${cert.error}.`,
        'Replace the certificate with one issued for this domain by a trusted authority.'));
    } else if (days !== null && days < 14) {
      findings.push(check('tls', 'Valid TLS certificate', 'warn',
        `Certificate expires in ${days} day(s).`,
        'Renew the certificate now and enable automatic renewal.'));
    } else {
      findings.push(check('tls', 'Valid TLS certificate', 'pass',
        `Issued by ${cert.issuer || 'a trusted authority'}, valid for ${days} more days.`));
    }
    const modern = ['TLSv1.2', 'TLSv1.3'].includes(cert.protocol);
    findings.push(check('protocol', 'Modern TLS protocol', modern ? 'pass' : 'fail',
      `Negotiated ${cert.protocol || 'unknown protocol'}.`,
      'Disable TLS 1.0/1.1 and allow only TLS 1.2 and 1.3.'));
  }

  // HTTP -> HTTPS redirect
  if (httpRes) {
    const loc = httpRes.headers.get('location') || '';
    const redirects = httpRes.status >= 300 && httpRes.status < 400 && loc.startsWith('https://');
    findings.push(check('redirect', 'HTTP redirects to HTTPS', redirects ? 'pass' : 'warn',
      redirects ? 'Plain HTTP visitors are sent to the secure site.'
        : 'Visitors who type the address without https:// stay on an unencrypted connection.',
      'Add a permanent (301) redirect from http:// to https://.'));
  }

  if (!final) {
    return summarize(host, findings);
  }
  const h = final.res.headers;
  const landedOn = new URL(final.url).host;

  const hsts = h.get('strict-transport-security');
  findings.push(check('hsts', 'Strict-Transport-Security', hsts ? 'pass' : 'warn',
    hsts ? `Set: ${hsts}` : 'Browsers are not told to always use HTTPS for this site.',
    'Send "Strict-Transport-Security: max-age=31536000; includeSubDomains".'));

  const csp = h.get('content-security-policy');
  findings.push(check('csp', 'Content-Security-Policy', csp ? 'pass' : 'warn',
    csp ? 'A content security policy is in place.' : 'No policy limits which scripts may run, which makes XSS attacks easier.',
    'Define a Content-Security-Policy that allows only the sources your site needs.'));

  const xfo = h.get('x-frame-options');
  const frameAncestors = csp && /frame-ancestors/i.test(csp);
  findings.push(check('framing', 'Clickjacking protection', xfo || frameAncestors ? 'pass' : 'warn',
    xfo || frameAncestors ? 'The site cannot be embedded by other sites.' : 'Other sites can load this page in a hidden frame.',
    'Send "X-Frame-Options: DENY" or a CSP "frame-ancestors \'self\'" directive.'));

  const xcto = (h.get('x-content-type-options') || '').toLowerCase() === 'nosniff';
  findings.push(check('nosniff', 'X-Content-Type-Options', xcto ? 'pass' : 'warn',
    xcto ? 'MIME sniffing is disabled.' : 'Browsers may guess file types, which can be abused.',
    'Send "X-Content-Type-Options: nosniff".'));

  const refpol = h.get('referrer-policy');
  findings.push(check('referrer', 'Referrer-Policy', refpol ? 'pass' : 'info',
    refpol ? `Set: ${refpol}` : 'Full page addresses may leak to third-party sites.',
    'Send "Referrer-Policy: strict-origin-when-cross-origin".'));

  const disclosed = [h.get('server'), h.get('x-powered-by')].filter((v) => v && /\d/.test(v));
  findings.push(check('disclosure', 'Software version disclosure', disclosed.length ? 'warn' : 'pass',
    disclosed.length ? `Headers reveal: ${disclosed.join(', ')}.` : 'No software versions are advertised.',
    'Remove version numbers from the Server and X-Powered-By headers.'));

  const cookies = typeof h.getSetCookie === 'function' ? h.getSetCookie() : [];
  if (cookies.length) {
    const weak = cookies.filter((c) => !/;\s*secure/i.test(c) || !/;\s*httponly/i.test(c));
    findings.push(check('cookies', 'Cookie security flags', weak.length ? 'warn' : 'pass',
      weak.length ? `${weak.length} of ${cookies.length} cookie(s) lack Secure or HttpOnly.` : 'All cookies use Secure and HttpOnly.',
      'Set Secure, HttpOnly and SameSite on every cookie.'));
  }

  return summarize(host, findings, landedOn);
}

function summarize(host, findings, landedOn = host) {
  const weights = { fail: 20, warn: 8, info: 2, pass: 0 };
  const score = Math.max(0, 100 - findings.reduce((s, f) => s + weights[f.status], 0));
  const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : score >= 40 ? 'D' : 'F';
  return { host, landedOn, score, grade, scannedAt: new Date().toISOString(), findings };
}

// ---------- HTTP server ----------
function send(res, status, body, type = 'application/json', extra = {}) {
  res.writeHead(status, {
    ...SECURITY_HEADERS,
    'content-type': type,
    'cache-control': type === 'application/json' ? 'no-store' : 'no-cache',
    ...extra,
  });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}

class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    let tooLarge = false;
    req.on('data', (chunk) => {
      if (tooLarge) return;
      body += chunk;
      if (body.length > 4096) { tooLarge = true; body = ''; }
    });
    req.on('end', () => {
      if (tooLarge) return reject(new HttpError(413, 'Request too large.'));
      try { resolve(body ? JSON.parse(body) : {}); } catch { reject(new HttpError(400, 'Invalid request.')); }
    });
    req.on('error', reject);
  });
}

function siteUrl(req) {
  if (config.siteUrl) return config.siteUrl;
  const proto = config.trustProxy && req.headers['x-forwarded-proto'] === 'https' ? 'https' : 'http';
  const host = String(req.headers.host || 'localhost').replace(/[^a-z0-9.:-]/gi, '');
  return `${proto}://${host}`;
}

// Text files are served with the site address and contact email filled in.
const TEMPLATED = new Set(['.html', '.txt', '.xml']);
function renderText(buffer, req) {
  return buffer.toString('utf8')
    .replaceAll('__SITE_URL__', siteUrl(req))
    .replaceAll('hello@example.com', config.contactEmail);
}

// ---------- email exposure: verify ownership, then report ----------
async function handleEmail(req, res, url, ip) {
  if (url.pathname === '/api/verify/start' && req.method === 'POST') {
    const email = normalizeEmail((await readJson(req)).email);
    if (rateLimited(`start:${ip}`, 5, 10 * 60_000) || rateLimited(`start:${email}`, 3, 10 * 60_000)) {
      return send(res, 429, { error: 'Too many codes requested. Wait a few minutes and try again.' });
    }
    const { delivered } = await verify.sendCode(email, verify.createCode(email));
    return send(res, 200, { sent: true, delivered });
  }

  if (url.pathname === '/api/verify/confirm' && req.method === 'POST') {
    const body = await readJson(req);
    const email = normalizeEmail(body.email);
    if (rateLimited(`confirm:${ip}`, 20, 10 * 60_000)) {
      return send(res, 429, { error: 'Too many attempts. Wait a few minutes and try again.' });
    }
    return send(res, 200, { token: verify.checkCode(email, body.code) });
  }

  if (url.pathname === '/api/exposure' && req.method === 'GET') {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    const email = verify.readToken(token);
    if (!email) return send(res, 401, { error: 'Your verification has expired. Verify your email again.' });
    if (rateLimited(`report:${email}`, 10, 10 * 60_000)) {
      return send(res, 429, { error: 'Too many reports. Wait a few minutes and try again.' });
    }
    return send(res, 200, await breachReport(email));
  }

  return send(res, 404, { error: 'Not found.' });
}

const server = http.createServer(async (req, res) => {
  let url;
  try { url = new URL(req.url, 'http://localhost'); } catch { return send(res, 400, { error: 'Bad request.' }); }
  const ip = clientIp(req);

  if (url.pathname === '/healthz') return send(res, 200, { ok: true });

  if (url.pathname.startsWith('/api/verify/') || url.pathname === '/api/exposure') {
    try {
      return await handleEmail(req, res, url, ip);
    } catch (err) {
      return send(res, err.status || 400, { error: err.message || 'Request failed.' });
    }
  }

  if (url.pathname === '/api/scan') {
    if (rateLimited(`scan:${ip}`)) return send(res, 429, { error: 'Too many scans. Try again in a minute.' });
    try {
      const host = normalizeTarget(url.searchParams.get('target'));
      return send(res, 200, await scan(host));
    } catch (err) {
      return send(res, 400, { error: err.message || 'Scan failed.' });
    }
  }

  if (url.pathname.startsWith('/api/')) return send(res, 404, { error: 'Not found.' });
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return send(res, 405, 'Method not allowed', 'text/plain', { allow: 'GET, HEAD' });
  }

  let decoded;
  try { decoded = decodeURIComponent(url.pathname); } catch { return send(res, 400, 'Bad request', 'text/plain'); }
  let file = path.normalize(path.join(PUBLIC_DIR, decoded));
  if (!file.startsWith(PUBLIC_DIR + path.sep) && file !== PUBLIC_DIR) return send(res, 403, 'Forbidden', 'text/plain');
  if (url.pathname.endsWith('/')) file = path.join(file, 'index.html');
  if (!path.extname(file)) file += '.html';

  fs.readFile(file, (err, data) => {
    if (err) {
      return fs.readFile(path.join(PUBLIC_DIR, '404.html'), (e, page) =>
        send(res, 404, e ? 'Not found' : renderText(page, req), MIME['.html']));
    }
    const ext = path.extname(file);
    if (TEMPLATED.has(ext)) return send(res, 200, renderText(data, req), MIME[ext]);
    const longCache = ['.png', '.svg', '.ico', '.webmanifest'].includes(ext);
    send(res, 200, data, MIME[ext] || 'application/octet-stream', { 'cache-control': `public, max-age=${longCache ? 86400 : 3600}` });
  });
});

if (require.main === module) {
  const problems = checkProduction();
  if (problems.length) {
    console.error(`Refusing to start in production:\n- ${problems.join('\n- ')}`);
    process.exit(1);
  }
  server.listen(PORT, () => {
    console.log(`Asta Security running on http://localhost:${PORT}`);
    if (!config.resendApiKey) console.log('Email sending is off (no RESEND_API_KEY): verification codes will be printed here.');
  });
  const shutdown = () => server.close(() => process.exit(0));
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

module.exports = { scan, normalizeTarget, isPrivateAddress, server };
