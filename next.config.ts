import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
	output: 'standalone',
	outputFileTracingRoot: path.resolve(process.cwd()),
	reactStrictMode: true,
	poweredByHeader: false,
};

export default nextConfig;
