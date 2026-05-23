/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    // preserve public assets; configure domains later if external images are used
    domains: [],
  },
};

module.exports = nextConfig;
