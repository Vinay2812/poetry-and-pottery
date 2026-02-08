import type { Metadata } from "next";
import { Suspense } from "react";

import { PageSkeleton } from "@/components/skeletons";

import { absoluteUrl } from "@/lib/seo";

import { PrivacyContent } from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Poetry & Pottery",
  description:
    "Read how Poetry & Pottery collects, uses, and protects your personal information when you browse, purchase, or contact us.",
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
  openGraph: {
    title: "Privacy Policy | Poetry & Pottery",
    description:
      "Understand how Poetry & Pottery handles your personal data and privacy rights.",
    type: "website",
    url: absoluteUrl("/privacy"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Poetry & Pottery Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Poetry & Pottery",
    description: "Privacy practices and data protection at Poetry & Pottery.",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
    ],
  },
};

export default function PrivacyPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PrivacyContent />
    </Suspense>
  );
}
