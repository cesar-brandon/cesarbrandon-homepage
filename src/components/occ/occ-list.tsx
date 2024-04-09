import fs from "fs";
import { PickingUpOrder } from "./picking-up-order";

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
];
