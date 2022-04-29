import create, { SetState, GetState, State } from "zustand";
import { persist } from "zustand/middleware";

interface ISettingsState extends State {
    shouldDrawGrid: boolean;
    setDrawGrid: (newState: boolean) => void;
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export const useStore = create(
    persist<ISettingsState>(
        (set: SetState<ISettingsState>, get: GetState<ISettingsState>) => ({
            shouldDrawGrid: true,
            setDrawGrid: (newState: boolean) => {
                set({ shouldDrawGrid: newState });
            },

            darkMode: localStorage.theme === "dark",
            toggleDarkMode: () => {
                set((state) => ({ darkMode: !state.darkMode }));

                const darkModeActive = get().darkMode;

                if (darkModeActive) {
                    document.documentElement.classList.add("dark");
                    localStorage.theme = "dark";
                } else {
                    document.documentElement.classList.remove("dark");
                    localStorage.theme = "light";
                }
            },
        }),
        {
            name: "settings",
        }
    )
);
