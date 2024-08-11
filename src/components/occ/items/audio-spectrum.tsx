"use client";

import { PowerIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AudioSpectrum() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const [animationsLeft, setAnimationsLeft] = useState(Array(20).fill({}));
  const [animationsRight, setAnimationsRight] = useState(Array(20).fill({}));

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudio(new Audio("/audio/button-click.wav"));
    }
  }, []);

  function generateAnimation(
    index: number,
    isRecording: boolean,
    isLeft: boolean,
  ) {
    const direction = isLeft ? -1 : 1;
    const largeIndex = Math.floor(animationsLeft.length / 2);
    const maxTranslation = 50;
    const minTranslation = Math.random() * 20;
    const spread = 3;

    const distance = Math.abs(index - largeIndex);

    const translation =
      maxTranslation * Math.exp(-Math.pow(distance / spread, 2)) +
      minTranslation;

    return isRecording
      ? {
          translateX: [0, direction * translation, 0],
          transition: {
            repeat: Infinity,
            duration: 0.5,
            ease: "easeInOut",
            delay: Math.random() * 0.5,
            repeatType: "reverse",
          },
        }
      : { translateX: 0 };
  }

  function handleStartRecording() {
    setIsRecording(true);

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }

    setAnimationsLeft((prev) =>
      prev.map((animation, index) => generateAnimation(index, true, true)),
    );
    setAnimationsRight((prev) =>
      prev.map((animation, index) => generateAnimation(index, true, false)),
    );
  }

  function handleStopRecording() {
    setIsRecording(false);

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }

    setAnimationsLeft((prev) =>
      prev.map((animation, index) => generateAnimation(index, false, true)),
    );
    setAnimationsRight((prev) =>
      prev.map((animation, index) => generateAnimation(index, false, false)),
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-52 h-52 rounded-full flex items-center justify-center gap-2 overflow-hidden cursor-none">
        <div className="w-52 h-52 flex flex-col items-center justify-center gap-2">
          {Array.from({ length: 20 }, (_, index) => (
            <motion.span
              key={index}
              className="inline-block w-full h-2 bg-foreground"
              animate={animationsLeft[index]}
            />
          ))}
        </div>
        <div className="w-52 h-52 flex flex-col items-center justify-center gap-2">
          {Array.from({ length: 20 }, (_, index) => (
            <motion.span
              key={index}
              className="inline-block w-full h-2 bg-foreground"
              animate={animationsRight[index]}
            />
          ))}
        </div>
      </div>

      <div
        className="group absolute bottom-8 right-8 w-10 h-10 flex items-center justify-center
         rounded-full bg-[#e85628] cursor-pointer transition-all duration-300 z-10
        shadow-[rgba(0,0,0,0.377)_5px_5px_3px,#ff962b_1.5px_1.5px_2px_0px_inset,#fb702c_-3.2px_-3.2px_4px_0px_inset]
        active:shadow-[rgba(0,0,0,0.377)_0px_0px_0px,inset_0.5px_0.5px_4px_#000000,#e85628_-3.2px_-3.2px_8px_0px_inset]
        "
        onClick={() =>
          isRecording ? handleStopRecording() : handleStartRecording()
        }
      >
        <PowerIcon className="w-6 h-6 text-white/60 group-active:scale-95 transition-all duration-300" />
      </div>
    </div>
  );
}
