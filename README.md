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

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Yes, in production | API key from [resend.com](https://resend.com) used to email verification codes. Without it, codes are printed to the server log (local testing only). |
| `MAIL_FROM` | Yes, in production | Sender, e.g. `Asta Security <verify@yourdomain.com>`. The domain must be verified in Resend. |
| `SESSION_SECRET` | Recommended | Secret for signing verification tokens. If unset, a random one is generated at startup (tokens then reset on restart). |
| `PORT` | No | Port to listen on (default 3000). |

Limits: 3 codes per email and 5 per IP every 10 minutes; 5 wrong attempts invalidate a code; codes expire after 10 minutes and verification tokens after 15.

## Run locally

```bash
npm start        # http://localhost:3000  (set PORT to change)
npm test
```

Node 18+ is required. There are no dependencies.

## Deploy

Works on any Node host (Railway, Render, Fly.io, a VPS): start command `npm start`, and the app listens on `$PORT`.

## Structure

```
server.js          static file server, GET /api/scan, and the /api/verify + /api/exposure endpoints
breach-check.js    breach lookup and report shaping
verify.js          email codes (sent via Resend) and signed tokens
public/index.html  landing page
public/styles.css  styles (light/dark themes)
public/app.js      theme toggle, mobile nav, scan UI
public/exposure.*  My exposure page (verify flow, report, password check, removal toolkit)
public/brokers.js  data broker opt-out list
public/terms.html, privacy.html, 404.html
test/              unit tests: input validation, private-network guard, codes, tokens, report parsing
```

## Safety

- The scanner only fetches the home page and opens a TLS connection; it never logs in, submits forms or probes for exploits.
- Hosts resolving to private/loopback/link-local addresses are rejected, and only ports 80/443 are allowed.
- Scans are rate-limited to 10 per minute per IP.

## Before going live

- Set `RESEND_API_KEY`, `MAIL_FROM` and `SESSION_SECRET`.
- Replace the placeholders: `hello@example.com` (contact links), the prices in the Pricing section, and the legal text in `terms.html` / `privacy.html` (the privacy policy should mention that emails are sent to XposedOrNot for breach lookups).
- Re-check the broker opt-out links in `public/brokers.js` occasionally; brokers move these pages.
