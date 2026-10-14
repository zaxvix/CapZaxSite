import type { Metadata } from 'next';
import { Legal } from '@/components/Legal';
import { en } from '@/content/en';

export const metadata: Metadata = { title: en.legal.terms.title, alternates: { canonical: '/terms' } };

export default function Terms() {
	const t = en.legal;
	return <Legal doc={t.terms} t={t} />;
}
