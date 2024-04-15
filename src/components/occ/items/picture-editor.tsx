"use client";
import { Disc3Icon, Frame, RotateCcw, Upload, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Rnd } from "react-rnd";
import { useDropzone } from "react-dropzone";

function calculateSize(size: number) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    +(size / Math.pow(1024, i)).toFixed(2) +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

interface FileWithPreview extends File {
  preview: string;
}

export function PictureEditor() {
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState({
    angle: 0,
    isVisible: false,
  });
  const [adjust, setAdjust] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
    setFiles(
      acceptedFiles.map((file: Blob | MediaSource) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const takeScreenshot = async () => {
    const node = document.querySelector("#image-container");
    if (!node) return;

    const imgElement = node.querySelector("img");
    if (!imgElement) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = node.clientWidth;
    canvas.height = node.clientHeight;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgElement.src;

    img.onload = () => {
      const scaleRatio = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
      );
      const x = (canvas.width - img.width * scaleRatio) / 2;
      const y = (canvas.height - img.height * scaleRatio) / 2;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotate.angle * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
      ctx.drawImage(img, x, y, img.width * scaleRatio, img.height * scaleRatio);
      ctx.restore();

      const data = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = data;
      a.download = "screenshot.png";
      a.click();
    };
  };

  return (
    <div className="w-[90%] h-[90%] my-auto rounded-xl bg-background border overflow-hidden">
      <PictureEditorControls takeScreenshot={takeScreenshot} file={files[0]} />
      <div className="relative w-full h-[80%] overflow-hidden border-y">
        <AdjustementTool isVisible={adjust} />
        <RotationTool
          rotate={rotate.angle}
          setRotate={(value) => setRotate({ ...rotate, angle: value })}
          isVisible={rotate.isVisible}
        />
        <div
          id="image-container"
          className="w-full h-full overflow-hidden"
          {...getRootProps()}
        >
          <div
            className={`${
              files.length === 0 ? "flex" : "hidden"
            } w-full h-full items-center justify-center`}
          >
            <Upload className="w-20 h-20 text-muted" />
          </div>
          <input {...getInputProps()} />
          {files.length > 0 && (
            <motion.img
              animate={{
                scale: scale + rotate.angle / 360,
                transition: { duration: 0 },
                rotateZ: rotate.angle,
              }}
              className={`w-full h-full object-cover transform transition-transform duration-300 ease-in-out select-none`}
              src={files[0].preview}
              alt="picture"
              draggable="false"
            />
          )}
        </div>
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

export function PictureEditorControls({
  takeScreenshot,
  file,
}: {
  takeScreenshot: () => void;
  file: { preview: string; name: string; size: number };
}) {
  return (
    <div className="h-[10%] w-full flex items-center justify-between space-x-4 px-2">
      <div className="w-full flex gap-4">
        {file && (
          <Badge
            className="text-xs max-w-[12rem] overflow-hidden line-clamp-1"
            variant="outline"
          >
            {file.name}
          </Badge>
        )}
        {file && (
          <Badge
            className="hidden sm:block text-xs text-muted-foreground line-clamp-1"
            variant="outline"
          >
            {calculateSize(file.size)}
          </Badge>
        )}
      </div>

      <Button className="h-6" onClick={() => takeScreenshot()}>
        Done
      </Button>
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
    <div className="h-[10%] w-full flex items-center justify-center space-x-4 px-2 dark:bg-foreground/10 dark:border-transparent dark:text-muted-foreground">
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
      <span className="text-muted dark:text-accent-foreground">|</span>
      <Button
        className={`w-auto h-6 hover:bg-muted dark:hover:text-accent text-xs ${
          adjust ? "bg-muted dark:text-accent" : ""
        }`}
        variant="ghost"
        onClick={() => setAdjust(!adjust)}
      >
        <Frame className="h-4 w-4" />
      </Button>
      <span className="text-muted dark:text-accent-foreground">|</span>
      <Button
        className={`w-auto h-6 hover:bg-muted dark:hover:text-accent text-xs ${
          rotate.isVisible ? "bg-muted dark:text-accent" : ""
        }`}
        variant="ghost"
        onClick={() => setRotate({ ...rotate, isVisible: !rotate.isVisible })}
      >
        <Disc3Icon className="h-4 w-4" />
      </Button>
      <span className="text-muted dark:text-accent-foreground">|</span>
      <div
        className="absolute -bottom-6 sm:bottom-0 sm:relative flex w-[80%] sm:w-[60%] items-center justify-between
        gap-4 bg-background border sm:border-none p-2 rounded-xl dark:bg-foreground/10 dark:border-transparent dark:text-muted-foreground"
      >
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

export function AdjustementTool({ isVisible }: { isVisible: boolean }) {
  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? -10 : 0,
        visibility: isVisible ? "visible" : "hidden",
      }}
      className="absolute w-full h-full opacity-0 invisible z-10 left-0 bottom-0"
    >
      <Rnd
        default={{
          x: 50,
          y: 50,
          width: 320,
          height: 200,
        }}
        minWidth={100}
        maxWidth={"100%"}
        minHeight={100}
        maxHeight={"100%"}
        className="absolute bottom-0 w-[50%] max-w-[10rem] h-[50%] max-h-full inset-0 m-auto border border-white z-20"
      >
        <AdjustementToolHandle position="top" />
        <AdjustementToolHandle position="bottom" />
        <AdjustementToolHandle position="left" />
        <AdjustementToolHandle position="right" />
        <div className="absolute top-0 left-1/3 w-[0.01rem]  h-full bg-white transform -translate-x-1/2"></div>
        <div className="absolute top-1/3 left-0 h-[0.01rem] w-full bg-white transform -translate-y-1/2"></div>
        <div className="absolute top-0 right-1/3 w-[0.01rem] h-full bg-white transform -translate-x-1/2"></div>
        <div className="absolute bottom-1/3 left-0 h-[0.01rem] w-full bg-white transform -translate-y-1/2"></div>
      </Rnd>
    </motion.div>
  );
}

export function AdjustementToolHandle({
  position,
}: {
  position: "top" | "bottom" | "left" | "right";
}) {
  const positionClass: Record<string, string> = {
    top: "-top-[0.2rem] left-1/2 transform -translate-x-1/2",
    bottom: "-bottom-[0.2rem] left-1/2 transform -translate-x-1/2",
    left: "rotate-90 top-1/2 -left-[0.7rem] transform -translate-y-1/2",
    right: "rotate-90 top-1/2 -right-[0.6rem] transform -translate-y-1/2",
  };

  return (
    <div
      className={`absolute cursor-pointer w-5 h-1 bg-white  ${positionClass[position]}`}
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
        <p className="font-mono text-xs text-white">{rotate.toFixed(2)}°</p>
      </div>
    </motion.div>
  );
}
