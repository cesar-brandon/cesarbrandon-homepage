"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Character from "../../public/character.png";

const Wrap: React.FC = () => {
  const [circle, setCircle] = useState("");

  // const detectLinkClicked = (e: any) => {
  //   if (e.target.tagName === "A") {
  //     setCircle("go");
  //
  //     setTimeout(() => {
  //       setCircle("");
  //     }, 2000);
  //   }
  // };
  //
  // useEffect(() => {
  //   window.addEventListener("click", detectLinkClicked);
  //
  //   return () => {
  //     window.removeEventListener("click", detectLinkClicked);
  //   };
  // }, []);

  return (
    <>
      <div className={`Wrap ${circle}`}></div>
      <div
        className="h-[72px] w-[72px] overflow-hidden rounded-full
				border absolute left-1/2 ml-[-36px] top-[10px] z-[2]"
      >
        <Link href={"/"}>
          <span>
            <Image src={Character} alt="link-home"></Image>
          </span>
        </Link>
      </div>
    </>
  );
};

export default Wrap;
