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
        hostname: "cdn.poetryandpottery.prodapp.club",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    viewTransition: true,
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-accordion",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-label",
      "@radix-ui/react-separator",
      "@radix-ui/react-slider",
      "@radix-ui/react-switch",
    ],
  },
};

export default nextConfig;
