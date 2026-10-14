import { Check } from 'lucide-react';
import type { Dict } from '@/content/en';
import { CONTACT_EMAIL, UPDATED } from '@/lib/site';

type Doc = { title: string; intro: string; sections: { h: string; p: string[] }[]; summaryTitle?: string; summary?: string[] };

export function Legal({ doc, t }: { doc: Doc; t: Dict['legal'] }) {
	const date = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(UPDATED));
	return (
		<>
			<div className="page-head">
				<div className="wrap">
					<h1>{doc.title}</h1>
					<p className="meta">{t.updated}: {date}</p>
				</div>
			</div>
			<article className="wrap prose" style={{ paddingBottom: 40 }}>
				<p style={{ fontSize: 18 }}>{doc.intro}</p>
				{doc.summary && (
					<div className="summary">
						<h2>{doc.summaryTitle}</h2>
						<ul className="ticks">
							{doc.summary.map((x) => <li key={x}><Check size={20} strokeWidth={3} />{x}</li>)}
						</ul>
					</div>
				)}
				{doc.sections.map((s) => (
					<section key={s.h}>
						<h2>{s.h}</h2>
						{s.p.map((p) => <p key={p}>{p}</p>)}
					</section>
				))}
				<h2>{t.contactTitle}</h2>
				<p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
				<p className="draft">{t.draftNote}</p>
			</article>
		</>
	);
}
