import fs from "fs";
import { PickingUpOrder } from "./items/picking-up-order";
import { PictureEditor } from "./items/picture-editor";
import SmoothScrollCards from "./items/smooth-scroll-cards";

export const occ: OCC[] = [
  {
    _id: "occ-picture-editor",
    mainImage: "/occ/occ-smooth-scroll-cards.png",
    title: "Picture editor",
    slug: {
      _type: "slug",
      current: "picture-editor",
    },
    description: "A picture editor with zoom in/out and rotate functionality.",
    topics: ["shadcn", "tailwindcss", "framer motion"],
    code: {
      code: fs.readFileSync(
        "src/components/occ/items/picture-editor.tsx",
        "utf-8",
      ),
      language: "TSX",
    },
    component: <PictureEditor />,
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
        "src/components/occ/items/smooth-scroll-cards-react.jsx",
        "utf-8",
      ),
      language: "JSX",
    },
    component: <SmoothScrollCards />,
  },
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
      code: fs.readFileSync(
        "src/components/occ/items/picking-up-order.tsx",
        "utf-8",
      ),
      language: "TSX",
    },

    component: <PickingUpOrder />,
  },
];
