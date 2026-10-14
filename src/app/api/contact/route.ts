import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const requests = new Map<string, number[]>();

function isRateLimited(ip: string) {
	const now = Date.now();
	const recent = (requests.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
	if (recent.length >= MAX_REQUESTS) {
		requests.set(ip, recent);
		return true;
	}
	recent.push(now);
	requests.set(ip, recent);
	return false;
}

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');
const escapeHtml = (v: string) =>
	v.replace(/[&<>'"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' })[c] ?? c);

export async function POST(request: NextRequest) {
	try {
		const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
		if (isRateLimited(ip)) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

		const body = await request.json();
		if (clean(body.website, 200)) return NextResponse.json({ ok: true }); // honeypot

		const email = oneLine(clean(body.email, 200));
		const subject = oneLine(clean(body.subject, 150));
		const message = clean(body.message, 5000);

		if (!subject || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			return NextResponse.json({ error: 'Please complete all fields.' }, { status: 400 });
		}

		const host = process.env.SMTP_HOST;
		const port = Number(process.env.SMTP_PORT || 465);
		const user = process.env.SMTP_USER;
		const pass = process.env.SMTP_PASSWORD;
		const to = process.env.CONTACT_TO_EMAIL || user;
		if (!host || !user || !pass || !to) {
			console.error('Contact form SMTP environment variables are incomplete.');
			return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
		}

		const transporter = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
		const fromName = process.env.MAIL_FROM_NAME || 'Capzax Website';

		await transporter.sendMail({
			from: `${fromName} <${user}>`,
			to,
			replyTo: email,
			subject: `[Capzax] ${subject}`,
			text: `From: ${email}\n\n${message}`,
			html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#101827">
<h2>New Capzax website message</h2>
<p><strong>From:</strong> ${escapeHtml(email)}</p>
<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
<hr />
<p style="white-space:pre-wrap">${escapeHtml(message)}</p></div>`,
		});
		return NextResponse.json({ ok: true });
	} catch (error) {
		console.error('Contact form send error:', error);
		return NextResponse.json({ error: 'Unable to send the message right now.' }, { status: 500 });
	}
}
