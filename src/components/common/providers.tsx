"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider {...props}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </NextThemesProvider>
  );
};

export default Providers;
