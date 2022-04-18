import {
    useEffect,
    useCallback,
    useLayoutEffect,
    cloneElement,
    useRef,
    forwardRef,
    Children,

    // Types
    PropsWithChildren,
    RefObject,
    ReactElement,
    MouseEvent,
    TouchEvent,
} from "react";

import { useCursorPosition } from "../hooks/useCursorPosition";
import useLast from "../hooks/useLast";
import usePan from "../hooks/usePan";
import useZoom from "../hooks/useZoom";
import { useTrackedStore as useTracking } from "../store/tracking";
import { useTrackedStore as useTrackedUtils } from "../store/utils";
import { sum, scale } from "../utils/math";
import { getDelta } from "../utils/tracking";

function forwardRefWithAs<T extends { name: string; displayName?: string }>(component: T): T & { displayName: string } {
    return Object.assign(forwardRef(component as unknown as any) as any, {
        displayName: component.displayName ?? component.name,
    });
}

const TrackCanvasRoot = forwardRefWithAs(function TrackCanvas(props: PropsWithChildren<unknown>, ref: RefObject<HTMLDivElement>) {
    const { setCameraOffset, setZoomOffset, setBuffer } = useTracking();
    const { selectedTool } = useTrackedUtils();

    // hooks
    const [cameraOffset, startPan] = usePan(ref);
    const cameraZoom = useZoom(ref);
    const cursorPos = useCursorPosition(ref);

    const lastOffset = useLast(cameraOffset);
    const lastZoom = useLast(cameraZoom);

    // variables
    const delta = getDelta(cameraOffset, lastOffset);
    const adjustedOffset = useRef(sum(cameraOffset, delta));

    if (lastZoom === cameraZoom) {
        // zoom hasn't changed, apply delta between the last and new offset
        adjustedOffset.current = sum(adjustedOffset.current, scale(delta, cameraZoom));
    } else {
        // zoom changed, adjust the offset relative to the pointer
        const lastMouse = scale(cursorPos, lastZoom);
        const newMouse = scale(cursorPos, cameraZoom);
        const mouseOffset = getDelta(lastMouse, newMouse);
        adjustedOffset.current = sum(adjustedOffset.current, mouseOffset);
    }

    useLayoutEffect(() => {
        const width = ref.current?.clientWidth ?? 0;
        const height = ref.current?.clientHeight ?? 0;

        setBuffer({
            x: (width - width / cameraZoom - 2) / 2,
            y: (height - height / cameraZoom - 2) / 2,
        });
    }, [cameraZoom, ref, setBuffer]);

    useEffect(() => {
        // share with other components
        setCameraOffset(adjustedOffset.current);
        setZoomOffset(cameraZoom);
    }, [cameraOffset, cameraZoom, setCameraOffset, setZoomOffset]);

    const handleDragActive = useCallback(
        (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>): void => {
            if (selectedTool === "grab") {
                startPan(e);
            }
        },
        [selectedTool, startPan]
    );

    return (
        <>
            {props?.children
                ? // pass props down to single child
                  cloneElement(Children.only(props.children) as ReactElement, {
                      role: "presentation",
                      onMouseDown: handleDragActive,
                      onTouchStart: handleDragActive,
                  })
                : null}
        </>
    );
});

const TrackCanvas = Object.assign(TrackCanvasRoot);

export default TrackCanvas;
