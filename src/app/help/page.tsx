import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { en } from '@/content/en';

export const metadata: Metadata = { title: en.help.title, alternates: { canonical: '/help' } };

export default function Help() {
	const t = en.help;
	const ld = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: t.groups.flatMap((g) => g.items).map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
	};
	return (
		<>
			<div className="page-head">
				<div className="wrap">
					<h1>{t.title}</h1>
					<p>{t.sub}</p>
				</div>
			</div>
			<section className="wrap" style={{ paddingBottom: 40 }}>
				<div style={{ maxWidth: 820 }}>
				{t.groups.map((g) => (
					<div className="faq-group" key={g.title}>
						<h2>{g.title}</h2>
						{g.items.map((i) => (
							<details className="q" key={i.q}>
								<summary>{i.q}<ChevronDown size={22} /></summary>
								<div className="a">{i.a}</div>
							</details>
						))}
					</div>
				))}
				<div className="card" style={{ textAlign: 'center', padding: 40 }}>
					<h3 style={{ marginTop: 0 }}>{t.stillTitle}</h3>
					<p style={{ margin: '10px 0 22px' }}>{t.stillText}</p>
					<Link className="btn btn-lime" href={'/contact'}>{t.stillButton}</Link>
				</div>
				</div>
			</section>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, '\\u003c') }} />
		</>
	);
}
