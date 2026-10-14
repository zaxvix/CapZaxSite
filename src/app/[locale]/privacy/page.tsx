import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Legal } from '@/components/Legal';
import { getDict } from '@/lib/dict';
import { isLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	return isLocale(locale) ? { title: getDict(locale).legal.privacy.title, alternates: { canonical: `/${locale}/privacy`, languages: { en: '/en/privacy', fa: '/fa/privacy' } } } : {};
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	const t = getDict(locale).legal;
	return <Legal doc={t.privacy} t={t} locale={locale} />;
}
