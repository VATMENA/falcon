/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true,
	},
	transpilePackages: ["db", "ui", "auth"],
};

module.exports = nextConfig;
