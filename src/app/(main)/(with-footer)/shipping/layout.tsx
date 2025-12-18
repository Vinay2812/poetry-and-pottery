import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping & Returns | Poetry & Pottery",
  description:
    "Learn about Poetry & Pottery shipping options, delivery times, packaging, and our hassle-free 30-day return policy.",
  openGraph: {
    title: "Shipping & Returns | Poetry & Pottery",
    description:
      "Shipping options, delivery times, and our hassle-free 30-day return policy for handcrafted pottery.",
    type: "website",
    url: "/shipping",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Shipping & Returns Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping & Returns | Poetry & Pottery",
    description:
      "Learn about our shipping options and hassle-free return policy.",
  },
};

export default function ShippingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
