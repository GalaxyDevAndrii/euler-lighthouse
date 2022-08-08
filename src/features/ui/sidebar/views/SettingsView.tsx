import { Switch } from "@headlessui/react";
import { useCallback } from "react";

import UtilsBtn from "../../../../components/UtilityBtn";
import { useStore as useSettingsStore } from "../../../../stores/settings";
import { SidebarViews } from "../../../../types";

export default function SettingsView({ setActiveView }: { setActiveView: React.Dispatch<React.SetStateAction<SidebarViews>> }) {
    const { darkMode, toggleDarkMode, shouldDrawGrid, setDrawGrid } = useSettingsStore(useCallback((state) => state, []));

    const SwitchComponent = ({
        state,
        changeState,
        label,
    }: {
        state: boolean;
        changeState: (newState: boolean) => void;
        label: string;
    }) => (
        <div className="flex flex-row items-center space-x-2">
            <Switch.Group>
                <Switch.Label className="text-sm font-medium text-primaryText dark:text-white">{label}</Switch.Label>

                <Switch
                    checked={state}
                    onChange={changeState}
                    className={`${state ? "bg-primaryTheme" : "bg-tertiaryTheme"} relative inline-flex items-center rounded-full h-6 w-12`}
                >
                    <span className="sr-only">{label}</span>
                    <span className={`${state ? "translate-x-6" : "translate-x-1"} w-4 h-4 transform bg-white rounded-full`} />
                </Switch>
            </Switch.Group>
        </div>
    );

    return (
        <div className="w-full flex flex-col items-center">
            <UtilsBtn
                classNames="w-min mb-4 text-sm px-4 py-2 rounded-md flex flex-row items-center justify-center space-x-1.5"
                onClick={() => setActiveView("SidebarView")}
            >
                Back
            </UtilsBtn>
            <div className="mt-4 pt-6 border-t dark:border-t-lightGray w-full grid grid-cols-2 gap-4">
                <SwitchComponent state={shouldDrawGrid} changeState={setDrawGrid} label="Draw Grid" />
                <SwitchComponent state={darkMode} changeState={toggleDarkMode} label="Dark Mode" />
            </div>
        </div>
    );
}
