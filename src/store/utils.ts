import { RefObject } from "react";
import { createTrackedSelector } from "react-tracked";
import create, { SetState, State } from "zustand";

import { Directions, Tools } from "../types";

interface IUtilsState extends State {
    gridMiddle: { x: number; y: number };
    setMiddle: (direction: Directions, newState: number) => void;

    selectedTool: Tools;
    setTool: (tool: Tools) => void;

    lineActive: boolean;
    setLineActive: (newState: boolean) => void;

    sidebarExpanded: boolean;
    toggleSidebar: () => void;

    toolbarRef: RefObject<HTMLDivElement> | undefined;
    setToolbarRef: (ref: RefObject<HTMLDivElement>) => void;

    sidebarRef: RefObject<HTMLElement> | undefined;
    setSidebarRef: (ref: RefObject<HTMLElement>) => void;

    isAtSidebar: boolean;
    setIsAtSidebar: (newState: boolean) => void;
}

export const useStore = create<IUtilsState>((set: SetState<IUtilsState>) => ({
    gridMiddle: { x: 0, y: 0 },
    setMiddle: (direction: Directions, newState: number) =>
        set((oldState) => ({ gridMiddle: { ...oldState.gridMiddle, [direction]: newState } })),

    selectedTool: "selector",
    setTool: (tool: Tools) => set({ selectedTool: tool }),

    lineActive: false,
    setLineActive: (state: boolean) => set({ lineActive: state }),

    sidebarExpanded: !/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        navigator.userAgent
    ), // if is mobile, start with the sidebar retracted
    toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),

    toolbarRef: undefined,
    setToolbarRef: (ref) => set({ toolbarRef: ref }),

    sidebarRef: undefined,
    setSidebarRef: (ref) => set({ sidebarRef: ref }),

    isAtSidebar: false,
    setIsAtSidebar: (state: boolean) => set({ isAtSidebar: state }),
}));

export const useTrackedStore = createTrackedSelector(useStore);
