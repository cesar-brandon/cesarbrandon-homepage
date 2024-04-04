import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Box } from "lucide-react";
import { CarouselDialogActions } from "./carousel-dialog-actions";
import { CarouselDialogItem } from "./carousel-dialog-item";
import Code from "./carousel-dialog-code";

interface CarouselProps {
  children: React.ReactNode;
  slides: OCC[];
}

export function CarouselDialog({ children, slides }: CarouselProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[80%] xl:max-w-[60rem] h-[40rem] py-10">
        {slides && slides.length > 0 ? (
          <Carousel orientation="vertical">
            <CarouselContent className="h-[35rem] py-20 box-border">
              {slides.map((slide) => (
                <CarouselDialogItem key={slide.title} slide={slide}>
                  {/* @ts-expect-error Server Component */}
                  <Code code={slide.code.code} />
                </CarouselDialogItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="top-0" />
            <CarouselNext className="bottom-0" />
            <CarouselDialogActions />
          </Carousel>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <Box className="stroke-primary stroke-1 w-40 h-40" />
            <span>There are no drafts at the moment.</span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
