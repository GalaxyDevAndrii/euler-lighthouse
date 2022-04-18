import { Fragment, useRef, useEffect, memo } from "react";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { Xwrapper } from "react-xarrows";

import Edge from "../components/Edge";
import GhostNode from "../components/GhostNode";
import Node from "../components/Node";
import { NODE_LIMIT } from "../config";
import { useStore } from "../store/nodes";
import { useTrackedStore as useTrackedUtils } from "../store/utils";
import { INode } from "../types";

import Canvas from "./Canvas";

export default function Display() {
    const { nodes, getNode } = useStore((state) => state);
    const { selectedTool, setLineActive } = useTrackedUtils();

    const displayHandler = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (displayHandler?.current && nodes.length !== 0) {
            // remove right click for better user experience
            displayHandler.current.addEventListener("contextmenu", (event) => event.preventDefault());
        }

        if (nodes.length >= NODE_LIMIT) {
            toast.error("You have reached the maximum number of nodes.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [displayHandler, nodes.length]);

    // To check if there is a pair of edges and render a single one
    const existingPairings = new Set<string>();

    // eslint-disable-next-line react/display-name
    const EdgesRender = memo(({ connectedTo, domEl }: { connectedTo: number[]; domEl: HTMLElement | undefined }) => {
        return connectedTo.length >= 1 ? (
            <>
                {connectedTo.map((to: number) => (
                    <Edge
                        key={getNode(to).id}
                        from={domEl?.id ?? ""}
                        to={getNode(to).domEl?.id ?? ""}
                        existingPairings={existingPairings}
                    />
                ))}
            </>
        ) : null;
    });

    return (
        <section
            aria-label="Display"
            className="relative select-none w-full min-w-[400px] h-full overflow-hidden"
            onMouseLeave={() => {
                setLineActive(false);
                ReactTooltip.rebuild(); // ReactTooltip bug, eventListeners not being added workaround
            }}
        >
            <div
                ref={displayHandler}
                className={`absolute w-full h-full left-0 top-0 overflow-hidden touch-auto ${
                    selectedTool === "grab" ? "cursor-grab active:cursor-grabbing" : ""
                }`}
            >
                <Canvas />

                <Xwrapper>
                    {nodes.slice(0, NODE_LIMIT).map((node: INode) => (
                        <Fragment key={node.id}>
                            <Node node={node} />

                            <EdgesRender connectedTo={node.connectedTo} domEl={node.domEl} />
                        </Fragment>
                    ))}

                    {selectedTool === "selector" ? <GhostNode existingPairings={existingPairings} /> : null}
                </Xwrapper>
            </div>
        </section>
    );
}
