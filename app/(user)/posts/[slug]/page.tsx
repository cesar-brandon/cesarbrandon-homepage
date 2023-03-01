import RichTextComponents from "@/components/common/RichTextComponents";
import { sanityClient } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 30;

export async function generateStaticParams() {
  const query = groq`*[_type == "post"]
		{
				slug
		}`;

  const slugs: Post[] = await sanityClient.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({ slug }));
}

const query = groq`
		*[_type == "post" && slug.current == $slug][0]{
				...,
				author->, 
				categories[]->
		}
`;

const PostPage = async ({ params: { slug } }: Props) => {
  const post: Post = await sanityClient.fetch(query, { slug });

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <article className="px-10 pb-28">
      <section className="w-full h-96 relative  overflow-hidden">
        {post.mainImage && (
          <Image
            className="object-cover object-center mx-auto"
            src={urlFor(post.mainImage).url()}
            alt={post.author.name}
            fill
          />
        )}
      </section>
      <PortableText value={post.body} components={RichTextComponents} />
    </article>
  );
};

export default PostPage;
