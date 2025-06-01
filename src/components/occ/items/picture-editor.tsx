"use client";
import { Disc3Icon, Frame, RotateCcw, Upload, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useCallback, useState, useEffect } from "react";
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
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [filters, setFilters] = useState<string>("none");

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      // Resetear ajustes al cargar nueva imagen
      setScale(1);
      setRotate({ angle: 0, isVisible: false });
      setAdjust(false);
      setBrightness(100);
      setContrast(100);
      setSaturation(100);
      setFilters("none");
    },
    [files]
  );

  const resetFilters = () => {
    setScale(1);
    setRotate({ angle: 0, isVisible: false });
    setAdjust(false);
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setFilters("none");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const takeScreenshot = async () => {
    try {
      const node = document.querySelector("#image-container");
      if (!node) throw new Error("No se encontró el contenedor de la imagen");

      const imgElement = node.querySelector("img");
      if (!imgElement) throw new Error("No se encontró la imagen");

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No se pudo crear el contexto del canvas");

      // Obtener la resolución actual del ajuste
      const adjustmentTool = document.querySelector(".rnd-container");
      let relativeX = 0;
      let relativeY = 0;
      let relativeWidth = 1;
      let relativeHeight = 1;

      if (adjustmentTool) {
        const rect = adjustmentTool.getBoundingClientRect();
        const containerRect = node.getBoundingClientRect();

        // Calcular las proporciones relativas
        relativeX = (rect.x - containerRect.x) / containerRect.width;
        relativeY = (rect.y - containerRect.y) / containerRect.height;
        relativeWidth = rect.width / containerRect.width;
        relativeHeight = rect.height / containerRect.height;
      }

      // Obtener la resolución actual del estado
      const resolutionElement = document.querySelector(
        ".text-white.text-xs.font-mono"
      );
      const resolution = {
        width: 1920,
        height: 1080,
      };

      if (resolutionElement) {
        const [width, height] = resolutionElement.textContent
          ?.split(" x ")
          .map(Number) || [1920, 1080];
        resolution.width = width;
        resolution.height = height;
      }

      canvas.width = resolution.width;
      canvas.height = resolution.height;

      // Crear una imagen temporal para aplicar los filtros
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");
      if (!tempCtx) throw new Error("No se pudo crear el contexto temporal");

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imgElement.src;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      // Aplicar los filtros en el canvas temporal
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      tempCtx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) ${filters === "none" ? "" : filters}`;
      tempCtx.drawImage(img, 0, 0);

      // Aplicar las transformaciones en el canvas principal
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotate.angle * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);

      // Dibujar la imagen con los filtros aplicados y el recorte
      ctx.drawImage(
        tempCanvas,
        relativeX * img.width,
        relativeY * img.height,
        relativeWidth * img.width,
        relativeHeight * img.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.restore();

      // Obtener la fecha actual para el nombre del archivo
      const date = new Date().toISOString().split("T")[0];
      const fileName = `imagen-editada-${resolution.width}x${resolution.height}-${date}.png`;

      // Crear y descargar el archivo
      const data = canvas.toDataURL("image/png", 1.0);
      const a = document.createElement("a");
      a.href = data;
      a.download = fileName;
      a.click();
    } catch (error) {
      console.error("Error al tomar la captura:", error);
      alert("Hubo un error al procesar la imagen. Por favor, intente de nuevo.");
    }
  };

  const getImageStyle = () => {
    return {
      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) ${filters === "none" ? "" : filters}`,
      transform: `scale(${scale}) rotate(${rotate.angle}deg)`,
    };
  };

  return (
    <div className="w-[90%] h-[90%] my-auto rounded-xl bg-background border overflow-hidden">
      <PictureEditorControls takeScreenshot={takeScreenshot} file={files[0]} />
      <div className="relative w-full h-[80%] overflow-hidden border-y">
        {files.length > 0 && (
          <>
            <AdjustementTool isVisible={adjust} />
            <RotationTool
              rotate={rotate.angle}
              setRotate={(value) => setRotate({ ...rotate, angle: value })}
              isVisible={rotate.isVisible}
            />
          </>
        )}
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
              style={getImageStyle()}
              className="w-full h-full object-cover transform transition-all duration-300 ease-in-out select-none"
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
        brightness={brightness}
        setBrightness={setBrightness}
        contrast={contrast}
        setContrast={setContrast}
        saturation={saturation}
        setSaturation={setSaturation}
        filters={filters}
        setFilters={setFilters}
        hasImage={files.length > 0}
        resetFilters={resetFilters}
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
      <div className="w-full flex items-center gap-4">
        {file && (
          <div
            className="text-foreground rounded-full border px-2.5 py-0.5 text-xs font-semibold 
            max-w-[12rem] line-clamp-1"
          >
            {file.name}
          </div>
        )}
        {file && (
          <Badge
            className="hidden sm:block h-5 text-xs text-muted-foreground line-clamp-1"
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
  brightness: number;
  setBrightness: (value: number) => void;
  contrast: number;
  setContrast: (value: number) => void;
  saturation: number;
  setSaturation: (value: number) => void;
  filters: string;
  setFilters: (value: string) => void;
  hasImage: boolean;
  resetFilters: () => void;
}

export function PictureEditorActions({
  scale,
  setScale,
  adjust,
  setAdjust,
  rotate,
  setRotate,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  saturation,
  setSaturation,
  filters,
  setFilters,
  hasImage,
  resetFilters,
}: ActionsProps) {
  const calculatePercentage = (value: number) => {
    return Math.round(value);
  };

  const filterOptions = [
    { name: "Normal", value: "none" },
    { name: "Sepia", value: "sepia(100%)" },
    { name: "B/N", value: "grayscale(100%)" },
    { name: "Invertir", value: "invert(100%)" },
    { name: "Vintage", value: "sepia(50%) contrast(120%) brightness(90%)" },
    { name: "Dramático", value: "contrast(150%) brightness(90%)" },
    { name: "Suave", value: "contrast(90%) brightness(110%) saturate(90%)" },
  ];

  return (
    <div className="h-[10%] w-full flex items-center justify-center space-x-4 px-2 dark:bg-foreground/10 dark:border-transparent dark:text-muted-foreground">
      {hasImage && (
        <>
          <Button
            className="w-auto h-6 hover:bg-muted dark:hover:text-accent text-xs"
            variant="ghost"
            onClick={resetFilters}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <span className="text-muted dark:text-accent-foreground">|</span>
          <Button
            className={`w-auto h-6 hover:bg-muted dark:hover:text-accent text-xs ${
              adjust ? "bg-muted dark:text-accent" : ""
            }`}
            variant="ghost"
            onClick={() => {
              setRotate({ ...rotate, isVisible: false });
              setAdjust(!adjust);
            }}
          >
            <Frame className="h-4 w-4" />
          </Button>
          <span className="text-muted dark:text-accent-foreground">|</span>
          <Button
            className={`w-auto h-6 hover:bg-muted dark:hover:text-accent text-xs ${
              rotate.isVisible ? "bg-muted dark:text-accent" : ""
            }`}
            variant="ghost"
            onClick={() => {
              setAdjust(false);
              setRotate({ ...rotate, isVisible: !rotate.isVisible });
            }}
          >
            <Disc3Icon className="h-4 w-4" />
          </Button>
          <span className="text-muted dark:text-accent-foreground">|</span>
          <div className="relative">
            <select
              value={filters}
              onChange={(e) => setFilters(e.target.value)}
              className="bg-transparent border rounded px-2 py-1 text-xs appearance-none pr-8"
            >
              {filterOptions.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.name}
                </option>
              ))}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </>
      )}
      <div className="absolute -bottom-6 sm:bottom-0 sm:relative flex w-[80%] sm:w-[60%] items-center justify-between gap-4 bg-background border sm:border-none p-2 rounded-xl dark:bg-foreground/10 dark:border-transparent dark:text-muted-foreground">
        {hasImage ? (
          <>
            <div className="flex items-center gap-2 w-full">
              <ZoomIn className="w-4 h-4" />
              <Slider
                value={[scale]}
                onValueChange={(value) => setScale(value[0])}
                min={0.1}
                max={3}
                step={0.1}
                className="w-full"
              />
              <span className="font-mono text-xs">
                {Math.round(scale * 100)}%
              </span>
            </div>
          </>
        ) : (
          <div className="text-center w-full text-muted-foreground">
            Arrastra una imagen para comenzar
          </div>
        )}
      </div>
    </div>
  );
}

