import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { en } from '@/content/en';
import { COMPANY, CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = { title: en.contact.title, alternates: { canonical: '/contact' } };

export default function Contact() {
	const t = en.contact;
	return (
		<>
			<div className="page-head">
				<div className="wrap">
					<h1>{t.title}</h1>
					<p>{t.sub}</p>
				</div>
			</div>
			<section className="wrap" style={{ paddingBottom: 40 }}>
				<div className="contact-grid">
					<ContactForm t={t.form} earlySubject={t.earlyAccessSubject} />
					<aside className="side">
						<h3>{t.sideTitle}</h3>
						<dl style={{ margin: 0, display: 'grid', gap: 16 }}>
							<div>
								<dt>{t.sideEmail}</dt>
								<dd><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd>
							</div>
							<div>
								<dt>{t.sideWhere}</dt>
								<dd>Zaxvix · {COMPANY.city}</dd>
							</div>
						</dl>
						<p className="muted" style={{ fontSize: 15 }}>{t.sideReply}</p>
					</aside>
				</div>
			</section>
		</>
	);
}
