import Carousel from "@/components/carousel/carousel";
import { EmblaOptionsType } from "embla-carousel-react";
import LastDraft from "@/components/layouts/last-draft";
import LastPost from "@/components/layouts/LastPost";
import { getLastPosts } from "@/services/fetch-posts";
import { getProjects } from "@/services/fetch-projects";

const OPTIONS_PROJECT: EmblaOptionsType = { loop: true };

export default async function Home() {
  const projects = await getProjects();
  const postTitles = await getLastPosts();

  return (
    <div className="flex flex-col gap-12 mb-10">
      <section className="relative">
        <Carousel slides={projects} options={OPTIONS_PROJECT} />
      </section>
      <div className="grid md:grid-cols-2 gap-8">
        <LastPost postTitles={postTitles} />
        <LastDraft />
      </div>
    </div>
  );
}
