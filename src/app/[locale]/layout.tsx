import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import '@fontsource-variable/figtree';
import '@fontsource-variable/unbounded';
import '@fontsource-variable/vazirmatn';
import '../globals.css';
import { Brand } from '@/components/Brand';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { getDict } from '@/lib/dict';
import { dirOf, isLocale, locales } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';

export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export const viewport: Viewport = { themeColor: '#111d2b', width: 'device-width', initialScale: 1 };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	if (!isLocale(locale)) return {};
	const t = getDict(locale).meta;
	return {
		metadataBase: new URL(SITE_URL),
		title: { default: t.title, template: `%s · ${t.siteName}` },
		description: t.description,
		applicationName: t.siteName,
		alternates: { languages: { en: '/en', fa: '/fa' } },
		openGraph: { type: 'website', siteName: t.siteName, title: t.title, description: t.description, locale: locale === 'fa' ? 'fa_IR' : 'en_US', images: ['/og.png'] },
		twitter: { card: 'summary_large_image', title: t.title, description: t.description, images: ['/og.png'] },
	};
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	const t = getDict(locale);
	return (
		<html lang={locale} dir={dirOf(locale)}>
			<body>
				<a className="skip" href="#main">Skip to content</a>
				<header className="header">
					<div className="wrap">
						<Brand locale={locale} />
						<Nav locale={locale} t={t.nav} />
					</div>
				</header>
				<main id="main">{children}</main>
				<Footer locale={locale} t={t.footer} nav={t.nav} />
			</body>
		</html>
	);
}
