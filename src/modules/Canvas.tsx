import { useEffect, useRef } from "react";

import grid from "../assets/grid.svg";
import TrackCanvas from "../components/TrackCanvas";
import { useStore as useSettingsStore } from "../store/settings";
import { useTrackedStore } from "../store/tracking";
import { useTrackedStore as useTrackedUtils } from "../store/utils";

export default function Canvas() {
    const { cameraOffset, cameraZoom, buffer } = useTrackedStore();
    const { setMiddle } = useTrackedUtils();

    const shouldDrawGrid = useSettingsStore((state) => state.shouldDrawGrid);

    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gridRef.current) return;
        // middle of the canvas viewport
        setMiddle("x", gridRef.current?.clientWidth / 2 - cameraOffset.x * cameraZoom);
        setMiddle("y", gridRef.current?.clientHeight / 2 - cameraOffset.y * cameraZoom);
    }, [cameraOffset.x, cameraOffset.y, cameraZoom, setMiddle]);

    return (
        <TrackCanvas ref={gridRef}>
            <div ref={gridRef} className="absolute h-full w-full block">
                <div
                    className="absolute min-w-full min-h-full bg-white dark:invert"
                    style={{
                        backgroundImage: `${shouldDrawGrid ? `url(${grid})` : ""}`,
                        transform: `scale(${cameraZoom})`,
                        backgroundPosition: `${cameraOffset.x}px ${cameraOffset.y}px`,
                        bottom: buffer.y,
                        left: buffer.x,
                        right: buffer.x,
                        top: buffer.y,
                    }}
                />
            </div>
        </TrackCanvas>
    );
}
