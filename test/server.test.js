const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { loadDotEnv } = require('../config');
const { server } = require('../server');

let base;
test.before(() => new Promise((resolve) => {
  server.listen(0, () => { base = `http://127.0.0.1:${server.address().port}`; resolve(); });
}));
test.after(() => new Promise((resolve) => server.close(resolve)));

test('pages carry security headers', async () => {
  const res = await fetch(`${base}/`);
  assert.strictEqual(res.status, 200);
  for (const h of ['content-security-policy', 'strict-transport-security', 'x-frame-options', 'x-content-type-options', 'referrer-policy', 'permissions-policy']) {
    assert.ok(res.headers.get(h), h);
  }
  assert.match(res.headers.get('content-security-policy'), /script-src 'self'/);
});

test('unknown API paths return JSON 404', async () => {
  const res = await fetch(`${base}/api/nope`);
  assert.strictEqual(res.status, 404);
  assert.deepStrictEqual(await res.json(), { error: 'Not found.' });
});

test('oversized JSON body gets a 413, not a dropped connection', async () => {
  const res = await fetch(`${base}/api/verify/start`, { method: 'POST', body: 'a'.repeat(10_000) });
  assert.strictEqual(res.status, 413);
});

test('report requires a valid token', async () => {
  const res = await fetch(`${base}/api/exposure`, { headers: { authorization: 'Bearer forged.token' } });
  assert.strictEqual(res.status, 401);
});

test('X-Forwarded-For is ignored unless TRUST_PROXY is set', async () => {
  const codes = [];
  for (let i = 0; i < 7; i++) {
    const res = await fetch(`${base}/api/verify/start`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': `9.9.9.${i}` },
      body: JSON.stringify({ email: `xff${i}@example.com` }),
    });
    codes.push(res.status);
  }
  assert.ok(codes.includes(429), `expected rate limit, got ${codes}`);
});

test('path traversal and bad encodings are rejected', async () => {
  assert.notStrictEqual((await fetch(`${base}/%2e%2e/server.js`)).status, 200);
  assert.strictEqual((await fetch(`${base}/%E0%A4%A`)).status, 400);
});

test('site address is filled into pages, robots.txt and sitemap', async () => {
  const html = await (await fetch(`${base}/`)).text();
  assert.ok(!html.includes('__SITE_URL__'));
  assert.match(html, /property="og:image" content="http:\/\/127\.0\.0\.1:\d+\/og-image\.png"/);
  assert.ok(!(await (await fetch(`${base}/robots.txt`)).text()).includes('__SITE_URL__'));
  const sitemap = await fetch(`${base}/sitemap.xml`);
  assert.match(sitemap.headers.get('content-type'), /xml/);
  assert.ok(!(await sitemap.text()).includes('__SITE_URL__'));
});

test('pages link to versioned assets that are cached long-term', async () => {
  const html = await (await fetch(`${base}/remove`)).text();
  const refs = [...html.matchAll(/(?:src|href)="(\/[^"]+\.(?:css|js|png|svg|ico|webmanifest)\?v=[0-9a-f]{10})"/g)].map((m) => m[1]);
  for (const name of ['/styles.css', '/app.js', '/remove.js', '/removal-data.js', '/theme.js', '/favicon.ico', '/site.webmanifest']) {
    assert.ok(refs.some((r) => r.startsWith(name + '?v=')), `${name} not versioned`);
  }
  assert.ok(!/(?:src|href)="\/styles\.css"/.test(html), 'unversioned stylesheet link left');
  const res = await fetch(base + refs.find((r) => r.startsWith('/styles.css')));
  assert.strictEqual(res.status, 200);
  assert.match(res.headers.get('cache-control'), /max-age=31536000, immutable/);
});

test('unversioned or stale-version assets revalidate with ETag', async () => {
  for (const url of ['/styles.css', '/styles.css?v=0000000000', '/img/exposure-hero.svg']) {
    const res = await fetch(base + url);
    assert.strictEqual(res.status, 200, url);
    assert.strictEqual(res.headers.get('cache-control'), 'no-cache', url);
    const etag = res.headers.get('etag');
    assert.ok(etag, url);
    const again = await fetch(base + url, { headers: { 'if-none-match': etag } });
    assert.strictEqual(again.status, 304, url);
  }
});

test('.env loader fills unset variables without overriding real ones', () => {
  const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'asta-')), '.env');
  fs.writeFileSync(file, '# comment\nASTA_T1=one\nASTA_T2="two words"\nASTA_T3=from-file\n');
  process.env.ASTA_T3 = 'real';
  loadDotEnv(file);
  assert.strictEqual(process.env.ASTA_T1, 'one');
  assert.strictEqual(process.env.ASTA_T2, 'two words');
  assert.strictEqual(process.env.ASTA_T3, 'real');
});
