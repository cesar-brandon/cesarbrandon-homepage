import { create } from "zustand";

interface State {
  codeMode: boolean;
  setMode: (mode: boolean) => void;
}

const useCarouselStore = create<State>((set) => ({
  codeMode: false,
  setMode: (codeMode) => set({ codeMode }),
}));

export { useCarouselStore };
