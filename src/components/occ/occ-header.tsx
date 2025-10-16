import { Code2, Component, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OCC_TOTAL } from "@/config";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  handleMode: (codeMode: boolean) => void;
  codeMode: boolean;
  item: OCC;
  index: number;
}
export function OCCHeader({ handleMode, codeMode, item, index }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const copyToClipboard = async () => {
    setIsLoading(true);
    try {
      await navigator.clipboard.writeText(item.code.code);
      toast("Copied to clipboard");
    } catch (error) {
      setTimeout(() => {
        toast("Failed to copy to clipboard");
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-14 flex items-center justify-between">
      <div className="flex gap-4 items-center">
        <p>{item.title}</p>
        <Badge variant="outline" className="font-mono bg-card">
          {index + 1}/{OCC_TOTAL} OCC
        </Badge>
      </div>
      <div className="flex gap-4">
        {codeMode && (
          <Button
            variant="outline"
            className="w-11 text-xs rounded-3xl p-[0.85rem] bg-card"
            onClick={copyToClipboard}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Copy />}
          </Button>
        )}
        <Button
          disabled={isLoading}
          variant="outline"
          className="w-11 text-xs rounded-3xl p-[0.85rem] bg-card"
          onClick={() => handleMode(!codeMode)}
        >
          {codeMode ? <Component /> : <Code2 />}
        </Button>
      </div>
    </div>
  );
}
