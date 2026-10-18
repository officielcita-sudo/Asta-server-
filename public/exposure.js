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
    $('#code').value = '';
    $('#code').focus();
    if (!data.delivered) {
      showError('Email sending is not configured on this server yet, so the code was written to the server log.');
    }
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
    try { await sendCode(currentEmail); } catch (err) { showError(err.message); }
  });

  $('#changeEmail').addEventListener('click', (e) => {
    e.preventDefault();
    stepCode.hidden = true;
    stepEmail.hidden = false;
    showError('');
    $('#email').focus();
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

  function renderReport(d) {
    if (!d.breachCount) {
      report.innerHTML = `
        <div class="results-card">
          <div class="results-head">
            <div class="grade A">✓</div>
            <div><h3>${esc(d.email)}</h3><p>Not found in any known data breach. Keep it that way with unique passwords and two-factor login.</p></div>
          </div>
        </div>`;
      return;
    }
    const riskCls = RISK_CLASS[d.risk.label] || 'info';
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
          ${b.dataTypes.some((t) => /password/i.test(t)) ? '<span class="pill fail">Password leaked</span>' : ''}
        </div>
        <p>${esc(b.description)}</p>
        <div class="chips">${b.dataTypes.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        ${b.advice.length ? `<ul class="advice">${b.advice.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>` : ''}
        <div class="breach-actions">
          ${b.domain ? `<a class="btn btn-ghost" href="https://${esc(b.domain)}" target="_blank" rel="noopener nofollow">Go to ${esc(b.domain)}</a>` : ''}
          <button class="btn btn-ghost" data-letter="${i}">Request deletion</button>
        </div>
      </article>`).join('');

    report.innerHTML = `
      <div class="results-card">
        <div class="results-head">
          <div class="risk-badge ${riskCls}">${esc(d.risk.label)}</div>
          <div>
            <h3>${esc(d.email)}</h3>
            <p>Found in <b>${d.breachCount}</b> breach${d.breachCount === 1 ? '' : 'es'}${d.passwordBreaches ? `, <b>${d.passwordBreaches}</b> with passwords` : ''}${d.pasteCount ? `, and ${d.pasteCount} public paste${d.pasteCount === 1 ? '' : 's'}` : ''}.</p>
          </div>
          <a class="btn btn-primary" href="#remove">Start removal</a>
        </div>
        <h4 class="sub">What was exposed</h4>
        <div class="chips">${chips}</div>
        <h4 class="sub">Breaches (newest first)</h4>
        <div class="breach-list">${items}</div>
        ${d.breaches.length > FIRST ? `<button class="btn btn-ghost show-all" id="showAll">Show all ${d.breachCount} breaches</button>` : ''}
        <p class="muted small">Source: XposedOrNot public breach index. Results are not stored.</p>
      </div>`;

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
    $('#copyLetter').textContent = 'Copied ✓';
    setTimeout(() => { $('#copyLetter').textContent = 'Copy letter'; }, 1600);
  });
  updateLetter();

  // Prefill from the homepage (?email=...)
  const pre = new URLSearchParams(location.search).get('email');
  if (pre) $('#email').value = pre;
})();
