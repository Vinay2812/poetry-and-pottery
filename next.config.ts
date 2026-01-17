import dotenv from "dotenv";
import type { NextConfig } from "next";

const env = process.env.NODE_ENV || "local";
const envFile = `.env.${env}`;
dotenv.config({ path: envFile });

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
      {
        protocol: "https",
        hostname: "cdn.poetryandpottery.prodapp.club",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
