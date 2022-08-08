import { SIDEBAR_OFFSET, HEADER_OFFSET } from "../../../config";
import { useCursorPosition } from "../../../hooks/useCursorPosition";
import { useStore as useNodesStore } from "../../../stores/nodes";
import { useTrackedStore as useTrackedUtils } from "../../../stores/utils";

import Edge from "./Edge";

/*
 * Follows the cursor to create a line while dragging from one node to another
 */

export default function GhostNode({ existingPairings }: { existingPairings: Set<string> }) {
    const { lineActive, sidebarExpanded, fullscreenActive, displayRef } = useTrackedUtils();
    const selectedNode = useNodesStore((state) => state.selectedNode);

    const cursorPos = useCursorPosition({
        ref: displayRef,
        offset: {
            x: sidebarExpanded && !fullscreenActive ? SIDEBAR_OFFSET : 0,
            y: !fullscreenActive ? HEADER_OFFSET : 0,
        },
    });

    return lineActive && !Array.isArray(selectedNode) && selectedNode?.domEl ? (
        <>
            <div
                id="ghost__node"
                className="absolute w-5 h-5 left-0 top-0 will-change-auto"
                style={{
                    left: `${cursorPos.x}px`,
                    top: `${cursorPos.y}px`,
                }}
            />
            <Edge from="ghost__node" to={selectedNode.domEl.id.toString()} existingPairings={existingPairings} />
        </>
    ) : null;
}
