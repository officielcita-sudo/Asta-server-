// Loads settings from environment variables, reading a local .env file first
// if one exists. Real environment variables always win over .env values.
const fs = require('node:fs');
const path = require('node:path');

function loadDotEnv(file = path.join(__dirname, '.env')) {
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch { return; }
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/i);
    if (!m || line.trim().startsWith('#')) continue;
    let value = m[2];
    if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1);
    if (process.env[m[1]] === undefined) process.env[m[1]] = value;
  }
}

loadDotEnv();

const env = process.env;
const config = {
  port: Number(env.PORT) || 3000,
  production: env.NODE_ENV === 'production',
  // Set to 1 behind a reverse proxy (Railway, Render, Fly, nginx) so the real
  // client IP is read from X-Forwarded-For. Never set it when exposed directly.
  trustProxy: env.TRUST_PROXY === '1' || env.TRUST_PROXY === 'true',
  sessionSecret: env.SESSION_SECRET || '',
  resendApiKey: env.RESEND_API_KEY || '',
  mailFrom: env.MAIL_FROM || 'Asta Security <onboarding@resend.dev>',
  contactEmail: env.CONTACT_EMAIL || 'hello@example.com',
};

// Fail fast on settings that would make production unsafe.
function checkProduction() {
  if (!config.production) return [];
  const problems = [];
  if (!config.resendApiKey) problems.push('RESEND_API_KEY is required so verification codes are emailed, not logged.');
  if (config.sessionSecret.length < 32) problems.push('SESSION_SECRET must be at least 32 characters.');
  return problems;
}

module.exports = { config, checkProduction, loadDotEnv };
