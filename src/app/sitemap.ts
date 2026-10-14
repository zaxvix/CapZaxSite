import type { MetadataRoute } from 'next';
import { SITE_URL, UPDATED } from '@/lib/site';

const paths = ['', '/help', '/about', '/contact', '/terms', '/privacy', '/delete-account'];

export default function sitemap(): MetadataRoute.Sitemap {
	return paths.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: UPDATED }));
}
