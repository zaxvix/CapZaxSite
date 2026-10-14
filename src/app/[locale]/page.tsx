import Link from 'next/link';
import { Cloud, Check, Smartphone } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { PhoneMock } from '@/components/PhoneMock';
import { getDict } from '@/lib/dict';
import { isLocale } from '@/lib/i18n';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	const t = getDict(locale).home;
	const b = `/${locale}`;

	return (
		<>
			<section className="hero">
				<div className="wrap">
					<div className="hero-grid">
						<div>
							<span className="pill"><span className="dot" />{t.eyebrow}</span>
							<h1>
								{t.h1a} <span className="mark">{t.h1b}</span> {t.h1c}
							</h1>
							<p className="sub">{t.sub}</p>
							<div className="hero-cta">
								<Link className="btn btn-lime" href={`${b}/contact?s=early`}>{t.ctaPrimary}</Link>
								<a className="btn btn-ghost" href="#how">{t.ctaSecondary}</a>
							</div>
						</div>
						<PhoneMock lines={t.demoLines} />
					</div>
					<div className="trust">
						{t.trust.map((x) => (
							<span key={x}><Check size={18} strokeWidth={3} />{x}</span>
						))}
					</div>
				</div>
			</section>

			<section className="block alt" id="features">
				<div className="wrap">
					<div className="head">
						<h2>{t.featuresTitle}</h2>
						<p>{t.featuresSub}</p>
					</div>
					<div className="grid3">
						{t.features.map((f) => (
							<div className="card" key={f.title}>
								<Icon name={f.icon} />
								<h3>{f.title}</h3>
								<p>{f.text}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="block" id="how">
				<div className="wrap">
					<div className="head">
						<h2>{t.howTitle}</h2>
					</div>
					<div className="steps">
						{t.steps.map((s) => (
							<div className="step" key={s.title}>
								<h3>{s.title}</h3>
								<p>{s.text}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="block alt">
				<div className="wrap">
					<div className="head">
						<h2>{t.langTitle}</h2>
						<p>{t.langSub}</p>
					</div>
					<div className="two">
						{[{ ...t.device, I: Smartphone }, { ...t.cloud, I: Cloud }].map(({ I, ...w }) => (
							<div className="way" key={w.title}>
								<span className="icon" aria-hidden style={{ marginBottom: 18 }}><I size={24} strokeWidth={2.2} /></span>
								<h3>{w.title}</h3>
								<p>{w.text}</p>
								<div className="tags">{w.tags.map((x) => <span className="tag" key={x}>{x}</span>)}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="block">
				<div className="wrap">
					<div className="privacy">
						<div>
							<h2>{t.privacyTitle}</h2>
							<p style={{ marginTop: 18 }}>
								<Link className="btn btn-ghost btn-sm" href={`${b}/privacy`}>{t.privacyLink}</Link>
							</p>
						</div>
						<ul className="ticks">
							{t.privacyPoints.map((x) => (
								<li key={x}><Check size={20} strokeWidth={3} />{x}</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section className="block alt">
				<div className="wrap">
					<div className="head center">
						<h2>{t.plansTitle}</h2>
						<p>{t.plansSub}</p>
					</div>
					<div className="grid3">
						{t.plans.map((p) => (
							<div className={`plan${p.featured ? ' featured' : ''}`} key={p.name}>
								<h3>{p.name}</h3>
								<p>{p.text}</p>
								<ul>
									{p.points.map((x) => (
										<li key={x}><Check size={18} strokeWidth={3} />{x}</li>
									))}
								</ul>
							</div>
						))}
					</div>
					<p className="note">{t.plansNote}</p>
				</div>
			</section>

			<section className="block">
				<div className="wrap">
					<div className="cta">
						<h2>{t.ctaTitle}</h2>
						<p>{t.ctaText}</p>
						<div className="row">
							<Link className="btn btn-navy" href={`${b}/contact?s=early`}>{t.ctaButton}</Link>
							<Link className="btn btn-line" href={`${b}/help`}>{t.ctaFaq}</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
