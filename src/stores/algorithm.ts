import create from "zustand";

import { AlgorithmsExecution } from "../features/algorithm";
import { Algorithms, TAlgorithms } from "../types";

import { useStore as useNodesStore } from "./nodes";

interface IAlgorithmState {
    selected: TAlgorithms;
    setSelected: (selected: TAlgorithms) => void;
    isActive: boolean;
    initialize: () => void;
    cancel: () => void;
    degrees: number;
    vertices: number;
    updateDegrees: (value: number) => void;
    updateVertices: (value: number) => void;
}

export const useStore = create<IAlgorithmState>((set, get) => ({
    selected: Algorithms.tour,
    setSelected: (newState: TAlgorithms) => {
        set({ selected: newState });
    },
    isActive: false,
    initialize: () => {
        const selected = get().selected;
        set({ isActive: true });
        AlgorithmsExecution[selected](useNodesStore.getState().nodes);
    },
    cancel: () => {
        set({ isActive: false });
    },
    degrees: 0,
    vertices: 0,
    updateDegrees: (value) => {
        set((state) => ({ degrees: state.degrees + value }));
    },
    updateVertices: (value) => {
        set({ vertices: value });
    },
}));
