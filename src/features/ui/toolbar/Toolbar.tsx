import { RadioGroup, Popover } from "@headlessui/react";
import { useEffect, useRef } from "react";

import { ReactComponent as SelectorIcon } from "../../../assets/cursor.svg";
import { ReactComponent as DragIcon } from "../../../assets/drag.svg";
import { ReactComponent as RemoveNodeIcon } from "../../../assets/node-minus.svg";
import { ReactComponent as AddNodeIcon } from "../../../assets/node-plus.svg";
import FadeInOut from "../../../components/FadeInOut";
import Run from "../../../components/Run";
import SubtleBtn from "../../../components/SubtleBtn";
import { useTrackedStore } from "../../../stores/nodes";
import { useTrackedStore as useTrackedUtils } from "../../../stores/utils";

import CollapseButton from "./components/CollapseButton";
import DarkModeToggle from "./components/DarkModeToggle";
import Export from "./components/Export/Export";
import Help from "./components/Help/Help";

export default function Toolbar() {
    const { clearNodes, addNode, removeNode, selectedNode } = useTrackedStore();
    const { selectedTool, setTool, sidebarExpanded, setToolbarRef, ctrlPressed } = useTrackedUtils();
    const wasGrabTool = useRef(false);
    const toolbarRef = useRef(null);

    useEffect(() => {
        if (toolbarRef.current) {
            setToolbarRef(toolbarRef);
        }
    }, [setToolbarRef]);

    // change to select tool while ctrl is pressed down
    useEffect(() => {
        if (ctrlPressed && selectedTool === "grab") {
            setTool("selector");
            wasGrabTool.current = true;
        }
        if (!ctrlPressed && wasGrabTool.current) {
            setTool("grab");
            wasGrabTool.current = false;
        }
    }, [ctrlPressed, selectedTool, setTool]);

    const InteractionSelectors = () => (
        <RadioGroup className="flex items-center overflow-hidden border rounded-md" value={selectedTool} onChange={setTool}>
            <RadioGroup.Option value="selector" className="focus-acc">
                {({ checked }) => (
                    <div
                        aria-label="Select Nodes Tool"
                        className={`px-2 py-1 dark:bg-mainGray dark:active:bg-lightDark ${
                            checked ? "bg-tertiaryTheme dark:!bg-lightDark" : "bg-tertiaryTheme/75 active:bg-tertiaryTheme"
                        }
                        `}
                        data-for="tooltip"
                        data-tip="Select Tool, R"
                    >
                        <SelectorIcon className="dark:fill-white" />
                    </div>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option value="grab" className="focus-acc">
                {({ checked }) => (
                    <div
                        aria-label="Grab or Drag Nodes Tool"
                        className={`px-2 py-1 dark:bg-mainGray dark:active:bg-lightDark dark:border-lightGray ${
                            checked ? "bg-tertiaryTheme dark:!bg-lightDark" : "bg-tertiaryTheme/75 active:bg-tertiaryTheme"
                        }
                        `}
                        data-for="tooltip"
                        data-tip="Drag Tool, H"
                    >
                        <DragIcon className="dark:fill-white" />
                    </div>
                )}
            </RadioGroup.Option>
        </RadioGroup>
    );

    const NodeControls = () => (
        <>
            <SubtleBtn aria-label="Clear Nodes" onClick={clearNodes} classNames="px-2 text-primaryText dark:text-white">
                Clear
            </SubtleBtn>
            <FadeInOut active={!sidebarExpanded} enter leave>
                <div>
                    <Run />
                </div>
            </FadeInOut>
        </>
    );

    const NodeInteractionShortcuts = () => (
        <FadeInOut active={!sidebarExpanded} enter leave>
            <div className="flex items-center space-x-2">
                <SubtleBtn onClick={() => addNode()} classNames="px-1.5" data-for="tooltip" data-tip="Add Node">
                    <AddNodeIcon className="dark:fill-white" />
                </SubtleBtn>
                <SubtleBtn onClick={() => removeNode(selectedNode)} classNames="px-1.5" data-for="tooltip" data-tip="Remove Node">
                    <RemoveNodeIcon className="dark:fill-white" />
                </SubtleBtn>
            </div>
        </FadeInOut>
    );

    return (
        <header
            ref={toolbarRef}
            className="select-none shrink-0 h-14 w-full z-20 flex flex-nowrap items-center bg-white dark:bg-primaryDark overflow-x-hidden"
            role="toolbar"
            aria-label="Toolbar"
            aria-orientation="horizontal"
        >
            <CollapseButton />

            <div className="h-full w-full flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <InteractionSelectors />
                    <NodeControls />
                    <NodeInteractionShortcuts />
                </div>
                <div className="flex flex-nowrap items-center justify-between mx-2 md:mx-4 space-x-2 sm:space-x-4">
                    <Popover.Group className="flex flex-row items-center justify-between space-x-2 sm:space-x-4">
                        <Export />
                        <Help />
                    </Popover.Group>
                    <DarkModeToggle />
                </div>
            </div>
        </header>
    );
}
