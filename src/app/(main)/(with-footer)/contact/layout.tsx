import type { Metadata } from "next";

import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us | Poetry & Pottery",
  description:
    "Get in touch with Poetry & Pottery. Have questions about our handcrafted ceramics, custom orders, or workshops? We'd love to hear from you.",
  alternates: {
    canonical: absoluteUrl("/contact"),
  },
  openGraph: {
    title: "Contact Us | Poetry & Pottery",
    description:
      "Get in touch with Poetry & Pottery. Questions about our ceramics, custom orders, or workshops? We're here to help.",
    type: "website",
    url: absoluteUrl("/contact"),
    images: [
      {
        url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Contact Poetry & Pottery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Poetry & Pottery",
    description:
      "Get in touch with Poetry & Pottery. We'd love to hear from you.",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
