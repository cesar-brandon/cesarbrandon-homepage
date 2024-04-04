import ClientSideRoute from "@/components/common/ClientSideRoute";
import BlurImage from "@/components/common/blur-image";
import urlFor from "@/lib/urlFor";
import { CarouselDialog } from "./carousel-dialog";
import { occ } from "../occ/drafts";

interface Props {
  _id?: string;
  slug?: { current: string };
  mainImage: string | MainImage;
  title?: string;
}

export function CarouselItemX({ _id, slug, mainImage }: Props) {
  const route = slug ? `/projects/${slug.current}` : "/projects/default";
  const ariaLabel = slug ? `View ${slug.current}` : "View default";

  return (
    <ClientSideRoute key={_id} route={route} ariaLabel={ariaLabel}>
      <div className={"w-[50rem] h-96 overflow-hidden"}>
        <BlurImage
          src={urlFor(mainImage).url()}
          alt={ariaLabel}
          width="1920"
          height="1080"
          className="object-cover"
        />
      </div>
    </ClientSideRoute>
  );
}

export function CarouselItemY({ _id, mainImage, title = "Draft" }: Props) {
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
        />
      </div>
    </CarouselDialog>
  );
}
