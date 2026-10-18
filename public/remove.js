(() => {
  const R = window.REMOVAL;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  const session = {
    get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch { return null; } },
    del(k) { try { sessionStorage.removeItem(k); } catch {} },
  };
  let toastTimer;
  const toast = (msg) => {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
  };
  const fmtDate = (d) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  const isoDay = (d) => new Date(d).toISOString().slice(0, 10);

  // ---------- region ----------
  const DEFAULT_LAW = { all: 'gdpr', us: 'ccpa', eu: 'gdpr', fr: 'gdpr', uk: 'ukgdpr', ma: 'ma', ca: 'pipeda', br: 'lgpd' };
  let region = store.get('rcRegion', 'all');
  const regionSel = $('#region');
  regionSel.innerHTML = R.REGIONS.map((r) => `<option value="${r.id}">${esc(r.label)}</option>`).join('');
  regionSel.value = region;
  const visible = (item) => {
    if (region === 'all') return true;
    const inc = R.REGIONS.find((r) => r.id === region).includes;
    return item.regions.some((x) => inc.includes(x));
  };

  // ---------- checklists ----------
  const done = new Set(store.get('rcDone', []));
  // Carry over progress from the older broker checklist on the exposure page.
  store.get('brokersDone', []).forEach((id) => done.add(id === 'intelius' ? 'peopleconnect' : id));

  const ORDER_BEFORE = ['secure', 'search', 'brokers', 'marketing'];
  const ORDER_AFTER = ['protect', 'sensitive'];
  const NUM = { secure: 1, search: 2, brokers: 3, marketing: 4, protect: 6, sensitive: 7 };

  function searchTool() {
    return `
      <div class="search-tool">
        <h3>Search the web for your email</h3>
        <p class="muted small">See which public pages mention your address, then use the removal forms below for anything you want gone.</p>
        <div class="search-row">
          <label for="selfEmail" class="sr-only">Your email</label>
          <input id="selfEmail" type="email" placeholder="you@example.com" autocomplete="email">
          <div class="search-btns">
            <a class="btn btn-ghost" data-engine="google" target="_blank" rel="noopener">Google</a>
            <a class="btn btn-ghost" data-engine="bing" target="_blank" rel="noopener">Bing</a>
            <a class="btn btn-ghost" data-engine="ddg" target="_blank" rel="noopener">DuckDuckGo</a>
            <a class="btn btn-ghost" data-engine="alert" target="_blank" rel="noopener">Get a Google Alert</a>
          </div>
        </div>
      </div>`;
  }

  function sectionHtml(sec) {
    const items = sec.items.filter(visible);
    if (!items.length) return '';
    const doneCount = items.filter((i) => done.has(i.id)).length;
    return `
      <section class="rc-section" id="${sec.id}">
        <div class="rc-head">
          <span class="rc-num">${NUM[sec.id]}</span>
          <div>
            <h2>${esc(sec.title)} <span class="pill ${doneCount === items.length ? 'pass' : 'info'} rc-sec-count">${doneCount} / ${items.length}</span></h2>
            <p class="muted">${esc(sec.intro)}</p>
          </div>
        </div>
        ${sec.id === 'search' ? searchTool() : ''}
        <ul class="rc-list">
          ${items.map((i) => `
            <li class="${done.has(i.id) ? 'done' : ''}">
              <label>
                <input type="checkbox" data-id="${i.id}" ${done.has(i.id) ? 'checked' : ''}>
                <span>
                  <b>${i.priority ? '★ ' : ''}${esc(i.title)}</b>
                  <span class="rc-regions">${i.regions.filter((x) => x !== 'global').map((x) => `<span class="rc-tag">${x.toUpperCase()}</span>`).join('')}</span>
                  <span class="rc-note">${esc(i.note)}</span>
                </span>
              </label>
              <a class="btn btn-ghost" href="${i.url}" target="_blank" rel="noopener nofollow">Open</a>
            </li>`).join('')}
        </ul>
      </section>`;
  }

  function renderSections() {
    const byId = Object.fromEntries(R.SECTIONS.map((s) => [s.id, s]));
    $('#sections').innerHTML = ORDER_BEFORE.map((id) => sectionHtml(byId[id])).join('');
    $('#sectionsAfter').innerHTML = ORDER_AFTER.map((id) => sectionHtml(byId[id])).join('');
    const navItems = [...ORDER_BEFORE.map((id) => byId[id]), { id: 'letters', title: 'Legal requests' }, ...ORDER_AFTER.map((id) => byId[id])]
      .filter((s) => s.id === 'letters' || document.getElementById(s.id));
    $('#rcNav').innerHTML = `<div class="wrap">${navItems.map((s) => `<a href="#${s.id}">${esc(s.title.replace(/^(Opt out of|Remove yourself from|Stop) /, '').replace(/^./, (c) => c.toUpperCase()))}</a>`).join('')}</div>`;
    wireSearch();
    updateProgress();
  }

  function updateProgress() {
    const all = R.SECTIONS.flatMap((s) => s.items).filter(visible);
    const n = all.filter((i) => done.has(i.id)).length;
    const pct = all.length ? Math.round((n / all.length) * 100) : 0;
    $('#pctLabel').textContent = `${pct}%`;
    $('#countLabel').textContent = `${n} of ${all.length} steps done`;
    const C = 2 * Math.PI * 52;
    const fg = $('#ringFg');
    fg.style.strokeDasharray = `${C}`;
    fg.style.strokeDashoffset = `${C * (1 - pct / 100)}`;
    document.querySelectorAll('.rc-section[id]').forEach((secEl) => {
      const boxes = secEl.querySelectorAll('.rc-list input');
      const c = [...boxes].filter((b) => b.checked).length;
      const pill = secEl.querySelector('.rc-sec-count');
      if (pill) { pill.textContent = `${c} / ${boxes.length}`; pill.className = `pill ${c === boxes.length ? 'pass' : 'info'} rc-sec-count`; }
    });
  }

  document.addEventListener('change', (e) => {
    const id = e.target.dataset?.id;
    if (!id || e.target.type !== 'checkbox') return;
    e.target.checked ? done.add(id) : done.delete(id);
    e.target.closest('li').classList.toggle('done', e.target.checked);
    store.set('rcDone', [...done]);
    updateProgress();
  });

  regionSel.addEventListener('change', () => {
    region = regionSel.value;
    store.set('rcRegion', region);
    renderSections();
    if (!form.dataset.touchedLaw) { form.law.value = DEFAULT_LAW[region]; updateLetter(); }
  });

  // ---------- search yourself ----------
  function wireSearch() {
    const input = $('#selfEmail');
    if (!input) return;
    const known = session.get('ms_email');
    if (known && !input.value) input.value = known;
    const update = () => {
      const q = `"${input.value.trim()}"`;
      const enc = encodeURIComponent(q);
      const links = {
        google: `https://www.google.com/search?q=${enc}`,
        bing: `https://www.bing.com/search?q=${enc}`,
        ddg: `https://duckduckgo.com/?q=${enc}`,
        alert: `https://www.google.com/alerts?q=${enc}`,
      };
      document.querySelectorAll('[data-engine]').forEach((a) => {
        a.href = input.value.includes('@') ? links[a.dataset.engine] : '#selfEmail';
        a.classList.toggle('disabled', !input.value.includes('@'));
      });
    };
    input.addEventListener('input', update);
    update();
  }

  // ---------- letters ----------
  const form = $('#letterForm');
  form.law.innerHTML = Object.entries(R.LAWS).map(([k, l]) => `<option value="${k}">${esc(l.label)}</option>`).join('');
  form.law.value = DEFAULT_LAW[region];
  $('#reqTypes').innerHTML = Object.entries(R.REQUEST_TYPES).map(([k, t], i) =>
    `<label><input type="radio" name="type" value="${k}" ${i === 0 ? 'checked' : ''}> ${esc(t.label)}</label>`).join('');
  form.law.addEventListener('change', () => { form.dataset.touchedLaw = '1'; });

  let current = null;
  function updateLetter() {
    const v = {
      law: form.law.value,
      type: form.type.value,
      company: form.company.value.trim(),
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    current = { ...v, ...R.buildLetter(v), domain: form.domain.value.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '') };
    $('#letter').value = `Subject: ${current.subject}\n\n${current.body}`;
    $('#mailLetter').href = `mailto:?subject=${encodeURIComponent(current.subject)}&body=${encodeURIComponent(current.body)}`;
    const target = current.domain || current.company;
    const find = $('#findContact');
    find.href = target ? `https://www.google.com/search?q=${encodeURIComponent(`${current.domain ? `site:${current.domain} ` : `"${current.company}" `}privacy policy data protection contact email`)}` : '#letters';
    find.classList.toggle('disabled', !target);
  }
  form.addEventListener('input', updateLetter);
  form.addEventListener('change', updateLetter);

  $('#copyLetter').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText($('#letter').value); }
    catch { $('#letter').select(); document.execCommand('copy'); }
    toast('Letter copied');
  });

  // ---------- tracker ----------
  let requests = store.get('rcRequests', []);
  const saveRequests = () => store.set('rcRequests', requests);

  $('#markSent').addEventListener('click', () => {
    if (!current.company) { toast('Add the company name first'); form.company.focus(); return; }
    const sent = new Date();
    requests.unshift({
      id: String(Date.now()),
      company: current.company,
      domain: current.domain,
      law: current.law,
      type: current.type,
      sent: isoDay(sent),
      due: isoDay(R.dueDate(current.law, current.type, sent)),
      status: 'waiting',
    });
    saveRequests();
    renderTracker();
    toast(`Tracking your request to ${current.company}`);
    $('#trackerWrap').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  function icsFor(r) {
    const due = r.due.replace(/-/g, '');
    const next = isoDay(new Date(new Date(r.due).getTime() + 86400000)).replace(/-/g, '');
    const law = R.LAWS[r.law];
    const lines = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Mourchid Security//Removal Center//EN', 'BEGIN:VEVENT',
      `UID:${r.id}@mourchid-security`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '')}`,
      `DTSTART;VALUE=DATE:${due}`, `DTEND;VALUE=DATE:${next}`,
      `SUMMARY:Follow up: privacy request to ${r.company}`,
      `DESCRIPTION:You sent a ${R.REQUEST_TYPES[r.type].label.toLowerCase()} request under ${law.label} on ${r.sent}. If ${r.company} has not answered\\, send a reminder or complain to ${law.regulator.name}: ${law.regulator.url}`,
      'BEGIN:VALARM', 'TRIGGER:-PT0M', 'ACTION:DISPLAY', 'DESCRIPTION:Privacy request follow-up', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR',
    ];
    return lines.join('\r\n');
  }

  function download(name, text, type) {
    const url = URL.createObjectURL(new Blob([text], { type }));
    const a = Object.assign(document.createElement('a'), { href: url, download: name });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function renderTracker() {
    $('#trackerWrap').hidden = !requests.length;
    const today = new Date(isoDay(new Date()));
    $('#tracker').innerHTML = requests.map((r) => {
      const law = R.LAWS[r.law];
      const days = Math.round((new Date(r.due) - today) / 86400000);
      const overdue = r.status !== 'answered' && days < 0;
      const badge = r.status === 'answered' ? '<span class="pill pass">Answered</span>'
        : overdue ? `<span class="pill fail">${-days} day${days === -1 ? '' : 's'} overdue</span>`
          : `<span class="pill info">${days} day${days === 1 ? '' : 's'} left</span>`;
      return `
        <div class="tracker-row" data-id="${r.id}">
          <div class="tr-main">
            <b>${esc(r.company)}</b> ${badge}
            <span class="muted small">${esc(R.REQUEST_TYPES[r.type].label)} · ${esc(law.label)} · sent ${fmtDate(r.sent)} · follow up by ${fmtDate(r.due)}</span>
          </div>
          <div class="tr-actions">
            <select data-act="status" aria-label="Status for ${esc(r.company)}">
              <option value="waiting" ${r.status === 'waiting' ? 'selected' : ''}>Waiting</option>
              <option value="answered" ${r.status === 'answered' ? 'selected' : ''}>Answered</option>
              <option value="ignored" ${r.status === 'ignored' ? 'selected' : ''}>No reply / refused</option>
            </select>
            <button class="btn btn-ghost" data-act="ics" type="button">Calendar reminder</button>
            ${overdue || r.status === 'ignored' ? `<a class="btn btn-ghost escalate" href="${law.regulator.url}" target="_blank" rel="noopener">Complain to ${esc(law.regulator.name.replace(/^the /, ''))}</a>` : ''}
            <button class="btn btn-ghost" data-act="remove" type="button" aria-label="Remove ${esc(r.company)}">✕</button>
          </div>
        </div>`;
    }).join('');
  }

  $('#tracker').addEventListener('click', (e) => {
    const act = e.target.dataset.act;
    const row = e.target.closest('.tracker-row');
    if (!act || !row) return;
    const r = requests.find((x) => x.id === row.dataset.id);
    if (act === 'ics') download(`follow-up-${r.company.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.ics`, icsFor(r), 'text/calendar');
    if (act === 'remove') { requests = requests.filter((x) => x.id !== r.id); saveRequests(); renderTracker(); }
  });
  $('#tracker').addEventListener('change', (e) => {
    if (e.target.dataset.act !== 'status') return;
    const r = requests.find((x) => x.id === e.target.closest('.tracker-row').dataset.id);
    r.status = e.target.value;
    saveRequests();
    renderTracker();
  });

  // ---------- plan download / print ----------
  $('#downloadPlan').addEventListener('click', () => {
    const lines = [`MOURCHID SECURITY — MY DATA REMOVAL PLAN`, `Saved ${fmtDate(new Date())} · ${$('#countLabel').textContent}`, ''];
    for (const sec of R.SECTIONS) {
      const items = sec.items.filter(visible);
      if (!items.length) continue;
      lines.push(sec.title.toUpperCase());
      for (const i of items) lines.push(`[${done.has(i.id) ? 'x' : ' '}] ${i.title}\n    ${i.url}`);
      lines.push('');
    }
    if (requests.length) {
      lines.push('LEGAL REQUESTS');
      for (const r of requests) lines.push(`- ${r.company}: ${R.REQUEST_TYPES[r.type].label} (${R.LAWS[r.law].label}), sent ${r.sent}, follow up by ${r.due}, status: ${r.status}`);
      lines.push('');
    }
    lines.push(`${location.origin}/remove`);
    download('my-data-removal-plan.txt', lines.join('\n'), 'text/plain');
  });
  $('#printPlan').addEventListener('click', () => window.print());

  // ---------- prefill from the exposure report ----------
  const known = session.get('ms_email');
  if (known) form.email.value = known;
  const pre = session.get('ms_prefill');
  if (pre) {
    form.company.value = pre.company || '';
    form.domain.value = pre.domain || '';
    if (pre.email) form.email.value = pre.email;
    session.del('ms_prefill');
  }

  renderSections();
  updateLetter();
  renderTracker();
  if (pre && location.hash === '#letters') setTimeout(() => $('#letters').scrollIntoView(), 50);
})();
