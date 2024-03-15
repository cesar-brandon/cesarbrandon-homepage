import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  axis: string;
}

export function CarouselLoader({ axis }: Props) {
  return (
    <Skeleton
      className={`rounded-lg ${!axis ? "w-full h-96" : "w-full h-[15rem]"} overflow-hidden`}
    />
  );
}
