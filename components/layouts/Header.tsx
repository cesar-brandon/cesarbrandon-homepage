import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between space-x-2 font-bold px-10 py-5">
      <Link href="/works">Works</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/">
        <div className="w-20 h-20 bg-gray-900 rounded-full"></div>
      </Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </header>
  );
};

export default Header;
