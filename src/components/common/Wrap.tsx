"use client"

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/utilities/style";
import { useRouter } from "next/navigation";

const Wrap: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const handleCircleClick = () => {
    setIsExpanded(true);

    setTimeout(() => {
      setIsExpanded(false);
      router.push("/");
    }, 1000);
  };

  return (
    <div onClick={handleCircleClick}>
      <div
        id="animated-circle"
        className={cn(
          "absolute left-1/2 -ml-[36px] top-[10px] w-[72px] h-[72px] rounded-full bg-black dark:bg-black/30 dark:backdrop-blur-sm  z-10 md:z-20 transition-all ease-in-out duration-700",
          isExpanded ? "transform scale-[80] z-50" : ""
        )}
      ></div>
      <div className="group h-[72px] w-[72px] overflow-hidden rounded-full dark:border-2  absolute left-1/2 ml-[-36px] top-[10px] z-10 md:z-40">
        <Image className="cursor-pointer mt-6 group-hover:m-0 group-hover:animate-none transition-all duration-300" src="/icon-dark.png" alt="link-home" fill />
      </div>
    </div>
  );
};

export default Wrap;
