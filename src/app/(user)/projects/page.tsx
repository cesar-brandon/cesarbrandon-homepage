import React from "react";
import { draftMode } from "next/headers";
import PreviewSuspense from "@/components/common/PreviewSuspense";
import PreviewList from "@/components/layouts/PreviewList";
import ProjectList from "@/components/layouts/ProjectList";
import { getProjects, query } from "@/services/fetch-projects";

export const metadata = {
  title: "Projects",
  description: "A list of all projects",
};

const Projects = async () => {
  const { isEnabled } = draftMode();
  if (isEnabled) {
    return (
      <PreviewSuspense fallback={<div>Loading...</div>}>
        <PreviewList query={query} type={"project"} />
      </PreviewSuspense>
    );
  }
  const projects = await getProjects();

  return <ProjectList projects={projects} />;
};

export default Projects;
