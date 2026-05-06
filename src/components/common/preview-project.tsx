"use client";

import urlFor from "@/lib/urlFor";
import React from "react";
import BlurImage from "./blur-image";
import ClientSideRoute from "./ClientSideRoute";
import {
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";
import { ProgressiveBlur } from "../ui/progressive-blur";
import { Icons } from "./icons";
import { LinkIcon } from "lucide-react";

type Props = {
  post: Project;
};

/** Springs cercanos al feel de iOS / tarjetas Apple (rápidas, poco rebote). */
const SPRING_CARD: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
  mass: 0.72,
};

const SPRING_IMAGE: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 26,
  mass: 0.85,
};

export default function PreviewProject({ post }: Props) {
  const reduceMotion = useReducedMotion();

  /** Tint del degradado (opacity aquí no afecta al backdrop-blur). El blur anima blur() en cada capa. */
  const blurReveal: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] };

  const tintVariants = {
    rest: { opacity: 0, transition: blurReveal },
    hover: { opacity: 1, transition: blurReveal },
  };

  /** Tween visible en el copy: los springs retrasaban el fade y suavizaban demasiado la entrada. */
  const overlayReveal: Transition = reduceMotion
    ? { duration: 0.12 }
    : { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] };

  const cardVariants = {
    rest: {},
    hover: {
      y: reduceMotion ? 0 : -3,
      scale: reduceMotion ? 1 : 1.01,
      boxShadow: reduceMotion
        ? "0 1px 2px rgba(0, 0, 0, 0.05)"
        : "0 6px 20px -6px rgba(0, 0, 0, 0.14)",
      transition: reduceMotion ? { duration: 0.22 } : SPRING_CARD,
    },
  };

  const imageVariants = {
    rest: {
      scale: 1,
      transition: reduceMotion ? { duration: 0.2 } : SPRING_IMAGE,
    },
    hover: {
      scale: reduceMotion ? 1 : 1.03,
      transition: reduceMotion ? { duration: 0.2 } : SPRING_IMAGE,
    },
  };

  const overlayContainerVariants = {
    rest: {
      transition: { staggerChildren: 0.02, staggerDirection: -1 },
    },
    hover: {
      transition: { staggerChildren: 0.04, delayChildren: 0 },
    },
  };

  const overlayItemVariants = {
    rest: {
      opacity: 0,
      y: reduceMotion ? 0 : 6,
      transition: { duration: 0.12, ease: [0.25, 0.1, 0.25, 1] },
    },
    hover: {
      opacity: 1,
      y: 0,
      transition: overlayReveal,
    },
  };

  const iconRightVariants = {
    rest: {
      opacity: 0,
      x: reduceMotion ? 0 : 12,
      transition: { duration: 0.12, ease: [0.25, 0.1, 0.25, 1] },
    },
    hover: {
      opacity: 1,
      x: 0,
      transition: overlayReveal,
    },
  };

  const iconLeftVariants = {
    rest: {
      opacity: 0,
      x: reduceMotion ? 0 : -12,
      transition: { duration: 0.12, ease: [0.25, 0.1, 0.25, 1] },
    },
    hover: {
      opacity: 1,
      x: 0,
      transition: overlayReveal,
    },
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative my-4 aspect-square h-[300px] overflow-hidden rounded-3xl bg-muted/20 shadow-sm shadow-black/5"
        initial="rest"
        animate="rest"
        whileHover={reduceMotion ? undefined : "hover"}
        variants={cardVariants}
        style={{ transformOrigin: "center bottom" }}
      >
        <motion.div
          className="absolute inset-0"
          variants={imageVariants}
          style={{ transformOrigin: "center center" }}
        >
          <BlurImage
            className="object-cover object-center dark:border-none"
            src={urlFor(post.mainImage).url()}
            alt={post.author.name}
            fill
          />
        </motion.div>

        <ClientSideRoute
          ariaLabel={`Ver proyecto: ${post.title}`}
          route={`/projects/${post.slug.current}`}
          className="absolute inset-0 z-[12] rounded-[inherit] outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span className="sr-only">{post.title}</span>
        </ClientSideRoute>

        <motion.div
          className="pointer-events-none absolute bottom-0 left-0 z-10 h-[75%] w-full"
          initial={false}
          variants={{
            rest: {},
            hover: {},
          }}
        >
          <ProgressiveBlur className="h-full w-full" blurIntensity={4} />
          <motion.div
            className="absolute inset-0 z-[1] rounded-[inherit] bg-gradient-to-t from-black/30 via-black/20 to-transparent"
            aria-hidden
            initial={false}
            variants={tintVariants}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 z-[11] w-full"
          variants={overlayContainerVariants}
        >
          <div className="px-5 pb-4 pt-14">
            <motion.p
              variants={overlayItemVariants}
              className="text-base font-medium text-white"
            >
              {post.title}
            </motion.p>
            <motion.span
              variants={overlayItemVariants}
              className="line-clamp-1 text-base text-zinc-100"
            >
              {post.description}
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-auto absolute right-4 top-4 z-20 flex gap-2"
          variants={iconRightVariants}
        >
          {post.playStore && (
            <a
              href={post.playStore}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-black/60"
              aria-label="Ver en Play Store"
            >
              <Icons.playStore className="h-5 w-5 text-white" />
            </a>
          )}
          {post.appStore && (
            <a
              href={post.appStore}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-black/60"
              aria-label="Ver en App Store"
            >
              <Icons.appStore className="h-5 w-5 text-white" />
            </a>
          )}
        </motion.div>

        <motion.div
          className="pointer-events-auto absolute left-4 top-4 z-20 flex gap-2"
          variants={iconLeftVariants}
        >
          {post.github && (
            <a
              href={post.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-black/60"
              aria-label="Ver código en GitHub"
            >
              <Icons.github className="h-5 w-5 text-white" />
            </a>
          )}
          {post.demo && (
            <a
              href={post.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-black/60"
              aria-label="Ver demo en vivo"
            >
              <LinkIcon className="h-5 w-5 text-white" />
            </a>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
