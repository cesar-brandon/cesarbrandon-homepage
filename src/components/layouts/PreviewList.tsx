"use client";

import React from "react";
import { usePreview } from "@/lib/sanity.preview";
import BlogList from "./BlogList";
import ProjectList from "./ProjectList";

type Props = {
  query: string;
  type: string;
};

const PreviewList: React.FC<Props> = ({ query, type }) => {
  const content = usePreview(null, query);

  return (
    <>
      {type === "blog" ? (
        <BlogList posts={content} />
      ) : (
        <ProjectList projects={content} />
      )}
    </>
  );
};

export default PreviewList;
