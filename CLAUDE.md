# Capzax website (repo `zaxvix/CapZaxSite`): context for Claude

Marketing site for the Capzax app, https://capzax.com. Capzax is a Zaxvix product (Zaxvix AB, Sweden). English only, no analytics, no cookies. Next.js 16 (App Router, standalone output), React 19, nodemailer for the contact form.

Pages: Home, Help (FAQ), About, Contact, Terms, Privacy, Delete account. Text lives in `src/content/en.ts`. Setup and deploy steps (cPanel, Passenger, GitHub secrets) are in `README.md`.

## Related repos (`zaxvix` GitHub organization)
- `zaxvix/ZCaption`: the app and its account server. Read its `CLAUDE.md` and `docs/` for the product, plans and privacy facts. The site must never promise something the app does not do.
- `zaxvix/zaxvix-web`: the company site zaxvix.com / zaxvix.se.

## Rules that always apply
- **Reply to the user in Persian.** Code, commits and repo docs stay in English.
- **Git commit trailers** (end of every commit message):
  ```
  Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
  Claude-Session: <the session URL given in the session's system reminder>
  ```
- **A push to `main` deploys production** (GitHub Actions builds, rsyncs to cPanel and touches `tmp/restart.txt`). Work on a branch and merge only when the user says so. Do not push when the user says not to.
- **Server rule (verbatim):** "Do not deploy, restart containers, alter databases, change secrets, or modify the Accounting stack without explicit approval." First report findings and the proposed change, then wait for authorization.
- Never commit secrets (`.env.local`, SMTP password). Production values live in cPanel.
- Plain, short copy. No hype, no em dashes, nothing that reads as machine-written.

## Things to keep true
- **The site and the app say the same thing.** Privacy claims ("your video stays on your phone; in Cloud AI mode only the audio goes to the speech provider"), language support wording ("English works offline, Persian is best with Cloud AI, improving"), plans (Free, Standard, Pro; prices are not announced) all come from the app. Check `ZCaption/docs/PRODUCT.md` and `docs/PRIVACY_AND_DATA.md` before editing them.
- **`/api/contact` is also used by the Capzax app's Contact screen.** Keep its JSON shape (`email`, `subject`, `message`) and the bot protection (honeypot and timing check).
- **`/delete-account` must stay public.** Google Play requires a public link for account deletion requests.
- Terms and Privacy are first drafts waiting for legal review. Do not present them as reviewed. For comparison, zaxvix.com now keeps only a short privacy policy; the app needs its own Terms because it will have plans and accounts.
- Run `npm run typecheck`, `npm run build` and `npm audit` (should report 0) before a release.
- `www.capzax.com` needs an alias and AutoSSL in cPanel if it should work.

## Open items
See section 2 of `ZCaption/docs/ROADMAP.md` (real screenshots, pricing section, store badges, SMTP test, Search Console, legal review).
