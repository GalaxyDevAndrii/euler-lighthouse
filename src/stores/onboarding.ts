import { RefObject } from "react";
import create from "zustand";

interface IOnboardingState {
    status: "started" | "finished";
    step: number;
    refs: RefObject<HTMLElement>[];
    addRef: (ref: RefObject<HTMLElement>) => void;
    nextStep: () => void;
    skip: () => void;
}

interface ITutorialStep {
    step: number;
    message: string;
    cta: string;
}

type TutorialSteps = ITutorialStep[];

const tutorial: TutorialSteps = [
    { step: 1, message: "", cta: "Next" },
    { step: 2, message: "", cta: "Next" },
    { step: 3, message: "", cta: "Got it" },
];

export const useStore = create<IOnboardingState>((set, get) => ({
    status: "started",
    refs: [],
    addRef: (ref: RefObject<HTMLElement>) => set((state) => ({ ...state, refs: [...state.refs, ref] })),
    step: 0,
    nextStep: () => {
        const step = get().step;

        if (step < tutorial.length) {
            set({ step: step + 1 });
        } else {
            set({ status: "finished" });
        }
    },

    skip: () => {
        set({ status: "finished" });
    },
}));
