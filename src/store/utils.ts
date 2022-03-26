import create, { SetState } from "zustand";

import { IUtilsState, Directions, CurrentEvent, Tools } from "../types/index";

export const useStore = create<IUtilsState>((set: SetState<IUtilsState>) => ({
    shouldDrawGrid: true,
    setDrawGrid: (newState: boolean) => {
        set({ shouldDrawGrid: newState });
    },

    gridMiddle: { x: 0, y: 0 },
    setMiddle: (direction: Directions, newState: number) => set((oldState) => ({ gridMiddle: { ...oldState.gridMiddle, [direction]: newState } })),

    currEvent: undefined,
    setCurrEvent: (event: CurrentEvent) => set({ currEvent: event }),

    selectedTool: "selector",
    setTool: (tool: Tools) => set({ selectedTool: tool }),

    lineActive: false,
    setLineActive: (state: boolean) => set({ lineActive: state }),

    sidebarExpanded: true,
    toggleSidebar: () => set((state) => set({ sidebarExpanded: !state.sidebarExpanded })),
}));
