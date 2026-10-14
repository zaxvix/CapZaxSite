import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/figtree';
import '@fontsource-variable/unbounded';
import './globals.css';
import { Brand } from '@/components/Brand';
import { Footer } from '@/components/Footer';
import { Nav } from '@/components/Nav';
import { en as t } from '@/content/en';
import { SITE_URL } from '@/lib/site';

export const viewport: Viewport = { themeColor: '#111d2b', width: 'device-width', initialScale: 1 };

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: { default: t.meta.title, template: `%s · ${t.meta.siteName}` },
	description: t.meta.description,
	applicationName: t.meta.siteName,
	icons: { icon: [{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }], apple: '/apple-icon.png' },
	openGraph: { type: 'website', siteName: t.meta.siteName, title: t.meta.title, description: t.meta.description, locale: 'en_US', images: ['/og.png'] },
	twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.description, images: ['/og.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" dir="ltr">
			<body>
				<a className="skip" href="#main">Skip to content</a>
				<header className="header">
					<div className="wrap">
						<Brand />
						<Nav t={t.nav} />
					</div>
				</header>
				<main id="main">{children}</main>
				<Footer t={t.footer} nav={t.nav} />
			</body>
		</html>
	);
}
