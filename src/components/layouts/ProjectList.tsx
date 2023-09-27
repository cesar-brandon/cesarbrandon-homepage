import React from "react";
import ClientSideRoute from "../common/ClientSideRoute";
import PreviewContent from "../common/PreviewContent";

type Props = {
  projects: Post[];
};

const ProjectList: React.FC<Props> = ({ projects }) => {
  return (
    <div className="grid grid-cols-bloglist gap-3">
      {projects.map((project) => (
        <ClientSideRoute
          key={project._id}
          route={`/projects/${project.slug.current}`}
        >
          <PreviewContent post={project} />
        </ClientSideRoute>
      ))}
    </div>
  );
};

export default ProjectList;
