import React, { Suspense } from "react";
import { draftMode } from "next/headers";
import BlogList from "@/components/layouts/BlogList";
import PreviewSuspense from "@/components/common/PreviewSuspense";
import PreviewList from "@/components/layouts/PreviewList";
import Loading from "./loading";
import { getPosts, queryAllPosts } from "@/services/fetch-posts";

export const metadata = {
  title: "Blog",
  description: "Blog posts",
};

const Posts = async () => {
  const { isEnabled } = draftMode();
  if (isEnabled) {
    return (
      <PreviewSuspense fallback={<Loading />}>
        <PreviewList query={queryAllPosts} type={"blog"} />
      </PreviewSuspense>
    );
  }

  const posts = await getPosts();

  return (
    <Suspense fallback={<Loading />}>
      <BlogList posts={posts} />
    </Suspense>
  );
};

export default Posts;
