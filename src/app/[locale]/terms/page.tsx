import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Legal } from '@/components/Legal';
import { getDict } from '@/lib/dict';
import { isLocale } from '@/lib/i18n';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params;
	return isLocale(locale) ? { title: getDict(locale).legal.terms.title, alternates: { canonical: `/${locale}/terms`, languages: { en: '/en/terms', fa: '/fa/terms' } } } : {};
}

export default async function Terms({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	if (!isLocale(locale)) notFound();
	const t = getDict(locale).legal;
	return <Legal doc={t.terms} t={t} locale={locale} />;
}
