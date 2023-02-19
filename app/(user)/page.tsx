import { previewData } from "next/headers";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity.client";
import PreviewBlogList from "@/components/layouts/PreviewBlogList";
import BlogList from "@/components/layouts/BlogList";
import PreviewSuspense from "@/components/common/PreviewSuspense";

const query = groq`
		*[_type == "post"]{
				...,
				author->,
				categories[]->
		} | order(_createdAt desc)
`;

export default async function Home() {
  if (previewData()) {
    return (
      <PreviewSuspense fallback={<div>Loading...</div>}>
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }
  const posts = await sanityClient.fetch(query);

  return (
    <main className="w-screen h-screen px-10">
      <BlogList posts={posts} />
    </main>
  );
}
