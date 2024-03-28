import { NoSymbolIcon } from "@heroicons/react/24/outline";
import React from "react";
import ClientSideRoute from "../common/ClientSideRoute";
import PreviewPost from "../common/preview-post";

type Props = {
  posts: Post[];
};

const BlogList: React.FC<Props> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className="w-full h-72 flex flex-col items-center justify-center gap-4">
        <NoSymbolIcon className="stroke-primary stroke-1 w-40 h-40" />
        No hay publicaciones por el momento
      </div>
    );
  }

  return (
    <div className="grid grid-cols-bloglist gap-6">
      {posts.map((post: Post, index) => (
        <ClientSideRoute
          key={index}
          route={`/posts/${post.slug.current}`}
          ariaLabel={`View ${post.title}`}
        >
          <PreviewPost key={post._id} post={post} />
        </ClientSideRoute>
      ))}
    </div>
  );
};

export default BlogList;
