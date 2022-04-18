// import { toast } from "react-toastify";
import create, { SetState, State } from "zustand";

import { Algorithms, AlgorithmsT } from "../types/index.d";

interface IAlgorithmState extends State {
    selected: AlgorithmsT;
    setSelected: (selected: AlgorithmsT) => void;

    isActive: boolean;
    initialize: () => void;
}

export const useStore = create<IAlgorithmState>((set: SetState<IAlgorithmState>) => ({
    selected: Algorithms.tour,
    setSelected: (newState: AlgorithmsT) => {
        set({ selected: newState });
    },

    isActive: false,
    initialize: () => set({ isActive: true }),
}));
