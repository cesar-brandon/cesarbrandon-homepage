import LastPost from "@/components/layouts/LastPost";
import Carousel from "@/components/common/carousel";
import { sanityClient } from "@/lib/sanity.client";
import { EmblaOptionsType } from "embla-carousel-react";
import { groq } from "next-sanity";

const query = groq`
		*[_type == "project"] {
				...,
				author->,
				topics[]->
		}| order(_createdAt desc)
`;

const OPTIONS_PROJECT: EmblaOptionsType = { loop: true };
const OPTIONS_DRAFT: EmblaOptionsType = { axis: 'y', align: 'start', loop: true }

export default async function Home() {
  const projects = await sanityClient.fetch(query);

  return (
    <div className="flex flex-col gap-12">
      <section className="relative">
        <Carousel slides={projects} options={OPTIONS_PROJECT} />
      </section>
      <div className="grid md:grid-cols-2 gap-8">
        <LastPost />
        <div className="relative flex flex-col justify-center gap-10">
          <h2 className="text-2xl font-normal text-center">DRAFT</h2>
          <section className="pr-10 relative flex justify-center">
            <Carousel slides={projects} options={OPTIONS_DRAFT} className="w-full h-[16rem]" />
          </section>
        </div>
      </div>
    </div>
  );
}
