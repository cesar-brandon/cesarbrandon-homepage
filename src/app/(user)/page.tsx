import Carousel from "@/components/layouts/Carousel";
import LastPost from "@/components/layouts/LastPost";
import { sanityClient } from "@/lib/sanity.client";
import { groq } from "next-sanity";

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
    <div className="flex flex-col gap-12">
      <Carousel projects={projects} />
      <div className="grid md:grid-cols-2 gap-8">
        <LastPost />
        <div className="bg-zinc-300">2</div>
      </div>
    </div>
  );
}
