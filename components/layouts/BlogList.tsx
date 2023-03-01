import React from "react";
import ClientSideRoute from "../common/ClientSideRoute";
import PreviewProject from "../common/PreviewProject";

type Props = {
  posts: Post[];
};

const BlogList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="grid grid-cols-bloglist gap-3">
      {posts.map((post) => (
        <ClientSideRoute key={post._id} route={`/posts/${post.slug.current}`}>
          <PreviewProject post={post} />
        </ClientSideRoute>
      ))}
    </div>
  );
};

export default BlogList;
