import { SunIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import React from "react";

const ToggleTheme: React.FC = () => {
  return (
    <div
      className="flex items-center gap-2 font-normal
			text-zinc-500 hover:text-zinc-900 border rounded-lg hover:border-zinc-900 p-2 cursor-pointer
			transition-all duration-150 "
    >
      <SunIcon className="h-6 w-6" />
      <p>Light</p>
      <ChevronDownIcon className="h-5 w-5" />
    </div>
  );
};

export default ToggleTheme;
