import { createTrackedSelector } from "react-tracked";
import create, { SetState, State } from "zustand";

import { ORIGIN } from "../config";
import { Point } from "../types";

interface ITrackingState extends State {
    cameraOffset: Point;
    setCameraOffset: (newState: Point) => void;

    cameraZoom: number;
    setZoomOffset: (offset: number) => void;

    buffer: Point;
    setBuffer: (newState: Point) => void;
}

export const useStore = create<ITrackingState>((set: SetState<ITrackingState>) => ({
    cameraZoom: 0,
    setZoomOffset: (offset) => set({ cameraZoom: offset }),

    cameraOffset: { x: 0, y: 0 },
    setCameraOffset: (state) => set({ cameraOffset: state }),

    buffer: ORIGIN,
    setBuffer: (state) => set({ buffer: state }),
}));

export const useTrackedStore = createTrackedSelector(useStore);
