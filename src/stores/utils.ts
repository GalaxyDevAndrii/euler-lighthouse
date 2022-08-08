import { RefObject } from "react";
import { createTrackedSelector } from "react-tracked";
import create from "zustand";

import type { Point, Tools } from "../types";
import { isMobile } from "../utils/misc";

interface IUtilsState {
    gridMiddle: Point;
    setMiddle: (direction: Point) => void;
    selectedTool: Tools;
    setTool: (tool: Tools) => void;
    lineActive: boolean;
    setLineActive: (state: boolean) => void;
    sidebarExpanded: boolean;
    toggleSidebar: (state?: boolean) => void;
    toolbarRef: RefObject<HTMLElement> | undefined;
    setToolbarRef: (ref: RefObject<HTMLElement>) => void;
    sidebarRef: RefObject<HTMLElement> | undefined;
    setSidebarRef: (ref: RefObject<HTMLElement>) => void;
    displayRef: RefObject<HTMLElement> | undefined;
    setDisplayRef: (ref: RefObject<HTMLElement>) => void;
    isAtSidebar: boolean;
    setIsAtSidebar: (state: boolean) => void;
    backdropActive: boolean;
    toggleBackdrop: (state?: boolean) => void;
    fullscreenActive: boolean;
    toggleFullscreen: (el: HTMLElement) => void;
    edgeCallback: (() => void) | undefined;
    setEdgeCallback: (fn: (() => void) | undefined) => void;
    ctrlPressed: boolean;
    setCtrlPressed: (state: boolean) => void;
}

export const useStore = create<IUtilsState>((set) => ({
    gridMiddle: { x: 0, y: 0 },
    setMiddle: (direction: Point) => {
        set({ gridMiddle: direction });
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
    toggleSidebar: (state?: boolean) => {
        set((currState) => ({ sidebarExpanded: state ?? !currState.sidebarExpanded }));
    },
    toolbarRef: undefined,
    setToolbarRef: (ref) => {
        set({ toolbarRef: ref });
    },
    sidebarRef: undefined,
    setSidebarRef: (ref) => {
        set({ sidebarRef: ref });
    },
    displayRef: undefined,
    setDisplayRef: (ref) => {
        set({ displayRef: ref });
    },
    isAtSidebar: false,
    setIsAtSidebar: (state: boolean) => {
        set({ isAtSidebar: state });
    },
    backdropActive: false,
    toggleBackdrop: (state?: boolean) => {
        set((currState) => ({ backdropActive: state ?? !currState.backdropActive }));
    },
    fullscreenActive: false,
    toggleFullscreen: (el) => {
        if (!document.fullscreenElement) {
            el.requestFullscreen();
            set({ fullscreenActive: true });

            document.addEventListener("fullscreenchange", onFullScreenChange, false);
            document.addEventListener("webkitfullscreenchange", onFullScreenChange, false);
            document.addEventListener("mozfullscreenchange", onFullScreenChange, false);
        } else {
            document.exitFullscreen();
        }
    },
    edgeCallback: undefined,
    setEdgeCallback: (fn) => {
        set({ edgeCallback: fn });
    },
    ctrlPressed: false,
    setCtrlPressed: (state: boolean) => {
        set({ ctrlPressed: state });
    },
}));

function onFullScreenChange() {
    // @ts-expect-error support firefox, safari & opera
    const fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
        useStore.setState({ fullscreenActive: false });
        document.removeEventListener("fullscreenchange", onFullScreenChange, false);
        document.removeEventListener("webkitfullscreenchange", onFullScreenChange, false);
        document.removeEventListener("mozfullscreenchange", onFullScreenChange, false);
    }
}

export const useTrackedStore = createTrackedSelector(useStore);
