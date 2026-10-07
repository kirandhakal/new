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
    ];
  },
  // Old CV URLs keep working and preview the current CV
  async rewrites() {
    return [
      {
        source: "/Kiran%20Dhakal%20-%20Web%20Developer.pdf",
        destination: "/Kiran-Dhakal-CV.pdf",
      },
      {
        source: "/Kiran Dhakal - Web Developer.pdf",
        destination: "/Kiran-Dhakal-CV.pdf",
      },
      {
        source: "/Kiran%20Dhakal%20.pdf",
        destination: "/Kiran-Dhakal-CV.pdf",
      },
    ];
  },
};

export default nextConfig;
