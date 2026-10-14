import { en, type Dict } from '@/content/en';
import { fa } from '@/content/fa';
import type { Locale } from './i18n';

const dicts: Record<Locale, Dict> = { en, fa };
export const getDict = (locale: Locale): Dict => dicts[locale];
