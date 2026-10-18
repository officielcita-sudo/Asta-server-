(() => {
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  // ---------- verify flow ----------
  const stepEmail = $('#stepEmail');
  const stepCode = $('#stepCode');
  const errBox = $('#expError');
  const report = $('#report');
  let currentEmail = '';

  const showError = (msg) => { errBox.textContent = msg; errBox.hidden = !msg; };
  const setStep = (n) => document.querySelectorAll('#stepper li').forEach((li) => {
    const step = Number(li.dataset.step);
    li.classList.toggle('active', step === n);
    li.classList.toggle('done', step < n);
  });
  let toastTimer;
  const toast = (msg) => {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  };

  async function api(path, opts = {}) {
    const res = await fetch(path, {
      ...opts,
      headers: { 'content-type': 'application/json', ...(opts.headers || {}) },
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Something went wrong. Try again.');
    return data;
  }

  async function sendCode(email) {
    showError('');
    const data = await api('/api/verify/start', { method: 'POST', body: JSON.stringify({ email }) });
    currentEmail = email;
    $('#sentTo').textContent = email;
    stepEmail.hidden = true;
    stepCode.hidden = false;
    setStep(2);
    $('#code').value = '';
    $('#code').focus();
    if (data.delivered) toast(`Code sent to ${email}`);
    else showError('Email sending is off on this server (local mode), so the code was printed in the server terminal.');
  }

  $('#emailForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.submitter || e.target.querySelector('button');
    btn.disabled = true;
    try { await sendCode($('#email').value.trim()); } catch (err) { showError(err.message); }
    btn.disabled = false;
  });

  $('#resend').addEventListener('click', async (e) => {
    e.preventDefault();
    try { await sendCode(currentEmail); toast('New code sent'); } catch (err) { showError(err.message); }
  });

  $('#changeEmail').addEventListener('click', (e) => {
    e.preventDefault();
    stepCode.hidden = true;
    stepEmail.hidden = false;
    setStep(1);
    showError('');
    $('#email').focus();
  });

  $('#code').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6);
    if (e.target.value.length === 6) $('#codeForm').requestSubmit();
  });

  $('#codeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = e.submitter || e.target.querySelector('button');
    btn.disabled = true;
    showError('');
    try {
      const { token } = await api('/api/verify/confirm', {
        method: 'POST',
        body: JSON.stringify({ email: currentEmail, code: $('#code').value.trim() }),
      });
      report.classList.add('show');
      report.innerHTML = '<div class="results-card"><div class="loading"><div class="spinner"></div>Checking breach databases…</div></div>';
      report.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const data = await api('/api/exposure', { headers: { authorization: `Bearer ${token}` } });
      renderReport(data);
      setStep(3);
      stepCode.hidden = true;
      stepEmail.hidden = false;
    } catch (err) {
      showError(err.message);
      if (!report.querySelector('.breach')) report.classList.remove('show');
    }
    btn.disabled = false;
  });

  // ---------- report ----------
  const RISK_CLASS = { None: 'pass', Low: 'pass', Medium: 'warn', High: 'fail', Critical: 'fail', Unknown: 'info' };

  function actionPlan(d) {
    const steps = [];
    if (d.aggregateCount) steps.push(['urgent', 'Scan your devices for malware', 'Your logins appear in collections stolen by password-stealing malware. Run a full scan (Windows Security, Malwarebytes or your phone\'s built-in protection) before changing passwords, or the new ones can be stolen too.']);
    if (d.passwordBreaches) steps.push(['urgent', 'Change exposed passwords', `Passwords leaked in ${d.passwordBreaches} breach${d.passwordBreaches === 1 ? '' : 'es'}. Change them, starting with your email account, and never reuse one across sites.`]);
    steps.push(['important', 'Turn on two-factor login', 'Add an authenticator app to your email, bank and social accounts so a leaked password alone can\'t get in.']);
    if (d.exposedTypes.some((t) => /phone|physical address|home address|date of birth/i.test(t.type))) steps.push(['important', 'Remove your details from data brokers', 'Your phone, address or birth date leaked. Use the broker checklist below to get them off people-search sites.']);
    steps.push(['tip', 'Use a password manager', 'It creates a unique password for every site, so one breach never spreads.']);
    return steps;
  }

  function timelineChart(points) {
    if (points.length < 2) return '';
    const max = Math.max(...points.map((p) => p.count));
    const W = 640, H = 160, PAD_B = 22, PAD_T = 18;
    const slot = W / points.length;
    const barW = Math.max(4, Math.min(28, slot - 2));
    const bars = points.map((p, i) => {
      const h = p.count ? Math.max(4, ((H - PAD_B - PAD_T) * p.count) / max) : 0;
      const x = i * slot + (slot - barW) / 2;
      const y = H - PAD_B - h;
      const label = `${p.year}: ${p.count} breach${p.count === 1 ? '' : 'es'}`;
      const showYear = points.length <= 12 || i % Math.ceil(points.length / 8) === 0 || i === points.length - 1;
      return `<g class="tl-bar" tabindex="0" data-tip="${label}">
        <rect class="tl-hit" x="${i * slot}" y="0" width="${slot}" height="${H - PAD_B}"></rect>
        ${h ? `<path d="M${x},${H - PAD_B} V${y + 4} q0,-4 4,-4 h${barW - 8} q4,0 4,4 V${H - PAD_B} Z" class="tl-fill"></path>` : ''}
        ${showYear ? `<text x="${x + barW / 2}" y="${H - 6}" text-anchor="middle">${p.year}</text>` : ''}
      </g>`;
    }).join('');
    const peak = points.reduce((a, b) => (b.count > a.count ? b : a));
    const summary = points.filter((p) => p.count).map((p) => `${p.year}: ${p.count}`).join(', ');
    return `
      <h4 class="sub">Breaches by year</h4>
      <div class="timeline">
        <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Breaches by year. ${summary}. Peak: ${peak.count} in ${peak.year}.">
          <line x1="0" x2="${W}" y1="${H - PAD_B}" y2="${H - PAD_B}" class="tl-axis"></line>
          ${bars}
        </svg>
        <div class="tl-tip" hidden></div>
      </div>`;
  }

  function wireTimeline() {
    const box = report.querySelector('.timeline');
    if (!box) return;
    const tip = box.querySelector('.tl-tip');
    const show = (g) => {
      tip.textContent = g.dataset.tip;
      tip.hidden = false;
      const r = g.querySelector('.tl-hit').getBoundingClientRect();
      const b = box.getBoundingClientRect();
      tip.style.left = `${Math.min(Math.max(r.left - b.left + r.width / 2, 50), b.width - 50)}px`;
      box.querySelectorAll('.tl-bar').forEach((x) => x.classList.toggle('dim', x !== g));
    };
    const hide = () => { tip.hidden = true; box.querySelectorAll('.tl-bar').forEach((x) => x.classList.remove('dim')); };
    box.querySelectorAll('.tl-bar').forEach((g) => {
      g.addEventListener('mouseenter', () => show(g));
      g.addEventListener('focus', () => show(g));
      g.addEventListener('mouseleave', hide);
      g.addEventListener('blur', hide);
    });
  }

  function renderReport(d) {
    if (!d.breachCount) {
      report.innerHTML = `
        <div class="results-card">
          <div class="results-head">
            <div class="grade A">✓</div>
            <div><h3>${esc(d.email)}</h3><p>Not found in any known data breach. Keep it that way with unique passwords and two-factor login.</p></div>
          </div>
          <div class="actions-plan">${actionPlan(d).map(([lvl, t, x]) => `<div class="plan-step ${lvl}"><b>${esc(t)}</b><span>${esc(x)}</span></div>`).join('')}</div>
        </div>`;
      return;
    }
    const riskCls = RISK_CLASS[d.risk.label] || 'info';
    const latest = d.breaches.find((b) => b.year)?.year || '—';
    const chips = d.exposedTypes.slice(0, 14)
      .map((t) => `<span class="chip">${esc(t.type)} <b>${t.count}</b></span>`).join('');
    const FIRST = 10;
    const items = d.breaches.map((b, i) => `
      <article class="breach"${i >= FIRST ? ' hidden' : ''}>
        <div class="breach-top">
          <div>
            <h4>${esc(b.name)}</h4>
            <p class="muted small">${[b.year, b.domain, b.industry, b.records ? `${b.records.toLocaleString()} accounts` : ''].filter(Boolean).map(esc).join(' · ')}</p>
          </div>
          <div class="pills">
            ${b.aggregate ? '<span class="pill warn">Malware log</span>' : ''}
            ${b.dataTypes.some((t) => /password/i.test(t)) ? '<span class="pill fail">Password leaked</span>' : ''}
          </div>
        </div>
        ${b.description ? `<p>${esc(b.description)}</p>` : ''}
        <div class="chips">${b.dataTypes.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        ${b.advice.length ? `<ul class="advice">${b.advice.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>` : ''}
        <div class="breach-actions">
          ${b.domain ? `<a class="btn btn-ghost" href="https://${esc(b.domain)}" target="_blank" rel="noopener nofollow">Go to ${esc(b.domain)}</a>` : ''}
          ${b.domain ? `<button class="btn btn-ghost" data-letter="${i}">Request deletion</button>` : ''}
        </div>
      </article>`).join('');

    report.innerHTML = `
      <div class="results-card">
        <div class="results-head">
          <div class="risk-badge ${riskCls}">${esc(d.risk.label)}</div>
          <div>
            <h3>${esc(d.email)}</h3>
            <p>Risk score ${d.risk.score}/100 · checked ${new Date(d.checkedAt).toLocaleString()}</p>
          </div>
          <a class="btn btn-primary" href="#remove">Start removal</a>
        </div>
        <div class="stat-tiles">
          <div class="stat-tile"><b>${d.breachCount}</b><span>Breaches</span></div>
          <div class="stat-tile"><b>${d.passwordBreaches}</b><span>With passwords</span></div>
          <div class="stat-tile"><b>${d.exposedTypes.length}</b><span>Kinds of data</span></div>
          <div class="stat-tile"><b>${esc(latest)}</b><span>Most recent</span></div>
        </div>
        <h4 class="sub">Your action plan</h4>
        <div class="actions-plan">${actionPlan(d).map(([lvl, t, x], n) => `<div class="plan-step ${lvl}"><i>${n + 1}</i><div><b>${esc(t)}</b><span>${esc(x)}</span></div></div>`).join('')}</div>
        ${timelineChart(d.timeline || [])}
        <h4 class="sub">What was exposed</h4>
        <div class="chips">${chips}</div>
        <h4 class="sub">Breaches (newest first)</h4>
        <div class="breach-list">${items}</div>
        ${d.breaches.length > FIRST ? `<button class="btn btn-ghost show-all" id="showAll">Show all ${d.breachCount} breaches</button>` : ''}
        <p class="muted small">Source: XposedOrNot public breach index. Results are not stored.</p>
      </div>`;

    wireTimeline();
    $('#showAll')?.addEventListener('click', (e) => {
      report.querySelectorAll('.breach[hidden]').forEach((el) => { el.hidden = false; });
      e.target.remove();
    });
    report.querySelectorAll('[data-letter]').forEach((btn) => btn.addEventListener('click', () => {
      const b = d.breaches[Number(btn.dataset.letter)];
      const f = $('#letterForm');
      f.company.value = b.name;
      f.email.value = d.email;
      updateLetter();
      $('#remove').scrollIntoView({ behavior: 'smooth' });
    }));
    $('#letterForm').email.value = d.email;
    updateLetter();
  }

  // ---------- password check (k-anonymity, browser only) ----------
  $('#pwForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const out = $('#pwResult');
    const pw = $('#pw').value;
    if (!pw) return;
    out.innerHTML = '<div class="loading"><div class="spinner"></div>Checking…</div>';
    try {
      const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(pw));
      const hex = [...new Uint8Array(buf)].map((x) => x.toString(16).padStart(2, '0')).join('').toUpperCase();
      const res = await fetch(`https://api.pwnedpasswords.com/range/${hex.slice(0, 5)}`, { headers: { 'Add-Padding': 'true' } });
      if (!res.ok) throw new Error();
      const line = (await res.text()).split('\n').find((l) => l.startsWith(hex.slice(5)));
      const count = line ? Number(line.split(':')[1]) : 0;
      out.innerHTML = count
        ? `<p class="pw-bad"><b>Leaked ${count.toLocaleString()} times.</b> Stop using this password everywhere and change it on every account that uses it.</p>`
        : '<p class="pw-good"><b>Not found in known leaks.</b> Make sure it is long and used on only one site.</p>';
    } catch {
      out.innerHTML = '<p class="error">Could not reach the password service. Try again.</p>';
    }
    $('#pw').value = '';
  });

  // ---------- broker checklist ----------
  const done = new Set(store.get('brokersDone', []));
  const list = $('#brokerList');
  const progress = () => { $('#brokerProgress').textContent = `${done.size} of ${window.BROKERS.length} done`; };
  list.innerHTML = window.BROKERS.map((b) => `
    <li class="${done.has(b.id) ? 'done' : ''}">
      <label><input type="checkbox" data-id="${b.id}" ${done.has(b.id) ? 'checked' : ''}>
        <span><b>${b.priority ? '★ ' : ''}${esc(b.name)}</b> <span class="muted small">${esc(b.region)}</span><br>
        <span class="muted small">${esc(b.note)}</span></span>
      </label>
      <a class="btn btn-ghost" href="${b.url}" target="_blank" rel="noopener nofollow">Opt out</a>
    </li>`).join('');
  list.addEventListener('change', (e) => {
    const id = e.target.dataset.id;
    if (!id) return;
    e.target.checked ? done.add(id) : done.delete(id);
    e.target.closest('li').classList.toggle('done', e.target.checked);
    store.set('brokersDone', [...done]);
    progress();
  });
  progress();

  // ---------- deletion letter ----------
  const form = $('#letterForm');
  function updateLetter() {
    const law = form.law.value;
    const company = form.company.value.trim() || '[Company name]';
    const name = form.name.value.trim() || '[Your full name]';
    const email = form.email.value.trim() || '[Your email address]';
    const date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const legal = law === 'gdpr'
      ? {
        subject: 'Request for erasure under Article 17 GDPR',
        basis: 'Under Article 17 of the General Data Protection Regulation (GDPR), I request that you erase all personal data you hold about me without undue delay.',
        deadline: 'Please confirm the erasure within one month of receiving this request, as required by Article 12(3) GDPR.',
      }
      : {
        subject: 'Request to delete personal information under the CCPA',
        basis: 'Under the California Consumer Privacy Act (Cal. Civ. Code § 1798.105), I request that you delete all personal information you have collected about me, and direct your service providers to do the same.',
        deadline: 'Please confirm the deletion within 45 days of receiving this request, as required by the CCPA.',
      };
    form.querySelector('#letter').value =
`Subject: ${legal.subject}

To the Data Protection / Privacy team at ${company},

${date}

${legal.basis}

My account or records with you are associated with this email address: ${email}

Please also:
- confirm which categories of my personal data you held and who you shared them with;
- stop any sale or sharing of my personal data;
- tell me if you are unable to delete any data, and the legal reason why.

${legal.deadline}

Kind regards,
${name}
${email}`;
    const subject = encodeURIComponent(legal.subject);
    const body = encodeURIComponent(form.querySelector('#letter').value.split('\n').slice(2).join('\n'));
    $('#mailLetter').href = `mailto:?subject=${subject}&body=${body}`;
  }
  form.addEventListener('input', updateLetter);
  $('#copyLetter').addEventListener('click', async () => {
    const text = form.querySelector('#letter').value;
    try { await navigator.clipboard.writeText(text); } catch { form.querySelector('#letter').select(); document.execCommand('copy'); }
    toast('Letter copied to clipboard');
  });
  updateLetter();

  // Prefill from the homepage (?email=...)
  const pre = new URLSearchParams(location.search).get('email');
  if (pre) $('#email').value = pre;
})();
