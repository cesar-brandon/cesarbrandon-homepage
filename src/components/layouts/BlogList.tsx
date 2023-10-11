import React from "react";
import PreviewContent from "../common/PreviewContent";

type Props = {
  posts: Post[];
};

const BlogList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="grid grid-cols-bloglist gap-3">
      {posts.map((post) => (
        <PreviewContent key={post._id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
