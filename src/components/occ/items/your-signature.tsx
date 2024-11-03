"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DrawProps {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | undefined;
}

interface DrawOptions extends DrawProps {
  strokeColor: string;
  strokeWidth: number[];
  dashGap: number[];
}

export function draw({
  ctx,
  currentPoint,
  prevPoint,
  strokeColor,
  strokeWidth,
  dashGap,
}: DrawOptions) {
  const startPoint = prevPoint ?? currentPoint;

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth[0];
  ctx.setLineDash(dashGap);
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currentPoint.x, currentPoint.y);
  ctx.stroke();
}

export function drawWithDataURL(
  dataURL: string,
  ctx: CanvasRenderingContext2D,
  canvasElement: HTMLCanvasElement,
) {
  const img = new Image();
  img.src = dataURL;
  img.onload = () => {
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    ctx.drawImage(img, 0, 0);
  };
}

type AppTouchEvent = TouchEvent;

interface Point {
  x: number;
  y: number;
}

export default function useDraw(onDraw: (draw: DrawProps) => void) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPointRef = useRef<Point>();

  const [mouseDown, setMouseDown] = useState(false);

  const onInteractStart = useCallback(() => {
    setMouseDown(true);
  }, []);

  const undo = useCallback((undoPoint: string) => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const ctx = canvasElement.getContext("2d");
    if (!ctx) return;

    drawWithDataURL(undoPoint, ctx, canvasElement);
  }, []);

  const clear = useCallback(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const ctx = canvasElement.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  }, []);

  useEffect(() => {
    const computePointInCanvas = (clientX: number, clientY: number) => {
      const canvasElement = canvasRef.current;
      if (!canvasElement) return;

      const rect = canvasElement.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      return { x, y };
    };

    const handleMove = (e: MouseEvent | AppTouchEvent) => {
      if (!mouseDown) return;

      const canvasElement = canvasRef.current;

      const ctx = canvasElement?.getContext("2d");
      let currentPoint;

      if (e instanceof MouseEvent) {
        currentPoint = computePointInCanvas(e.clientX, e.clientY);
      } else {
        const { clientX, clientY } = e.touches[0];
        currentPoint = computePointInCanvas(clientX, clientY);
      }

      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPointRef.current });
      prevPointRef.current = currentPoint;
    };

    const handleInteractEnd = () => {
      setMouseDown(false);
      prevPointRef.current = undefined;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleInteractEnd);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleInteractEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleInteractEnd);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleInteractEnd);
    };
  }, [mouseDown, onDraw]);

  return {
    canvasRef,
    onInteractStart,
    clear,
    undo,
  };
}
export function YourSignature() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [isCanvasActive, setIsCanvasActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const strokeColor = "#a484fb";

  const onDraw = useCallback(
    ({ ctx, currentPoint, prevPoint }: DrawProps) => {
      const strokeWidth = [3];
      const dashGap = [0];
      const drawOptions = {
        ctx,
        currentPoint,
        prevPoint,
        strokeColor,
        strokeWidth,
        dashGap,
      };
      draw(drawOptions);
      setIsEmpty(false);
    },
    [strokeColor, setIsEmpty],
  );

  const { canvasRef, onInteractStart, clear } = useDraw(onDraw);

  useEffect(() => {
    const setCanvasDimensions = () => {
      if (!containerRef.current || !canvasRef.current) return;

      const { width, height } = containerRef.current?.getBoundingClientRect();

      canvasRef.current.width = width - 50;
      canvasRef.current.height = height - 50;
    };

    setCanvasDimensions();
  }, [canvasRef]);

  const handleInteractStart = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    onInteractStart();
  };

  const clearCanvas = () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    clear();
  };

  const saveCanvas = async () => {
    if (!canvasRef.current) return;
    setIsCanvasActive(false);
    setIsLoading(true);
    setIsEmpty(true);
    const dataUrl = canvasRef.current.toDataURL();
    const blob = await fetch(dataUrl).then((res) => res.blob());
    const file = new File([blob], "firma.png", { type: "image/png" });
    if (!file) return;
    showSignature(file);
  };

  const showSignature = (file: File) => {
    setIsCanvasActive(true);
    setIsLoading(false);
    return toast.custom((t) => (
      <div className="w-80 flex items-center justify-center p-2 gap-3">
        <img
          src={URL.createObjectURL(file)}
          alt="signature"
          className="w-full h-20"
        />
        <Button variant="outline" onClick={() => toast.dismiss(t)}>
          Undo
        </Button>
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        ref={containerRef}
        className="relative flex h-[20rem] w-[20rem] md:w-[35rem] items-center justify-center"
      >
        <Button
          variant="outline"
          type="button"
          className="absolute right-[25px] top-[25px] flex select-none rounded-none rounded-bl rounded-tr-md border-0 border-b border-l focus-within:z-10"
          onClick={clearCanvas}
        >
          Clear
        </Button>

        <canvas
          id="canvas"
          ref={canvasRef}
          onMouseDown={isCanvasActive ? handleInteractStart : undefined}
          onTouchStart={isCanvasActive ? handleInteractStart : undefined}
          width={0}
          height={0}
          className="touch-none rounded-lg border bg-background"
        />

        {!isCanvasActive && (
          <div
            className="absolute h-[17rem] w-full md:w-[32rem] border flex items-center justify-center
          z-10 top-6 lef-0 backdrop-blur-sm bg-background/30 rounded-lg"
          >
            {isLoading ? (
              <Loader2 className="animate-spin text-primary" size={64} />
            ) : (
              <p>Signature Saved!</p>
            )}
          </div>
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={saveCanvas}
        disabled={isEmpty}
      >
        confirm signature
      </Button>
    </div>
  );
}
