import Providers from "@/providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";

import { RouteAnimationProvider } from "@/components/providers/route-animation-provider";

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

export const metadata: Metadata = {
  title: "Poetry & Pottery",
  description:
    "Handcrafted pottery with a touch of poetry from Sangli, Maharashtra. Each piece tells a story - functional, decorative, and custom ceramics crafted with passion. Shop unique pottery and join our workshops.",
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
