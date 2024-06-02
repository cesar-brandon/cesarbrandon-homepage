import Providers from "@/components/common/providers";
import { TailwindIndicator } from "@/components/common/tailwind-indicator";
import Wrap from "@/components/common/Wrap";
import Header from "@/components/layouts/Header";
import { siteConfig } from "@/config/site";
import { GeistSans as fontSans } from "geist/font/sans";
import { GeistMono as fontMono } from "geist/font/mono";
import { Cormorant_Garamond } from "next/font/google";
import { cn } from "@/lib/utils";
import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { draftMode } from "next/headers";
import LiveVisualEditing from "@/components/live-visual-editing";
import { ViewTransitions } from "next-view-transitions";
import SmoothScrolling from "@/lib/smooth-scroolling";

const cormorantGaramond = Cormorant_Garamond({
  weight: "600",
  style: "italic",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Cesar Brandon",
    "Web Portafolio",
    "Web Developer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Typescript",
    "Javascript",
    "Tailwind",
  ],
  authors: [
    {
      name: "cesar-brandon",
      url: "https://github.com/cesar-brandon",
    },
  ],
  creator: "cesar-brandon",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: `${siteConfig.url}/og.jpg` }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@burando_03",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable,
            cormorantGaramond.variable,
          )}
        >
          <Providers attribute="class" enableSystem>
            <Header />
            <Wrap />
            <main className="px-10 min-h-[51rem]">
              <SmoothScrolling>{children}</SmoothScrolling>
              {draftMode().isEnabled && <LiveVisualEditing />}
            </main>

            <Analytics mode={"production"} />
            <SpeedInsights />
            <TailwindIndicator />
            <Toaster />
          </Providers>
        </body>
      </html>
    </ViewTransitions>
  );
}
