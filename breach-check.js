// Breach report for a single email address the requester has already
// verified they own. Data source: XposedOrNot (free, public breach index).
const TIMEOUT_MS = 15000;
const UA = 'MourchidSecurity/1.0 (+self-service breach check)';

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

// Collections of credentials harvested by password-stealing malware, or
// combo lists re-assembled from older leaks, rather than one company's breach.
const AGGREGATE_RE = /(stealer|combo|collection-?\d|naz\.?api|telegram|cloud-?logs|compilation|antipublic|exploit\.in)/i;

function adviceFor(dataTypes, aggregate = false) {
  const out = [];
  if (aggregate) {
    out.push('This is a collection of logins stolen by malware or merged from older leaks, not one company\'s breach. Scan your computers and phone for malware, then change the passwords saved in your browser, starting with email and banking.');
  }
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
      const aggregate = AGGREGATE_RE.test(b.breach || '') && !b.domain;
      return {
        aggregate,
        name: b.breach,
        domain: b.domain || null,
        industry: b.industry || null,
        year: b.xposed_date || null,
        records: Number(b.xposed_records) || null,
        description: b.details || '',
        dataTypes,
        passwordRisk: b.password_risk || 'unknown',
        verified: b.verified === 'Yes',
        advice: adviceFor(dataTypes, aggregate),
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

  // Breaches per year, e.g. [{ year: 2019, count: 3 }], from first to last year with data.
  const yearly = Object.entries(metrics.yearwise_details?.[0] || {})
    .map(([k, v]) => ({ year: Number(k.replace(/\D/g, '')), count: Number(v) || 0 }))
    .filter((y) => y.year)
    .sort((a, b) => a.year - b.year);
  const first = yearly.findIndex((y) => y.count);
  const timeline = first === -1 ? [] : yearly.slice(first);

  return {
    breachCount: breaches.length,
    pasteCount: Number(raw?.PastesSummary?.cnt) || 0,
    risk: risk ? { label: risk.risk_label, score: risk.risk_score } : { label: breaches.length ? 'Unknown' : 'None', score: 0 },
    passwordBreaches,
    aggregateCount: breaches.filter((b) => b.aggregate).length,
    timeline,
    exposedTypes,
    breaches,
  };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function breachReport(email) {
  const url = `https://api.xposedornot.com/v1/breach-analytics?email=${encodeURIComponent(email)}`;
  let res;
  // The free API allows about one request per second; retry briefly when busy.
  for (let attempt = 0; attempt < 3; attempt++) {
    res = await fetch(url, {
      headers: { 'user-agent': UA, accept: 'application/json' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.status !== 429) break;
    await sleep(1200 * (attempt + 1));
  }
  if (res.status === 404) return { email, checkedAt: new Date().toISOString(), ...shapeReport(null) };
  if (res.status === 429) throw new Error('The breach database is busy. Try again in a few seconds.');
  if (!res.ok) throw new Error('The breach database could not be reached. Try again shortly.');
  return { email, checkedAt: new Date().toISOString(), ...shapeReport(await res.json()) };
}

module.exports = { normalizeEmail, breachReport, shapeReport, adviceFor };
