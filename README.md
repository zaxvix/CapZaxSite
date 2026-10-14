# Capzax website

Marketing site for the Capzax app (capzax.com), a Zaxvix product. Next.js 16 (App Router, standalone output), English + Persian (RTL), no analytics or cookies.

Pages: Home, Help (FAQ), About, Contact (form → email), Terms, Privacy. Text lives in `src/content/en.ts` and `src/content/fa.ts` (same shape; edit both).

## Develop
```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```
Contact form needs the SMTP variables from `.env.example` (put them in `.env.local` to test; never commit them).

## Deploy (same pipeline as zaxvix-web)
Push to `main` → GitHub Actions builds the standalone bundle → rsync to `$DEPLOY_PATH/current/` → touch `$DEPLOY_PATH/tmp/restart.txt`.

### One-time setup on cPanel (zaxvix.com hosting)
1. **Domain:** Domains → Create A New Domain `capzax.com` (addon domain, own document root; not a plain alias). Point capzax.com DNS to the hosting (nameservers or A record). Enable AutoSSL.
2. **Mailbox:** make sure `capzax@zaxvix.com` exists; use its own password.
3. **Node app:** Setup Node.js App → Create. Node 20, Application mode: Production, Application root `nodeapps/capzax`, Application URL `capzax.com`, Startup file `server.js`.
4. **Environment variables** (in that screen): `NEXT_PUBLIC_SITE_URL=https://capzax.com`, `SMTP_HOST`, `SMTP_PORT=465`, `SMTP_USER=capzax@zaxvix.com`, `SMTP_PASSWORD`, `CONTACT_TO_EMAIL=capzax@zaxvix.com`, `MAIL_FROM_NAME=Capzax Website`.
5. **Root `server.js`** in `/home/<user>/nodeapps/capzax/` (Passenger ignores the startup file setting here):
   ```js
   process.chdir(__dirname + '/current');
   require('./current/server.js');
   ```
6. **GitHub secrets** on this repo: `SSH_HOST`, `SSH_PORT`, `SSH_USER`, `SSH_KEY`, `DEPLOY_PATH` (= `/home/<user>/nodeapps/capzax`).
7. Push to `main` (or run the workflow) and open https://capzax.com.

Later, to move to its own server: build with `npm run build`, run `.next/standalone/server.js` behind any reverse proxy.

## Notes
- Terms and Privacy are first drafts and should be reviewed by a lawyer before launch.
- Fonts are bundled via `@fontsource` (no Google Fonts requests).
