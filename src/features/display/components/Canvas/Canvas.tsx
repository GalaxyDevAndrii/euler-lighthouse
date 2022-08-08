import { useEffect, useRef } from "react";

import { useStore as useSettingsStore } from "../../../../stores/settings";
import { useTrackedStore as useTracking } from "../../../../stores/tracking";
import { useStore as useUtilsStore } from "../../../../stores/utils";
import { Point } from "../../../../types";
import { revertValues } from "../../../../utils/math";
import { getDelta, mutateTransform } from "../../../../utils/tracking";

import TrackCanvas from "./TrackCanvas";

export default function Canvas() {
    const { cameraOffset, cameraZoom } = useTracking();
    const shouldDrawGrid = useSettingsStore((state) => state.shouldDrawGrid);
    const setMiddle = useUtilsStore((state) => state.setMiddle);

    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current) return;
        // middle of the canvas viewport
        const view = mutateTransform(revertValues(cameraOffset), cameraZoom);
        const staticMiddle: Point = { x: gridRef.current.clientWidth / 2, y: gridRef.current.clientHeight / 2 };

        setMiddle(getDelta(staticMiddle, view));
    }, [cameraOffset, cameraZoom, setMiddle]);

    return (
        <TrackCanvas ref={gridRef}>
            <div
                ref={gridRef}
                aria-hidden="true"
                className="absolute bg-white block inset-0 touch-pinch-zoom touch-pan-x touch-pan-y dark:invert"
            />
        </TrackCanvas>
    );
}

Canvas.WhyDidYouRender = true;
