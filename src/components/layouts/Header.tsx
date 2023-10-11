"use client";

import useToggleContainer from "@/hooks/use-toggle-container";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import HeaderItem from "../common/HeaderItem";
import ToggleTheme from "../common/toggle-theme";

const Header: React.FC = () => {
  const { isOpen, toggle, containerRef, handleBlur } = useToggleContainer()

  const handleMenu = () => {
    toggle()
  };

  return (
    <header
      ref={containerRef}
      className="md:relative h-28
			font-bold px-10 py-10
			transition-all duration-500 ease z-30 md:z-10
			md:flex-row md:items-center md:justify-between"
      onBlur={handleBlur}
      tabIndex={0}
    >
      <button
        onClick={handleMenu}
        className="fixed top-6 right-6 w-12 h-12 flex items-center justify-center
				bg-zinc-900 hover:bg-zinc-800 rounded text-white
				transition-all duration-300 z-50
				md:hidden
				"
      >
        {isOpen ? (
          <Bars2Icon className="w-6 h-6" />
        ) : (
          <XMarkIcon className="w-6 h-6" />
        )}
      </button>

      <div
        className={`fixed w-80 h-80 top-0 ${isOpen ? "right-0" : "-right-80"} px-10 py-10 rounded-bl-xl 
				flex flex-col z-40
				bg-zinc-900 transition-all duration-500 ease 
				md:static md:w-auto md:h-auto md:px-0 md:py-0
				md:flex-row md:items-center md:justify-between 
				md:bg-transparent 
				`}
      >
        <HeaderItem title="Projects" href="projects" />
        <HeaderItem title="Posts" href="posts" />
        <HeaderItem title="" href="/" />
        <HeaderItem title="About" href="about" />

        <ToggleTheme />
      </div>

    </header>
  );
};

export default Header;
