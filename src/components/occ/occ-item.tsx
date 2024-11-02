"use client";
import { OCCHeader } from "./occ-header";
import { useState } from "react";

interface Props {
  index: number;
  item: OCC;
  children: React.ReactNode;
}

export function OCCItem({ index, item, children }: Props) {
  const [codeMode, setCodeMode] = useState(false);

  return (
    <div key={item._id} className="relative w-full">
      <OCCHeader
        item={item}
        handleMode={setCodeMode}
        codeMode={codeMode}
        index={index}
      />
      <div
        className={`relative w-full h-[25rem] rounded-3xl border flex items-center justify-center m-auto ${
          codeMode
            ? "overflow-y-auto overflow-x-auto"
            : "overflow-y-auto bg-card"
        }`}
      >
        {codeMode ? <>{children}</> : <>{item.component}</>}
      </div>
    </div>
  );
}
