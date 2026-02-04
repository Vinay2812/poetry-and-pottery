import dotenv from "dotenv";
import type { NextConfig } from "next";

const env = process.env.NODE_ENV || "local";
const envFile = `.env.${env}`;
dotenv.config({ path: envFile });

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    LOCAL_ADMIN_BYPASS_SECRET:
      process.env.NODE_ENV === "production"
        ? ""
        : process.env.LOCAL_ADMIN_BYPASS_SECRET || "",
  },
  cacheComponents: true,
  cacheLife: {
    products: {
      stale: 60,
      revalidate: 300,
      expire: 1800,
    },
    events: {
      stale: 60,
      revalidate: 300,
      expire: 1800,
    },
    content: {
      stale: 300,
      revalidate: 3600,
      expire: 86400,
    },
    customization: {
      stale: 300,
      revalidate: 3600,
      expire: 86400,
    },
  },
  reactCompiler: true,
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
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    viewTransition: true,
    cssChunking: true,
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
