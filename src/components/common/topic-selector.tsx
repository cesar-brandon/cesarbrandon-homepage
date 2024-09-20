"use client";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { parseSearchParams } from "@/lib/url-state";

interface FilterProps {
  topics: Topic[];
}

export function TopicSelector({ topics }: FilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialFilters = parseSearchParams(Object.fromEntries(searchParams));
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    initialFilters.topics?.split(",") ?? [],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selectedTopics.length > 0) {
      params.set("topics", selectedTopics.join(","));
    } else {
      params.delete("topics");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, undefined);
  }, [selectedTopics, router]);

  return (
    <div className="pb-2 flex items-end justify-end">
      {topics.map((topic) => (
        <Badge
          key={topic._id}
          variant={"outline"}
          className={cn(
            "font-medium cursor-pointer transition-all duration-300",
            selectedTopics.includes(topic._id)
              ? `bg-secondary text-primary-foreground border-foreground dark:border-secondary`
              : "text-foreground border-foreground dark:border-foreground/30",
          )}
          onClick={() => {
            setSelectedTopics((prev) =>
              prev.includes(topic._id)
                ? prev.filter((t) => t !== topic._id)
                : [...prev, topic._id],
            );
          }}
        >
          {topic.title}
          {selectedTopics.includes(topic._id) && (
            <CheckCircle2 className="w-4 h-4 ml-1" />
          )}
        </Badge>
      ))}
    </div>
  );
}
