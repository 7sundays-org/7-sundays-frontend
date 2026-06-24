import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-jakarta",
});

// Self-hosted via next/font (fingerprinted + bundled in the build, so it works
// on Vercel without depending on /public path resolution or case-sensitivity).
const ppFragment = localFont({
  src: [
    {
      path: "../public/fonts/PPFragment-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/PPFragment-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-pp-fragment",
  display: "swap",
});

export const metadata: Metadata = {
  title: "7 Sundays",
  description: "7 Sundays frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${jakarta.variable} ${ppFragment.variable}`}>
      <body className="overflow-x-hidden antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
