/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    domains: ["api.loiheng.duckdns.org"],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  output: 'standalone',
  experimental: {
    esmExternals: false,
  }
};

module.exports = nextConfig;
