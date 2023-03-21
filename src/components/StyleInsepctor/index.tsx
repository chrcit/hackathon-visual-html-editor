import { useEditorStore } from "@/state/editor";
import { SliderInput } from "@/components/SliderInput";
import { useState } from "react";
import StylesPanel from "./StylesPanel";

export default function StyleInsepctor({}) {
  console.count("StyleInsepctor");
  const selectedId = useEditorStore((state) => state.selectedId);

  return (
    <div className="w-full h-full flex flex-col">
      <h3 className={"px-5 pb-2 flex items-center gap-1 font-semibold"}>Inspector</h3>

      <div className="px-5">
        {selectedId ? (
          <StylesPanel key={selectedId} selectedId={selectedId} />
        ) : (
          <div className="px-8 py-2 border-y-[1px] border-black/10 text-xs font-medium text-gray-400">
            Select Element
          </div>
        )}
      </div>
    </div>
  );
}
