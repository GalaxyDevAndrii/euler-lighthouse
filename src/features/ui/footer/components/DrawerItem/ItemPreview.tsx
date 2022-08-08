import { useState, useEffect } from "react";

import { useTrackedStore as useTrackedNodes } from "../../../../../stores/nodes";
import { useStore as useSettingsStore } from "../../../../../stores/settings";
import { INode } from "../../../../../types";
import { NodeSVG } from "../../../../nodes/components/NodeSVG";

export default function ItemPreview({ node }: { node: INode }) {
    const { selectedNode, selectNode, isSelected } = useTrackedNodes();
    const darkMode = useSettingsStore((state) => state.darkMode);

    const [isLocked, setLock] = useState(false);

    useEffect(() => {
        if (isLocked && !isSelected(node)) setLock(false);
    }, [isLocked, isSelected, node, selectedNode]);

    const lockHandler = () => {
        if (isLocked) {
            setLock(false);
            selectNode(undefined);
        } else {
            setLock(true);
            selectNode(node);
        }
    };

    return (
        <button
            className={`h-full w-full rounded-md flex justify-center items-center ${isLocked ? "ring ring-red-500" : ""}`}
            onClick={lockHandler}
            onMouseEnter={() => {
                if (isLocked || (selectedNode && !isSelected(node))) return;
                selectNode(node);
            }}
            onMouseLeave={() => {
                if ((selectedNode && !isSelected(node)) || isLocked) return;
                selectNode(undefined);
            }}
        >
            <NodeSVG
                size={42}
                zoom={0.9}
                middleColor={darkMode ? "#232325" : "#dffff7"}
                borderColor={node.type === "Initial" ? "green" : node.type === "Final" ? "red" : darkMode ? "white" : "black"}
            />
            <div className="absolute h-full w-full top-0 left-0 z-20">
                <span
                    aria-label="Node id"
                    className="absolute bottom-0 right-0 my-1.5 mx-2 text-[0.70rem] leading-5 text-secondaryText/50 dark:text-secondaryDark/75"
                >
                    {node.id}
                </span>
            </div>
        </button>
    );
}
