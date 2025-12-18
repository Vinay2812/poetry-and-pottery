import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care Instructions | Poetry & Pottery",
  description:
    "Learn how to care for your handcrafted pottery. Proper care instructions for different glaze types, cleaning tips, and guidelines to keep your ceramics beautiful.",
  openGraph: {
    title: "Care Instructions | Poetry & Pottery",
    description:
      "Learn how to care for your handcrafted pottery. Cleaning tips and guidelines for different glaze types.",
    type: "website",
    url: "/care",
    images: [
      {
        url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Pottery Care Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Care Instructions | Poetry & Pottery",
    description:
      "Learn how to care for your handcrafted pottery and keep it beautiful for years.",
  },
};

export default function CareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
