"use client";
import React, { useEffect, useRef, useState } from "react";

// Layout cruz gamer
const keyLayout = [
  [null, "W", null],
  ["A", "S", "D"],
];

const keySound = "/audio/button-click.wav";

export const KeyboardKeys: React.FC = () => {
  const [pressed, setPressed] = useState<{ [key: string]: boolean }>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(keySound);
    }
  }, []);

  // Manejar eventos de teclado
  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      let key = e.key.toUpperCase();
      if (["A", "W", "S", "D"].includes(key)) {
        setPressed((prev) => ({ ...prev, [key]: true }));
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
        }
      }
    };
    const handleUp = (e: KeyboardEvent) => {
      let key = e.key.toUpperCase();
      if (["A", "W", "S", "D"].includes(key)) {
        setPressed((prev) => ({ ...prev, [key]: false }));
      }
    };
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  // Manejar clic con mouse
  const handleMouseDown = (key: string) => {
    setPressed((prev) => ({ ...prev, [key]: true }));
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };
  const handleMouseUp = (key: string) => {
    setPressed((prev) => ({ ...prev, [key]: false }));
  };

  // Estilos para cada keycap
  const getKeycapStyle = (key: string, isPressed: boolean) => {
    const isW = key === "W";
    const baseBg = isW
      ? "linear-gradient(180deg, #F2A35E 0%, #F25922 50%, #A60303 100%)"
      : "linear-gradient(180deg, #F0EBE7 0%, #E2DBD5 50%, #80736A 100%)";
    const baseBoxShadow = isW
      ? `inset -8px 0 8px rgba(242, 163, 94, 0.15),
         inset 0 -8px 8px rgba(165, 3, 3, 0.25),
         0 0 0 2px #F25922,
         10px 20px 25px rgba(165, 3, 3, 0.18)`
      : `inset -8px 0 8px rgba(240, 235, 231, 0.15),
         inset 0 -8px 8px rgba(128, 115, 106, 0.25),
         0 0 0 2px #80736A,
         10px 20px 25px rgba(128, 115, 106, 0.18)`;
    const pressedBoxShadow = isW
      ? `inset -4px 0 4px rgba(242, 163, 94, 0.10),
         inset 0 -4px 4px rgba(165, 3, 3, 0.15),
         0 0 0 2px #F25922,
         5px 10px 15px rgba(165, 3, 3, 0.10)`
      : `inset -4px 0 4px rgba(240, 235, 231, 0.10),
         inset 0 -4px 4px rgba(128, 115, 106, 0.15),
         0 0 0 2px #80736A,
         5px 10px 15px rgba(128, 115, 106, 0.10)`;
    return {
      width: 80,
      height: 80,
      borderRadius: 10,
      background: baseBg,
      boxShadow: isPressed ? pressedBoxShadow : baseBoxShadow,
      transform: isPressed ? "translateY(2px)" : undefined,
      transition: "transform 0.1s ease-in-out, box-shadow 0.1s ease-in",
      position: "relative" as const,
      display: "inline-block",
      overflow: "hidden",
      userSelect: "none" as const,
      WebkitTapHighlightColor: "transparent",
      margin: 0,
    };
  };

  // Bisel ::before
  const getBiselStyle = (key: string, isPressed: boolean) => {
    const isW = key === "W";
    return {
      content: "''",
      position: "absolute" as const,
      top: isPressed ? 5 : 3,
      left: isPressed ? 5 : 4,
      bottom: isPressed ? 11 : 14,
      right: isPressed ? 11 : 12,
      background: isW
        ? "linear-gradient(90deg, #F2A35E, #F25922 50%, #A60303 100%)"
        : "linear-gradient(90deg, #F0EBE7, #E2DBD5 50%, #80736A 100%)",
      borderRadius: 10,
      boxShadow: isPressed
        ? isW
          ? "-5px -5px 5px rgba(242, 163, 94, 0.15), 5px 3px 5px rgba(165, 3, 3, 0.1)"
          : "-5px -5px 5px rgba(240, 235, 231, 0.15), 5px 3px 5px rgba(128, 115, 106, 0.1)"
        : isW
          ? "-10px -10px 10px rgba(242, 163, 94, 0.25), 10px 5px 10px rgba(165, 3, 3, 0.15)"
          : "-10px -10px 10px rgba(240, 235, 231, 0.25), 10px 5px 10px rgba(128, 115, 106, 0.15)",
      borderLeft: "1px solid #0004",
      borderBottom: "1px solid #0004",
      borderTop: "1px solid #0009",
      transition: "all 0.1s ease-in-out",
      pointerEvents: "none" as const,
      zIndex: 1,
    };
  };

  // Letra
  const getLetterStyle = (isPressed: boolean, isW: boolean) => ({
    position: "absolute" as const,
    left: 12,
    top: 12,
    color: isW ? "#fff" : "#80736A",
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: 700,
    transition: "transform 0.1s ease-in-out",
    transform: isPressed ? "translateY(1px)" : undefined,
    zIndex: 3,
    pointerEvents: "none" as const,
  });

  return (
    <div className="inline-block p-6 bg-muted rounded-2xl">
      {/* W arriba */}
      <div className="flex justify-center">
        <button
          tabIndex={0}
          aria-label="W"
          style={getKeycapStyle("W", !!pressed["W"])}
          onMouseDown={() => handleMouseDown("W")}
          onMouseUp={() => handleMouseUp("W")}
          onMouseLeave={() => handleMouseUp("W")}
          className="focus:outline-none"
        >
          <span style={getBiselStyle("W", !!pressed["W"])} />
          <span style={getLetterStyle(!!pressed["W"], true)}>W</span>
        </button>
      </div>
      {/* ASD abajo */}
      <div className="flex justify-center mt-0">
        {["A", "S", "D"].map((key) => (
          <button
            key={key}
            tabIndex={0}
            aria-label={key}
            style={getKeycapStyle(key, !!pressed[key])}
            onMouseDown={() => handleMouseDown(key)}
            onMouseUp={() => handleMouseUp(key)}
            onMouseLeave={() => handleMouseUp(key)}
            className="focus:outline-none"
          >
            <span style={getBiselStyle(key, !!pressed[key])} />
            <span style={getLetterStyle(!!pressed[key], false)}>{key}</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 