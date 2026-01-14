import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather, Gochi_Hand } from "next/font/google";
import "./globals.css";
import { QuotaBanner } from "@/components/quota/QuotaBanner";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

const gochiHand = Gochi_Hand({
  variable: "--font-gochi-hand",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StageFlow AI",
  description: "AI-powered career coaching and interview preparation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} ${gochiHand.variable} antialiased bg-background text-foreground`}
      >
        <QuotaBanner />
        {/* We wrap Navbar in a way that it doesn't block rendering if it needs async data, though layout is async safe */}
        {/* Assuming Navbar is displayed on all pages via layout for now. */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
