import fs from "fs";
import { PickingUpOrder } from "./items/picking-up-order";
import { PictureEditor } from "./items/picture-editor";
import SmoothScrollCards from "./items/smooth-scroll-cards";
import { MessageBubbles } from "./items/message-bubbles";
import { YourSignature } from "./items/your-signature";
import { AudioSpectrum } from "./items/audio-spectrum";

export const occ: OCC[] = [
  {
    _id: "audio-spectrum",
    mainImage: "/occ/occ-audio-spectrum.png",
    title: "Audio Spectrum 🚧",
    slug: {
      _type: "slug",
      current: "audio-spectrum",
    },
    description: "An audio spectrum component.",
    topics: ["react", "tailwindcss", "framer motion"],
    code: {
      code: fs.readFileSync(
        "src/components/occ/items/audio-spectrum.tsx",
        "utf-8",
      ),
      language: "TSX",
    },
    component: <AudioSpectrum />,
  },
  {
    _id: "occ-message-bubbles",
    mainImage: "/occ/occ-message-bubbles.png",
    title: "Message bubbles",
    slug: {
      _type: "slug",
      current: "message-bubbles",
    },
    description: "A message bubbles component.",
    topics: ["react", "tailwindcss", "framer motion"],
    code: {
      code: fs.readFileSync(
        "src/components/occ/items/message-bubbles.tsx",
        "utf-8",
      ),
      language: "TSX",
    },
    component: <MessageBubbles />,
  },
  {
    _id: "your-signature",
    mainImage: "/occ/your-signature.png",
    title: "Your Signature",
    slug: {
      _type: "slug",
      current: "your-signature",
    },
    description: "Your signature component.",
    topics: ["react", "tailwindcss", "framer motion", "sonner"],
    code: {
      code: fs.readFileSync(
        "src/components/occ/items/your-signature.tsx",
        "utf-8",
      ),
      language: "TSX",
    },
    component: <YourSignature />,
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
    _id: "occ-picture-editor",
    mainImage: "/occ/picture-editor.png",
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
];
