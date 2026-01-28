import Providers from "@/providers";
import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";

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
    "Poetry & Pottery is a platform for buying and selling pottery and poetry.",
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
          <Providers>{children}</Providers>
        </RouteAnimationProvider>
      </body>
    </html>
  );
}
