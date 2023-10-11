import Providers from "@/components/common/providers";
import { TailwindIndicator } from "@/components/common/tailwind-indicator";
import Wrap from "@/components/common/Wrap";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { siteConfig } from "@/config/site";
import { fontSans, fontMono } from "@/lib/fonts"
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Cesar Brandon',
    'Web Portafolio',
    'Web Developer',
    'Frontend Developer',
    'React',
    'Next.js',
    'Typescript',
    'Javascript',
    'Tailwind',
  ],
  authors: [
    {
      name: "cesar-brandon",
      url: "https://github.com/cesar-brandon",
    },
  ],
  creator: "cesar-brandon",
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@cesarbrandon_0",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn("max-w-7xl mx-auto bg-white dark:bg-zinc-950 font-sans antialiased", fontSans.variable, fontMono.variable)}>
        <Providers attribute="class" enableSystem>
          <Header />
          <Wrap />
          <main className="px-10 min-h-[51rem]">{children}</main>
          <Footer />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
