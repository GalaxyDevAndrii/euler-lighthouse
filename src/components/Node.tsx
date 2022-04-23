import { useCallback, useEffect, useState, startTransition, createRef } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { useXarrow } from "react-xarrows";

import { connectNodes, handleRemove } from "../features/nodeHandler";
import { useExternalClick } from "../hooks/useExternalClick";
import useLongPress from "../hooks/useLongPress";
import useOverlap from "../hooks/useOverlap";
import { useTrackedStore } from "../store/nodes";
import { useStore as useSettingsStore } from "../store/settings";
import { useTrackedStore as useTracking } from "../store/tracking";
import { useTrackedStore as useTrackedUtils } from "../store/utils";
import { INode } from "../types";
import { mutateTransform } from "../utils/tracking";

interface Props {
    node: INode;
}

interface SVGprops {
    setRef: any;
    middleColor: string;
    borderColor: string;
    zoom: number;
    size: number;
    id: string;
    className: string;
}

function NodeSVG({ setRef, middleColor, borderColor, zoom, size, ...rest }: SVGprops) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" ref={setRef} height={size} width={size} {...rest}>
            <g transform={`scale(${zoom})`} className="pointer-events-none">
                <path fill={middleColor} d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z" />
                <path
                    fill={borderColor}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 41.5c9.665 0 17.5-7.835 17.5-17.5S33.665 6.5 24 6.5 6.5 14.335 6.5 24 14.335 41.5 24 41.5Zm0 2.5c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z"
                />
            </g>
        </svg>
    );
}

export default function Node({ node }: Props) {
    const { cameraZoom, cameraOffset } = useTracking();
    const { getNode, selectedNode, selectNode } = useTrackedStore();
    const { gridMiddle, selectedTool, lineActive, setLineActive, sidebarRef, toolbarRef, setIsAtSidebar } = useTrackedUtils();

    const darkMode = useSettingsStore((state) => state.darkMode);

    const [isDragging, setIsDragging] = useState(false);
    const [size, setSize] = useState(48);

    const nodeRef = createRef<HTMLElement>();

    const clickedOutside = useExternalClick(nodeRef, sidebarRef, toolbarRef);
    const isAtSidebar = useOverlap(nodeRef, sidebarRef);
    const updateEdgesPos = useXarrow();

    useLongPress({
        element: nodeRef,
        callback: () => {
            node.changeType();
        },
    });

    useEffect(() => {
        if (nodeRef.current) {
            node.setElement(nodeRef.current);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodeRef]);

    useEffect(() => {
        const increaseSize = () => {
            node.connectedTo.forEach(() => startTransition(() => setSize((size) => size + 0.1)));
        };

        if (node.connectedTo.length > 1) {
            increaseSize();
        }
    }, [node.connectedTo]);

    useEffect(() => {
        if (clickedOutside) {
            selectNode(undefined);
            setLineActive(false);
        }
    }, [clickedOutside, selectNode, setLineActive]);

    useEffect(() => {
        if (isDragging) {
            setIsAtSidebar(isAtSidebar);
        }
    }, [isAtSidebar, isDragging, setIsAtSidebar]);

    const isSelected = useCallback(() => {
        return selectedNode?.id === node.id;
    }, [node.id, selectedNode?.id]);

    const deleteIfIsAtSidebar = (node: INode) => {
        handleRemove(node);
        setIsAtSidebar(false);
    };

    const positionHandler: DraggableEventHandler = (e): void => {
        if (isAtSidebar && isDragging) {
            deleteIfIsAtSidebar(node);
        } else if (e instanceof MouseEvent) {
            node.updatePos([e.clientX, e.clientY]);
        } else if (e instanceof TouchEvent) {
            node.updatePos([e.changedTouches[0].clientX, e.changedTouches[0].clientY]);
        }

        setIsDragging(false); // on stop event
    };

    const selectorHandler = useCallback(
        (e: MouseEvent) => {
            if (selectedTool !== "selector") return;
            const el = e.target as HTMLElement;

            const clickedNodeId = Number(el.id.slice(6, 100)); // id: node__1 => 1
            const clickedNode = getNode(clickedNodeId);

            if (selectedNode?.id !== clickedNodeId && lineActive) {
                connectNodes(selectedNode, clickedNode);
                selectNode(undefined);
            }

            if (selectedNode?.id !== clickedNodeId) {
                selectNode(clickedNode);
            } else {
                selectNode(undefined); // deselect node if was clicked twice
            }
        },
        [getNode, lineActive, selectNode, selectedNode, selectedTool]
    );

    const interactionHandler = (e: MouseEvent) => {
        if (selectedTool !== "selector") return;

        if (e.button === 2) {
            node.changeType();
        } else {
            selectorHandler(e);
            setLineActive(true);
        }
    };

    return (
        <Draggable
            disabled={selectedTool === "selector"}
            defaultPosition={gridMiddle}
            nodeRef={nodeRef}
            onMouseDown={interactionHandler}
            onStart={() => setIsDragging(true)}
            onDrag={updateEdgesPos}
            onStop={positionHandler}
            positionOffset={mutateTransform(cameraOffset, cameraZoom)}
            defaultClassNameDragging="ring"
        >
            <NodeSVG
                setRef={nodeRef}
                aria-grabbed={isDragging}
                aria-checked={isSelected()}
                id={`node__${node.id}`}
                middleColor={darkMode ? "#232325" : "#dffff7"}
                borderColor={node.type === "Initial" ? "green" : node.type === "Final" ? "red" : darkMode ? "white" : "black"}
                zoom={cameraZoom}
                size={size * cameraZoom}
                className={`select-none absolute rounded-full z-40
                    ${selectedTool === "grab" ? "cursor-grab active:cursor-grabbing will-change-transform" : "hover:ring will-change-auto"}
                    ${isSelected() ? "ring ring-red-700" : ""}
                    `}
            />
        </Draggable>
    );
}
