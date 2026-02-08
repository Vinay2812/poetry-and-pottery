import Providers from "@/providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";

import { RouteAnimationProvider } from "@/components/providers/route-animation-provider";

import { DEFAULT_SOCIAL_IMAGE, SITE_METADATA_BASE, SITE_NAME } from "@/lib/seo";

import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: SITE_METADATA_BASE,
  applicationName: SITE_NAME,
  title: SITE_NAME,
  description:
    "Handcrafted pottery with a touch of poetry from Sangli, Maharashtra. Each piece tells a story - functional, decorative, and custom ceramics crafted with passion. Shop unique pottery and join our workshops.",
  keywords: [
    "handcrafted pottery",
    "ceramic studio",
    "pottery workshops",
    "artisan ceramics",
    "custom pottery",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description:
      "Handcrafted pottery with a touch of poetry from Sangli, Maharashtra. Shop unique ceramics and join immersive pottery workshops.",
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    images: [
      {
        url: DEFAULT_SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "Poetry & Pottery handcrafted ceramics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Handcrafted pottery from Sangli, Maharashtra. Shop artisan ceramics and join pottery workshops.",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="https://cdn.poetryandpottery.prodapp.club/logos/poetry-and-pottery-logo.svg"
        className="h-6 w-6 rounded-full"
      />
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_METADATA_BASE.toString(),
              logo: "https://cdn.poetryandpottery.prodapp.club/logos/poetry-and-pottery-logo.svg",
              sameAs: ["https://instagram.com/poetryandpottery_"],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_METADATA_BASE.toString(),
            }),
          }}
        />
        <RouteAnimationProvider>
          <Suspense fallback={null}>
            <Providers>{children}</Providers>
          </Suspense>
        </RouteAnimationProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
