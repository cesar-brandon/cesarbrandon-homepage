"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const Wrap: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleCircleClick = () => {
    if (pathname !== "/") {
      setIsExpanded(true);

      setTimeout(() => {
        router.push("/");
      }, 500);
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      setIsExpanded(false);
    }
  }, [pathname]);

  return (
    <div onClick={handleCircleClick}>
      <div
        id="animated-circle"
        className={cn(
          "absolute left-1/2 -ml-[36px] top-[28px] w-[72px] h-[72px] rounded-full bg-foreground dark:bg-background z-20 transition-all ease-in-out duration-700",
          isExpanded
            ? "transform scale-[80] z-50 dark:bg-background/30 dark:backdrop-blur"
            : "",
        )}
      ></div>
      <div className="group h-[72px] w-[72px] overflow-hidden rounded-full dark:border-2 dark:border-white dark:border-opacity-30  absolute left-1/2 ml-[-36px] top-[28px] z-20">
        <Image
          className={cn(
            "cursor-pointer mt-6 group-hover:mt-2 group-hover:animate-none transition-all duration-300",
            isLoading && "m-12",
          )}
          src="/icon-dark.png"
          alt="link-home"
          width={1196}
          height={1199}
          onLoad={() => setLoading(false)}
        />
      </div>
    </div>
  );
};

export default Wrap;
