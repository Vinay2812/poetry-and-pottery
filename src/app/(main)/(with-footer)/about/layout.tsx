import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us | Poetry & Pottery",
  description:
    "Discover the story behind Poetry & Pottery. From humble beginnings in a small garage studio to a community of passionate artisans creating handcrafted ceramics.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "About Us | Poetry & Pottery",
    description:
      "Discover the story behind Poetry & Pottery. A community of passionate artisans creating handcrafted ceramics since 2018.",
    type: "website",
    url: absoluteUrl("/about"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Poetry & Pottery Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Poetry & Pottery",
    description:
      "Discover the story behind Poetry & Pottery. Handcrafted ceramics since 2018.",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
    ],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
