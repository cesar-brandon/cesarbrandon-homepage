import BlurImage from "@/components/common/blur-image";
import { GithubIcon, Icons } from "@/components/common/icons";
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
				topics[]->,
				github,
				demo,
				playStore,
				appStore
		}
`;

const ProjectPage = async ({ params: { slug } }: Props) => {
  let project = {} as Project;
  let projectBlocks = [] as Block[];
  let projectImages = [] as Block[];
  try {
    project = await sanityClient.fetch(query, { slug });
    projectBlocks = project.body.filter((block) => block._type === "block");
    projectImages = project.body.filter((block) => block._type === "image");
    
  } catch (error) {
    console.error("Error fetching project: ", error);
  }

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <article className="mb-10">
      <section className="relative h-96 w-full overflow-hidden rounded-xl">
        <Link
          href="/projects"
          className="group absolute left-0 top-0 p-2 z-10 bg-background/30 border border-background/30
          dark:border-foreground/30 hover:border-background/70 backdrop-blur rounded-xl rounded-br-3xl transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-12 w-12 text-background/70 dark:text-foreground/70 
            group-hover:text-background/90 dark:group-hover:text-foreground/90 
            transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
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
        <div className="absolute bottom-4 left-4 flex gap-3">
          {project.github && (
            <Link 
              href={project.github} 
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/20 transition-all hover:bg-black/60 hover:border-white/40 hover:scale-110"
              aria-label="Ver código en GitHub"
            >
              <GithubIcon className="h-5 w-5 text-white" />
            </Link>
          )}
          {project.demo && (
            <Link 
              href={project.demo} 
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/20 transition-all hover:bg-black/60 hover:border-white/40 hover:scale-110"
              aria-label="Ver demo en vivo"
            >
              <LinkIcon className="h-5 w-5 text-white" />
            </Link>
          )}
          {project.playStore && (
            <Link 
              href={project.playStore} 
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/20 transition-all hover:bg-black/60 hover:border-white/40 hover:scale-110"
              aria-label="Ver en Play Store"
            >
              <Icons.playStore className="h-5 w-5 text-white" />
            </Link>
          )}
          {project.appStore && (
            <Link 
              href={project.appStore} 
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/20 transition-all hover:bg-black/60 hover:border-white/40 hover:scale-110"
              aria-label="Ver en App Store"
            >
              <Icons.appStore className="h-5 w-5 text-white" />
            </Link>
          )}
        </div>
      </section>
      <div className="my-4 flex flex-col md:flex-row justify-between gap-2">
        <span className="text-sm font-light">
          {formatDate(project.publishedAt)}
        </span>
        <div className="flex gap-1">
          {Array.isArray(project.topics) &&
            project.topics.map((topic) => (
              <Link key={topic._id} href={`/projects?topics=${topic._id}`}>
                <Badge 
                  key={topic.title} 
                  variant="apple" 
                  className="cursor-pointer hover:scale-105 active:scale-95 bg-card"
                >
                  {topic.title}
                </Badge>
              </Link>
            ))}
        </div>
      </div>
      <section className="flex flex-col md:flex-row gap-8">
        <div className="md:w-[40%]">
          <PortableText value={projectBlocks} components={RichTextComponents} />
        </div>
        <div className="md:w-[60%] flex flex-col gap-5">
          <PortableText value={projectImages} components={RichTextComponents} />
        </div>
      </section>
    </article>
  );
};

export default ProjectPage;
