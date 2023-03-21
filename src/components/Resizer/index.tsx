import clsx from "clsx";
import { motion } from "framer-motion";
import type { DraggableProps } from "framer-motion";

type ResizerProps = {
  className?: string;
  direction: DraggableProps["drag"];
  onResize: (width: number) => void;
};

export default function ResizerComponent({
  className,
  onResize,
  direction,
}: ResizerProps) {
  return <motion.div className={clsx(className)} drag={direction} />;
}
