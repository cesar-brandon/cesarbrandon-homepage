"use client";

import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import HeaderItem from "../common/HeaderItem";
import ToggleTheme from "../common/ToggleTheme";
import Wrap from "../common/Wrap";

const Header: React.FC = () => {
  const [menuPosition, setMenuPosition] = useState("-right-80");

  const handleMenu = () => {
    menuPosition === "-right-80"
      ? setMenuPosition("right-0")
      : setMenuPosition("-right-80");
  };

  return (
    <header
      className="relative h-28
			font-bold px-10 py-10
			transition-all duration-500 ease z-[2]
			md:flex-row md:items-center md:justify-between
			md:bg-white
			"
    >
      <button
        onClick={handleMenu}
        className="absolute right-10 bottom-9 w-12 h-12 flex items-center justify-center
				bg-zinc-900 hover:bg-zinc-800 rounded text-white
				transition-all duration-300 z-[11]
				md:hidden
				"
      >
        {menuPosition === "0" ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars2Icon className="w-6 h-6" />
        )}
      </button>

      <div
        className={`absolute w-80 h-screen top-0 ${menuPosition} px-10 py-10
				flex flex-col
				bg-zinc-900 transition-all duration-500 ease z-10
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

      <Wrap />
    </header>
  );
};

export default Header;
