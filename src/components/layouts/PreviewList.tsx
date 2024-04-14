"use client";

import { useQuery } from "@sanity/react-loader";
import { SanityDocument } from "next-sanity";
import React from "react";
import BlogList from "./BlogList";
import ProjectList from "./ProjectList";

type Props = {
  query: string;
  type: string;
  initial: Post[] | Project[];
};

const PreviewList: React.FC<Props> = ({ query, type, initial }) => {
  const { data } = useQuery<SanityDocument | null>(query, {
    initial,
  });
  if (!Array.isArray(data)) {
    return null;
  }
  return (
    <>
      {type === "blog" ? (
        <BlogList posts={data} />
      ) : (
        <ProjectList projects={data} />
      )}
    </>
  );
};

export default PreviewList;
