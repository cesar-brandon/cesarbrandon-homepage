"use client";
import { Badge } from "@/components/ui/badge";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { useCarouselStore } from "@/store/carousel";
import { CarouselItem } from "@/components/ui/carousel";

interface ItemProps {
  slide: OCC;
  children: React.ReactNode;
}

export function CarouselDialogItem({ children, slide }: ItemProps) {
  const codeMode = useCarouselStore((state) => state.codeMode);
  return (
    <CarouselItem className="group relative flex flex-col lg:flex-row gap-10 pt-8">
      <div className="w-full lg:w-[40%] flex flex-col gap-4">
        <p className="font-medium">{slide.title}</p>
        <p className="text-sm xl:w-[80%]">{slide.description}</p>
        <div>
          {slide.topics.map((topic) => (
            <Badge key={topic} className="mr-2" variant="secondary">
              {topic}
            </Badge>
          ))}
        </div>
      </div>
      <CopyToClipboard code={slide.code.code} />
      <div
        className={`group relative w-full lg:w-[60%] h-full border rounded 
        flex items-center justify-center p-4 ${
          codeMode && "overflow-y-auto overflow-x-auto"
        }`}
      >
        {codeMode ? <>{children}</> : <>{slide.component}</>}
        {/*  */}
      </div>
    </CarouselItem>
  );
}
