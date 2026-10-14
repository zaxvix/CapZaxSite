'use client';

import { useEffect, useRef, useState } from 'react';
import type { Dict } from '@/content/en';

type State = 'idle' | 'sending' | 'ok' | 'required' | 'many' | 'error';

export function ContactForm({ t, earlySubject }: { t: Dict['contact']['form']; earlySubject: string }) {
	const [state, setState] = useState<State>('idle');
	const [subject, setSubject] = useState('');
	const openedAt = useRef(0);
	useEffect(() => { openedAt.current = Date.now(); }, []);

	useEffect(() => {
		if (new URLSearchParams(window.location.search).get('s') === 'early') setSubject(earlySubject);
	}, [earlySubject]);

	async function submit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData(form);
		setState('sending');
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: data.get('email'),
					subject: data.get('subject'),
					message: data.get('message'),
					website: data.get('website'),
					elapsed: Date.now() - openedAt.current,
				}),
			});
			if (res.ok) {
				setState('ok');
				form.reset();
				setSubject('');
			} else if (res.status === 400) setState('required');
			else if (res.status === 429) setState('many');
			else setState('error');
		} catch {
			setState('error');
		}
	}

	const msg = { ok: t.ok, required: t.errRequired, many: t.errTooMany, error: t.errGeneric } as const;

	return (
		<form className="box" onSubmit={submit} noValidate>
			<label className="f">
				{t.email}
				<input className="input" type="email" name="email" required maxLength={200} placeholder={t.emailPh} autoComplete="email" dir="ltr" />
			</label>
			<label className="f">
				{t.subject}
				<input className="input" name="subject" required maxLength={150} placeholder={t.subjectPh} value={subject} onChange={(e) => setSubject(e.target.value)} />
			</label>
			<label className="f">
				{t.message}
				<textarea className="input" name="message" required maxLength={5000} placeholder={t.messagePh} />
			</label>
			<div className="hp" aria-hidden>
				<label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
			</div>
			<button className="btn btn-lime" type="submit" disabled={state === 'sending'}>
				{state === 'sending' ? t.sending : t.send}
			</button>
			{state !== 'idle' && state !== 'sending' && (
				<div className={`status ${state === 'ok' ? 'ok' : 'err'}`} role="status">{msg[state]}</div>
			)}
			<p className="muted" style={{ fontSize: 14 }}>{t.note}</p>
		</form>
	);
}
