import Link from 'next/link';

export default function NotFound() {
	return (
		<div className="wrap center-box">
			<h1>404</h1>
			<p className="muted" style={{ marginBottom: 28 }}>Page not found · صفحه پیدا نشد</p>
			<Link className="btn btn-lime" href="/">Capzax</Link>
		</div>
	);
}
