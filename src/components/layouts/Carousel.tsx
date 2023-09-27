"use client";

import urlFor from "@/lib/urlFor";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import React, { use, useCallback, useEffect, useState } from "react";
import ClientSideRoute from "../common/ClientSideRoute";

interface Props {
  projects: Post[];
}

const Carousel: React.FC<Props> = ({ projects }) => {
  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);

  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
    },
    [Autoplay({ delay: 3000 })]
  );

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);
  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevButton(!embla.canScrollPrev());
    setNextButton(!embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
    return () => embla.destroy();
  }, [embla, onSelect]);

  return (
    <div className="overflow-hidden relative border-2 border-black rounded-lg z-[1]">
      <div ref={emblaRef}>
        <div className="flex">
          {projects.map((project: Post) => (
            <ClientSideRoute
              key={project._id}
              route={`/projects/${project.slug.current}`}
            >
              <div className="w-[50rem] h-96 overflow-hidden">
                <Image
                  className="object-cover"
                  src={urlFor(project.mainImage).url()}
                  alt={project.author.name}
                  width="1920"
                  height="1080"
                />
              </div>
            </ClientSideRoute>
          ))}
        </div>
      </div>
      <button
        className="absolute w-14 h-full flex items-center justify-center
								   left-0 top-1/2 transform -translate-y-1/2"
        disabled={prevButton}
        onClick={scrollPrev}
      >
        <ChevronLeftIcon className="w-8 h-8 text-black" />
      </button>
      <button
        className="absolute w-14 h-full flex items-center justify-center
								   right-0 top-1/2 transform -translate-y-1/2"
        disabled={nextButton}
        onClick={scrollNext}
      >
        <ChevronRightIcon className="w-8 h-8 text-black" />
      </button>
    </div>
  );
};

export default Carousel;
