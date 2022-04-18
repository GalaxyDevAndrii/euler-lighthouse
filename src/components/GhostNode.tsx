import { useCursorPosition } from "../hooks/useCursorPosition";
import { useStore } from "../store/nodes";
import { useTrackedStore } from "../store/utils";

import Edge from "./Edge";

export default function GhostNode({ existingPairings }: { existingPairings: Set<string> }) {
    const selectedNode = useStore((state) => state.selectedNode);
    const { lineActive, sidebarExpanded } = useTrackedStore();

    const cursorPos = useCursorPosition(null, { x: sidebarExpanded ? 256 : 0, y: 48 });

    return lineActive && selectedNode?.domEl ? (
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
