"use client";
import { Disc3Icon, Frame, RotateCcw, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { motion } from "framer-motion";

export function PictureEditor() {
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState({
    angle: 0,
    isVisible: false,
  });
  const [adjust, setAdjust] = useState(false);

  return (
    <div className="w-[90%] h-[90%] my-auto rounded-xl bg-background border overflow-hidden">
      <PictureEditorControls />
      <div className="relative w-full h-[80%] overflow-hidden border-y">
        <AdjustementTool
          isVisible={adjust}
          rotate={rotate.angle}
          setRotate={(value) => setRotate({ ...rotate, angle: value })}
        />
        <RotationTool
          rotate={rotate.angle}
          setRotate={(value) => setRotate({ ...rotate, angle: value })}
          isVisible={rotate.isVisible}
        />
        <motion.img
          animate={{
            scale: scale + rotate.angle / 360,
            transition: { duration: 0 },
            rotateZ: rotate.angle,
          }}
          className={`w-full h-full object-cover transform transition-transform duration-300 ease-in-out select-none`}
          src="https://dr.savee-cdn.com/things/thumbnails/6/2/44b67089842e706ba43d05.webp"
          alt="picture"
          draggable="false"
        />
      </div>
      <PictureEditorActions
        setAdjust={setAdjust}
        adjust={adjust}
        scale={scale}
        setScale={setScale}
        rotate={rotate}
        setRotate={setRotate}
      />
    </div>
  );
}

export function PictureEditorControls() {
  return (
    <div className="h-[10%] w-full flex items-center justify-between space-x-4 px-2">
      <Badge className="text-xs max-w-[10rem] line-clamp-1" variant="outline">
        IMG_20210927_12345333222236.jpg
      </Badge>
      <Button className="h-6">Done</Button>
    </div>
  );
}

interface ActionsProps {
  scale: number;
  setScale: (value: number) => void;
  adjust: boolean;
  setAdjust: (value: boolean) => void;
  rotate: { angle: number; isVisible: boolean };
  setRotate: any;
}

export function PictureEditorActions({
  scale,
  setScale,
  adjust,
  setAdjust,
  rotate,
  setRotate,
}: ActionsProps) {
  const calculatePercentage = (value: number) => {
    return Math.round(value * 100);
  };

  return (
    <div className="h-[10%] w-full flex items-center justify-center space-x-4 px-2 dark:bg-foreground/5">
      <Button
        className="w-auto h-6 hover:bg-muted dark:hover:text-accent text-xs"
        variant="ghost"
        onClick={() => {
          setScale(1);
          setRotate({ angle: 0, isVisible: false });
        }}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <span className="text-muted">|</span>
      <Button
        className={`w-auto h-6 hover:bg-muted dark:hover:text-accent text-xs ${
          adjust ? "bg-muted dark:text-accent" : ""
        }`}
        variant="ghost"
        onClick={() => setAdjust(!adjust)}
      >
        <Frame className="h-4 w-4" />
      </Button>
      <span className="text-muted">|</span>
      <Button
        className={`w-auto h-6 hover:bg-muted dark:hover:text-accent text-xs ${
          rotate.isVisible ? "bg-muted dark:text-accent" : ""
        }`}
        variant="ghost"
        onClick={() => setRotate({ ...rotate, isVisible: !rotate.isVisible })}
      >
        <Disc3Icon className="h-4 w-4" />
      </Button>
      <span className="text-muted">|</span>
      <div className="w-[60%] flex items-center justify-between gap-4">
        <span className="font-mono text-xs">{calculatePercentage(scale)}%</span>
        {/*by Shadcn -> <SliderPrimitive.Track className="relative h-1 focus-visible:h-2 w-full grow overflow-hidden rounded-full bg-foreground/20"> */}
        {/*by Shadcn -> <SliderPrimitive.Thumb className="block h-3 w-3 rounded-full border bg-primary ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" /> */}
        <Slider
          value={[scale]}
          onValueChange={(value) => setScale(value[0])}
          defaultValue={[2.5]}
          max={5}
          min={1}
          step={0.1}
          className="w-[60%]"
        />
        <ZoomIn className="w-4 h-4" />
      </div>
    </div>
  );
}

export function AdjustementTool({
  isVisible,
  rotate,
  setRotate,
}: {
  isVisible: boolean;
  rotate: number;
  setRotate: (value: number) => void;
}) {
  const [size, setSize] = useState({ width: 200, height: 200 });

  const handleDrag =
    (position: "top" | "bottom" | "left" | "right") => (delta: number) => {
      setSize((prevSize) => {
        switch (position) {
          case "top":
          case "bottom":
            return { ...prevSize, height: prevSize.height + delta };
          case "left":
          case "right":
            return { ...prevSize, width: prevSize.width + delta };
        }
      });
    };

  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? -10 : 0,
        visibility: isVisible ? "visible" : "hidden",
      }}
      style={{ width: size.width, height: size.height }}
      className="opacity-0 invisible absolute bottom-0 w-[50%] max-w-full h-[50%] max-h-full inset-0 m-auto border border-white z-10"
    >
      <AdjustementToolHandle position="top" onDrag={handleDrag("top")} />
      <AdjustementToolHandle position="bottom" onDrag={handleDrag("bottom")} />
      <AdjustementToolHandle position="left" onDrag={handleDrag("left")} />
      <AdjustementToolHandle position="right" onDrag={handleDrag("right")} />
      <div className="absolute top-0 left-1/3 w-[0.01rem]  h-full bg-white transform -translate-x-1/2"></div>
      <div className="absolute top-1/3 left-0 h-[0.01rem] w-full bg-white transform -translate-y-1/2"></div>
      <div className="absolute top-0 right-1/3 w-[0.01rem] h-full bg-white transform -translate-x-1/2"></div>
      <div className="absolute bottom-1/3 left-0 h-[0.01rem] w-full bg-white transform -translate-y-1/2"></div>
    </motion.div>
  );
}

