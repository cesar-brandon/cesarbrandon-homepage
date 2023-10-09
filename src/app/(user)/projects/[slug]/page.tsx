import BlurImage from "@/components/common/blur-image";
import RichTextComponents from "@/components/common/RichTextComponents";
import { sanityClient } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 30;

export async function generateStaticParams() {
  const query = groq`*[_type == "project"]
		{
				slug
		}`;

  const slugs: Project[] = await sanityClient.fetch(query);
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({ slug }));
}

const query = groq`
		*[_type == "project" && slug.current == $slug][0]{
				...,
				author->, 
				topics[]->
		}
`;

const ProyectPage = async ({ params: { slug } }: Props) => {
  const project: Project = await sanityClient.fetch(query, { slug });

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <article>
      <section className="w-full h-96 relative  overflow-hidden">
        {project.mainImage && (
          <BlurImage
            className="object-cover object-center mx-auto"
            src={urlFor(project.mainImage).url()}
            alt={project.author.name}
            fill
          />
        )}
      </section>
      <PortableText value={project.body} components={RichTextComponents} />
    </article>
  );
};

export default ProyectPage;