export function AdjustementTool({ isVisible }: { isVisible: boolean }) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    width: 320,
    height: 200,
  });
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [resolution, setResolution] = useState({ width: 1920, height: 1080 });

  const handleDragStop = (e: any, d: any) => {
    setPosition({ ...position, x: d.x, y: d.y });
  };

  const handleResizeStop = (
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any
  ) => {
    const newWidth = parseInt(ref.style.width);
    const newHeight = parseInt(ref.style.height);
    setPosition({
      x: position.x,
      y: position.y,
      width: newWidth,
      height: newHeight,
    });
  };

  const handleResolutionChange = (ratio: number) => {
    setAspectRatio(ratio);
    let newResolution = { width: 1920, height: 1080 };
    if (ratio === 1) {
      newResolution = { width: 1080, height: 1080 };
    } else if (ratio === 16 / 9) {
      newResolution = { width: 1920, height: 1080 };
    } else if (ratio === 4 / 3) {
      newResolution = { width: 1440, height: 1080 };
    }
    setResolution(newResolution);

    // Actualizar el tamaño del contenedor Rnd
    const container = document.querySelector(".rnd-container");
    if (container) {
      const containerWidth = container.parentElement?.clientWidth || 0;
      const containerHeight = container.parentElement?.clientHeight || 0;

      // Calcular el nuevo tamaño manteniendo la relación de aspecto
      let newWidth = containerWidth * 0.8;
      let newHeight = newWidth / ratio;

      if (newHeight > containerHeight * 0.8) {
        newHeight = containerHeight * 0.8;
        newWidth = newHeight * ratio;
      }

      setPosition({
        ...position,
        width: newWidth,
        height: newHeight,
      });
    }
  };

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
        default={position}
        position={{ x: position.x, y: position.y }}
        size={{ width: position.width, height: position.height }}
        minWidth={100}
        maxWidth={"100%"}
        minHeight={100}
        maxHeight={"100%"}
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        lockAspectRatio={aspectRatio}
        className="absolute bottom-0 w-[50%] max-w-[10rem] h-[50%] max-h-full inset-0 m-auto border-2 border-white z-20 bg-transparent"
      >
        <AdjustementToolHandle position="top" />
        <AdjustementToolHandle position="bottom" />
        <AdjustementToolHandle position="left" />
        <AdjustementToolHandle position="right" />
        <div className="absolute top-0 left-1/3 w-[0.01rem] h-full bg-white/80 transform -translate-x-1/2"></div>
        <div className="absolute top-1/3 left-0 h-[0.01rem] w-full bg-white/80 transform -translate-y-1/2"></div>
        <div className="absolute top-0 right-1/3 w-[0.01rem] h-full bg-white/80 transform -translate-x-1/2"></div>
        <div className="absolute bottom-1/3 left-0 h-[0.01rem] w-full bg-white/80 transform -translate-y-1/2"></div>

        {/* Controles de relación de aspecto y resolución */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 ${
                aspectRatio === 1 ? "bg-white text-black" : ""
              }`}
              onClick={() => handleResolutionChange(1)}
            >
              1:1
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 ${
                aspectRatio === 16 / 9 ? "bg-white text-black" : ""
              }`}
              onClick={() => handleResolutionChange(16 / 9)}
            >
              16:9
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 ${
                aspectRatio === 4 / 3 ? "bg-white text-black" : ""
              }`}
              onClick={() => handleResolutionChange(4 / 3)}
            >
              4:3
            </Button>
          </div>
          <div className="text-white text-xs font-mono">
            {resolution.width} x {resolution.height}
          </div>
        </div>
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
