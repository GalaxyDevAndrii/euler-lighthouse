import { useState, useEffect, createRef, useCallback, RefObject, MouseEvent as SyntheticMouseEvent } from "react";

import { HEADER_OFFSET, SIDEBAR_OFFSET } from "../../../config";
import useEventListener from "../../../hooks/useEventListener";
import useOverlap from "../../../hooks/useOverlap";
import { useTrackedStore as useTrackedNodes } from "../../../stores/nodes";
import { useStore as useUtilsStore } from "../../../stores/utils";
import { Point, BoxBoundingPos, Nodes } from "../../../types";
import { isNull } from "../../../utils/misc";
import { getNodeId } from "../../nodes";

type EventP = (e: MouseEvent) => void;
type NullPoint = { x: null; y: null };

const NULL_OBJ: NullPoint = { x: null, y: null };

export default function SelectBox({ listenerParent }: { listenerParent: RefObject<HTMLElement> }) {
    const { getNode, selectNode } = useTrackedNodes();
    const sidebarExpanded = useUtilsStore((state) => state.sidebarExpanded);
    const fullscreenActive = useUtilsStore((state) => state.fullscreenActive);

    const [selectionBox, setSelectionBox] = useState<BoxBoundingPos | undefined>(undefined);
    const [startPoint, setStartPoint] = useState<Point | NullPoint>(NULL_OBJ);
    const [endPoint, setEndPoint] = useState<Point | NullPoint>(NULL_OBJ);

    const boxRef = createRef<HTMLDivElement>();
    const { overlappedElements } = useOverlap({ ref: boxRef, node: "node__" });

    const calculateSelectionBox = useCallback(
        (startPoint: Point, endPoint: Point) => {
            const parentNode = listenerParent.current;

            if (!parentNode) {
                return;
            }

            const left = Math.min(startPoint.x, endPoint.x) - parentNode.offsetLeft;
            const top = Math.min(startPoint.y, endPoint.y) - parentNode.offsetTop;
            const width = Math.abs(startPoint.x - endPoint.x);
            const height = Math.abs(startPoint.y - endPoint.y);

            setSelectionBox({
                left: left - (sidebarExpanded && !fullscreenActive ? SIDEBAR_OFFSET : 0),
                top: top - (!fullscreenActive ? HEADER_OFFSET : 0),
                width: width,
                height: height,
            });
        },
        [fullscreenActive, listenerParent, sidebarExpanded]
    );

    const rectDraw = useCallback((e: MouseEvent) => {
        e.preventDefault();

        setEndPoint({ x: e.pageX, y: e.pageY });
    }, []);

    const selectRectContent = useCallback(() => {
        listenerParent?.current?.removeEventListener("mousemove", rectDraw);
        window.removeEventListener("mouseup", selectRectContent);

        setStartPoint(NULL_OBJ);
        setEndPoint(NULL_OBJ);
        setSelectionBox(undefined);
    }, [listenerParent, rectDraw]);

    const rectStart = useCallback(
        (e: SyntheticMouseEvent) => {
            if (e.button === 2 || e.nativeEvent?.which === 2) return;

            setStartPoint({ x: e.pageX, y: e.pageY });

            listenerParent?.current?.addEventListener("mousemove", rectDraw);
        },
        [listenerParent, rectDraw]
    );

    useEventListener(listenerParent, "mousedown", rectStart as unknown as EventP, true);
    useEventListener(listenerParent, "mouseup", selectRectContent, false, window);

    useEffect(() => {
        if (!isNull(startPoint) && !isNull(endPoint)) {
            calculateSelectionBox(startPoint as Point, endPoint as Point);
        }
    }, [calculateSelectionBox, endPoint, startPoint]);

    useEffect(() => {
        const overlappedNodes: Nodes = overlappedElements.map((el) => {
            const idNum = getNodeId(el as HTMLElement);
            return getNode(idNum);
        });

        selectNode(overlappedNodes);
    }, [getNode, overlappedElements, selectNode]);

    if (isNull(startPoint) || isNull(endPoint)) {
        return null;
    }

    return <div ref={boxRef} id="s-box" className="absolute z-50 bg-spot/25 border border-spot/75 border-dashed" style={selectionBox} />;
}
