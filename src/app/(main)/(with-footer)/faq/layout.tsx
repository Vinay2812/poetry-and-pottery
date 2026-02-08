import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FAQ | Poetry & Pottery",
  description:
    "Find answers to frequently asked questions about Poetry & Pottery products, shipping, returns, custom orders, and workshops.",
  alternates: {
    canonical: absoluteUrl("/faq"),
  },
  openGraph: {
    title: "FAQ | Poetry & Pottery",
    description:
      "Find answers to common questions about our handcrafted pottery, shipping, returns, and workshops.",
    type: "website",
    url: absoluteUrl("/faq"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Poetry & Pottery FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Poetry & Pottery",
    description:
      "Find answers to common questions about Poetry & Pottery products and services.",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
    ],
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
