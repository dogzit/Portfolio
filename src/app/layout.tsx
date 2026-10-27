import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Archivo, Inter_Tight } from "next/font/google";
import "./globals.css";
import { CommandPalette } from "@/components/shared/CommandPalette";

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

/* Display face: a grotesque set very large and very tight. Variable weight,
   so headlines can run heavy without loading a second file. */
const displayGrotesque = Archivo({
  variable: "--font-display-grotesque",
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

/* Archivo has no Cyrillic cut, and several project titles are Mongolian
   (Наадам, Ажилчин Зөгий). Inter Tight sits next to it in the stack so the
   browser picks it up per glyph instead of dropping to a system font. */
const displayCyrillic = Inter_Tight({
  variable: "--font-display-cyrillic",
  weight: ["600", "700", "800"],
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zolbayar.dev"),
  title: "Zolbayar — Full-Stack Developer",
  description:
    "17-year-old full-stack developer from Ulaanbaatar. Team lead, former DEHUB frontend intern, and Open Parliament Hackathon finalist — building real products with Next.js, Prisma, and TypeScript.",
  keywords: [
    "Zolbayar", "Zoloo", "dogzit", "Full-Stack Developer", "Mongolia",
    "Ulaanbaatar", "Next.js", "TypeScript", "Prisma", "Portfolio",
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
    description: "17-year-old full-stack developer. Team lead, ex-DEHUB intern, parliament hackathon finalist.",
    images: ["/images/profile.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4ee" },
    { media: "(prefers-color-scheme: dark)", color: "#15120f" },
  ],
};

/* Applies the saved theme before first paint so there is no flash. */
const themeInit = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light"){document.documentElement.dataset.theme=t}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${displayGrotesque.variable} ${displayCyrillic.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-full">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:shadow-md"
        >
          Skip to content
        </a>
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}
