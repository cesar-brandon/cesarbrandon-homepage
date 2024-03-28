import urlFor from "@/lib/urlFor";
import React from "react";
import { Separator } from "../ui/separator";
import BlurImage from "./blur-image";

type Props = {
  post: Post;
};

const PreviewPost: React.FC<Props> = ({ post }) => {
  return (
    <>
      <Separator />
      <div className="group relative flex w-full md:h-60 overflow-hidden group dark:border-none gap-4 sm:gap-0 hover:cursor-pointer">
        <div className="w-[50%] sm:w-[30%] h-full overflow-hidden  dark:border-none">
          <BlurImage
            className="block object-contain object-center"
            src={urlFor(post.mainImage).url()}
            alt={post.author.name}
            width={208}
            height={208}
          />
        </div>

        <div className="w-full md:w-[50%] h-full flex flex-col justify-center gap-2 sm:px-8 sm:pb-8">
          <h3 className="text-xl md:text-2xl decoration-clone">{post.title}</h3>
          <p className="text-sm text-foreground dark:text-gray-300 line-clamp-3">
            Lorem ipsum dolor sit amet, qui minim labore.Lorem ipsum dolor sit
            amet, officia.lorem ipsum dolor sit amet, qui minim labore.Lorem
            ipsum dolor sit amet, officia.lorem ipsum dolor sit amet, qui minim
            labore. Lorem ipsum dolor sit amet, qui minim labore.Lorem ipsum
            dolor sit amet, officia.lorem ipsum dolor sit amet, qui minim laet,
            qui minim labore.
          </p>
        </div>
        <div className="w-[20%] relative hidden md:block">
          <span className="font-mono absolute left-7 bottom-10 text-5xl text-primary group-hover:text-secondary group-hover:translate-x-2 transition-all duration-300">
            {"~~>"}
          </span>
          {/* <span className="absolute left-7 bottom-10 text-5xl z-[2] hidden group-hover:block">🦆</span>
          <div className="absolute left-0 bottom-0 w-28 h-10 rounded-full bg-blue-400 dark:bg-blue-400/60 mb-6 z-[1]" /> */}
        </div>
      </div>
    </>
  );
};

export default PreviewPost;
