/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ["db", "ui", "auth"],
};

module.exports = nextConfig;
