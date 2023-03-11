import { SunIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

const ToggleTheme: React.FC = () => {
  return (
    <div
      className="w-28 flex items-center justify-between gap-2 mt-4
			font-normal text-zinc-500 hover:text-zinc-50
			border border-zinc-500 hover:border-zinc-50 rounded-lg p-2 cursor-pointer
			transition-all duration-150 
			md:mt-0
			md:hover:text-zinc-900
			md:border-zinc-300 md:hover:border-zinc-900
			"
    >
      <SunIcon className="h-6 w-6" />
      <p>Light</p>
      <ChevronDownIcon className="h-5 w-5" />
    </div>
  );
};

export default ToggleTheme;
