import React, { Suspense } from "react";
import { draftMode } from "next/headers";
import PreviewList from "@/components/layouts/PreviewList";
import {
  getProjects,
  getTopics,
  PROJECTS_QUERY,
} from "@/services/fetch-projects";
import Loading from "./loading";
import { parseSearchParams } from "@/lib/url-state";
import { TopicSelector } from "@/components/common/topic-selector";
import ProjectList from "@/components/layouts/ProjectList";

export const metadata = {
  title: "Projects",
  description: "A list of all projects",
};

const Projects = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const projects = await getProjects();
  const topics = await getTopics();
  const parsedSearchParams = parseSearchParams(searchParams);
  const selectedTopics = parsedSearchParams.topics?.split(",");
  const filteredProjects = parsedSearchParams.topics
    ? projects.filter(
        (project) =>
          selectedTopics?.some((topic) =>
            project.topics.some((t) => t._id === topic),
          ),
      )
    : projects;

  return draftMode().isEnabled ? (
    <Suspense fallback={<Loading />}>
      <PreviewList query={PROJECTS_QUERY} initial={projects} type={"project"} />
    </Suspense>
  ) : (
    <Suspense fallback={<Loading />}>
      <TopicSelector topics={topics} />
      <ProjectList projects={filteredProjects} />
    </Suspense>
  );
};

export default Projects;
