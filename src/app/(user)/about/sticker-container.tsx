"use client";
import Sticker from "@/components/ui/sticker";
import { motion } from "framer-motion";

export default function StickerContainer() {
  return (
    <div className="relative w-full bg-white dark:bg-border/50 rounded-3xl p-6">
      <div className="w-28 h-28 rounded-full border-2 border-muted flex items-center justify-center">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 z-10 bg-muted border rounded-full"
        >
          <Sticker type="asterisk" className="w-full h-full" />
        </motion.div>
      </div>
      <div className="absolute right-0 bottom-0 w-20 h-20 rounded-3xl bg-muted" />
      <div className="absolute right-0 bottom-20 w-10 h-10 rounded-3xl bg-muted" />
      <div className="absolute right-24 bottom-0 w-20 h-10 rounded-xl bg-muted" />
      <div className="absolute left-10 bottom-0 w-20 h-10 rounded-full bg-muted" />
    </div>
  );
}
