"use client";
import Sticker from "@/components/ui/sticker";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

const stickerVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.1, rotate: 360 },
};

const backgroundVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const pulseAnimation = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.5, 0.3],
  },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const fadeAnimation = {
  animate: {
    opacity: [0.3, 0.7, 0.3],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function StickerContainer() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={controls}
      className="relative w-full bg-white dark:bg-border/50 rounded-3xl p-6 overflow-hidden"
    >
      {/* Sticker principal con animación */}
      <motion.div
        className="w-28 h-28 rounded-full border-2 border-muted flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 z-10 bg-muted border rounded-full"
        >
          <Sticker type="asterisk" className="w-full h-full" />
        </motion.div>
      </motion.div>

      {/* Elementos de fondo animados */}
      <motion.div
        variants={backgroundVariants}
        className="absolute right-0 bottom-0 w-20 h-20 rounded-3xl bg-muted"
        whileHover={{ scale: 1.1, rotate: 45 }}
        transition={{ delay: 0.2 }}
      />

      <motion.div
        variants={backgroundVariants}
        className="absolute right-0 bottom-20 w-10 h-10 rounded-3xl bg-muted"
        whileHover={{ scale: 1.2, rotate: -45 }}
        transition={{ delay: 0.3 }}
      />

      <motion.div
        variants={backgroundVariants}
        className="absolute right-24 bottom-0 w-20 h-10 rounded-xl bg-muted"
        whileHover={{ scale: 1.1, rotate: 90 }}
        transition={{ delay: 0.4 }}
      />

      <motion.div
        variants={backgroundVariants}
        className="absolute left-10 bottom-0 w-20 h-10 rounded-full bg-muted"
        whileHover={{ scale: 1.1, rotate: 180 }}
        transition={{ delay: 0.5 }}
      />

      {/* Elementos adicionales */}
      <motion.div
        variants={backgroundVariants}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-muted/30"
        animate={pulseAnimation.animate}
        transition={{ ...pulseAnimation.transition, delay: 0.6 }}
      />

      <motion.div
        variants={backgroundVariants}
        className="absolute right-10 top-10 w-16 h-16 rounded-2xl bg-muted/50"
        whileHover={{ scale: 1.2, rotate: 45 }}
        transition={{ delay: 0.7 }}
      />

      {/* Líneas decorativas */}
      <motion.div
        variants={backgroundVariants}
        className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-muted to-transparent"
        animate={fadeAnimation.animate}
        transition={{ ...fadeAnimation.transition, delay: 0.8 }}
      />

      <motion.div
        variants={backgroundVariants}
        className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-muted to-transparent"
        animate={fadeAnimation.animate}
        transition={{ ...fadeAnimation.transition, delay: 0.9 }}
      />

      {/* Puntos decorativos */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          variants={backgroundVariants}
          className="absolute w-2 h-2 rounded-full bg-muted"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={pulseAnimation.animate}
          transition={{ ...pulseAnimation.transition, delay: 1 + i * 0.1 }}
        />
      ))}
    </motion.div>
  );
}
