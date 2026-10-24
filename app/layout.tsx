import type { Metadata, Viewport } from "next";
import { Oxanium } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { env } from "@/lib/env";
import { SITE } from "@/lib/seo/site";

const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  // lets routes use relative canonical/OG URLs
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: env.NEXT_PUBLIC_APP_TAG_LINE,
  applicationName: SITE.name,
  openGraph: {
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    // needs app/twitter-image.tsx, or X downgrades to `summary`
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // uncap snippets and allow large image previews in SERPs
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  // the landing page is always dark: its 3D lighting is tuned for a black backdrop
  colorScheme: "dark",
  themeColor: "#000000",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn("dark h-full antialiased font-sans", oxanium.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
