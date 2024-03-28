import { Button } from "@/components/ui/button";
import { CarouselDialog } from "@/components/carousel/carousel-dialog";
import { drafts } from "@/components/drafts/drafts";
import { EmblaOptionsType } from "embla-carousel-react";
import Carousel from "../carousel/carousel";

const OPTIONS_DRAFT: EmblaOptionsType = {
  axis: "y",
  align: "start",
  loop: true,
};

export default function LastDraft() {
  return (
    <div className="relative flex flex-col justify-center gap-10">
      <CarouselDialog slides={drafts}>
        <Button
          className={"w-full group text-2xl font-normal rounded-full p-0"}
          variant="ghost"
        >
          DRAFTS
          <span className="font-mono ml-2 group-hover:translate-x-2 transition-all duration-300">
            {"~>"}
          </span>
        </Button>
      </CarouselDialog>

      <section className="pr-10 relative flex justify-center">
        <Carousel
          slides={drafts}
          options={OPTIONS_DRAFT}
          className="w-full h-[16rem]"
        />
      </section>
    </div>
  );
}
