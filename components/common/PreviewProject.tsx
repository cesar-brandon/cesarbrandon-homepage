import urlFor from "@/lib/urlFor";
import Image from "next/image";
import React from "react";

type Props = {
  post: Post;
};

const PreviewProject: React.FC<Props> = ({ post }) => {
  return (
    <div
      className="relative w-full h-80 drop-shadow-xl
					rounded-lg overflow-hidden group"
    >
      <Image
        className="object-cover object-center"
        src={urlFor(post.mainImage).url()}
        alt={post.author.name}
        fill
      />
      <div
        className="absolute bottom-0 w-full h-16
				bg-gray-800 backdrop-filter backdrop-blur-sm 
				bg-opacity-50 flex items-center pl-4 transition-all duration-300
				opacity-0 group-hover:opacity-100"
      >
        {post.categories.map((category) => (
          <span
            key={category.title}
            className="text-xs text-white bg-gray-900 px-2 py-1 rounded-md"
          >
            {category.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PreviewProject;
