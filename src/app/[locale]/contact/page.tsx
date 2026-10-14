import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContactForm } from '@/components/ContactForm';
import { getDict } from '@/lib/dict';
import { isLocale } from '@/lib/i18n';
import { COMPANY, CONTACT_EMAIL } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	return isLocale(locale) ? { title: getDict(locale).contact.title, alternates: { canonical: `/${locale}/contact`, languages: { en: '/en/contact', fa: '/fa/contact' } } } : {};
}

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	const t = getDict(locale).contact;
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
					<ContactForm locale={locale} t={t.form} earlySubject={t.earlyAccessSubject} />
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
