import React, { Suspense } from "react";
import { draftMode } from "next/headers";
import PreviewList from "@/components/layouts/PreviewList";
import { getProjects, PROJECTS_QUERY } from "@/services/fetch-projects";
import Loading from "./loading";
import { parseSearchParams } from "@/lib/url-state";
import { ProjectFilterSelector } from "@/components/common/project-filter-selector";
import ProjectList from "@/components/layouts/ProjectList";

export const metadata = {
  title: "Projects",
  description: "A list of all projects",
};

function filterProjectsByQuery(
  projects: Project[],
  parsed: ReturnType<typeof parseSearchParams>,
) {
  if (!parsed.platform) {
    return projects;
  }

  const allowed = new Set(parsed.platform.split(",").filter(Boolean));
  return projects.filter((p) => allowed.has(p.platform));
}

const Projects = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const projects = await getProjects();
  const parsedSearchParams = parseSearchParams(searchParams);
  const filteredProjects = filterProjectsByQuery(projects, parsedSearchParams);

  return draftMode().isEnabled ? (
    <Suspense fallback={<Loading />}>
      <PreviewList query={PROJECTS_QUERY} initial={projects} type={"project"} />
    </Suspense>
  ) : (
    <Suspense fallback={<Loading />}>
      <ProjectFilterSelector />
      <ProjectList projects={filteredProjects} />
    </Suspense>
  );
};

export default Projects;
