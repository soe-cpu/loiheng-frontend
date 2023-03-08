/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.loiheng.duckdns.org"],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  experimental: {
    esmExternals: false,
    outputStandalone: true,
  }
};

module.exports = nextConfig;
