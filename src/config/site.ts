import type { FooterItem, MainNavItem } from "@/types/site";

export type SiteConfig = typeof siteConfig;

const links = {
  twitter: "https://x.com/burando_03",
  github: "https://github.com/cesar-brandon/cesarbrandon-homepage",
  githubAccount: "https://github.com/cesar-brandon",
};

export const siteConfig = {
  name: "Cesar Brandon",
  description: "Web Portafolio of Cesar Brandon",
  url: "https://cesarbrandon.vercel.app/",
  ogImage: "https://cesarbrandon.vercel.app/opengraph-image.png",
  mainNav: [
    {
      title: "Home",
      items: [
        {
          title: "Projects",
          href: "/projects",
          description: "Browse our collection of projects.",
          items: [],
        },
        {
          title: "Posts",
          href: "/posts",
          description: "Read our latest blog posts.",
          items: [],
        },
        {
          title: "About",
          href: "/about",
          description: "Learn more about us.",
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
  links,
  footerNav: [
    {
      title: "Social",
      items: [
        {
          title: "Twitter",
          href: links.twitter,
          external: true,
        },
        {
          title: "GitHub",
          href: links.githubAccount,
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};
