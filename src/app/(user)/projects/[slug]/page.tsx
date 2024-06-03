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

const ProjectPage = async ({ params: { slug } }: Props) => {
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
      <section className="relative h-96 w-full overflow-hidden rounded-xl">
        <Link href="/projects" className="absolute left-4 top-4 z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-12 w-12 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 19.5-15-15m0 0v11.25m0-11.25h11.25"
            />
          </svg>
        </Link>

        {project.mainImage && (
          <BlurImage
            className="mx-auto object-cover object-center"
            src={urlFor(project.mainImage).url()}
            alt={project.author.name}
            fill
          />
        )}
        <div className="absolute bottom-4 left-4 flex gap-4">
          {project.github && (
            <Link href={project.github} target="_blank">
              <Badge className="flex h-8 w-40 gap-2 overflow-hidden transition-all duration-300 hover:w-80">
                <GithubIcon className="h-[22px] w-[22px]" />
                <span className="w-full truncate">{project.github}</span>
              </Badge>
            </Link>
          )}
          {project.demo && (
            <Link href={project.demo} target="_blank">
              <Badge className="flex h-8 w-40 gap-2 overflow-hidden transition-all duration-300 hover:w-80">
                <LinkIcon className="h-[22px] w-[22px]" />
                <span className="w-full truncate">{project.demo}</span>
              </Badge>
            </Link>
          )}
        </div>
      </section>
      <div className="my-4 flex justify-between">
        <span className="text-sm font-light">
          {formatDate(project.publishedAt)}
        </span>
        <div className="flex gap-4">
          {Array.isArray(project.topics) &&
            project.topics.map((topic) => (
              <Badge key={topic.title} variant="secondary">
                {topic.title}
              </Badge>
            ))}
        </div>
      </div>
      <section className="flex gap-8">
        <div className="w-full">
          <PortableText value={project.body} components={RichTextComponents} />
        </div>
        <div className="flex w-full flex-col gap-5">
          <div className="h-60 w-full rounded border"></div>
          <div className="h-60 w-full rounded border"></div>
          <div className="h-60 w-full rounded border"></div>
          <div className="h-60 w-full rounded border"></div>
        </div>
      </section>
    </article>
  );
};

export default ProjectPage;
