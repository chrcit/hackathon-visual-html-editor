import { useEditorStore } from "@/state/editor";
import { useEffect } from "react";

export function useHighlight() {
  const hoveredId = useEditorStore((s) => s.hoveredId);
  const selectedId = useEditorStore((s) => s.selectedId);
  const iframe = useEditorStore((s) => s.iframe);

  useEffect(() => {
    const doc = iframe?.contentWindow?.document;

    if (doc) {
      doc.body.querySelectorAll(".is-selected").forEach((el) => el.classList.remove("is-selected"));
      doc.body.querySelectorAll(".is-hovered").forEach((el) => el.classList.remove("is-hovered"));

      doc.querySelector(`[data-node-id="${hoveredId}"]`)?.classList.add("is-hovered");
      doc.querySelector(`[data-node-id="${selectedId}"]`)?.classList.add("is-selected");
    }
  }, [hoveredId, selectedId, iframe]);
}
