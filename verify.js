// Email ownership verification: a 6-digit code is emailed to the address,
// and a short-lived signed token is issued once the code is confirmed.
// Breach reports are only produced for the email inside a valid token.
const crypto = require('node:crypto');

const CODE_TTL_MS = 10 * 60_000;
const TOKEN_TTL_MS = 15 * 60_000;
const MAX_ATTEMPTS = 5;
const SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

const pending = new Map(); // email -> { hash, expires, attempts }

const hashCode = (email, code) => crypto.createHmac('sha256', SECRET).update(`${email}:${code}`).digest('hex');

function createCode(email) {
  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
  pending.set(email, { hash: hashCode(email, code), expires: Date.now() + CODE_TTL_MS, attempts: 0 });
  return code;
}

function checkCode(email, code) {
  const entry = pending.get(email);
  if (!entry || entry.expires < Date.now()) {
    pending.delete(email);
    throw new Error('This code has expired. Request a new one.');
  }
  if (++entry.attempts > MAX_ATTEMPTS) {
    pending.delete(email);
    throw new Error('Too many wrong codes. Request a new one.');
  }
  const given = Buffer.from(hashCode(email, String(code || '').trim()));
  const expected = Buffer.from(entry.hash);
  if (!crypto.timingSafeEqual(given, expected)) throw new Error('That code is not correct.');
  pending.delete(email);
  return signToken(email);
}

function signToken(email) {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + TOKEN_TTL_MS })).toString('base64url');
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function readToken(token) {
  const [payload, sig] = String(token || '').split('.');
  if (!payload || !sig) return null;
  const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('base64url');
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.exp > Date.now() ? data.email : null;
  } catch {
    return null;
  }
}

// Sends the code with Resend (https://resend.com). Set RESEND_API_KEY and
// MAIL_FROM (an address on a domain verified in Resend). Without a key the
// code is printed to the server console so the flow can be tested locally.
async function sendCode(email, code) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[dev] verification code for ${email}: ${code}`);
    return { delivered: false };
  }
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || 'Asta Security <onboarding@resend.dev>',
      to: [email],
      subject: `Your Asta Security code: ${code}`,
      text: `Your verification code is ${code}\n\nIt expires in 10 minutes. If you didn't request this, ignore this email.`,
      html: `<p>Your verification code is</p><p style="font-size:28px;font-weight:700;letter-spacing:4px">${code}</p><p>It expires in 10 minutes. If you didn't request this, you can ignore this email.</p>`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error('We could not send the code. Try again shortly.');
  return { delivered: true };
}

module.exports = { createCode, checkCode, signToken, readToken, sendCode };
