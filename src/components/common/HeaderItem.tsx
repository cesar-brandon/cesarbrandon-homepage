import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  title: string;
  href: string;
  className?: string;
}

const HeaderItem: React.FC<Props> = ({ title, href, className }) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        `flex group text-zinc-500 hover:text-zinc-50
			md:font-normal md:text-zinc-500 
      md:focus:text-zinc-900 md:hover:text-zinc-900 
      dark:text-zinc-500 dark:hover:text-zinc-50 dark:md:text-zinc-500 
			dark:md:focus:text-zinc-50 dark:md:hover:text-zinc-50`,
        pathname === `${href}` && "md:text-zinc-900 md:dark:text-zinc-50",
        className,
      )}
      aria-label="header item"
    >
      <span
        className={cn(
          "invisible group-hover:visible font-mono",
          pathname === `${href}` && "md:visible",
        )}
      >
        [
      </span>
      <h2>{title}</h2>
      <span
        className={cn(
          "invisible group-hover:visible font-mono",
          pathname === `${href}` && "md:visible",
        )}
      >
        ]
      </span>
    </Link>
  );
};

export default HeaderItem;
