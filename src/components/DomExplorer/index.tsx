import { DomExplorerNode } from "./DomExplorerNode";
import { LayoutGroup, motion } from "framer-motion";
import { DomTree } from "@/types";
import clsx from "clsx";

export type DomExplorerProps = {
  className?: string;
  domTree: DomTree;
  offset?: number;
};

const isAcceptedNode = (node: DomTree[number]) => {
  return !["title", "meta", "style"].includes(node.htmlType.toLowerCase());
};

export const DomExplorer = ({ className, domTree, ...rest }: DomExplorerProps) => {
  if (domTree.length === 0) {
    return (
      <div className="px-8 py-2 border-y-[1px] border-black/10 text-xs font-medium text-gray-400">No dom tree</div>
    );
  }

  return (
    <motion.div
      className={clsx("flex flex-col min-w-full", className)}
      animate="animate"
      exit="exit"
      initial="initial"
      transition={{
        staggerChildren: rest.offset ? 0.2 / (domTree.length + 1) : 0,
      }}
    >
      <LayoutGroup>
        {domTree.filter(isAcceptedNode).map((node) => (
          <DomExplorerNode key={node.id} node={node} {...rest} />
        ))}
      </LayoutGroup>
    </motion.div>
  );
};
