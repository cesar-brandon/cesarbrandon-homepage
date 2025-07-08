import fs from "fs";
import { PickingUpOrder } from "./items/picking-up-order";
import { PictureEditor } from "./items/picture-editor";
import SmoothScrollCards from "./items/smooth-scroll-cards";
import { MessageBubbles } from "./items/message-bubbles";
import { YourSignature } from "./items/your-signature";
import { AudioSpectrum } from "./items/audio-spectrum";
import ResizableCardDemo from "./items/resizable-card";
import { KeyboardKeys } from "./items/keyboard-keys";

export const occ: OCC[] = [
  {
    _id: "occ-resizable-card",
    mainImage: "/occ/occ-resizable-card.png",
    title: "Resizable Card",
    slug: {
      _type: "slug",
      current: "resizable-card",
    },
    description: "A resizable card component with drag and drop functionality.",
    topics: ["shadcn", "tailwindcss", "framer motion"],
    code: {
      code: fs.readFileSync(
        "src/components/occ/items/resizable-card.tsx",
        "utf-8"
      ),
      language: "TSX",
    },
    component: <ResizableCardDemo />,
  },
  {
    _id: "occ-keyboard-keys",
    mainImage: "/occ/occ-keyboard-keys.png",
    title: "Keyboard Keys",
    slug: {
      _type: "slug",
      current: "keyboard-keys",
    },
    description:
      "Un componente visual para mostrar mensajes motivacionales o personalizados usando teclas de teclado.",
    topics: ["react", "tailwindcss"],
    code: {
      code: fs.readFileSync(
        "src/components/occ/items/keyboard-keys.tsx",
        "utf-8"
      ),
      language: "TSX",
    },
    component: <KeyboardKeys />,
  },
  {
    _id: "audio-spectrum",
    mainImage: "/occ/occ-audio-spectrum.png",
    title: "Audio Spectrum",
    slug: {
      _type: "slug",
      current: "audio-spectrum",
    },
    description:
      "A customizable and interactive audio spectrum component that visually represents audio frequencies in real-time.",
    topics: ["react", "tailwindcss", "framer motion"],
    code: {
      code: fs.readFileSync(
        "src/components/occ/items/audio-spectrum.tsx",
        "utf-8"
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
    description:
      "An intuitive and responsive message bubbles component that elegantly displays conversations or notifications in a chat-like format.",
    topics: ["react", "tailwindcss", "framer motion"],
    code: {
      code: fs.readFileSync(
        "src/components/occ/items/message-bubbles.tsx",
        "utf-8"
      ),
      language: "TSX",
    },
    component: <MessageBubbles />,
  },
  {
    _id: "your-signature",
    mainImage: "/occ/occ-your-signature.png",
    title: "Your Signature",
    slug: {
      _type: "slug",
      current: "your-signature",
    },
    description:
      "A versatile and interactive signature component that allows users to create, preview, and submit their handwritten signatures digitally.",
    topics: ["react", "tailwindcss", "framer motion", "sonner"],
    code: {
      code: fs.readFileSync(
        "src/components/occ/items/your-signature.tsx",
        "utf-8"
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
        "utf-8"
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
        "utf-8"
      ),
      language: "JSX",
    },
    component: <SmoothScrollCards />,
  },
  {
    _id: "occ-picture-editor",
    mainImage: "/occ/occ-picture-editor.png",
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
        "utf-8"
      ),
      language: "TSX",
    },
    component: <PictureEditor />,
  },
];
