import urlFor from "@/lib/urlFor";
import React from "react";
import BlurImage from "./blur-image";
import ButtonLink from "./button-link";

type Props = {
  post: Post;
};

const PreviewProject: React.FC<Props> = ({ post }) => {
  return (
    <div className="relative w-full h-80 rounded-xl overflow-hidden group dark:border-none">
      <div className="relative w-full h-[80%] group-hover:h-[70%] transition-all duration-300 overflow-hidden">
        <BlurImage
          className="object-cover rounded-xl object-center border-none border-foreground dark:border-none"
          src={urlFor(post.mainImage).url()}
          alt={post.author.name}
          fill
        />
        <div
          className="absolute bottom-0 left-0 h-28 group-hover:h-36 w-full 
          bg-gradient-to-t from-background to-transparent transition-all duration-300"
        ></div>
      </div>
      <div
        className="absolute flex flex-col gap-2 h-28 bottom-0 
				bg-opacity-50 px-8 pb-8 transition-all duration-300 group-hover:-translate-y-16"
      >
        <p className="w-full text-2xl font-bold ">{post.title}</p>
        <p className="line-clamp-2">
          {post.description}
        </p>
        <ButtonLink
          className="mt-4 min-[692px]:mt-10 min-[860px]:mt-4"
          href={`/projects/${post.slug.current}`}
          text="Read More"
          ariaLabel="Read More"
          icon={<p className="font-mono ml-2">{"~>"}</p>}
        />
      </div>
    </div>
  );
};

export default PreviewProject;

