import { Character } from "@/components/common/character";
import Line from "@/components/common/line";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

export const metadata = {
  title: "About",
  description: "About me",
}

const About: React.FC = () => {
  return (
    <div className="flex border-2 border-black border-dashed hover:border-solid hover:border-black rounded-2xl
      dark:border-white dark:border-opacity-20 border-opacity-20 p-6 transition-all duration-300 overflow-hidden">
      <div className="w-full md:w-[55%]">
        <h1 className="text-8xl font-bold">Cesar Brandon</h1>
        <h2 className="mt-4 ml-2 text-4xl font-medium">
          Shaping the web,
          <span className="text-indigo-500">{"<line>"}</span> by <span className="text-indigo-500">{"</line>"}</span>
        </h2>
        <div className="w-full md:w-[15rem] lg:w-[25rem] xl:w-[30rem] pl-2 mt-10">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Info</AccordionTrigger>
              <AccordionContent>
                <p className="text-base">
                  <strong>Digital Craftsman ( Artist / Developer / Designer )</strong><br />
                  Brandon is an independent full-stack developer from Perú and is passionate about creating digital services and the things you want. You have a knack for everything related to product launches, from planning and design to solving real-life problems with code. When he is not online, he loves to spend time drawing.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Bio</AccordionTrigger>
              <AccordionContent>
                <ul className="text-base flex flex-col gap-4">
                  <li className="border-l-2 border-black pl-2 flex justify-between">
                    <strong>Global Leadership Group</strong>
                    <p className="text-sm">March - September 2023</p>
                  </li>
                  <li className="border-l-2 border-black pl-2 flex justify-between">
                    <strong>L y F Projects</strong>
                    <p className="text-sm">March - July 2023</p>
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
      <div className="hidden md:block relative h-[30rem] w-[45%]">
        <Line className="w-[15rem] -rotate-12 border-dashed top-[6rem] -left-20 dark:border-[#3C3C57]" />
        <Line className="-left-[14rem] top-[12rem] dark:border-indigo-200" />
        <Line className="rotate-12 top-[18rem] border-dashed -left-20 dark:border-[#3C3C57]" />
        <Line className="bottom-20 -left-32 dark:border-indigo-500" />
        <Line className="-rotate-6 bottom-4 right-20 dark:border-[#6F88E0] z-10" />
        <Character className="absolute -right-4" />
      </div>
    </div>
  );
};

export default About;
