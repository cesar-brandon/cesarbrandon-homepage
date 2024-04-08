import BlurImage from "@/components/common/blur-image";
import { GithubIcon } from "@/components/common/icons";
import RichTextComponents from "@/components/common/RichTextComponents";
import { Badge } from "@/components/ui/badge";
import { sanityClient } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import { formatDate } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import { LinkIcon } from "lucide-react";
import { groq } from "next-sanity";
import Link from "next/link";
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
  let project = {} as Project;
  try {
    project = await sanityClient.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching project: ", error);
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <article className="mb-10">
      <section className="w-full h-96 relative rounded-xl overflow-hidden">
        {project.mainImage && (
          <BlurImage
            className="object-cover object-center mx-auto"
            src={urlFor(project.mainImage).url()}
            alt={project.author.name}
            fill
          />
        )}
        <div className="absolute flex gap-4 bottom-4 left-4">
          {project.github && (
            <Link href={project.github} target="_blank">
              <Badge
                className="flex gap-2 h-8 w-40 hover:w-80 overflow-hidden
              transition-all duration-300"
              >
                <GithubIcon className="w-[22px] h-[22px]" />
                <span className="w-full truncate">{project.github}</span>
              </Badge>
            </Link>
          )}
          {project.demo && (
            <Link href={project.demo} target="_blank">
              <Badge
                className="flex gap-2 h-8 w-40 hover:w-80 overflow-hidden
              transition-all duration-300"
              >
                <LinkIcon className="w-[22px] h-[22px]" />
                <span className="w-full truncate">{project.demo}</span>
              </Badge>
            </Link>
          )}
        </div>
      </section>
      <div className="flex justify-between my-4">
        <span className="font-light text-sm">
          {formatDate(project.publishedAt)}
        </span>
        <div className="flex gap-4">
          {Array.isArray(project.topics) &&
            project.topics.map((topic, index) => (
              <Badge key={index} className="bg-secondary">
                {topic.title}
              </Badge>
            ))}
        </div>
      </div>
      <section className="gap-8 flex">
        <div className="w-full">
          <PortableText value={project.body} components={RichTextComponents} />
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full h-60 border rounded"></div>
          <div className="w-full h-60 border rounded"></div>
          <div className="w-full h-60 border rounded"></div>
          <div className="w-full h-60 border rounded"></div>
        </div>
      </section>
    </article>
  );
};

export default ProyectPage;
