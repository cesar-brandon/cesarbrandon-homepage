import React from "react";
import PreviewProject from "../common/preview-project";
import { Coffee } from "lucide-react";

type Props = {
  projects: Project[];
};

const OWNERSHIP_SECTIONS: { key: "own" | "freelance"; title: string }[] = [
  { key: "own", title: "Developed projects" },
  { key: "freelance", title: "Collaborations and freelance" },
];

function projectsForOwnership(
  projects: Project[],
  ownership: "own" | "freelance",
) {
  return projects.filter((p) => p.ownership === ownership);
}

const ProjectList: React.FC<Props> = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="flex h-72 w-full flex-col items-center justify-center gap-4">
        <Coffee className="stroke-primary stroke-[1.4px] h-32 w-32" />
        <span>There are no projects at the moment</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {OWNERSHIP_SECTIONS.map(({ key: ownershipKey, title: sectionTitle }) => {
        const list = projectsForOwnership(projects, ownershipKey);
        if (list.length === 0) return null;

        return (
          <section key={ownershipKey} className="space-y-4">
            <h2 className="font-cursive text-2xl font-bold text-foreground decoration-clone">
              {sectionTitle}
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
              {list.map((project) => (
                <div key={project._id} className="flex-shrink-0">
                  <PreviewProject post={project} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default ProjectList;
