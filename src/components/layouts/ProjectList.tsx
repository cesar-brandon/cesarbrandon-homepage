import React from "react";
import PreviewContent from "../common/PreviewContent";

type Props = {
  projects: Post[];
};

const ProjectList: React.FC<Props> = ({ projects }) => {
  return (
    <div className="grid grid-cols-bloglist gap-3">
      {projects.map((project) => (
        <PreviewContent post={project} />
      ))}
    </div>
  );
};

export default ProjectList;
