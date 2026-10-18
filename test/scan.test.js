const test = require('node:test');
const assert = require('node:assert');
const { normalizeTarget, isPrivateAddress } = require('../server');

test('normalizeTarget strips scheme and path', () => {
  assert.strictEqual(normalizeTarget('https://Example.com/path?q=1'), 'example.com');
  assert.strictEqual(normalizeTarget('example.org'), 'example.org');
});

test('normalizeTarget rejects IPs, bare names and odd ports', () => {
  assert.throws(() => normalizeTarget('127.0.0.1'));
  assert.throws(() => normalizeTarget('localhost'));
  assert.throws(() => normalizeTarget('example.com:8080'));
  assert.throws(() => normalizeTarget(''));
});

test('isPrivateAddress blocks internal ranges', () => {
  for (const ip of ['10.0.0.1', '127.0.0.1', '169.254.169.254', '172.16.5.4', '192.168.1.1', '::1', 'fd00::1', '::ffff:10.0.0.1']) {
    assert.ok(isPrivateAddress(ip), ip);
  }
  for (const ip of ['8.8.8.8', '1.1.1.1', '2606:4700::1111']) {
    assert.ok(!isPrivateAddress(ip), ip);
  }
});
