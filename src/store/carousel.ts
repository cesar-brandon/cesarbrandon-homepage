import { create } from "zustand";

interface State {
  codeMode: boolean;
  setMode: (mode: boolean) => void;
  selectedSnap: number;
  setSelectedSnap: (selectedSnap: number) => void;
  snapCount: number;
  setSnapCount: (snapCount: number) => void;
}

const useCarouselStore = create<State>((set) => ({
  codeMode: false,
  setMode: (codeMode) => set({ codeMode }),
  selectedSnap: 0,
  setSelectedSnap: (selectedSnap) => set({ selectedSnap }),
  snapCount: 0,
  setSnapCount: (snapCount) => set({ snapCount }),
}));

export { useCarouselStore };
