import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="grid grid-cols-bloglist gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="w-full h-80 rounded-xl" />
      ))}
    </div>
  );
}
