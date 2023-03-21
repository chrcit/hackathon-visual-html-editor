import { DomExplorer, DomExplorerProps } from ".";
import clsx from "clsx";
import styles from "./styles.module.css";
import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { EASE_OUT_QUAD } from "@/constants/easings";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { useEditorStore } from "@/state/editor";
import { DomElement } from "@/types";

type DomExplorerNodeProps = {
  node: DomElement;
} & Omit<DomExplorerProps, "domTree">;

const ANIMATION: Variants = {
  initial: { x: -10, opacity: 0 },
  exit: {
    x: -10,
    opacity: 0,
    transition: { duration: 0.15, ease: EASE_OUT_QUAD },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT_QUAD },
  },
};

export const DomExplorerNode = ({ node, offset = 0, ...rest }: DomExplorerNodeProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => setCollapsed(!collapsed);
  const selectedId = useEditorStore((s) => s.selectedId);
  const hoveredId = useEditorStore((s) => s.hoveredId);
  const setSelectedId = useEditorStore((s) => s.setSelectedId);
  const setHoveredId = useEditorStore((s) => s.setHoveredId);

  return (
    <motion.div layout="position" layoutId={node.id} variants={ANIMATION}>
      <div className="relative">
        <button className={"absolute flex items-center h-full"} style={{ left: offset + 8 }} onClick={toggleCollapse}>
          {node.children.length > 0 && collapsed && <FaCaretRight />}
          {node.children.length > 0 && !collapsed && <FaCaretDown />}
        </button>
        <button
          className={clsx(
            styles["explorer-node"],
            selectedId === node.id && styles["explorer-node--selected"],
            hoveredId === node.id && styles["explorer-node--hovered"],
          )}
          onClick={() => {
            if (node.id === selectedId) {
              setSelectedId(undefined);
              return;
            }

            setSelectedId(node.id);
          }}
          onMouseEnter={() => setHoveredId(node.id)}
          onMouseLeave={() => setHoveredId(undefined)}
          style={{ paddingLeft: offset + 32 }}
        >
          {/* ICON */}
          <div className="w-3 h-3 bg-[#ECECEC] border-[#8E8E8E] border-[1px] mr-3"></div>
          {/* NAME */}
          <div>{node.htmlType}</div>
          {/* CHILDREN */}
        </button>
      </div>
      {node.children.length > 0 && (
        <div>
          <AnimatePresence>
            {!collapsed && <DomExplorer domTree={node.children} offset={offset + 24} {...rest} />}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};
