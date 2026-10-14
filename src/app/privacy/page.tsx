import type { Metadata } from 'next';
import { Legal } from '@/components/Legal';
import { en } from '@/content/en';

export const metadata: Metadata = { title: en.legal.privacy.title, alternates: { canonical: '/privacy' } };

export default function Privacy() {
	const t = en.legal;
	return <Legal doc={t.privacy} t={t} />;
}
