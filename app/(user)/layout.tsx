import Header from "@/components/layouts/Header";
import "../globals.css";

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
        <main className="px-10">{children}</main>
      </body>
    </html>
  );
}
