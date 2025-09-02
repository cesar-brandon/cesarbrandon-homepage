"use client";
import React, { useCallback } from "react";
import useEmblaCarousel, {
  EmblaOptionsType,
  EmblaCarouselType,
} from "embla-carousel-react";
import {
  DotButton,
  useDotButton,
} from "@/components/carousel/carousel-dot-button";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "@/components/carousel/carousel-arrow-buttons";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { CarouselLoader } from "./carousel-loader";

type PropType = {
  slides: Post[] | Project[] | OCC[];
  options?: EmblaOptionsType;
  className?: string;
  children: React.ReactNode;
  autoplay?: boolean;
};

const Carousel: React.FC<PropType> = (props) => {
  const { slides, options, className, children, autoplay = true } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    ...(autoplay ? [Autoplay({ delay: 5000 })] : []),
  ]);

  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins();
    if (!autoplay) return;
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onButtonClick,
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onButtonClick);

  const axis = options?.axis as string;

  if (!slides || slides.length === 0) {
    return <CarouselLoader axis={axis} />;
  }

  return (
    <div className={cn("overflow-hidden rounded-xl z-[1]", className)}>
      {/* {!axis && (
        <>
          <motion.div
            animate={{ translateY: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -right-6 top-8 bg-primary h-4 md:h-6 xl:h-8 w-10 md:w-16 z-[1]"
          />
          <motion.div
            animate={{ translateY: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -right-12 top-[4rem] bg-primary h-4 w-6 z-10"
          />

          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute -left-10 bottom-10 w-20 h-20 z-10"
          >
            <Sticker type="asterisk" className="w-full h-full" />
          </motion.div>
        </>
      )} */}
      <div className="h-full" ref={emblaRef}>
        {children}
      </div>

      {!axis && (
        <>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </>
      )}

      {axis && (
        <div className="h-full w-3 flex justify-center flex-col gap-1 absolute right-0 top-0">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "w-full h-3 rounded-full transition-all duration-300 ease-in-out",
                index === selectedIndex
                  ? "bg-accent-foreground dark:bg-accent  h-full"
                  : "bg-accent-foreground/50 dark:bg-accent/50 hover:bg-accent-foreground dark:hover:bg-accent",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
