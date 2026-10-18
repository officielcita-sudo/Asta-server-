# Asta Security

Marketing site for a website security scanner. The scan box runs real **passive** checks against a domain:

- HTTPS available, certificate trusted and not about to expire
- TLS protocol version (1.2/1.3)
- HTTP → HTTPS redirect
- Strict-Transport-Security, Content-Security-Policy, clickjacking protection, X-Content-Type-Options, Referrer-Policy
- Software version disclosure in `Server` / `X-Powered-By`
- Cookie `Secure` / `HttpOnly` flags

Each result gets a 0–100 score, a letter grade and a one-line fix.

## My exposure (`/exposure`)

A self-service page where people check **their own** email:

1. **Verify ownership** – a 6-digit code is emailed to the address. Results are only shown for an email whose code was confirmed, so the page can't be used to look up other people.
2. **Breach report** – every known breach the email appears in (company, year, accounts affected, what data leaked), an overall risk level, and advice per type of leaked data. Source: the free [XposedOrNot](https://xposedornot.com) breach index. Results are not stored.
3. **Password check** – the browser hashes the password and sends only the first 5 characters of the SHA-1 hash to Have I Been Pwned's Pwned Passwords range API (k-anonymity). The password never reaches this server.
4. **Removal toolkit** – a checklist of major data brokers with their opt-out pages (progress saved in the browser), and a GDPR Article 17 / CCPA deletion-request letter generator, prefilled from any breach in the report.

### Configuration

Copy `.env.example` to `.env` and fill it in. The server reads `.env` at startup; real environment variables (for example in Railway's Variables tab) take priority.

| Variable | Required | Purpose |
|---|---|---|
| `PORT` | No | Port to listen on (default 3000; hosting platforms set it automatically). |
| `NODE_ENV` | In production | Set to `production` when deployed. The server then refuses to start without `RESEND_API_KEY` and a 32+ character `SESSION_SECRET`. |
| `TRUST_PROXY` | Behind a proxy | Set to `1` on Railway, Render, Fly or behind nginx so rate limits use the real visitor IP. Leave `0` if exposed directly, or visitors could fake their IP. |
| `SESSION_SECRET` | In production | Signs verification tokens. Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. |
| `RESEND_API_KEY` | In production | [Resend](https://resend.com) API key for emailing verification codes. Without it (local only), codes are printed in the server terminal. |
| `MAIL_FROM` | In production | Sender, e.g. `Asta Security <verify@yourdomain.com>`, on a domain verified in Resend. `onboarding@resend.dev` only delivers to your own Resend account address. |
| `CONTACT_EMAIL` | Recommended | Address used in the site's Contact links. |

`GET /healthz` returns `{"ok":true}` for uptime checks.

Limits: 3 codes per email and 5 per IP every 10 minutes; 5 wrong attempts invalidate a code; codes expire after 10 minutes and verification tokens after 15.

## Run locally

```bash
npm start        # http://localhost:3000  (set PORT to change)
npm test
```

Node 18+ is required. There are no dependencies.

## Deploy for free on Render

The repository includes a `render.yaml` blueprint, so deploying takes about three minutes:

1. Sign in at [render.com](https://render.com) with GitHub (the free plan needs no card).
2. **New → Blueprint**, pick this repository, then **Apply**.
3. When asked, fill in:
   - `RESEND_API_KEY`: your Resend sending key
   - `SITE_URL`: leave empty for the first deploy, then set it to the address Render gives you (e.g. `https://asta-security.onrender.com`) and redeploy, so link previews work
   - `CONTACT_EMAIL`: optional; contact links stay hidden until it is set
4. Open the address Render shows. `NODE_ENV=production`, `TRUST_PROXY=1` and a random `SESSION_SECRET` are set by the blueprint.

The free plan sleeps after 15 minutes without visitors; the first visit after that takes about a minute to wake up. Verification codes are kept in memory, so the service runs as a single instance (the free plan's default).

Any other Node host (Koyeb, Fly.io, a VPS) works too: start command `npm start`, health check `/healthz`, and the variables from `.env.example`.

## Structure

```
server.js          static file server, security headers, GET /api/scan, /api/verify + /api/exposure, /healthz
config.js          settings from environment variables and .env
breach-check.js    breach lookup and report shaping
verify.js          email codes (sent via Resend) and signed tokens
public/index.html  landing page
public/styles.css  styles (light/dark themes)
public/app.js      theme toggle, mobile nav, scan UI
public/exposure.*  My exposure page (verify flow, report with action plan and timeline, password check, removal toolkit)
public/theme.js    applies the saved light/dark theme before first paint
public/img/        illustrations (exposure hero, all-clear state, 404)
public/*.png|ico   favicon, app icons, maskable icon, social share image (og-image.png)
public/site.webmanifest, robots.txt, sitemap.xml
render.yaml        Render deployment blueprint
public/brokers.js  data broker opt-out list
public/terms.html, privacy.html, 404.html
test/              unit + HTTP tests: validation, SSRF guard, codes, tokens, report parsing, headers, limits, .env
```

## Safety

- The scanner only fetches the home page and opens a TLS connection; it never logs in, submits forms or probes for exploits.
- Hosts resolving to private/loopback/link-local addresses are rejected, and only ports 80/443 are allowed.
- Scans are rate-limited to 10 per minute per IP.
- Every response carries a strict Content-Security-Policy, HSTS, frame, MIME-sniffing, referrer and permissions headers.

## Before going live

- Set `NODE_ENV=production`, `TRUST_PROXY=1`, `RESEND_API_KEY`, `MAIL_FROM`, `SESSION_SECRET` and `CONTACT_EMAIL`.
- Replace the placeholders: `hello@example.com` (contact links), the prices in the Pricing section, and the legal text in `terms.html` / `privacy.html` (the privacy policy should mention that emails are sent to XposedOrNot for breach lookups).
- Re-check the broker opt-out links in `public/brokers.js` occasionally; brokers move these pages.
