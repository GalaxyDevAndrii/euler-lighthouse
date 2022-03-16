import React, { useEffect, useRef, useState } from "react";
import Draggable, { DraggableEvent, DraggableEventHandler } from "react-draggable";

import { connectNodes } from "../features/nodeHandler";
import { useCursorPosition } from "../hooks/useCursorPosition";
import { useExternalClick } from "../hooks/useExternalClick";
import { useStore } from "../store/nodes";
import { useStore as useUtilsStore } from "../store/utils";
import { INode } from "../types/index";

interface Props {
    node: INode;
    parent: HTMLDivElement | null;
    update: () => void;
}

export default function Node({ node, parent, update }: Props) {
    const { getNode, selectedNode, selectNode } = useStore((state) => state);
    const { currEvent, gridMiddle, selectedTool, lineActive, setLineActive } = useUtilsStore((state) => state);

    const nodeRef = useRef(null);
    const cursorPos = useCursorPosition();
    const clickedOutside = useExternalClick(nodeRef);

    const [size, setSize] = useState(2.5);

    useEffect(() => {
        if (nodeRef.current) node.setElement(nodeRef.current);
    }, [node]);

    useEffect(() => {
        const nodeSize = () => {
            node.connectedTo.forEach(() => setSize((size) => size + 0.1));
        };

        nodeSize();
    }, [node.connectedTo]);

    useEffect(() => {
        if (clickedOutside) {
            selectNode(undefined);
            setLineActive(false);
        }
    }, [clickedOutside, selectNode, setLineActive]);

    const nodePositionHandler: DraggableEventHandler = (e: DraggableEvent | any): void => {
        if (e) node.updatePos([e.clientX, e.clientY]);
    };

    const selectorHandler = (e: MouseEvent) => {
        if (!e) return;

        if (selectedTool === "selector") {
            const el = e.target as HTMLElement;
            const clickedNodeId = Number(el.id.slice(6, 100)); // id: node__1 => 1
            const clickedNode = getNode(clickedNodeId);

            if (selectedNode && selectedNode.id !== clickedNodeId && lineActive) {
                connectNodes(selectedNode, clickedNode);
                selectNode(undefined);
            }

            if (selectedNode?.id !== clickedNodeId) {
                selectNode(clickedNode);
            } else {
                selectNode(undefined);
            }
        }
    };

    const drawLineHandler = (e: MouseEvent) => {
        if (selectedTool === "selector") {
            selectorHandler(e);
            setLineActive(true);
        }
    };

    return (
        <Draggable
            disabled={selectedTool === "selector" ? true : false}
            defaultPosition={currEvent === "click" ? { ...gridMiddle } : { ...cursorPos }}
            nodeRef={nodeRef}
            offsetParent={parent && currEvent === "click" ? parent : undefined}
            onDrag={update}
            onStop={nodePositionHandler}
            onMouseDown={drawLineHandler}
            defaultClassNameDragging="ring"
        >
            <div
                ref={nodeRef}
                // onDragStart={drawLineHandler}
                role="radio"
                draggable="false"
                aria-checked={selectedNode ? true : false}
                tabIndex={0}
                id={`node__${node.id}`}
                style={{ width: `${size}rem`, height: `${size}rem` }}
                className={`select-none absolute transition-[height,width] z-10 w-10 h-10 bg-gray-200 border-4 border-black rounded-full
                    ${selectedTool === "grab" ? "cursor-grab active:cursor-grabbing" : "hover:ring"}
                    ${selectedNode?.id === node.id ? "ring ring-red-700" : ""}`}
            />
        </Draggable>
    );
}
