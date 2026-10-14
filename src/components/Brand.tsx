import Link from 'next/link';

/** The C + Z mark, same drawing as the app icon. */
export function Mark({ size = 40 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 1024 1024" role="img" aria-label="Capzax" style={{ borderRadius: size * 0.28 }}>
			<rect width="1024" height="1024" fill="#111d2b" />
			<g transform="translate(30 0)">
				<path d="M720 330A290 290 0 1 0 720 694" fill="none" stroke="#fff" strokeWidth="130" strokeLinecap="round" />
				<path d="M390 395H634L390 629H634" fill="none" stroke="#c7e273" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round" />
			</g>
		</svg>
	);
}

export function Brand({ locale }: { locale: string }) {
	return (
		<Link href={`/${locale}`} className="brand" aria-label="Capzax">
			<Mark size={38} />
			<span className="brand-name">capzax</span>
		</Link>
	);
}
