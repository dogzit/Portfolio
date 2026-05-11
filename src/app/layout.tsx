import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/shared/CustomCursor";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { LoadingScreen } from "@/components/shared/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zolbayar — Full-Stack Developer",
  description:
    "17-year-old full-stack developer from Mongolia. Team leader, hackathon winner, FinTech intern — building real products with Next.js, Prisma, and TypeScript.",
  keywords: [
    "Zolbayar", "Zoloo", "dogzit", "Full-Stack Developer", "Mongolia",
    "Next.js", "TypeScript", "Prisma", "Portfolio", "17 year old developer",
  ],
  authors: [{ name: "Zolbayar", url: "https://github.com/dogzit" }],
  openGraph: {
    title: "Zolbayar — Full-Stack Developer",
    description:
      "17-year-old full-stack developer. Started at 13 with a burger game tutorial, now leading teams and shipping production apps.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/profile.jpg", width: 800, height: 800, alt: "Zolbayar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zolbayar — Full-Stack Developer",
    description:
      "17-year-old full-stack developer. Team leader, hackathon winner, FinTech intern.",
    images: ["/images/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="noise min-h-full">
        <LoadingScreen />
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
