import { NoSymbolIcon } from "@heroicons/react/24/outline";
import React from "react";
import PreviewProject from "../common/preview-project";

type Props = {
  projects: Project[];
};

const ProjectList: React.FC<Props> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex h-72 w-full flex-col items-center justify-center gap-4">
        <NoSymbolIcon className="h-40 w-40 stroke-primary stroke-1" />
        <span>There are no projects at the moment</span>
      </div>
    );
  }

  return (
    <div className="flex grid-cols-projectlist flex-col gap-6 sm:grid">
      {projects &&
        projects.map((project) => (
          <PreviewProject key={project._id} post={project} />
        ))}
    </div>
  );
};

export default ProjectList;
