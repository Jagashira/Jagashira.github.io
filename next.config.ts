import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "tus-piano.vercel.app" }],
  },
};

export default nextConfig;
