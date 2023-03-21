import { nanoid } from "nanoid";

export const injectIdsIntoDom = (el: HTMLTemplateElement | HTMLElement): void => {
  const children = el instanceof HTMLTemplateElement ? el.content.children : el.children;

  Array.from(children).map((node) => {
    const nodeId = `node-${nanoid(6)}`;

    node.setAttribute("data-node-id", nodeId);

    injectIdsIntoDom(node as HTMLElement);
  });
};
