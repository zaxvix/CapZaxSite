'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import type { Dict } from '@/content/en';

export function Nav({ locale, t }: { locale: string; t: Dict['nav'] }) {
	const pathname = usePathname() || `/${locale}`;
	const [open, setOpen] = useState(false);
	const base = `/${locale}`;
	const other = locale === 'fa' ? 'en' : 'fa';
	const rest = pathname.replace(/^\/(en|fa)/, '');
	const items = [
		{ href: `${base}#features`, label: t.features },
		{ href: `${base}#how`, label: t.how },
		{ href: `${base}/help`, label: t.help },
		{ href: `${base}/about`, label: t.about },
		{ href: `${base}/contact`, label: t.contact },
	];
	const cta = `${base}/contact?s=early`;
	const current = (href: string) => (!href.includes('#') && pathname === href ? 'page' : undefined);

	return (
		<>
			<nav className="nav" aria-label="Main">
				{items.map((i) => (
					<Link key={i.href} className="link" href={i.href} aria-current={current(i.href)}>{i.label}</Link>
				))}
				<Link className="lang" href={`/${other}${rest}`} hrefLang={other} lang={other}>{t.language}</Link>
				<Link className="btn btn-lime btn-sm" href={cta}>{t.cta}</Link>
			</nav>
			<div className="menu">
				<button
					type="button"
					aria-label={t.menu}
					aria-expanded={open}
					onClick={() => setOpen(!open)}
					style={{ width: 46, height: 46, borderRadius: '50%', background: 'var(--navy3)', border: 0, color: 'inherit', display: 'grid', placeItems: 'center', cursor: 'pointer' }}
				>
					{open ? <X size={22} /> : <Menu size={22} />}
				</button>
				{open && (
					<div className="menu-panel" onClick={() => setOpen(false)}>
						{items.map((i) => (
							<Link key={i.href} href={i.href}>{i.label}</Link>
						))}
						<Link href={`/${other}${rest}`} hrefLang={other} lang={other}>{t.language}</Link>
						<Link className="btn btn-lime btn-sm" href={cta} style={{ marginTop: 6 }}>{t.cta}</Link>
					</div>
				)}
			</div>
		</>
	);
}
