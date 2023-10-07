import Providers from "@/components/common/providers";
import { TailwindIndicator } from "@/components/common/tailwind-indicator";
import Wrap from "@/components/common/Wrap";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { fontSans, fontMono } from "@/lib/fonts"
import { cn } from "@/lib/utils";
import "../globals.css";

export const metadata = {
  title: {
    default: 'Cesar Brandon',
    template: `%s - Cesar Brandon`
  },
  description: 'Web Portafolio of Cesar Brandon',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={cn("max-w-7xl mx-auto bg-white dark:bg-zinc-900 font-sans antialiased", fontSans.variable, fontMono.variable)}>
        <Providers attribute="class" defaultTheme="light" enableSystem>
          <Header />
          <Wrap />
          <main className="px-10 min-h-screen">{children}</main>
          <Footer />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
