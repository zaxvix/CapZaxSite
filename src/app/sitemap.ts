import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { SITE_URL, UPDATED } from '@/lib/site';

const paths = ['', '/help', '/about', '/contact', '/terms', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
	return locales.flatMap((l) =>
		paths.map((p) => ({
			url: `${SITE_URL}/${l}${p}`,
			lastModified: UPDATED,
			alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${SITE_URL}/${x}${p}`])) },
		})),
	);
}
