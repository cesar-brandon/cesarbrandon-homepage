import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const occ: OCC[] = [
  {
    _id: "1",
    mainImage: "/occ/occ-1.jpg",
    title: "Draft 1",
    slug: {
      _type: "slug",
      current: "draft-1",
    },
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo maiores ab sapiente itaque totam voluptatem tenetur debitis, quae eaque quos laborum ut reprehenderit at quod nulla, perspiciatis odit officiis eos!",
    topics: ["Tailwindcss", "Shadcn", "Framer Motion"],
    code: {
      code: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
export default function OCC() {
      return (
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
              Brandon is an independent Frontend developer from Perú and is
              passionate about creating digital services and the things you
              want. You have a knack for everything related to product launches,
              from planning and design to solving real-life problems with code.
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
      )}`,

      language: "TSX",
    },

    component: (
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
              Brandon is an independent Frontend developer from Perú and is
              passionate about creating digital services and the things you
              want. You have a knack for everything related to product launches,
              from planning and design to solving real-life problems with code.
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
    ),
  },
  {
    _id: "2",
    mainImage: "/occ/occ-1.jpg",
    slug: {
      _type: "slug",
      current: "draft-2",
    },
    title: "Draft 2",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo maiores ab sapiente itaque totam voluptatem tenetur debitis, quae eaque quos laborum ut reprehenderit at quod nulla, perspiciatis odit officiis eos!",
    topics: ["Tailwindcss", "Shadcn", "Framer Motion"],
    code: {
      code: `import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
export default function OCC() {
      return (
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
              Brandon is an independent Frontend developer from Perú and is
              passionate about creating digital services and the things you
              want. You have a knack for everything related to product launches,
              from planning and design to solving real-life problems with code.
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
      )}`,
      language: "tsx",
    },

    component: (
      <div className="w-80 h-[80%] bg-muted flex items-center justify-center rounded-xl border border-secondary/30">
        <Button>hello</Button>
      </div>
    ),
  },
];
