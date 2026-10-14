import { Wand2, Lock, Languages, Palette, Type, Frame, Zap, Heart, type LucideProps } from 'lucide-react';

const map = { wand: Wand2, lock: Lock, languages: Languages, palette: Palette, type: Type, frame: Frame, zap: Zap, heart: Heart } as const;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
	const C = map[name as keyof typeof map] ?? Wand2;
	return (
		<span className="icon" aria-hidden>
			<C size={24} strokeWidth={2.2} {...props} />
		</span>
	);
}
