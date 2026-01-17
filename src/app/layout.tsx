import Providers from "@/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

console.log(process.env.NEXT_PUBLIC_API_ENDPOINT);

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
