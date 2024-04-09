"use client";
import { Code2, Component, InfoIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useCarouselStore } from "@/store/carousel";
import Link from "next/link";

export function CarouselDialogActions() {
  const { theme, setTheme } = useTheme();
  const handleTheme = () => {
    setTheme(theme === "dark" || theme === "system" ? "light" : "dark");
  };
  const handleMode = useCarouselStore((state) => state.setMode);
  const codeMode = useCarouselStore((state) => state.codeMode);

  return (
    <div className="flex justify-between items-center gap-4 absolute -top-2 left-0">
      <Button variant="outline" className="text-xs rounded-full font-mono">
        1/1 OCC
      </Button>
      <div className="group relative w-11">
        <Button
          variant="outline"
          className="relative w-11 text-xs rounded-full font-mono p-[0.8rem]"
        >
          <InfoIcon />
        </Button>
        <OCCInfo />
      </div>
      <Button
        variant="outline"
        className="w-11 text-xs rounded-full p-[0.9rem]"
        onClick={() => handleTheme()}
      >
        {theme === "dark" || theme === "system" ? <Sun /> : <Moon />}
      </Button>
      <Button
        variant="outline"
        className="w-11 text-xs rounded-full p-[0.85rem]"
        onClick={() => handleMode(!codeMode)}
      >
        {codeMode ? <Component /> : <Code2 />}
      </Button>
    </div>
  );
}

const OCCInfo = () => (
  <div
    className="absolute w-[25rem] -bottom-18 left-4 p-2 border border-foreground dark:border-secondary rounded-xl bg-background
          invisible opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50"
  >
    <p className="font-mono text-xs text-accent-foreground dark:text-accent antialiased">
      When using components with{" "}
      <Link
        className="font-bold"
        href="https://tailwindcss.com/"
        target="_blank"
      >
        Tailwind CSS
      </Link>
      , make sure to have color variables configured for both dark and light
      modes. We recommend using{" "}
      <Link className="font-bold" href="https://ui.shadcn.com/" target="_blank">
        ShadcnUI
      </Link>
      , which is integrated by default, for easy theme management.
    </p>
  </div>
);
