import Link from 'next/link';
import type { Dict } from '@/content/en';
import { COMPANY, CONTACT_EMAIL } from '@/lib/site';
import { Brand } from './Brand';

export function Footer({ locale, t, nav }: { locale: string; t: Dict['footer']; nav: Dict['nav'] }) {
	const b = `/${locale}`;
	return (
		<footer className="footer">
			<div className="wrap">
				<div className="foot-grid">
					<div>
						<Brand locale={locale} />
						<p className="muted" style={{ marginTop: 14, maxWidth: 300 }}>{t.tagline}</p>
					</div>
					<div>
						<h4>{t.product}</h4>
						<ul>
							<li><Link href={`${b}#features`}>{nav.features}</Link></li>
							<li><Link href={`${b}#how`}>{nav.how}</Link></li>
							<li><Link href={`${b}/help`}>{nav.help}</Link></li>
						</ul>
					</div>
					<div>
						<h4>{t.company}</h4>
						<ul>
							<li><Link href={`${b}/about`}>{nav.about}</Link></li>
							<li><Link href={`${b}/contact`}>{nav.contact}</Link></li>
							<li><a href={COMPANY.url} rel="noopener">zaxvix.com</a></li>
						</ul>
					</div>
					<div>
						<h4>{t.legal}</h4>
						<ul>
							<li><Link href={`${b}/terms`}>{t.terms}</Link></li>
							<li><Link href={`${b}/privacy`}>{t.privacy}</Link></li>
							<li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
						</ul>
					</div>
				</div>
				<div className="foot-bottom">
					<span>© {new Date().getFullYear()} Capzax. {t.rights}</span>
					<span>{t.madeBy} <a href={COMPANY.url} rel="noopener">Zaxvix</a></span>
				</div>
			</div>
		</footer>
	);
}
