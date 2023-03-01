import Image from "next/image";
import Link from "next/link";
import React from "react";
import Character from "../../public/character-cartoon.gif";

const Header: React.FC = () => {
  return (
    <header
      className="flex items-center justify-between font-bold px-10 py-8
						  transition-all duration-500 ease"
    >
      <Link href="/works">Works</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/"></Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <div
        className="h-[72px] w-[72px] overflow-hidden rounded-full
			border absolute left-1/2 ml-[-36px] top-[10px] z-[2]"
      >
        <Link href={"/"}>
          <span>
            <Image
              className="invert mt-[.5rem]"
              src={Character}
              alt="link-home"
            ></Image>
          </span>
        </Link>
      </div>
      <div
        className="h-[72px] w-[72px] overflow-hidden rounded-full
			border absolute left-1/2 ml-[-36px] top-[10px] bg-[#000]
			transition-all duration-500 ease
			active:z-[999] active:w-[3000px] active:h-[3000px] active:ml-[-1500px] active:mt-[-1500px] t-1/2"
      ></div>
    </header>
  );
};

export default Header;
