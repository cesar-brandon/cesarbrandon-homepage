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

  // Estilos siguiendo la estructura del ejemplo
  const getKeycapStyle = (key: string, isPressed: boolean) => {
    const isW = key === "W";
    
    // Colores base siguiendo la imagen de referencia
    const baseBg = isW
      ? "linear-gradient(180deg, #ff6b35, #e55722)"
      : "linear-gradient(180deg, #f5f3f1, #e8e4df)";
    
    // Sombras externas e internas como en el ejemplo
    const baseBoxShadow = isW
      ? `
        inset -8px 0 8px rgba(229, 87, 34, 0.15),
        inset 0 -8px 8px rgba(196, 68, 26, 0.25),
        0 0 0 2px rgba(196, 68, 26, 0.75),
        10px 20px 25px rgba(196, 68, 26, 0.4)
      `
      : `
        inset -8px 0 8px rgba(0, 0, 0, 0.05),
        inset 0 -8px 8px rgba(0, 0, 0, 0.1),
        0 0 0 2px rgba(0, 0, 0, 0.15),
        10px 20px 25px rgba(0, 0, 0, 0.2)
      `;
    
    // Sombras cuando está presionado
    const pressedBoxShadow = isW
      ? `
        inset -4px 0 4px rgba(229, 87, 34, 0.1),
        inset 0 -4px 4px rgba(196, 68, 26, 0.15),
        0 0 0 2px rgba(196, 68, 26, 0.5),
        5px 10px 15px rgba(196, 68, 26, 0.3)
      `
      : `
        inset -4px 0 4px rgba(0, 0, 0, 0.03),
        inset 0 -4px 4px rgba(0, 0, 0, 0.08),
        0 0 0 2px rgba(0, 0, 0, 0.1),
        5px 10px 15px rgba(0, 0, 0, 0.15)
      `;

    return {
      position: "relative" as const,
      display: "inline-block",
      width: 80,
      height: 80,
      borderRadius: 10,
      background: baseBg,
      boxShadow: isPressed ? pressedBoxShadow : baseBoxShadow,
      overflow: "hidden",
      transition: "transform 0.1s ease-in-out, box-shadow 0.1s ease-in",
      userSelect: "none" as const,
      WebkitTapHighlightColor: "transparent",
      transform: isPressed ? "translateY(2px)" : "translateY(0)",
      cursor: "pointer",
      margin: 4,
    };
  };

  // Bisel interno (::before del ejemplo)
  const getBiselStyle = (key: string, isPressed: boolean) => {
    const isW = key === "W";
    
    const baseBg = isW
      ? "linear-gradient(90deg, #ff8a50, #ff6b35)"
      : "linear-gradient(90deg, #f8f6f4, #f0ede8)";

    return {
      content: "''",
      position: "absolute" as const,
      top: isPressed ? 5 : 3,
      left: isPressed ? 5 : 4,
      bottom: isPressed ? 11 : 14,
      right: isPressed ? 11 : 12,
      background: baseBg,
      borderRadius: 10,
      boxShadow: isPressed
        ? isW
          ? "-5px -5px 5px rgba(255, 255, 255, 0.25), 5px 3px 5px rgba(0, 0, 0, 0.1)"
          : "-5px -5px 5px rgba(255, 255, 255, 0.4), 5px 3px 5px rgba(0, 0, 0, 0.05)"
        : isW
          ? "-10px -10px 10px rgba(255, 255, 255, 0.25), 10px 5px 10px rgba(0, 0, 0, 0.15)"
          : "-10px -10px 10px rgba(255, 255, 255, 0.6), 10px 5px 10px rgba(0, 0, 0, 0.1)",
      borderLeft: isW 
        ? "1px solid rgba(204, 74, 26, 0.3)"
        : "1px solid rgba(200, 190, 180, 0.4)",
      borderBottom: isW 
        ? "1px solid rgba(204, 74, 26, 0.3)" 
        : "1px solid rgba(200, 190, 180, 0.4)",
      borderTop: isW 
        ? "1px solid rgba(255, 255, 255, 0.8)"
        : "1px solid rgba(255, 255, 255, 0.9)",
      transition: "all 0.1s ease-in-out",
      pointerEvents: "none" as const,
    };
  };

  // Letra (.letter del ejemplo)
  const getLetterStyle = (isPressed: boolean, isW: boolean) => ({
    position: "absolute" as const,
    left: 12,
    top: 12,
    color: isW ? "#ffffff" : "#444444",
    fontSize: 16,
    fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
    fontWeight: 600,
    textShadow: isW 
      ? "0 1px 2px rgba(0, 0, 0, 0.5)" 
      : "0 1px 0 rgba(255, 255, 255, 0.8)",
    transition: "transform 0.1s ease-in-out",
    transform: isPressed ? "translateY(1px)" : "translateY(0)",
    pointerEvents: "none" as const,
    zIndex: 10,
  });

  return (
    <div className="inline-block">
      {/* W arriba */}
      <div className="flex justify-center mb-2">
        <button
          tabIndex={0}
          aria-label="W key"
          style={getKeycapStyle("W", !!pressed["W"])}
          onMouseDown={() => handleMouseDown("W")}
          onMouseUp={() => handleMouseUp("W")}
          onMouseLeave={() => handleMouseUp("W")}
          className="focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
        >
          <span style={getBiselStyle("W", !!pressed["W"])} />
          <span style={getLetterStyle(!!pressed["W"], true)}>W</span>
        </button>
      </div>
      
      {/* ASD abajo */}
      <div className="flex justify-center gap-1">
        {["A", "S", "D"].map((key) => (
          <button
            key={key}
            tabIndex={0}
            aria-label={`${key} key`}
            style={getKeycapStyle(key, !!pressed[key])}
            onMouseDown={() => handleMouseDown(key)}
            onMouseUp={() => handleMouseUp(key)}
            onMouseLeave={() => handleMouseUp(key)}
            className="focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            <span style={getBiselStyle(key, !!pressed[key])} />
            <span style={getLetterStyle(!!pressed[key], false)}>{key}</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 