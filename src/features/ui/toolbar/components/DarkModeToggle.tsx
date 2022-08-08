import { Switch } from "@headlessui/react";

import { ReactComponent as DarkIcon } from "../../../../assets/night.svg";
import { ReactComponent as LightIcon } from "../../../../assets/sun.svg";
import { useStore as useSettingsStore } from "../../../../stores/settings";

export default function DarkModeToggle() {
    const darkMode = useSettingsStore((state) => state.darkMode);
    const toggleDarkMode = useSettingsStore((state) => state.toggleDarkMode);

    return (
        <div className="items-center hidden xr:flex space-x-2">
            <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                className={`${
                    darkMode ? "bg-primaryTheme" : "bg-tertiaryTheme"
                } relative inline-flex items-center h-7 rounded-full w-14 focus-acc`}
                aria-label={darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
                data-for="tooltip"
                data-tip={darkMode ? "Light Mode" : "Dark Mode"}
                data-delay-update="1000"
            >
                <span className="sr-only">{darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}</span>
                {darkMode && <LightIcon aria-hidden="true" role="img" className="absolute fill-white w-4.5 h-4.5 right-8" />}

                <span
                    className={`${
                        darkMode ? "translate-x-8" : "translate-x-1"
                    }  w-5 h-5 transform bg-white rounded-full flex justify-center items-center`}
                />
                {!darkMode && <DarkIcon aria-hidden="true" role="img" className="absolute fill-secondaryDark w-4 h-4 left-[34px]" />}
            </Switch>
        </div>
    );
}
