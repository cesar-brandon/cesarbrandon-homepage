import LastPost from "@/components/layouts/LastPost";
import Carousel from "@/components/carousel/carousel";
import { sanityClient } from "@/lib/sanity.client";
import { EmblaOptionsType } from "embla-carousel-react";
import { groq } from "next-sanity";
import LastDraft from "@/components/layouts/last-draft";

const query = groq`
		*[_type == "project"] {
				...,
				author->,
				topics[]->
		}| order(_createdAt desc)
`;

const OPTIONS_PROJECT: EmblaOptionsType = { loop: true };

export default async function Home() {
  let projects = [] as Post[] | Project[];

  try {
    projects = await sanityClient.fetch(query);
  } catch (error) {
    console.error("Error fetching posts: ", error);
  }

  return (
    <div className="flex flex-col gap-12 mb-10">
      <section className="relative">
        <Carousel slides={projects} options={OPTIONS_PROJECT} />
      </section>
      <div className="grid md:grid-cols-2 gap-8">
        <LastPost />
        <LastDraft/>
      </div>
    </div>
  );
}
