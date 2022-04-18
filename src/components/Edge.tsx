import Xarrow from "react-xarrows";

import { useStore as useSettingsStore } from "../store/settings";
import { useTrackedStore } from "../store/tracking";

interface Edge {
    from: string;
    to: string;
    existingPairings: Set<string>;
}

export default function Edge({ from, to, existingPairings }: Edge) {
    const darkMode = useSettingsStore((state) => state.darkMode);
    const { cameraZoom } = useTrackedStore();

    if (!from || !to) {
        return null;
    }

    if (existingPairings.has(to + from)) {
        return null; // Exists opposite pair
    }

    existingPairings.add(from + to);

    return (
        <Xarrow
            start={from}
            end={to}
            path="straight"
            color={darkMode ? "#fff" : "#000"}
            startAnchor="middle"
            endAnchor="middle"
            showHead={false}
            strokeWidth={7 * cameraZoom}
        />
    );
}
