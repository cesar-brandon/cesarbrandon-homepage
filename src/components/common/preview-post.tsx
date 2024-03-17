import urlFor from "@/lib/urlFor";
import React from "react";
import { Separator } from "../ui/separator";
import BlurImage from "./blur-image";
import ButtonLink from "./button-link";

type Props = {
  post: Post;
};

const PreviewPost: React.FC<Props> = ({ post }) => {
  return (
    <>
      <Separator />
      <div className="relative flex w-full h-60 overflow-hidden group dark:border-none">
        <div className="w-[30%] h-full overflow-hidden  dark:border-none">
          <BlurImage
            className="block object-contain object-center"
            src={urlFor(post.mainImage).url()}
            alt={post.author.name}
            width={208}
            height={208}
          />
        </div>

        <div className="w-[50%] h-full flex flex-col justify-center gap-2 px-8 pb-8">
          <h3 className="text-2xl decoration-clone">{post.title}</h3>
          <p className="text-sm text-foreground dark:text-gray-300 line-clamp-3">
            Lorem ipsum dolor sit amet, qui minim labore.Lorem ipsum dolor sit
            amet, officia.lorem ipsum dolor sit amet, qui minim labore.Lorem
            ipsum dolor sit amet, officia.lorem ipsum dolor sit amet, qui minim
            labore. Lorem ipsum dolor sit amet, qui minim labore.Lorem ipsum
            dolor sit amet, officia.lorem ipsum dolor sit amet, qui minim
            laet, qui minim labore.
          </p>
        </div>
        <div className="w-[20%] relative">
          <div className="absolute left-0 bottom-0 w-28 h-10 rounded-full bg-foreground mb-6"/>
        </div>
      </div>
    </>
  );
};

export default PreviewPost;
