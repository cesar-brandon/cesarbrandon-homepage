import ClientSideRoute from "@/components/common/ClientSideRoute";
import { sanityClient } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import { groq } from "next-sanity";
import Image from "next/image";

const query = groq`
		*[_type == "project"] {
				...,
				author->,
				topics[]->
		}| order(_createdAt desc)
`;

export default async function Home() {
  const projects = await sanityClient.fetch(query);

  return (
    <div className="flex gap-3 ">
      {projects.map((project: Post) => (
        <ClientSideRoute
          key={project._id}
          route={`/projects/${project.slug.current}`}
        >
          <div className="w-[50rem] h-96 overflow-hidden">
            <Image
              className="object-cover"
              src={urlFor(project.mainImage).url()}
              alt={project.author.name}
              width="1920"
              height="1080"
            />
          </div>
        </ClientSideRoute>
      ))}
    </div>
  );
}
