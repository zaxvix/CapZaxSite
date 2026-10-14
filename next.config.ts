import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
	output: 'standalone',
	outputFileTracingRoot: path.resolve(process.cwd()),
	reactStrictMode: true,
	poweredByHeader: false,
	// The site used to have /en and /fa prefixes; keep old links working.
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
				],
			},
		];
	},
	async redirects() {
		return [
			{ source: '/en', destination: '/', permanent: true },
			{ source: '/en/:path*', destination: '/:path*', permanent: true },
			{ source: '/fa', destination: '/', permanent: true },
			{ source: '/fa/:path*', destination: '/:path*', permanent: true },
		];
	},
};

export default nextConfig;
