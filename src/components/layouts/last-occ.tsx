import { Button } from "@/components/ui/button";
import { EmblaOptionsType } from "embla-carousel-react";
import Carousel from "../carousel/carousel";
import { occ } from "../occ/occ-list";
import CarouselContent from "../carousel/carousel-content";
import { Link } from "next-view-transitions";

const OPTIONS_DRAFT: EmblaOptionsType = {
  axis: "y",
  align: "start",
  loop: true,
};

export default function LastOCC() {
  return (
    <div className="relative flex flex-col justify-center px-6 py-6 gap-10 bg-card rounded-3xl">
      <Button
        className={"w-full group text-2xl font-normal rounded-full p-0"}
        variant="ghost"
        asChild
      >
        <Link href="/occ" aria-label="Go OCC List">
          <span className="font-cursive mr-2">mini</span>
          COMPONENTS
          <span className="font-mono ml-2 group-hover:translate-x-2 transition-all duration-300">
            {"~>"}
          </span>
        </Link>
      </Button>

      <section className="pr-10 relative flex justify-center">
        <Carousel
          slides={occ}
          options={OPTIONS_DRAFT}
          className="w-full h-[16rem]"
          autoplay={false}
        >
          <CarouselContent slides={occ} axis="y" />
        </Carousel>
      </section>
    </div>
  );
}
