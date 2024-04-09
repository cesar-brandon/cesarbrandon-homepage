import BlurImage from "@/components/common/blur-image";
import urlFor from "@/lib/urlFor";
import { CarouselDialog } from "./carousel-dialog";
import { occ } from "../occ/occ-list";

interface Props {
  _id?: string;
  slug?: { current: string };
  mainImage: string | MainImage;
  title?: string;
}

export default function CarouselItemY({
  _id,
  mainImage,
  title = "Draft",
}: Props) {
  const src =
    typeof mainImage === "string" ? mainImage : urlFor(mainImage).url();

  return (
    <CarouselDialog slides={occ}>
      <div className={"w-full h-full overflow-hidden"}>
        <BlurImage
          src={src}
          alt={title}
          width="1920"
          height="1080"
          className="object-cover"
          aria-label={title}
        />
      </div>
    </CarouselDialog>
  );
}
