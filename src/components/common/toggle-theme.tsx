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
    icon: <ComputerDesktopIcon className="h-5 w-5" />,
  },
  {
    title: "Claro",
    label: "light",
    icon: <SunIcon className="h-5 w-5" />,
  },
  {
    title: "Oscuro",
    label: "dark",
    icon: <MoonIcon className="h-5 w-5" />,
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
    <div className="w-28 h-10 relative">
      <div
        ref={containerRef}
        className={`absolute w-28  ${
          isOpen ? "h-32" : "h-10"
        } flex flex-col mt-4 overflow-hidden
        bg-zinc-900 md:bg-background font-normal text-zinc-500 hover:text-zinc-50
        border border-zinc-500 hover:border-zinc-50 rounded-lg cursor-pointer
        transition-all duration-150 
        md:mt-0 md:hover:text-zinc-900 md:border-zinc-300 md:hover:border-zinc-900
        dark:md:bg-zinc-950 dark:md:backdrop-blur dark:md:border-white dark:md:border-opacity-30 dark:hover:text-zinc-50`}
        onBlur={handleBlur}
        tabIndex={0}
      >
        {themes.map(({ title, icon, label }, index) => (
          <div
            key={index}
            className="w-full h-full p-2 gap-2 flex items-center md:hover:bg-muted hover:bg-zinc-800
              dark:md:hover:bg-zinc-800"
            onClick={() => handleThemeClick(label)}
          >
            {icon}
            <p className="text-sm">{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToggleTheme;
