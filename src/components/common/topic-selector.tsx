"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { parseSearchParams } from "@/lib/url-state";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
    <ScrollArea className="w-full whitespace-nowrap mb-2">
      <div className="pb-2 flex items-start justify-start gap-1 p-1">
        {topics.map((topic) => (
          <Badge
            key={topic._id}
            variant={selectedTopics.includes(topic._id) ? "appleSelected" : "apple"}
            className="cursor-pointer hover:scale-105 active:scale-95 bg-card"
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
              <CheckCircle2 className="w-4 h-4 ml-2 opacity-80" />
            )}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
