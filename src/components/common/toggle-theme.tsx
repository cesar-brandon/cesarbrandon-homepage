import useToggleContainer from "@/hooks/use-toggle-container";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import React, { useEffect, useState, useTransition } from "react";

const themesList = [
  {
    title: "Sistema",
    label: "system",
    icon: <ComputerDesktopIcon className="h-5 w-5 shrink-0 block" />,
  },
  {
    title: "Claro",
    label: "light",
    icon: <SunIcon className="h-5 w-5 shrink-0 block" />,
  },
  {
    title: "Oscuro",
    label: "dark",
    icon: <MoonIcon className="h-5 w-5 shrink-0 block" />,
  },
];

const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { isOpen, toggle, containerRef, handleBlur } = useToggleContainer();
  const [_, startTransition] = useTransition();

  const initialThemes = () => {
    const otherThemes = themesList.filter(
      (t) => t.label.toLowerCase() !== theme,
    );
    const currentTheme = themesList.find(
      (t) => t.label.toLowerCase() === theme,
    );

    if (!currentTheme) {
      return otherThemes;
    }

    return [currentTheme, ...otherThemes];
  };

  const [themes, setThemes] = useState<typeof themesList>([]);

  useEffect(() => {
    setThemes(initialThemes());
  }, [theme]);

  const handleThemeClick = (label: string) => {
    startTransition(() => setTheme(label));
    toggle();
    setThemes(initialThemes);
  };

  return (
    <div className="relative h-[38px] w-28">
      <div
        ref={containerRef}
        className={`absolute left-0 top-0 z-10 w-28 ${
          isOpen ? "h-auto" : "h-[38px]"
        } mt-4 flex flex-col overflow-hidden
        rounded-lg border border-zinc-500 bg-zinc-900 font-normal
        text-zinc-500 transition-all duration-150 hover:border-zinc-50
        hover:text-zinc-50
        md:mt-0 md:border-zinc-300 md:bg-white md:hover:border-zinc-900 md:hover:text-zinc-900
        dark:md:border-white dark:md:border-opacity-30 dark:md:bg-zinc-950 dark:md:backdrop-blur
        dark:hover:text-zinc-50 cursor-pointer`}
        onBlur={handleBlur}
        tabIndex={0}
      >
        {themes.map(({ title, icon, label }, index) => (
          <div
            key={index}
            className="flex w-full shrink-0 items-center gap-2 px-2 py-2 leading-none hover:bg-zinc-800 md:hover:bg-muted
              dark:md:hover:bg-zinc-800"
            onClick={() => handleThemeClick(label)}
          >
            {icon}
            <span className="text-sm leading-none">{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleTheme;
