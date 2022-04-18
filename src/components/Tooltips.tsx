import { useState } from "react";
import ReactTooltip from "react-tooltip";

import { useStore as useSettingsStore } from "../store/settings";

import "react-toastify/dist/ReactToastify.css";

export default function Tooltips() {
    const darkMode = useSettingsStore((state) => state.darkMode);
    const [disabled, setDisabled] = useState(false);

    return (
        <>
            <ReactTooltip
                id="tooltip"
                delayShow={800}
                type={darkMode ? "light" : "dark"}
                effect="solid"
                className="!px-2 !py-1"
                getContent={(dataTip) => {
                    const textArr = dataTip?.split(", "); // [Text, keybind]
                    return textArr?.length == 2 ? (
                        <div className="flex flex-nowrap items-center justify-between space-x-4">
                            <span>{textArr[0]}</span>
                            <span className="text-gray-300 dark:text-lightGray">{textArr[1]}</span>
                        </div>
                    ) : (
                        textArr && <span>{textArr[0]}</span>
                    );
                }}
            />
            <ReactTooltip
                id="hint"
                event="none"
                disable={disabled}
                type={darkMode ? "light" : "dark"}
                effect="solid"
                multiline={true}
                clickable={true}
                className="p-2"
                getContent={(dataTip) => (
                    <div className="flex flex-col items-start space-y-2 m-2">
                        <span>{dataTip}</span>
                        <button
                            onClick={() => {
                                ReactTooltip.hide();
                                setDisabled(true);
                            }}
                            className="font-medium truncate"
                        >
                            <strong>Got it</strong>
                        </button>
                    </div>
                )}
            />
        </>
    );
}
