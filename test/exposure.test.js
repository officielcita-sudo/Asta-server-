const test = require('node:test');
const assert = require('node:assert');
const { normalizeEmail, shapeReport, adviceFor } = require('../breach-check');
const verify = require('../verify');

test('normalizeEmail lowercases and validates', () => {
  assert.strictEqual(normalizeEmail('  Me@Example.COM '), 'me@example.com');
  for (const bad of ['', 'no-at-sign', 'a@b', 'a b@c.com']) assert.throws(() => normalizeEmail(bad), bad);
});

test('codes verify once and issue a token for that email only', () => {
  const code = verify.createCode('a@example.com');
  assert.throws(() => verify.checkCode('a@example.com', '000000' === code ? '111111' : '000000'));
  const token = verify.checkCode('a@example.com', code);
  assert.strictEqual(verify.readToken(token), 'a@example.com');
  assert.throws(() => verify.checkCode('a@example.com', code), /expired/);
});

test('too many wrong codes invalidates the code', () => {
  const code = verify.createCode('b@example.com');
  const wrong = code === '123456' ? '654321' : '123456';
  for (let i = 0; i < 5; i++) assert.throws(() => verify.checkCode('b@example.com', wrong));
  assert.throws(() => verify.checkCode('b@example.com', code), /Too many/);
});

test('tampered or garbage tokens are rejected', () => {
  const token = verify.signToken('c@example.com');
  const [payload, sig] = token.split('.');
  const forged = Buffer.from(JSON.stringify({ email: 'victim@example.com', exp: Date.now() + 1e6 })).toString('base64url');
  assert.strictEqual(verify.readToken(`${forged}.${sig}`), null);
  assert.strictEqual(verify.readToken('nonsense'), null);
  assert.strictEqual(verify.readToken(`${payload}.x`), null);
});

test('shapeReport handles a clean email', () => {
  const r = shapeReport({ BreachMetrics: null, ExposedBreaches: null, PastesSummary: { cnt: 0 } });
  assert.strictEqual(r.breachCount, 0);
  assert.strictEqual(r.risk.label, 'None');
});

test('shapeReport parses breaches and counts exposed data', () => {
  const r = shapeReport({
    BreachMetrics: { risk: [{ risk_label: 'High', risk_score: 70 }] },
    ExposedBreaches: { breaches_details: [
      { breach: 'Old', xposed_date: '2015', xposed_data: 'Email addresses;Passwords', xposed_records: '100', verified: 'Yes' },
      { breach: 'New', xposed_date: '2024', xposed_data: 'Email addresses;Phone numbers', domain: 'new.example' },
    ] },
    PastesSummary: { cnt: 2 },
  });
  assert.strictEqual(r.breachCount, 2);
  assert.strictEqual(r.breaches[0].name, 'New');
  assert.strictEqual(r.passwordBreaches, 1);
  assert.deepStrictEqual(r.exposedTypes[0], { type: 'Email addresses', count: 2 });
  assert.strictEqual(r.pasteCount, 2);
  assert.strictEqual(r.risk.label, 'High');
});

test('adviceFor maps data types to actions', () => {
  assert.ok(adviceFor(['Passwords'])[0].includes('password'));
  assert.deepStrictEqual(adviceFor(['Email addresses']), []);
});
