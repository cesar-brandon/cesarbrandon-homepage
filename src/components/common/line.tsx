import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export default function Line({ className }: Props) {
  return <div className={cn("absolute w-[20rem] border-b-4 border-black", className)}></div>
}
