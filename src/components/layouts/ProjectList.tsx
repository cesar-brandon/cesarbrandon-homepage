import { NoSymbolIcon } from "@heroicons/react/24/outline";
import React from "react";
import PreviewProject from "../common/preview-project";

type Props = {
  projects: Project[];
};

const ProjectList: React.FC<Props> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="w-full h-72 flex flex-col items-center justify-center">
        <NoSymbolIcon className="stroke-foreground stroke-1 w-40 h-40" />
        <span>No hay proyectos por el momento</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-projectlist gap-6">
      {projects &&
        projects.map((project) => (
          <PreviewProject key={project._id} post={project} />
        ))}
    </div>
  );
};

export default ProjectList;
