// Breach report for a single email address the requester has already
// verified they own. Data source: XposedOrNot (free, public breach index).
const TIMEOUT_MS = 15000;
const UA = 'AstaSecurity/1.0 (+self-service breach check)';

const EMAIL_RE = /^[^\s@]{1,64}@[a-z0-9.-]{1,253}\.[a-z]{2,24}$/i;

function normalizeEmail(input) {
  const email = String(input || '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) throw new Error('Enter a valid email address.');
  return email;
}

// Advice keyed on the kinds of data a breach exposed.
const ADVICE = [
  { match: /password/i, text: 'Change the password on this site and anywhere you reused it. Turn on two-factor authentication.' },
  { match: /phone/i, text: 'Expect scam calls and texts. Ask your carrier for a SIM-swap / port-out PIN.' },
  { match: /(physical|home) address/i, text: 'Watch for mail fraud and targeted phishing that quotes your address.' },
  { match: /date.?of.?birth/i, text: 'Your birth date is often a security question. Change security answers that use it.' },
  { match: /(credit card|bank|payment|financial)/i, text: 'Review statements, and ask your bank to replace any card used on this site.' },
  { match: /(social security|national id|passport|government)/i, text: 'Consider a credit freeze with the major credit bureaus.' },
  { match: /ip address/i, text: 'Low risk on its own, but it can reveal your approximate location.' },
];

function adviceFor(dataTypes) {
  const out = [];
  for (const a of ADVICE) if (dataTypes.some((d) => a.match.test(d))) out.push(a.text);
  return out;
}

function shapeReport(raw) {
  const details = raw?.ExposedBreaches?.breaches_details || [];
  const metrics = raw?.BreachMetrics || {};
  const risk = metrics.risk?.[0] || null;

  const breaches = details
    .map((b) => {
      const dataTypes = String(b.xposed_data || '').split(';').map((s) => s.trim()).filter(Boolean);
      return {
        name: b.breach,
        domain: b.domain || null,
        industry: b.industry || null,
        year: b.xposed_date || null,
        records: Number(b.xposed_records) || null,
        description: b.details || '',
        dataTypes,
        passwordRisk: b.password_risk || 'unknown',
        verified: b.verified === 'Yes',
        advice: adviceFor(dataTypes),
      };
    })
    .sort((a, b) => String(b.year).localeCompare(String(a.year)));

  // Count how often each data type was exposed across all breaches.
  const typeCounts = {};
  for (const b of breaches) for (const t of b.dataTypes) typeCounts[t] = (typeCounts[t] || 0) + 1;
  const exposedTypes = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ type, count }));

  const passwordBreaches = breaches.filter((b) => b.dataTypes.some((t) => /password/i.test(t))).length;

  return {
    breachCount: breaches.length,
    pasteCount: Number(raw?.PastesSummary?.cnt) || 0,
    risk: risk ? { label: risk.risk_label, score: risk.risk_score } : { label: breaches.length ? 'Unknown' : 'None', score: 0 },
    passwordBreaches,
    exposedTypes,
    breaches,
  };
}

async function breachReport(email) {
  const url = `https://api.xposedornot.com/v1/breach-analytics?email=${encodeURIComponent(email)}`;
  const res = await fetch(url, {
    headers: { 'user-agent': UA, accept: 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (res.status === 404) return shapeReport(null);
  if (res.status === 429) throw new Error('The breach database is busy. Try again in a few seconds.');
  if (!res.ok) throw new Error('The breach database could not be reached. Try again shortly.');
  return { email, checkedAt: new Date().toISOString(), ...shapeReport(await res.json()) };
}

module.exports = { normalizeEmail, breachReport, shapeReport, adviceFor };
