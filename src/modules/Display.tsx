import React, { useRef, useEffect, memo } from "react";
import { useXarrow, Xwrapper } from "react-xarrows";

import Edge from "../components/Edge";
import GhostNode from "../components/GhostNode";
import Node from "../components/Node";
import { useStore } from "../store/nodes";
import { useStore as useUtilsStore } from "../store/utils";
import { INode } from "../types";

import Grid from "./Grid";

export default function Display() {
    const { shouldDrawGrid, selectedTool, lineActive } = useUtilsStore((state) => state);
    const { nodes, getNode, selectedNode } = useStore((state) => state);

    const existingPairings = new Set<string>();

    const displayHandler = useRef<HTMLDivElement>(null);
    const updateXarrow = useXarrow();

    useEffect(() => {
        if (lineActive && selectedNode?.domEl) updateXarrow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lineActive, selectedNode?.domEl]);

    // eslint-disable-next-line react/display-name
    const EdgesRender = memo(({ node }: { node: INode }) => {
        return node.connectedTo.length >= 1 ? (
            <>
                {node.connectedTo.map((to: number) => (
                    <Edge key={getNode(to).id} from={node.domEl?.id ?? ""} to={getNode(to).domEl?.id ?? ""} existingPairings={existingPairings} />
                ))}
            </>
        ) : null;
    });

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
                    {nodes.slice(0, 100).map((node: INode) => (
                        <React.Fragment key={node.id}>
                            <Node node={node} parent={displayHandler?.current} update={updateXarrow} />

                            <EdgesRender node={node} />
                        </React.Fragment>
                    ))}
                    <GhostNode existingPairings={existingPairings} />
                </Xwrapper>
            </div>
        </section>
    );
}
