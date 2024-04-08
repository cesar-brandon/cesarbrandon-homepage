"use client";
import { Code2, Component, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useCarouselStore } from "@/store/carousel";

export function CarouselDialogActions() {
  const { theme, setTheme } = useTheme();
  const handleTheme = () => {
    setTheme(theme === "dark" || theme === "system" ? "light" : "dark");
  };
  const handleMode = useCarouselStore((state) => state.setMode);
  const codeMode = useCarouselStore((state) => state.codeMode);

  return (
    <div className="flex justify-between items-center gap-4 absolute -top-2 left-0">
      <Button variant="outline" className=" text-xs rounded-full font-mono">
        1/1 OCC
      </Button>
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
