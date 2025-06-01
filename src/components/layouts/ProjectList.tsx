import React from "react";
import PreviewProject from "../common/preview-project";
import { Coffee } from "lucide-react";

type Props = {
  projects: Project[];
};

const ProjectList: React.FC<Props> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex h-72 w-full flex-col items-center justify-center gap-4">
        <Coffee className="stroke-primary stroke-[1.4px] w-32 h-32" />
        <span>There are no projects at the moment</span>
      </div>
    );
  }

  return (
    <div className="flex grid-cols-projectlist flex-col gap-4 sm:grid">
      {projects &&
        projects.map((project) => (
          <PreviewProject key={project._id} post={project} />
        ))}
    </div>
  );
};

export default ProjectList;
