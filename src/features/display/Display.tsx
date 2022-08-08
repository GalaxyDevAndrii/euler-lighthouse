import { useEffect, useRef, Fragment, memo } from "react";
import ReactTooltip from "react-tooltip";
import { Xwrapper, useXarrow } from "react-xarrows";

import Loader from "../../components/Loader";
import { NODE_LIMIT } from "../../config";
import { useStore } from "../../stores/nodes";
import { useTrackedStore as useTrackedUtils } from "../../stores/utils";
import type { INode } from "../../types";
import { saveNodesToLocalStorage } from "../../utils/helpers";
import { Node, Edge, GhostNode } from "../nodes";

import Canvas from "./components/Canvas/Canvas";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import SelectBox from "./components/SelectBox";

export default function Display() {
    const { nodes, getNode } = useStore();
    const { selectedTool, setLineActive, setDisplayRef } = useTrackedUtils();
    const updateEdge = useXarrow();
    const saveTimeout = useRef<NodeJS.Timeout | null>(null);
    const displayRef = useRef(null);

    useEffect(() => {
        if (displayRef.current) {
            setDisplayRef(displayRef);
        }
    }, [setDisplayRef]);

    // useEffect(() => {
    //     // load nodes in
    //     if (localStorage.savedNodesState)
    //         JSON.parse(localStorage.savedNodesState).forEach((node: INode) => {
    //             addNode({ x: node.posX - SIDEBAR_OFFSET, y: node.posY - HEADER_OFFSET }, node.type, node.connectedTo);
    //         });
    //     updateEdge();
    // }, [addNode]);

    // const handleAutomaticSave = () => {
    //     if (nodes.length <= 0) return;
    //     saveTimeout.current && clearTimeout(saveTimeout.current);

    //     const save = setTimeout(() => {
    //         saveNodesToLocalStorage(nodes);
    //     }, 5000);

    //     saveTimeout.current = save;
    // };

    // To check if there is a pair of edges and render a single one
    const existingPairings = new Set<string>();

    // eslint-disable-next-line react/display-name
    const EdgesRender = memo(({ connectedTo, domEl }: { connectedTo: number[]; domEl: HTMLElement | undefined }) => (
        <>
            {connectedTo.map((to: number) => (
                <Edge
                    key={getNode(to).id}
                    from={domEl?.id ?? ""}
                    to={getNode(to).domEl?.id ?? ""}
                    existingPairings={existingPairings}
                    forceRender={updateEdge}
                />
            ))}
        </>
    ));

    return (
        <section
            ref={displayRef}
            aria-label="Display"
            className="select-none h-full w-full shadow-inner overflow-hidden"
            onMouseLeave={() => {
                setLineActive(false);
                ReactTooltip.rebuild(); // ReactTooltip bug, eventListeners not being added workaround
            }}
        >
            <ContextMenu>
                <div
                    className={`relative inset-0 w-full h-full touch-auto ${
                        selectedTool === "grab" ? "cursor-grab active:cursor-grabbing" : ""
                    }`}
                >
                    <div className="absolute h-full w-full inset-0 flex justify-center items-center">
                        <Loader size={64} />
                    </div>
                    <Canvas />

                    <Xwrapper>
                        {nodes.slice(0, NODE_LIMIT).map((node: INode) => (
                            <Fragment key={node.id}>
                                <Node node={node} />
                                <EdgesRender connectedTo={node.connectedTo} domEl={node.domEl} />
                            </Fragment>
                        ))}

                        {selectedTool === "selector" && (
                            <>
                                <SelectBox listenerParent={displayRef} />
                                <GhostNode existingPairings={existingPairings} />
                            </>
                        )}
                    </Xwrapper>
                </div>
            </ContextMenu>
        </section>
    );
}
