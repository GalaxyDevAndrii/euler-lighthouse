import ReactTooltip from "react-tooltip";

import { useStore as useSettingsStore } from "../stores/settings";
import { isMobile } from "../utils/misc";

export default function Tooltip() {
    const darkMode = useSettingsStore((state) => state.darkMode);

    return (
        <ReactTooltip
            id="tooltip"
            delayShow={250}
            type={darkMode ? "light" : "dark"}
            effect="solid"
            className="!px-2 !py-1"
            globalEventOff="click"
            getContent={(dataTip) => {
                const textArr = dataTip?.split(", "); // [Text, keybind]
                return textArr?.length == 2 ? (
                    <div className="flex flex-nowrap items-center justify-between space-x-4">
                        <span>{textArr[0]}</span>
                        {!isMobile() && <kbd className="font-sans text-gray-300 dark:text-lightGray">{textArr[1]}</kbd>}
                    </div>
                ) : (
                    textArr && <span>{textArr[0]}</span>
                );
            }}
        />
    );
}
