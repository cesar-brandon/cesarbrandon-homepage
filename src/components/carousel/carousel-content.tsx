import { CarouselItemX } from "./carousel-item-x";
import CarouselItemY from "./carousel-item-y";

interface Props {
  slides: (Post | Project | OCC)[];
  axis?: string;
}

export default function CarouselContent({ slides, axis }: Props) {
  return (
    <div className={`${!axis ? "flex gap-10" : "h-full"}`}>
      {slides &&
        slides.map(({ _id, slug, title, mainImage }: Post | Project | OCC) =>
          axis ? (
            <CarouselItemY
              key={_id}
              _id={_id}
              mainImage={mainImage}
              title={title}
            />
          ) : (
            <CarouselItemX
              key={_id}
              _id={_id}
              slug={slug}
              mainImage={mainImage}
            />
          ),
        )}
    </div>
  );
}
