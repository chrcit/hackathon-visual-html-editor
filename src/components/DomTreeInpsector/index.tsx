import clsx from "clsx";

import { TbTree } from "react-icons/tb";
import { DomExplorer } from "../DomExplorer";
import { useDomTreeStore } from "@/state/dom-tree";

export const DomTreeInspector = () => {
  const domTree = useDomTreeStore((state) => state.domTree);

  return (
    <div className="flex flex-col">
      <h3 className={clsx("px-8 pb-2 flex items-center gap-1", "font-semibold")}>Structure</h3>

      <DomExplorer domTree={domTree} />
    </div>
  );
};
