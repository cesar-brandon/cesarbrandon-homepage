"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Box } from "lucide-react";

interface Props {
  children: React.ReactNode;
  slides: Draft[];
}

export function CarouselDialog({ children, slides }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[80%] xl:max-w-[60rem] h-[40rem] py-10">
        {slides && slides.length > 0 ? (
          <Carousel orientation="vertical">
            <CarouselContent className="h-[35rem] py-20 box-border">
              {slides.map((slide) => (
                <CarouselItem key={slide._id} className="flex flex-col lg:flex-row gap-10">
                  <div className="w-full xl:w-[40%] flex flex-col gap-4">
                    <p className="font-medium">{slide.title}</p>
                    <p className="text-sm xl:w-[80%]">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Explicabo maiores ab sapiente itaque totam voluptatem
                      tenetur debitis, quae eaque quos laborum ut reprehenderit
                      at quod nulla, perspiciatis odit officiis eos!
                    </p>
                  </div>

                  <div className="w-full xl:w-[60%] h-full border rounded">

                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="top-0" />
            <CarouselNext className="bottom-0" />
          </Carousel>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <Box className="stroke-primary stroke-1 w-40 h-40" />
            <span>No hay componentes por el momento</span>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
