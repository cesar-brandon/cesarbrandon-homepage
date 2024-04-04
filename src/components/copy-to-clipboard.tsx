"use client";
import { useState } from "react";
import { Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCarouselStore } from "@/store/carousel";

interface Props {
  code: string;
}

export default function CopyToClipboard({ code }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const codeMode = useCarouselStore((state) => state.codeMode);

  const copyToClipboard = async () => {
    setIsLoading(true);
    try {
      await navigator.clipboard.writeText(code);
      toast("Copied to clipboard");
    } catch (error) {
      setTimeout(() => {
        toast("Failed to copy to clipboard");
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  if (!codeMode) return null;

  return (
    <Button
      disabled={isLoading}
      onClick={copyToClipboard}
      className="absolute w-11 p-3 right-2 top-2 z-10 opacity-0 group-hover:opacity-100
          transition-opacity duration-300 ease-in-out bg-background hover:bg-background/80 dark:text-foreground"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <Copy />}
    </Button>
  );
}
