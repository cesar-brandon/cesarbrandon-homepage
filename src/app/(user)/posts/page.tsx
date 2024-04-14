import React, { Suspense } from "react";
import { draftMode } from "next/headers";
import BlogList from "@/components/layouts/BlogList";
import PreviewList from "@/components/layouts/PreviewList";
import Loading from "./loading";
import { getPosts, queryAllPosts } from "@/services/fetch-posts";

export const metadata = {
  title: "Blog",
  description: "Blog posts",
};

const Posts = async () => {
  const posts = await getPosts();

  return draftMode().isEnabled ? (
    <Suspense fallback={<Loading />}>
      <PreviewList initial={posts} query={queryAllPosts} type={"blog"} />
    </Suspense>
  ) : (
    <Suspense fallback={<Loading />}>
      <BlogList posts={posts} />
    </Suspense>
  );
};

export default Posts;
