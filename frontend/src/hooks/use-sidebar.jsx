import { create } from "zustand";

export const useSidebar = create((set)=> ({
    isMinimized: false,
    toggle: () => set((state) => ({isMinimized: !state.isMinimized}))
}));