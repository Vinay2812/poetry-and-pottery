import { SITE_CONTACT, SITE_MEDIA } from "@/consts/site-content";
import Providers from "@/providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  DM_Serif_Display,
} from "next/font/google";
import { Suspense } from "react";

import { RouteAnimationProvider } from "@/components/providers/route-animation-provider";

import { SITE_METADATA_BASE, SITE_NAME } from "@/lib/seo";

import "./styles/global.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateMetadata(): Metadata {
  return {
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
    icons: {
      icon: SITE_MEDIA.favicon,
      apple: SITE_MEDIA.appleTouchIcon,
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
          url: SITE_MEDIA.defaultSocialImage,
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
      images: [SITE_MEDIA.defaultSocialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="8pRueMyFU6VMEHTAFq1O83ga6iEQksb-u5wRyb-BYwg"
      />
      <body
        className={`${dmSans.variable} ${dmSerifDisplay.variable} ${cormorantGaramond.variable} font-sans antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_METADATA_BASE.toString(),
              logo: SITE_MEDIA.logoSvg,
              sameAs: [SITE_CONTACT.instagramUrl],
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
