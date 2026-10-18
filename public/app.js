(() => {
  const $ = (sel) => document.querySelector(sel);

  // ---------- theme ----------
  const root = document.documentElement;
  const toggle = $('#themeToggle');
  const isDark = () =>
    root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  const paintToggle = () => { toggle.querySelector('use').setAttribute('href', isDark() ? '#i-sun' : '#i-moon'); };
  paintToggle();
  toggle.addEventListener('click', () => {
    root.dataset.theme = isDark() ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    paintToggle();
  });

  // ---------- nav ----------
  const nav = $('#nav');
  addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 8), { passive: true });
  const menuBtn = $('#menuBtn');
  const links = $('#navLinks');
  menuBtn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => { if (e.target.tagName === 'A') links.classList.remove('open'); });

  $('#year').textContent = new Date().getFullYear();

  // ---------- reveal on scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // ---------- scan ----------
  const form = $('#scanForm');
  const input = $('#target');
  const results = $('#results');
  const LABEL = { pass: 'Pass', warn: 'Review', fail: 'High', info: 'Info' };
  const ORDER = { fail: 0, warn: 1, info: 2, pass: 3 };

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function render(data) {
    const issues = data.findings.filter((f) => f.status === 'fail' || f.status === 'warn').length;
    const rows = [...data.findings]
      .sort((a, b) => ORDER[a.status] - ORDER[b.status])
      .map((f) => `
        <div class="finding">
          <div><span class="pill ${f.status}">${LABEL[f.status]}</span></div>
          <div>
            <h4>${esc(f.title)}</h4>
            <p>${esc(f.detail)}</p>
            ${f.fix ? `<p class="fix">${esc(f.fix)}</p>` : ''}
          </div>
        </div>`).join('');
    results.innerHTML = `
      <div class="results-card">
        <div class="results-head">
          <div class="grade ${data.grade}">${data.grade}</div>
          <div>
            <h3>${esc(data.host)}</h3>
            ${data.landedOn && data.landedOn !== data.host ? `<p>Redirects to ${esc(data.landedOn)}; headers checked there.</p>` : ''}
            <p>Score ${data.score}/100 · ${issues} issue${issues === 1 ? '' : 's'} to review · scanned ${new Date(data.scannedAt).toLocaleTimeString()}</p>
          </div>
          <a class="btn btn-primary" href="#pricing">Monitor this site</a>
        </div>
        ${rows}
      </div>`;
  }

  if (form) form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const target = input.value.trim();
    if (!target) return;
    const btn = form.querySelector('button');
    btn.disabled = true;
    results.classList.add('show');
    results.innerHTML = `<div class="results-card"><div class="loading"><div class="spinner"></div>Scanning ${esc(target)}…</div></div>`;
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    try {
      const res = await fetch(`/api/scan?target=${encodeURIComponent(target)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Scan failed.');
      render(data);
    } catch (err) {
      results.innerHTML = `<div class="results-card"><p class="error">${esc(err.message || 'Scan failed.')}</p></div>`;
    } finally {
      btn.disabled = false;
    }
  });
})();
