"use client";

import Link from "next/link";

interface Props {
  children: React.ReactNode;
  route: string;
}

const ClientSideRoute = ({ children, route }: Props) => {
  return <Link href={route}>{children}</Link>;
};

export default ClientSideRoute;
