import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { en } from '@/content/en';
import { COMPANY } from '@/lib/site';

export const metadata: Metadata = { title: en.about.title, alternates: { canonical: '/about' } };

export default function About() {
	const t = en.about;
	return (
		<>
			<div className="page-head">
				<div className="wrap">
					<h1>{t.title}</h1>
					<p>{t.sub}</p>
				</div>
			</div>
			<section className="wrap" style={{ paddingBottom: 40 }}>
				<div className="story">
					{t.story.map((p) => <p key={p}>{p}</p>)}
				</div>
				<div className="values">
					<div className="head"><h2>{t.valuesTitle}</h2></div>
					<div className="grid3">
						{t.values.map((v) => (
							<div className="card" key={v.title}>
								<Icon name={v.icon} />
								<h3>{v.title}</h3>
								<p>{v.text}</p>
							</div>
						))}
					</div>
				</div>
				<div className="privacy" style={{ marginTop: 56 }}>
					<div>
						<h2>{t.zaxvixTitle}</h2>
						<p className="muted" style={{ marginTop: 14 }}>{t.zaxvixText}</p>
					</div>
					<div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
						<a className="btn btn-ghost" href={COMPANY.url} rel="noopener">{t.zaxvixLink}</a>
						<Link className="btn btn-lime" href={'/contact'}>{t.contactCta}</Link>
					</div>
				</div>
			</section>
		</>
	);
}
