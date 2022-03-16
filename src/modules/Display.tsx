import React, { useRef, useEffect } from "react";
import { useXarrow, Xwrapper } from "react-xarrows";

import Edge from "../components/Edge";
import Node from "../components/Node";
import { useCursorPosition } from "../hooks/useCursorPosition";
import { useStore } from "../store/nodes";
import { useStore as useUtilsStore } from "../store/utils";
import { INode } from "../types";

import Grid from "./Grid";

export default function Display() {
    const { shouldDrawGrid, selectedTool, lineActive } = useUtilsStore((state) => state);
    const { nodes, getNode, selectedNode } = useStore((state) => state);

    const displayHandler = useRef<HTMLDivElement>(null);
    const cursorPos = useCursorPosition();
    const updateXarrow = useXarrow();

    useEffect(() => {
        if (lineActive && selectedNode?.domEl) updateXarrow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lineActive, selectedNode?.domEl]);

    const EdgesRender = ({ node }: { node: INode }) => {
        return (
            <>
                {node.connectedTo.length >= 1
                    ? node.connectedTo.map((to: number) => (
                          <Edge key={getNode(to).id} from={node.domEl ? node.domEl.id : ""} to={getNode(to).domEl?.id} />
                      ))
                    : null}
            </>
        );
    };

    return (
        <section className="relative select-none bg-gray-300 w-full h-full overflow-hidden">
            <div
                ref={displayHandler}
                className={`absolute w-full h-full left-0 top-0 overflow-auto touch-auto ${
                    selectedTool === "grab" ? "cursor-grab active:cursor-grabbing" : ""
                }`}
            >
                {shouldDrawGrid && <Grid />}

                <Xwrapper>
                    {nodes.map((node: INode) => (
                        <React.Fragment key={node.id}>
                            <Node node={node} parent={displayHandler?.current} update={updateXarrow} />

                            <EdgesRender node={node} />
                        </React.Fragment>
                    ))}

                    {lineActive && selectedNode?.domEl ? (
                        <>
                            <div
                                id="ghost__node"
                                className="absolute w-5 h-5 left-0 top-0 will-change-auto"
                                style={{
                                    top: `${cursorPos.y - 55}px`,
                                    left: `${cursorPos.x - 265}px`,
                                }}
                            />
                            <Edge from="ghost__node" to={selectedNode.domEl.id.toString()} />
                        </>
                    ) : null}
                </Xwrapper>
            </div>
        </section>
    );
}
