import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between space-x-2 font-bold px-10 py-5">
      <Link href="/works">Works</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/"></Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <div
        className="absolute top-2 left-1/2 w-20 h-20 flex justify-center
				  bg-gray-900 rounded-full
				  active:w-screen active:h-screen"
      ></div>
    </header>
  );
};

export default Header;
