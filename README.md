# Asta Security

Marketing site for a website security scanner. The scan box runs real **passive** checks against a domain:

- HTTPS available, certificate trusted and not about to expire
- TLS protocol version (1.2/1.3)
- HTTP → HTTPS redirect
- Strict-Transport-Security, Content-Security-Policy, clickjacking protection, X-Content-Type-Options, Referrer-Policy
- Software version disclosure in `Server` / `X-Powered-By`
- Cookie `Secure` / `HttpOnly` flags

Each result gets a 0–100 score, a letter grade and a one-line fix.

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
server.js          static file server + GET /api/scan?target=example.com
public/index.html  landing page
public/styles.css  styles (light/dark themes)
public/app.js      theme toggle, mobile nav, scan UI
public/terms.html, privacy.html, 404.html
test/              unit tests for input validation and the private-network guard
```

## Safety

- The scanner only fetches the home page and opens a TLS connection; it never logs in, submits forms or probes for exploits.
- Hosts resolving to private/loopback/link-local addresses are rejected, and only ports 80/443 are allowed.
- Scans are rate-limited to 10 per minute per IP.

## Before going live

Replace the placeholders: `hello@example.com` (contact links), the prices in the Pricing section, and the legal text in `terms.html` / `privacy.html`.
