"use client";

import { Link } from "next-view-transitions";
interface Props {
  children: React.ReactNode;
  route: string;
  ariaLabel: string;
  className?: string;
}

const ClientSideRoute = ({ children, route, ariaLabel, className }: Props) => {
  return (
    <Link href={route} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  );
};

export default ClientSideRoute;