export function AdjustementToolHandle({
  position,
  onDrag,
}: {
  position: "top" | "bottom" | "left" | "right";
  onDrag: (delta: number) => void;
}) {
  const positionClass: Record<string, string> = {
    top: "-top-[0.2rem] left-1/2 transform -translate-x-1/2",
    bottom: "-bottom-[0.2rem] left-1/2 transform -translate-x-1/2",
    left: "rotate-90 top-1/2 -left-[0.7rem] transform -translate-y-1/2",
    right: "rotate-90 top-1/2 -right-[0.6rem] transform -translate-y-1/2",
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const initialPos =
      position === "left" || position === "right" ? e.clientX : e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos =
        position === "left" || position === "right" ? e.clientX : e.clientY;
      const delta = currentPos - initialPos;
      onDrag(delta);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className={`absolute cursor-pointer w-5 h-1 bg-white ${positionClass[position]}`}
      onMouseDown={handleMouseDown}
    />
  );
}

export function RotationTool({
  rotate,
  setRotate,
  isVisible,
}: {
  rotate: number;
  setRotate: (value: number) => void;
  isVisible: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [initialAngle, setInitialAngle] = useState(0);
  const [dragStartAngle, setDragStartAngle] = useState(0);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: any) => {
    setIsDragging(true);
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rad = Math.atan2(y - rect.height / 2, x - rect.width / 2);
    let deg = rad * (180 / Math.PI) + 90;
    if (deg < 0) {
      deg = 360 + deg;
    }
    setDragStartAngle(deg);
    setInitialAngle(rotate);
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rad = Math.atan2(y - rect.height / 2, x - rect.width / 2);
    let deg = rad * (180 / Math.PI) + 90;
    if (deg < 0) {
      deg = 360 + deg;
    }
    const angleChange = deg - dragStartAngle;
    let newRotation = initialAngle + angleChange;
    if (newRotation < 0) {
      newRotation = 360 + newRotation;
    } else if (newRotation > 360) {
      newRotation = newRotation - 360;
    }
    setRotate(newRotation);
  };

  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? -10 : 0,
        visibility: isVisible ? "visible" : "hidden",
      }}
      className="opacity-0 invisible absolute bottom-0 w-[9rem] h-[9rem] inset-0 m-auto border border-white z-10"
    >
      <motion.div
        className="w-full h-full rounded-full  border-2 border-white border-dashed "
        animate={{
          rotate: rotate,
          transition: { duration: 0 },
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      ></motion.div>
      <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
        <div className="border-t-[4px] border-t-transparent border-r-[10px] border-r-white border-b-[4px] border-b-transparent cursor-pointer" />
        <p className="font-mono text-xs">{rotate.toFixed(2)}°</p>
      </div>
    </motion.div>
  );
}
