import ClientSideRoute from "@/components/common/ClientSideRoute";
import BlurImage from "@/components/common/blur-image";
import urlFor from "@/lib/urlFor";

interface Props {
  _id?: string;
  slug?: { current: string };
  mainImage: string | MainImage;
  title?: string;
  description?: string;
}

export function CarouselItemX({ _id, slug, mainImage, title, description }: Props) {
  const route = slug ? `/projects/${slug.current}` : "/projects/default";
  const ariaLabel = slug ? `View ${slug.current}` : "View default";

  return (
    <ClientSideRoute key={_id} route={route} ariaLabel={ariaLabel}>
      <div className={"w-[50rem] h-96 overflow-visible relative"}>
        <BlurImage
          src={urlFor(mainImage).url()}
          alt={ariaLabel}
          width="1920"
          height="1080"
          className="object-cover rounded-xl border"
        />
        <div className="absolute bottom-5 -left-5 flex flex-col gap-2 z-20">
          {title && (
            <div className="w-fit bg-foreground/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <h3 className="text-background text-sm font-medium">
                {title}
              </h3>
            </div>
          )}
          {description && (
            <div className="max-w-xs bg-foreground/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <p className="text-background text-xs line-clamp-1">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </ClientSideRoute>
  );
}
