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
      className="
		  text-zinc-500 hover:text-zinc-50
			md:font-normal md:text-zinc-500 
			md:focus:font-bold md:focus:text-zinc-900
			md:hover:font-bold md:hover:text-zinc-900 hover:underline hover:decoration-2 hover:underline-offset-4

      dark:text-zinc-500 dark:hover:text-zinc-50 dark:md:text-zinc-500 
			dark:md:focus:text-zinc-50 dark:md:hover:text-zinc-50"
      aria-label="header item"
    >
      <h2>
        {title}
      </h2>
    </Link>
  );
};

export default HeaderItem;
