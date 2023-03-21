import { useDomTreeStore } from "@/state/dom-tree";
import { useEditorStore } from "@/state/editor";
import { getDomTree } from "@/utils/dom-tree";
import { injectIdsIntoDom } from "@/utils/inject-ids-into-dom";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Uploader from "./Uploader";
import { useHighlight } from "./use-highlight";

const PreviewDimensions = {
  mobile: {
    width: 375,
    height: 667,
  },
  tablet: {
    width: 768,
    height: 1024,
  },
  desktop: {
    width: 1440,
    height: 900,
  },
};

export default function Previewer({}) {
  const [domString, setDomString] = useState<string | null>(null);
  const [domWithIds, setDomWithIds] = useState<HTMLTemplateElement | null>(null);
  const [previewDimension, setPreviewDimension] = useState<keyof typeof PreviewDimensions>("desktop");
  const setDomTree = useDomTreeStore((s) => s.setDomTree);
  const [hoveredId, setHoveredId] = useEditorStore((s) => [s.hoveredId, s.setHoveredId]);
  const [selectedId, setSelectedId] = useEditorStore((s) => [s.selectedId, s.setSelectedId]);
  const setFilename = useEditorStore((s) => s.setFilename);
  const [iframe, setIframe] = useEditorStore((s) => [s.iframe, s.setIframe]);

  // highlight the relevant nodes
  useHighlight();

  useEffect(() => {
    console.count("Previewer In");

    const doc = iframe?.contentDocument;

    if (doc) {
      const handleClick = (e: Event) => {
        // prevent the click, so we don't actually trigger buttons when clicking on them for styling
        e.preventDefault();

        const target = e.target as HTMLElement;
        const nodeId = target?.getAttribute("data-node-id");
        const isSelected = selectedId === nodeId;

        setSelectedId(isSelected ? undefined : nodeId ?? undefined);
      };

      const handleOver = (e: Event) => {
        const target = e.target as HTMLElement;
        const nodeId = target?.getAttribute("data-node-id");
        const isHovered = nodeId === hoveredId;

        if (!isHovered) {
          setHoveredId(nodeId ?? undefined);
        }
      };

      const handleLeave = () => {
        setHoveredId(undefined);
      };

      doc.body.addEventListener("click", handleClick);
      doc.body.addEventListener("mouseover", handleOver);
      doc.body.addEventListener("mouseleave", handleLeave);

      return () => {
        doc.body.removeEventListener("click", handleClick);
        doc.body.removeEventListener("mouseover", handleOver);
        doc.body.removeEventListener("mouseleave", handleLeave);
      };
    }
  }, [selectedId, hoveredId, setHoveredId, setSelectedId, iframe]);

  useEffect(() => {
    if (domString) {
      const dom = document.createElement("template");
      dom.innerHTML = domString;
      if (dom) {
        injectIdsIntoDom(dom);
        setDomWithIds(dom);
      }
    }
  }, [domString, setDomWithIds]);

  useEffect(() => {
    if (domWithIds) {
      setDomTree(getDomTree(domWithIds.content));
    }
  }, [domWithIds, setDomTree]);

  return (
    <div
      className="w-full h-full"
      onClick={(e) => {
        setSelectedId(undefined);
      }}
    >
      <AnimatePresence>
        {domWithIds ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full p-10 flex flex-col gap-5 items-center justify-start"
          >
            <div className="flex flex-row gap-5">
              <button
                className={clsx(
                  "bg-gray p-3 hover:bg-slate-500 hover:text-white focus-visible:bg-slate-500 focus-visible:text-white transition-all",
                  previewDimension === "mobile" ? "bg-slate-500 text-white scale-75" : null,
                )}
                type="button"
                onClick={() => setPreviewDimension("mobile")}
              >
                Mobile
              </button>
              <button
                className={clsx(
                  "bg-gray p-3 hover:bg-slate-500 hover:text-white focus-visible:bg-slate-500 focus-visible:text-white transition-all",
                  previewDimension === "tablet" ? "bg-slate-500 text-white scale-75" : null,
                )}
                type="button"
                onClick={() => setPreviewDimension("tablet")}
              >
                Tablet
              </button>
              <button
                className={clsx(
                  "bg-gray p-3 hover:bg-slate-500 hover:text-white focus-visible:bg-slate-500 focus-visible:text-white transition-all",
                  previewDimension === "desktop" ? "bg-slate-500 text-white scale-75" : null,
                )}
                type="button"
                onClick={() => setPreviewDimension("desktop")}
              >
                Desktop
              </button>
            </div>
            <motion.iframe
              layout
              ref={setIframe}
              srcDoc={domWithIds.innerHTML}
              style={{
                height: PreviewDimensions[previewDimension].height,
                width: PreviewDimensions[previewDimension].width,
                maxWidth: "100%",
              }}
              className="border-gray border-4 w-full resize"
            />
          </motion.div>
        ) : (
          <motion.div className="w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Uploader
              filesParsedHandler={({ domString, filename }) => {
                setDomString(domString);
                setFilename(filename);
              }}
            >
              <div className="h-full w-full flex flex-col justify-center items-center">
                <p className="mt-5 text-gray-400">Drop files here</p>
              </div>
            </Uploader>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
