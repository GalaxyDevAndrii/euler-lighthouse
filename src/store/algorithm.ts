import create, { SetState } from "zustand";

import { IAlgorithmState, Algorithms, AlgorithmsT } from "../types/index.d";

export const useStore = create<IAlgorithmState>((set: SetState<IAlgorithmState>) => ({
    selected: Algorithms.tour,
    setSelected: (newState: AlgorithmsT) => {
        set({ selected: newState });
    },
}));
