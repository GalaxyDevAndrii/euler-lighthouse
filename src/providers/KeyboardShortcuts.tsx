import { useHotkeys } from "react-hotkeys-hook";
// import { toast } from "react-toastify";

import { useStore as useAlgorithmStore } from "../stores/algorithm";
import { useTrackedStore as useTrackedNodes } from "../stores/nodes";
import { useTrackedStore as useTrackedUtils } from "../stores/utils";

export default function KeyboardShortcuts() {
    const { addNode, removeNode, selectedNode, isSelected } = useTrackedNodes();
    const { setLineActive, displayRef, toggleFullscreen, setCtrlPressed, setTool } = useTrackedUtils();
    const { initialize, cancel, isActive } = useAlgorithmStore();

    const handleAddNode = (e: KeyboardEvent) => {
        e.preventDefault();
        addNode();
    };

    const handleRemoveNode = (e: KeyboardEvent) => {
        e.preventDefault();
        if (isSelected()) {
            removeNode(selectedNode);
            setLineActive(false);
        }
    };

    const handleInitialize = () => {
        if (isActive) {
            cancel();
        } else {
            initialize();
        }
    };

    const handleFullscreenClick = () => {
        if (!displayRef?.current) return;
        toggleFullscreen(displayRef?.current);
    };

    useHotkeys("ctrl+d", handleAddNode); // add node shortcut
    useHotkeys("del, delete, backspace", handleRemoveNode, [selectedNode, removeNode, isSelected]); // remove node shortcut
    useHotkeys("l", handleInitialize); // run algorithm shortcut
    useHotkeys("r", () => setTool("selector")); // select tool shortcut
    useHotkeys("h", () => setTool("grab")); // grab tool shortcut
    useHotkeys("j", handleFullscreenClick, [displayRef]); // toggle fullscreen shortcut

    // check if ctrl is pressed
    useHotkeys(
        "*",
        (e: KeyboardEvent) => {
            if (e.ctrlKey) {
                if (e.type === "keydown") {
                    setCtrlPressed(true);
                }
            }
            if (e.type === "keyup") {
                setCtrlPressed(false);
            }
        },
        { keydown: true, keyup: true },
        []
    );

    return null;
}
