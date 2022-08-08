import { useCallback, useEffect, useState, createRef, memo } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { useXarrow } from "react-xarrows";

import useLongPress from "../../../hooks/useLongPress";
import useOverlap from "../../../hooks/useOverlap";
import { useTrackedStore as useTrackedNodes } from "../../../stores/nodes";
import { useStore as useSettingsStore } from "../../../stores/settings";
import { useStore as useTrackingStore } from "../../../stores/tracking";
import { useTrackedStore as useTrackedUtils } from "../../../stores/utils";
import type { INode } from "../../../types";
import { revertValues } from "../../../utils/math";
import { useExternalClick } from "../hooks/useExternalClick";
import { connectNodes } from "../utils/handler";

import { NodeSVG } from "./NodeSVG";

interface INodeProps {
    node: INode;
    trigger?: () => void;
}

export function Node({ node }: INodeProps) {
    const { getNode, selectedNode, selectNode, removeNode, isSelected } = useTrackedNodes();
    const { selectedTool, lineActive, setLineActive, sidebarRef, setIsAtSidebar } = useTrackedUtils();
    const cameraOffset = useTrackingStore((state) => state.cameraOffset);
    const darkMode = useSettingsStore((state) => state.darkMode);
    const [isDragging, setIsDragging] = useState(false);
    const [size] = useState(48);

    const nodeRef = createRef<HTMLElement>();

    const clickedOutside = useExternalClick([nodeRef, sidebarRef]);
    const { overlap: isAtSidebar } = useOverlap({ ref: nodeRef, node: sidebarRef });
    const updateEdgesPos = useXarrow();

    useLongPress({
        element: nodeRef,
        callback: () => {
            selectNode(node);
        },
    });

    useEffect(() => {
        if (nodeRef.current && node.setElement) {
            node.setElement(nodeRef.current);
        }
    }, [node, nodeRef]);

    useEffect(() => {
        if (clickedOutside && isSelected()) {
            selectNode(undefined);
            setLineActive(false);
        }
    }, [clickedOutside, isSelected, selectNode, setLineActive]);

    // useEffect(() => {
    //     // increase node size
    //     if (node.connectedTo.length > 1) {
    //         node.connectedTo.forEach(() => setSize((size) => size + 0.1);
    //     }
    // }, [node.connectedTo]);

    useEffect(() => {
        if (isDragging) {
            setIsAtSidebar(isAtSidebar);
        }
    }, [isAtSidebar, isDragging, setIsAtSidebar]);

    const handleDragStart = (): void => {
        setIsDragging(true);
    };

    const positionHandler: DraggableEventHandler = (e): void => {
        if (isAtSidebar) {
            removeNode(node);
            setIsAtSidebar(false);
        } else if (e instanceof MouseEvent) {
            node.updatePos([e.clientX, e.clientY]);
        } else if (e instanceof TouchEvent) {
            node.updatePos([e.changedTouches[0].clientX, e.changedTouches[0].clientY]);
        }

        setIsDragging(false);
        console.log(node.connectedTo);
    };

    const selectorHandler = useCallback(
        (e: MouseEvent): void => {
            if (selectedTool !== "selector") return;

            const el = e.target as HTMLElement;
            const clickedNodeId = Number(el.id.slice(6, 100)); // gets node id: node__1 => 1
            const clickedNodeEl = getNode(clickedNodeId);

            if (!isSelected(clickedNodeEl) && lineActive && !Array.isArray(selectedNode)) {
                connectNodes(selectedNode, clickedNodeEl);
                selectNode(undefined);
                setLineActive(false);
            }

            if (!isSelected(clickedNodeEl)) {
                selectNode(clickedNodeEl);
                setLineActive(true);
            } else {
                // deselect node if was clicked twice
                selectNode(undefined);
                setLineActive(false);
            }
        },
        [getNode, isSelected, lineActive, selectNode, selectedNode, selectedTool, setLineActive]
    );

    const interactionHandler = (e: MouseEvent): void => {
        if (e.button === 2) {
            selectNode(node);
        }

        if (selectedTool === "selector" && e.button === 0) {
            selectorHandler(e);
        }
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            defaultPosition={{ x: node.posX, y: node.posY }}
            positionOffset={revertValues(cameraOffset)}
            onMouseDown={interactionHandler}
            onStart={handleDragStart}
            onDrag={updateEdgesPos}
            onStop={positionHandler}
            disabled={selectedTool === "selector"}
            defaultClassNameDragging="ring"
        >
            <NodeSVG
                ref={nodeRef}
                aria-grabbed={isDragging}
                aria-checked={isSelected(node)}
                id={`node__${node.id}`}
                middleColor={darkMode ? "#232325" : "#dffff7"}
                borderColor={node.type === "Initial" ? "green" : node.type === "Final" ? "red" : darkMode ? "white" : "black"}
                zoom={1}
                size={size}
                className={`select-none absolute rounded-full z-20 touch-pan-y touch-pan-x touch-pinch-zoom ${
                    selectedTool === "grab" ? "cursor-grab active:cursor-grabbing will-change-transform" : "hover:ring will-change-auto"
                } ${isSelected(node) ? "ring ring-red-700" : ""}`}
            />
        </Draggable>
    );
}

export default memo(Node);
