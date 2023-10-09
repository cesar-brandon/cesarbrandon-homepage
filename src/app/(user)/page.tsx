import LastPost from "@/components/layouts/LastPost";
import Carousel from "@/components/common/carousel";
import { sanityClient } from "@/lib/sanity.client";
import { EmblaOptionsType } from "embla-carousel-react";
import { groq } from "next-sanity";
import ButtonLink from "@/components/common/button-link";

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
          <ButtonLink
            className="group text-2xl font-normal"
            href="/projects" variant="ghost" text="DRAFTS" ariaLabel="View All Drafts"
            icon={<span className="font-mono ml-2 group-hover:translate-x-2 transition-all duration-300">{"~>"}</span>} />
          <section className="pr-10 relative flex justify-center">
            <Carousel slides={projects} options={OPTIONS_DRAFT} className="w-full h-[16rem]" />
          </section>
        </div>
      </div>
    </div>
  );
}
