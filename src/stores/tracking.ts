import { createTrackedSelector } from "react-tracked";
import create from "zustand";

import type { Point } from "../types";

interface ITrackingState {
    cameraOffset: Point;
    setCameraOffset: (newState: Point) => void;
    cameraZoom: number;
    setZoomOffset: (offset: number) => void;
}

export const useStore = create<ITrackingState>((set) => ({
    cameraZoom: 1,
    setZoomOffset: (offset) => set({ cameraZoom: offset }),
    cameraOffset: { x: 0, y: 0 },
    setCameraOffset: (state) => set({ cameraOffset: state }),
}));

export const useTrackedStore = createTrackedSelector(useStore);
