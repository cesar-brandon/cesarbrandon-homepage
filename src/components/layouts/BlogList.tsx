import { NoSymbolIcon } from "@heroicons/react/24/outline";
import React from "react";
import PreviewContent from "../common/PreviewContent";

type Props = {
  posts: Post[];
};

const BlogList: React.FC<Props> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="w-full h-72 flex flex-col items-center justify-center">
        <NoSymbolIcon className="stroke-foreground stroke-1 w-40 h-40" />
        No hay publicaciones por el momento
      </div>
    );
  }

  return (
    <div className="grid grid-cols-bloglist gap-3">
      {posts.map((post) => (
        <PreviewContent key={post._id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
