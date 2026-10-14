import type { Metadata } from 'next';
import { en } from '@/content/en';
import { CONTACT_EMAIL } from '@/lib/site';

export const metadata: Metadata = { title: en.deleteAccount.title, alternates: { canonical: '/delete-account' } };

export default function DeleteAccount() {
	const t = en.deleteAccount;
	return (
		<>
			<div className="page-head">
				<div className="wrap">
					<h1>{t.title}</h1>
					<p>{t.sub}</p>
				</div>
			</div>
			<article className="wrap prose" style={{ paddingBottom: 40 }}>
				{t.sections.map((s) => (
					<section key={s.h}>
						<h2>{s.h}</h2>
						{s.p.map((p) => <p key={p}>{p}</p>)}
					</section>
				))}
				<p style={{ marginTop: 28 }}>
					<a className="btn btn-lime" style={{ textDecoration: 'none', color: 'var(--navy)' }} href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.mailSubject)}`}>{t.mailButton}</a>
				</p>
			</article>
		</>
	);
}
