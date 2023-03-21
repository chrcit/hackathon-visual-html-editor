import { DomTree } from "@/types";

export const MOCK_DOM_TREE: DomTree = [
  { id: "1", htmlType: "div", children: [] },
  {
    id: "2",
    htmlType: "div",
    children: [
      { id: "3", htmlType: "div", children: [] },
      {
        id: "4",
        htmlType: "div",
        children: [
          { id: "4_1", htmlType: "div", children: [] },
          { id: "4_2", htmlType: "div", children: [] },
        ],
      },
    ],
  },
  { id: "5", htmlType: "div", children: [] },
];
