"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { parseSearchParams } from "@/lib/url-state";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const PLATFORM_OPTIONS: { value: "web" | "mobile"; label: string }[] = [
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
];

export function ProjectFilterSelector() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initial = parseSearchParams(Object.fromEntries(searchParams));

  const [selectedPlatform, setSelectedPlatform] = useState<string[]>(
    initial.platform?.split(",").filter(Boolean) ?? [],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    params.delete("ownership");
    params.delete("topics");

    if (selectedPlatform.length > 0) {
      params.set("platform", selectedPlatform.join(","));
    } else {
      params.delete("platform");
    }

    const qs = params.toString();
    const newUrl = qs ? `${pathname}?${qs}` : pathname;
    router.push(newUrl);
  }, [selectedPlatform, router, pathname]);

  const togglePlatform = (value: string) => {
    setSelectedPlatform((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  return (
    <div className="mb-4">
      <p className="mb-1 text-xs text-muted-foreground">Platform</p>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex items-start justify-start gap-1 p-1 pb-2">
          {PLATFORM_OPTIONS.map(({ value, label }) => (
            <Badge
              key={value}
              variant={
                selectedPlatform.includes(value) ? "appleSelected" : "apple"
              }
              className="cursor-pointer bg-card hover:scale-105 active:scale-95"
              onClick={() => togglePlatform(value)}
            >
              {label}
              {selectedPlatform.includes(value) && (
                <CheckCircle2 className="ml-2 h-4 w-4 opacity-80" />
              )}
            </Badge>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
