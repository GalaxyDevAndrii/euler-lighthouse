import { useState } from "react";
import ReactTooltip from "react-tooltip";

import { useStore as useSettingsStore } from "../../../stores/settings";

export default function TutorialTip() {
    const darkMode = useSettingsStore((state) => state.darkMode);
    const [disabled, setDisabled] = useState(false);

    return (
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
    );
}
