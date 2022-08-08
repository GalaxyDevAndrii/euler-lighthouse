import {
    useState,
    useEffect,
    useCallback,
    useLayoutEffect,
    cloneElement,
    useRef,
    Children,

    // Types
    PropsWithChildren,
    RefObject,
    ReactElement,
    MouseEvent,
    TouchEvent,
} from "react";

import grid from "../../../../assets/grid.svg";
import { HEADER_OFFSET, ORIGIN, SIDEBAR_OFFSET } from "../../../../config";
import { useCursorPosition } from "../../../../hooks/useCursorPosition";
import useLast from "../../../../hooks/useLast";
import { useTrackedStore as useTracking } from "../../../../stores/tracking";
import { useStore as useUtilsStore } from "../../../../stores/utils";
import type { Point } from "../../../../types";
import { sum, scale } from "../../../../utils/math";
import { forwardRefWithAs } from "../../../../utils/misc";
import { getDelta } from "../../../../utils/tracking";
import usePan from "../../hooks/usePan";
import useZoom from "../../hooks/useZoom";

const TrackCanvasRoot = forwardRefWithAs(function TrackCanvas(props: PropsWithChildren<unknown>, ref: RefObject<HTMLDivElement>) {
    // state
    const { setCameraOffset, setZoomOffset } = useTracking();
    const selectedTool = useUtilsStore((state) => state.selectedTool);
    const sidebarExpanded = useUtilsStore((state) => state.sidebarExpanded);
    const [buffer, setBuffer] = useState<Point>(ORIGIN);

    // hooks
    const [cameraOffset, startPan] = usePan(ref);
    const cameraZoom = useZoom(ref);
    const cursorPos = useCursorPosition({ ref: ref, offset: { x: sidebarExpanded ? SIDEBAR_OFFSET : 0, y: HEADER_OFFSET } });

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

    // useLayoutEffect(() => {
    //     const width = ref.current?.clientWidth ?? 0;
    //     const height = ref.current?.clientHeight ?? 0;

    //     setBuffer({
    //         x: (width - width / cameraZoom) / 2,
    //         y: (height - height / cameraZoom) / 2,
    //     });
    // }, [cameraZoom, ref, setBuffer]);

    useEffect(() => {
        // share state with other components
        setCameraOffset(cameraOffset);
        // setZoomOffset(cameraZoom);
    }, [cameraOffset, setCameraOffset, setZoomOffset]);

    const handleDragActive = useCallback(
        (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>): void => {
            if (selectedTool === "grab") {
                startPan(e);
            }
        },
        [selectedTool, startPan]
    );

    return props?.children
        ? // pass props down to single child
          cloneElement(Children.only(props.children) as ReactElement, {
              role: "presentation",
              onMouseDown: handleDragActive,
              onTouchStart: handleDragActive,
              style: {
                  backgroundImage: `url(${grid})`,
                  //   transform: `scale(${cameraZoom})`,
                  backgroundPosition: `${-cameraOffset.x}px ${-cameraOffset.y}px`,
                  bottom: buffer.y,
                  left: buffer.x,
                  right: buffer.x,
                  top: buffer.y,
              },
          })
        : null;
});

const TrackCanvas = Object.assign(TrackCanvasRoot);

TrackCanvas.WhyDidYouRender = true;

export default TrackCanvas;
