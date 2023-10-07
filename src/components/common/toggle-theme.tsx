import useToggleContainer from "@/hooks/use-toggle-container";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from 'next-themes';
import React, { useState, useTransition } from "react";

const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { isOpen, toggle, containerRef, handleBlur } = useToggleContainer();
  const [_, startTransition] = useTransition()
  const [themes, setThemes] = useState([
    {
      title: "Claro",
      icon: <SunIcon className="h-6 w-6" />,
    },
    {
      title: "Sistema",
      icon: <ComputerDesktopIcon className="h-6 w-6" />,
    },
    {
      title: "Oscuro",
      icon: <MoonIcon className="h-6 w-6" />,
    }
  ]);

  const handleThemeClick = (index: number, title: string) => {
    const newThemes = [...themes];
    const clickedTheme = newThemes.splice(index, 1)[0];
    newThemes.unshift(clickedTheme);
    setThemes(newThemes);
    startTransition(() => {
      setTheme(title === "Claro" ? "light" : "dark")
    })
    toggle();
  };

  return (
    <div className="w-28 h-10 relative ">
      <div
        ref={containerRef}
        className={`absolute w-28 ${isOpen ? "h-32" : "h-10"} flex flex-col mt-4 overflow-hidden
        bg-transparent md:bg-white font-normal text-zinc-500 hover:text-zinc-50
        border border-zinc-500 hover:border-zinc-50 rounded-lg cursor-pointer
        transition-all duration-150 
        md:mt-0 md:hover:text-zinc-900 md:border-zinc-300 md:hover:border-zinc-900
        dark:md:bg-zinc-900 dark:md:backdrop-blur dark:md:border-white dark:md:border-opacity-30 dark:hover:text-zinc-50`}
        onBlur={handleBlur}
        tabIndex={0}
      >
        {
          themes.map(({ title, icon }, index) => (
            <div
              key={index}
              className="w-full h-full p-2 gap-2 flex items-center md:hover:bg-zinc-100 hover:bg-zinc-800
              dark:md:hover:bg-zinc-700"
              onClick={() => handleThemeClick(index, title)}
            >
              {icon}
              <p>{title}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ToggleTheme;
