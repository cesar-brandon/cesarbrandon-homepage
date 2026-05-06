"use client";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion, type Transition } from "motion/react";

export const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

export type ProgressiveBlurProps = {
  direction?: keyof typeof GRADIENT_ANGLES;
  blurLayers?: number;
  className?: string;
  blurIntensity?: number;
};

export function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 8,
  className,
  blurIntensity = 0.25,
}: ProgressiveBlurProps) {
  const reduceMotion = useReducedMotion();
  const transition: Transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] };

  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <motion.div
      className={cn("relative", className)}
      initial={false}
      variants={{
        rest: {},
        hover: {},
      }}
    >
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction];
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map(
          (pos, posIndex) =>
            `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`,
        );

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(
          ", ",
        )})`;

        const blurPx = index * blurIntensity;

        return (
          <motion.div
            key={index}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
            }}
            initial={false}
            transition={transition}
            variants={{
              rest: {
                backdropFilter: "blur(0px)",
                WebkitBackdropFilter: "blur(0px)",
              },
              hover: {
                backdropFilter: `blur(${blurPx}px)`,
                WebkitBackdropFilter: `blur(${blurPx}px)`,
              },
            }}
          />
        );
      })}
    </motion.div>
  );
}
