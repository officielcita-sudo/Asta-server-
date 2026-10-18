const test = require('node:test');
const assert = require('node:assert');
const R = require('../public/removal-data');

const REGION_IDS = new Set(['global', 'us', 'eu', 'uk', 'fr', 'ma', 'ca', 'br']);

test('every resource has a unique id, an https link and known regions', () => {
  const ids = new Set();
  for (const sec of R.SECTIONS) {
    assert.ok(sec.items.length, sec.id);
    for (const i of sec.items) {
      assert.ok(!ids.has(i.id), `duplicate id ${i.id}`);
      ids.add(i.id);
      assert.match(i.url, /^https:\/\//, i.id);
      assert.ok(i.title && i.note, i.id);
      assert.ok(i.regions.length && i.regions.every((r) => REGION_IDS.has(r)), i.id);
    }
  }
});

test('every region filter shows global resources and at least one local one', () => {
  for (const r of R.REGIONS.filter((x) => x.id !== 'all')) {
    const shown = R.SECTIONS.flatMap((s) => s.items).filter((i) => i.regions.some((x) => r.includes.includes(x)));
    assert.ok(shown.some((i) => i.regions.includes('global')), r.id);
    assert.ok(shown.some((i) => !i.regions.includes('global')), r.id);
  }
});

test('every law and request type builds a complete letter', () => {
  for (const law of Object.keys(R.LAWS)) {
    assert.match(R.LAWS[law].regulator.url, /^https:\/\//, law);
    for (const type of Object.keys(R.REQUEST_TYPES)) {
      const { subject, body } = R.buildLetter({ law, type, company: 'Acme', name: 'Jo Doe', email: 'jo@example.com', date: 'today' });
      assert.ok(subject.includes(R.LAWS[law].label), `${law}/${type} subject`);
      for (const part of ['Acme', 'Jo Doe', 'jo@example.com', R.LAWS[law].basis[type]]) assert.ok(body.includes(part), `${law}/${type}`);
      assert.ok(!/undefined|\[object/.test(subject + body), `${law}/${type} has a gap`);
    }
  }
});

test('placeholders appear when details are missing', () => {
  const { body } = R.buildLetter({ law: 'gdpr', type: 'delete', date: 'today' });
  assert.ok(body.includes('[Company name]') && body.includes('[Your full name]') && body.includes('[Your email address]'));
});

test('follow-up dates use the right deadline', () => {
  const sent = new Date('2026-10-16T12:00:00'); // a Friday
  assert.strictEqual(R.dueDate('gdpr', 'delete', sent).getDate(), new Date('2026-11-15T12:00:00').getDate());
  // CCPA opt-out: 15 business days, skipping weekends
  const ccpa = R.dueDate('ccpa', 'optout', sent);
  assert.strictEqual(ccpa.toDateString(), new Date('2026-11-06T12:00:00').toDateString());
  assert.notStrictEqual(ccpa.getDay(), 0);
  assert.notStrictEqual(ccpa.getDay(), 6);
});
