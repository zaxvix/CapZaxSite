import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.[^/]+$/;

/** Sends "/" and any path without a language to /en or /fa (Persian browsers get /fa). */
export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	if (pathname.startsWith('/_next') || pathname.startsWith('/api') || PUBLIC_FILE.test(pathname)) return NextResponse.next();
	if (/^\/(en|fa)(\/|$)/.test(pathname)) return NextResponse.next();

	const preferred = /^\s*fa\b/i.test(request.headers.get('accept-language') ?? '') ? 'fa' : 'en';
	const url = request.nextUrl.clone();
	url.pathname = `/${preferred}${pathname === '/' ? '' : pathname}`;
	return NextResponse.redirect(url);
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] };
