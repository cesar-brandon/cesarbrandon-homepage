import React, { Suspense } from "react";
import { draftMode } from "next/headers";
import PreviewList from "@/components/layouts/PreviewList";
import ProjectList from "@/components/layouts/ProjectList";
import { getProjects, PROJECTS_QUERY } from "@/services/fetch-projects";
import Loading from "./loading";

export const metadata = {
  title: "Projects",
  description: "A list of all projects",
};

const Projects = async () => {
  const projects = await getProjects();

  return draftMode().isEnabled ? (
    <Suspense fallback={<Loading />}>
      <PreviewList query={PROJECTS_QUERY} initial={projects} type={"project"} />
    </Suspense>
  ) : (
    <Suspense fallback={<Loading />}>
      <ProjectList projects={projects} />
    </Suspense>
  );
};

export default Projects;
