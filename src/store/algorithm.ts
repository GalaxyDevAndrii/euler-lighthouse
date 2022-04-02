import { toast } from "react-toastify";
import create, { SetState } from "zustand";

import { IAlgorithmState, Algorithms, AlgorithmsT } from "../types/index.d";

export const useStore = create<IAlgorithmState>((set: SetState<IAlgorithmState>) => ({
    selected: Algorithms.tour,
    setSelected: (newState: AlgorithmsT) => {
        set({ selected: newState });
        toast.error("Currently no cope", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    },

    isActive: false,
    initialize: () => set({ isActive: true }),
}));
