import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div>
      <div className="pb-2 flex items-end justify-end">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-20 h-6 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-projectlist gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-80 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
