import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  const ProjectScrollSkeleton = ({ title }: { title: string }) => (
    <div className="space-y-1">
      <Skeleton className="h-8 w-48 rounded-md" />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex-shrink-0">
            <Skeleton className="w-[300px] h-[300px] rounded-3xl" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className="pb-2 flex items-start justify-start">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-20 h-6 rounded-full" />
        ))}
      </div>
      <div className="space-y-4">
        <ProjectScrollSkeleton title="Developed Projects" />
        <ProjectScrollSkeleton title="Collaborations and Freelance" />
      </div>
    </div>
  );
}
