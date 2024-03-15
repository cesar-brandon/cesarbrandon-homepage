import { Cabin, JetBrains_Mono } from "next/font/google";

export const fontSans = Cabin({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
