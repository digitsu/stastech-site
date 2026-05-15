import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://stastech.org"),
  title: {
    default: "STAS — Layer-1 tokenization on Bitcoin",
    template: "%s | STAS",
  },
  description:
    "STAS settles tokens in one Bitcoin transaction, makes every sat the unit of account, and bakes compliance into the script. MIT-licensed. 700,000 production transactions.",
  icons: { icon: "/STAS2.ico" },
  openGraph: {
    type: "website",
    siteName: "STAS",
    url: "https://stastech.org",
  },
  twitter: {
    card: "summary_large_image",
    site: "@StasToken",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
