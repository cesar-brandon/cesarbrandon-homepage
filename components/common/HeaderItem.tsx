import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  href: string;
}

const HeaderItem: React.FC<Props> = ({ title, href }) => {
  return (
    <Link
      href={`/${href}`}
      className="font-normal text-zinc-500 focus:font-bold focus:text-zinc-900"
    >
      {title}
    </Link>
  );
};

export default HeaderItem;
