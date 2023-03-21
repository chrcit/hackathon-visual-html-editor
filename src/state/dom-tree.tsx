import { MOCK_DOM_TREE } from "@/constants/mock";
import { DomTree } from "@/types";
import { create } from "zustand";

export type DomTreeStore = {
  domTree: DomTree;
  // overrides the dom tree
  setDomTree: (domTree: DomTree) => void;
};

export const useDomTreeStore = create<DomTreeStore>((set) => ({
  domTree: [],
  setDomTree: (tree: DomTree) => set((state) => ({ domTree: tree })),
}));
