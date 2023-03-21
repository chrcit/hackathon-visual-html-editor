import { DomTree } from "@/types";

export const getDomTree = (el: Element | DocumentFragment): DomTree => {
  const children = el.children;

  return Array.from(children).map((node) => {
    return {
      id: node.getAttribute("data-node-id") as string,
      htmlType: node.tagName,
      children: getDomTree(node),
    };
  });
};
