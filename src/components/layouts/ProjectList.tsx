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

  // Separar proyectos por tipo (asumiendo que projectType 1 = propios, 2 = freelance)
  const ownProjects = projects.filter(project => project.projectType === 1);
  const freelanceProjects = projects.filter(project => project.projectType === 2);

  const ProjectScrollList = ({ title, projectList }: { title: string; projectList: Project[] }) => {
    if (projectList.length === 0) return null;

    return (
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-foreground decoration-clone font-cursive">{title}</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
          {projectList.map((project) => (
            <div key={project._id} className="flex-shrink-0">
              <PreviewProject post={project} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <ProjectScrollList title="Proyectos Desarrollados" projectList={ownProjects} />
      <ProjectScrollList title="Colaboraciones y Freelance" projectList={freelanceProjects} />
    </div>
  );
};

export default ProjectList;
