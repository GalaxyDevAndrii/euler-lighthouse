import { RefObject } from "react";
import { createTrackedSelector } from "react-tracked";
import create, { SetState, State } from "zustand";

import { Directions, Tools } from "../types";
import { isMobile } from "../utils/misc";

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

    backdropActive: boolean;
    toggleBackdrop: (state: boolean) => void;
}

export const useStore = create<IUtilsState>((set: SetState<IUtilsState>) => ({
    gridMiddle: { x: 0, y: 0 },
    setMiddle: (direction: Directions, newState: number) => {
        set((oldState) => ({ gridMiddle: { ...oldState.gridMiddle, [direction]: newState } }));
    },

    selectedTool: "selector",
    setTool: (tool: Tools) => {
        set({ selectedTool: tool });
    },

    lineActive: false,
    setLineActive: (state: boolean) => {
        set({ lineActive: state });
    },

    sidebarExpanded: !isMobile(), // if is mobile, start with the sidebar retracted
    toggleSidebar: () => {
        set((state) => ({ sidebarExpanded: !state.sidebarExpanded }));
    },

    toolbarRef: undefined,
    setToolbarRef: (ref) => {
        set({ toolbarRef: ref });
    },

    sidebarRef: undefined,
    setSidebarRef: (ref) => {
        set({ sidebarRef: ref });
    },

    isAtSidebar: false,
    setIsAtSidebar: (state: boolean) => {
        set({ isAtSidebar: state });
    },

    backdropActive: false,
    toggleBackdrop: (state: boolean) => {
        set({ backdropActive: state });
    },
}));

export const useTrackedStore = createTrackedSelector(useStore);
