"use client";

import useToggleContainer from "@/hooks/use-toggle-container";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import HeaderItem from "../common/HeaderItem";
import ToggleTheme from "../common/toggle-theme";

const Header: React.FC = () => {
  const { isOpen, toggle, containerRef, handleBlur } = useToggleContainer();

  const handleMenu = () => {
    toggle();
  };

  return (
    <header
      ref={containerRef}
      className="md:relative h-20 px-10 py-5 mx-10 mt-4
			transition-all duration-500 ease z-30 md:z-10
			md:flex-row md:items-center md:justify-between bg-card rounded-3xl"
      onBlur={handleBlur}
      tabIndex={0}
    >
      {/* <div className="back-pattern h-1/2 md:h-full" /> */}

      <button
        onClick={handleMenu}
        className="fixed top-6 right-6 w-12 h-16 flex items-center justify-center
				bg-zinc-900 hover:bg-zinc-800 rounded text-white
				transition-all duration-300 z-50
				md:hidden
				"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars2Icon className="w-6 h-6" />
        )}
      </button>

      <div
        className={`fixed w-60 h-56 top-0 ${
          isOpen ? "right-0" : "-right-80"
        } px-10 py-10 rounded-bl-xl 
				flex flex-col z-40
				bg-zinc-900 transition-all duration-500 ease 
				md:static md:w-auto md:h-auto md:px-0 md:py-0
				md:flex-row md:items-center md:justify-between 
				md:bg-transparent 
				`}
      >
        <HeaderItem title="Projects" href="/projects" />
        <HeaderItem title="Components" href="/occ" />
        <div />
        {/* <HeaderItem title="About" href="/about" /> */}
        <HeaderItem title="About" href="/about" />

        <ToggleTheme />
      </div>
    </header>
  );
};

export default Header;
