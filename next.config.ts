import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    useTypeScriptCli: false,
  },
  // Legacy URLs still indexed by Google
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/Kiran Dhakal - Web Developer.pdf",
        destination: "/Kiran%20Dhakal%20.pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
