import { Character } from "@/components/common/character";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/common/icons";
import Line from "@/components/common/line";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "About",
  description: "About me",
};

const About: React.FC = () => {
  return (
    <div
      className="relative flex border-2 border-foreground rounded-xl p-6 mb-10
      dark:border-white dark:border-opacity-20 border-opacity-20 transition-all duration-300 overflow-hidden"
    >
      <div className="w-full lg:w-[55%] pb-10">
        <h1 className="text-6xl font-bold">Cesar Brandon</h1>
        <h2 className="mt-4 ml-2 text-3xl font-medium">
          <span className="text-primary">Frontend Developer</span>
          <span className="text-muted font-mono">{"~>"} UI Designer</span>
          {/* <span className="text-primary">{"<line>"}</span> by{" "}
          <span className="text-primary">{"</line>"}</span> */}
        </h2>
        <div className="w-full lg:w-[25rem] xl:w-[30rem] pl-2 mt-10">
          <Accordion
            type="single"
            className="w-full"
            defaultValue="item-1"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>Info</AccordionTrigger>
              <AccordionContent>
                <h1 className="text-base font-semibold">
                  Digital Craftsman ( Developer )
                </h1>
                <br />
                <p className="text-base">
                  Brandon is an independent Frontend developer from Perú and
                  is passionate about creating digital services and the things
                  you want. You have a knack for everything related to product
                  launches, from planning and design to solving real-life
                  problems with code. 
                  {/* When he is not online, he loves to spend
                  time drawing. */}
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Bio</AccordionTrigger>
              <AccordionContent>
                <ul className="text-base flex flex-col gap-4">
                  <li className="border-l-4 border-primary pl-2 flex justify-between">
                    <p>Agencia Consigue Ventas</p>
                    <p className="text-xs">Nov. - March 2024</p>
                  </li>
                  <li className="border-l-2 border-black pl-2 flex justify-between">
                    <p>Global Leadership Group</p>
                    <p className="text-xs">Mar. - September 2023</p>
                  </li>
                  <li className="border-l-2 border-black pl-2 flex justify-between">
                    <p>L y F Projects</p>
                    <p className="text-xs">Mar. - July 2023</p>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Tools</AccordionTrigger>
              <AccordionContent>
                <ul className="text-base flex flex-col gap-4">
                  Nextjs / Tailwindcss / React / Javascript / TypeScript / Figma
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="hidden lg:block relative h-[30rem] w-[45%]">
        <Line className="w-[15rem] -rotate-12 border-dashed top-[6rem] -left-20 dark:border-primary/20" />
        <Line className="-left-[14rem] top-[12rem] xl:top-[11rem] dark:border-indigo-200" />
        <Line className="rotate-12 top-[18rem] border-dashed -left-20 dark:border-primary/20" />
        <Line className="bottom-20 -left-32 dark:border-primary" />
        <Line className="-rotate-6 bottom-4 right-20 dark:border-primary/60 z-10" />
        <Character className="absolute -right-4" />
      </div>

      <div className="absolute right-4 bottom-4 flex items-center justify-center gap-8">
        <Link href="https://github.com/cesar-brandon" target="_blank">
          <GithubIcon className="w-6 h-6" />
        </Link>
        <Link href="https://www.linkedin.com/in/cesar-brandon/" target="_blank">
          <LinkedinIcon className="w-[1.65rem] h-[1.65rem]" />
        </Link>
        <Link href="https://twitter.com/cesarbrandon_0" target="_blank">
          <TwitterIcon className="w-6 h-6 dark:fill-foreground" />
        </Link>
      </div>
    </div>
  );
};

export default About;
