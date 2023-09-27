"use client"

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Character from "@/public/character.png";
import { cn } from "@/utilities/style";

const Wrap: React.FC = () => {
  const router = useRouter();

  const detectLinkClicked = () => {
    // Agregar la clase de animación
    const element = document.getElementById("animated-circle");
    if (element) {
      element.classList.add("animate-click");
      setTimeout(() => {
        // Quitar la clase de animación después de completar la animación
        element.classList.remove("animate-click");
      }, 300); // El tiempo debe coincidir con la duración de tu animación CSS
    }
  };

  return (
    <>
      <div
        id="animated-circle"
        className={cn("absolute left-1/2 -ml-[36px] top-[10px] w-[] h-[72px] rounded-full bg-black border-2 border-white z-0", "")}
        onClick={() => detectLinkClicked()}
      ></div>
      <div
        className="h-[72px] w-[72px] overflow-hidden rounded-full border absolute left-1/2 ml-[-36px] top-[10px] z-[2]"
      >
        <span>
          <Image src={Character} alt="link-home"></Image>
        </span>
      </div>
    </>
  );
};

export default Wrap;
