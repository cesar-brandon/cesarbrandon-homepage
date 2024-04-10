import fs from "fs";
import { PickingUpOrder } from "./picking-up-order";
import SmoothScrollCards from "./smooth-scroll-cards";

const pickingUpOrder = fs.readFileSync(
  "src/components/occ/picking-up-order.tsx",
  "utf-8",
);

export const occ: OCC[] = [
  {
    _id: "occ-picking-up-order",
    mainImage: "/occ/occ-picking-up-order.png",
    title: "Picking up order",
    slug: {
      _type: "slug",
      current: "picking-up-order",
    },
    description:
      "It's an intuitive user interface for tracking delivery progress, enabling direct and efficient communication by phone or messaging with the delivery person throughout the process.",
    topics: ["react", "tailwindcss", "framer motion"],
    code: {
      code: pickingUpOrder,
      language: "TSX",
    },

    component: <PickingUpOrder />,
  },
  {
    _id: "occ-smooth-scroll-cards",
    mainImage: "/occ/occ-smooth-scroll-cards.png",
    title: "Smooth scroll cards",
    slug: {
      _type: "slug",
      current: "smooth-scroll-cards",
    },
    description:
      "A smooth scroll cards component that scales the images as you scroll.",
    topics: ["react", "tailwindcss", "framer motion"],
    code: {
      code: fs.readFileSync(
        "src/components/occ/smooth-scroll-cards.tsx",
        "utf-8",
      ),
      language: "TSX",
    },
    component: <SmoothScrollCards />,
  },
];
