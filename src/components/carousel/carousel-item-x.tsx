import ClientSideRoute from "@/components/common/ClientSideRoute";
import BlurImage from "@/components/common/blur-image";
import urlFor from "@/lib/urlFor";

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
          className="object-cover rounded-xl"
        />
      </div>
    </ClientSideRoute>
  );
}
