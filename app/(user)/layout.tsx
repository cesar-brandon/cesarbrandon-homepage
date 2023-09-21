import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
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
      <body className="max-w-7xl mx-auto">
        <Header />
        <main className="px-10 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
