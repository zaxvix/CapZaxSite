/** A little CSS-only phone that shows a caption highlighting word by word. */
export function PhoneMock({ lines }: { lines: string[] }) {
	const [a, b, c] = lines;
	return (
		<div className="phone-wrap" aria-hidden>
			<div style={{ position: 'relative' }}>
				<div className="phone">
					<div className="screen">
						<div className="sun" />
						<div className="hill b" />
						<div className="hill" />
						<div className="rec" />
						<div className="caps">
							<span>{a}</span>
							<span style={{ display: 'flex', gap: 6 }}>
								<span className="w">{b}</span>
								<span className="w">{c}</span>
							</span>
						</div>
						<div className="bar" />
					</div>
				</div>
				<span className="chip-float a">Aa</span>
				<span className="chip-float b">#1</span>
			</div>
		</div>
	);
}
