"use client";

import { PowerIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function AudioSpectrum() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  // const audio = useMemo(() => new Audio("/audio/button-click.wav"), []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAudio(new Audio("/audio/button-click.wav"));
    }
  }, []);

  function handleStartRecording() {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  }

  function handleStopRecording() {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-52 h-52 rounded-full flex items-center justify-center overflow-hidden cursor-pointer">
        {Array.from({ length: 20 }, (_, index) => (
          <span
            key={index}
            className="inline-block w-2 h-full bg-foreground mx-1"
          />
        ))}
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
