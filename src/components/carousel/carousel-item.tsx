import ClientSideRoute from "@/components/common/ClientSideRoute";
import BlurImage from "@/components/common/blur-image";
import urlFor from "@/lib/urlFor";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface Props {
  _id?: string;
  slug?: { current: string };
  mainImage: Image;
  title?: string;
}

export function CarouselItemX({ _id, slug, mainImage }: Props) {
  const route = slug ? `/projects/${slug.current}` : '/projects/default';
  const ariaLabel = slug ? `View ${slug.current}` : 'View default';

  return (
    <ClientSideRoute
      key={_id}
      route={`/projects/${route}`}
      ariaLabel={`View ${route}`}
    >
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

export function CarouselItemY({ mainImage, title = "Draft" }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className={"w-full h-full overflow-hidden"}>
          <BlurImage
            src={""}
            alt={title}
            width="1920"
            height="1080"
            className="object-cover"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="">hello</DialogContent>
    </Dialog>
  );
}
