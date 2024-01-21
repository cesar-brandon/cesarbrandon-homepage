import React, { Suspense } from "react";
import { draftMode } from "next/headers";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity.client";
import BlogList from "@/components/layouts/BlogList";
import PreviewSuspense from "@/components/common/PreviewSuspense";
import PreviewList from "@/components/layouts/PreviewList";
import Loading from "./loading";

export const metadata = {
  title: "Blog",
  description: "Blog posts",
};

const query = groq`
		*[_type == "post"]{
				...,
				author->,
				topics[]->
		} | order(_createdAt desc)
`;

const Posts = async () => {
  const { isEnabled } = draftMode();
  if (isEnabled) {
    return (
      <PreviewSuspense fallback={<Loading />}>
        <PreviewList query={query} type={"blog"} />
      </PreviewSuspense>
    );
  }
  const posts = await sanityClient.fetch(query);

  return (
    <Suspense fallback={<Loading />}>
      <BlogList posts={posts} />
    </Suspense>
  );
};

export default Posts;
