"use client"

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/utilities/style";

const Wrap: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCircleClick = () => {
    setIsExpanded(true);

    setTimeout(() => {
      setIsExpanded(false);
    }, 3000);
  };

  return (
    <div onClick={handleCircleClick}>
      <div
        id="animated-circle"
        className={cn(
          "absolute left-1/2 -ml-[36px] top-[10px] w-[72px] h-[72px] rounded-full bg-black border-2 border-white z-0 transition-all duration-300",
          isExpanded ? "transform scale-[80]" : ""
        )}
      ></div>
      <div className="h-[72px] w-[72px] overflow-hidden rounded-full border absolute left-1/2 ml-[-36px] top-[10px] z-[2]">
        <span>
          <Image src="/icon-dark.png" alt="link-home" fill />
        </span>
      </div>
    </div>
  );
};

export default Wrap;
