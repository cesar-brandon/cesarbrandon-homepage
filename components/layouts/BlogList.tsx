import React from "react";
import PreviewProject from "../common/PreviewProject";

type Props = {
  posts: Post[];
};

const BlogList: React.FC<Props> = ({ posts }) => {
  return (
    <div className="grid grid-cols-bloglist gap-3">
      {posts.map((post) => (
        <PreviewProject key={post._id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
