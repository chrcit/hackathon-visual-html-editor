import { create } from "zustand";

export type EditorStore = {
  // id of the node we have currently selected
  selectedId: string | undefined;
  // id of the node we have currently hovered
  hoveredId: string | undefined;
  // filename of the imported html
  filename: string | undefined;
  // iframe of the previewer
  iframe: HTMLIFrameElement | null;
  setIframe: (iframe: HTMLIFrameElement | null) => void;
  // sets the filename of the imported html
  setFilename: (filename: string | undefined) => void;
  // sets the id of the node we have selected
  setSelectedId: (id: string | undefined) => void;
  // sets the id of the node we have hovered
  setHoveredId: (id: string | undefined) => void;
};

export const useEditorStore = create<EditorStore>((set) => ({
  hoveredId: undefined,
  selectedId: undefined,
  filename: undefined,
  iframe: null,
  setIframe: (iframe: HTMLIFrameElement | null) => set((state) => ({ iframe })),
  setFilename: (filename: string | undefined) => set((state) => ({ filename })),
  setSelectedId: (id: string | undefined) => set((state) => ({ selectedId: id })),
  setHoveredId: (id: string | undefined) => set((state) => ({ hoveredId: id })),
}));
