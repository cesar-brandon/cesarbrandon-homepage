import Carousel from "@/components/carousel/carousel";
import { EmblaOptionsType } from "embla-carousel-react";
import LastPost from "@/components/layouts/LastPost";
import { getProjects } from "@/services/fetch-projects";
import LastOCC from "@/components/layouts/last-occ";
import CarouselContent from "@/components/carousel/carousel-content";
import { getLastPosts } from "@/services/fetch-posts";

const OPTIONS_PROJECT: EmblaOptionsType = { loop: true };

export default async function Home() {
  const projects = await getProjects();
  const postTitles = await getLastPosts();

  return (
    <div className="flex flex-col gap-4 mb-10">
      <section className="relative bg-white dark:bg-border/50 rounded-3xl p-6">
        <Carousel slides={projects} options={OPTIONS_PROJECT}>
          <CarouselContent slides={projects} />
        </Carousel>
      </section>
      <div className="grid md:grid-cols-2 gap-4">
        <LastPost postTitles={postTitles} />
        <LastOCC />
      </div>
    </div>
  );
}
