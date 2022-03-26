import { useCursorPosition } from "../hooks/useCursorPosition";
import { useStore } from "../store/nodes";
import { useStore as useUtilsStore } from "../store/utils";

import Edge from "./Edge";

export default function GhostNode({ existingPairings }: { existingPairings: Set<string> }) {
    const cursorPos = useCursorPosition();

    const selectedNode = useStore((state) => state.selectedNode);
    const lineActive = useUtilsStore((state) => state.lineActive);

    return lineActive && selectedNode?.domEl ? (
        <>
            <div
                id="ghost__node"
                className="absolute w-5 h-5 left-0 top-0 will-change-auto"
                style={{
                    top: `${cursorPos.y - 55}px`,
                    left: `${cursorPos.x - 265}px`,
                }}
            />
            <Edge from="ghost__node" to={selectedNode.domEl.id.toString()} existingPairings={existingPairings} />
        </>
    ) : null;
}
