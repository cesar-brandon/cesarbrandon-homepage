import { OCCInfo } from "@/components/carousel/carousel-dialog-actions";
import Code from "@/components/carousel/carousel-dialog-code";
import { OCCItem } from "@/components/occ/occ-item";
import { occ } from "@/components/occ/occ-list";
import { Button } from "@/components/ui/button";
import { InfoIcon } from "lucide-react";

export default function OCCPage() {
  return (
    <div className="mb-20">
      <h1 className="font-mono text-center text-2xl mt-8 mb-24 flex gap-4 items-center justify-center">
        Open Custom Components
        <div className="group relative w-11">
          <Button
            className="relative w-11 text-xs rounded-full font-mono p-[0.8rem] bg-white dark:bg-background"
            variant="outline"
          >
            <InfoIcon />
          </Button>
          <OCCInfo />
        </div>
      </h1>
      <section className="grid md:grid-cols-2 gap-8">
        {occ.map((item, index) => (
          <OCCItem key={item._id} index={index} item={item}>
            {/* @ts-expect-error Server Component */}
            <Code code={item.code.code} />
          </OCCItem>
        ))}
      </section>
    </div>
  );
}
