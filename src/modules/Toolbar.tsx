import { RadioGroup, Transition, Switch } from "@headlessui/react";
import { createRef, Fragment, useEffect, useRef } from "react";
import ReactTooltip from "react-tooltip";

import { ReactComponent as SelectorIcon } from "../assets/cursor.svg";
import { ReactComponent as DragIcon } from "../assets/drag.svg";
import { ReactComponent as DarkIcon } from "../assets/night.svg";
import { ReactComponent as RemoveNodeIcon } from "../assets/node-minus.svg";
import { ReactComponent as AddNodeIcon } from "../assets/node-plus.svg";
import { ReactComponent as RunIcon } from "../assets/run.svg";
import { ReactComponent as LightIcon } from "../assets/sun.svg";
import SubtleBtn from "../components/SubtleBtn";
import { handleRemove } from "../features/nodeHandler";
import { useTrackedStore } from "../store/nodes";
import { useStore as useSettingsStore } from "../store/settings";
import { useTrackedStore as useTrackedUtils } from "../store/utils";

export default function Toolbar() {
    const { clearNodes, addNode, selectedNode } = useTrackedStore();
    const { selectedTool, setTool, sidebarExpanded, setToolbarRef } = useTrackedUtils();
    const { darkMode, toggleDarkMode } = useSettingsStore((state) => state);

    const toolbarRef = useRef(null);
    const hintRef = createRef<HTMLElement>();

    useEffect(() => {
        if (toolbarRef.current) setToolbarRef(toolbarRef);
        if (hintRef.current) ReactTooltip.show(hintRef.current);
    }, [setToolbarRef, hintRef, toolbarRef]);

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "r" || "R":
                    setTool("selector");
                    break;
                case "h" || "H":
                    setTool("grab");
                    break;
                default:
                    return;
            }
        });
    }, [setTool]);

    const InteractionSelectors = () => (
        <RadioGroup
            className="flex items-center border dark:border-lightGray rounded-md overflow-hidden"
            value={selectedTool}
            onChange={setTool}
        >
            <RadioGroup.Option value="selector">
                {({ checked }) => (
                    <div
                        aria-label="Select Nodes Tool"
                        className={`  dark:bg-mainGray dark:active:bg-lightDark px-2 py-1 ${
                            checked ? "bg-gray-200 dark:!bg-lightDark" : "bg-gray-100 active:bg-gray-200"
                        }`}
                        data-for="tooltip"
                        data-tip="Select Tool, R"
                    >
                        <SelectorIcon className="dark:fill-white" />
                    </div>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option value="grab">
                {({ checked }) => (
                    <div
                        aria-label="Grab or Drag Nodes Tool"
                        className={` dark:bg-mainGray dark:active:bg-lightDark px-2 py-1 ${
                            checked ? "bg-gray-200 dark:!bg-lightDark" : "bg-gray-100 active:bg-gray-200"
                        }`}
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
            <SubtleBtn aria-label="Clear Nodes" onClick={clearNodes} classNames="px-2 dark:text-white">
                Clear
            </SubtleBtn>
            <SubtleBtn
                setRef={hintRef}
                title="Run"
                aria-label="Run selected algorithm"
                data-for="hint"
                data-tip="You can click here to start the algorithm."
                data-place="bottom"
            >
                <RunIcon className="fill-contrast" />
            </SubtleBtn>
        </>
    );

    const NodeInteractionShortcuts = () => (
        <Transition
            show={!sidebarExpanded}
            as={Fragment}
            enter="transition ease-in duration-150"
            leave="transition ease-in duration-150"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="flex items-center space-x-2">
                <SubtleBtn title="Add node" onClick={addNode} classNames="px-1.5">
                    <AddNodeIcon className="dark:fill-white" />
                </SubtleBtn>
                <SubtleBtn title="Remove node" onClick={() => handleRemove(selectedNode)} classNames="px-1.5">
                    <RemoveNodeIcon className="dark:fill-white" />
                </SubtleBtn>
            </div>
        </Transition>
    );

    const DarkModeToggle = () => (
        <div className="items-center hidden mini:flex mx-2 md:mx-4 space-x-2">
            <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                className={`${darkMode ? "bg-contrast" : "bg-gray-200"} relative inline-flex items-center h-7 rounded-full w-14`}
                aria-label={darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}
                data-for="tooltip"
                data-tip={darkMode ? "Light Mode" : "Dark Mode"}
                data-delay-update="1000"
            >
                <span className="sr-only">{darkMode ? "Toggle Light Mode" : "Toggle Dark Mode"}</span>
                {darkMode && <LightIcon className="absolute fill-white w-4.5 h-4.5 right-8" />}

                <span
                    className={`${
                        darkMode ? "translate-x-8" : "translate-x-1"
                    }  w-5 h-5 transform bg-white rounded-full flex justify-center items-center`}
                />
                {!darkMode && <DarkIcon className="absolute fill-lightDark w-4 h-4 left-[34px]" />}
            </Switch>
        </div>
    );

    return (
        <header
            ref={toolbarRef}
            className={`fixed select-none top-0 right-0 h-12 z-10 transition-[width,padding] flex items-center justify-between dark:bg-mainDark ${
                sidebarExpanded ? "w-[calc(100%-16rem)]" : "w-full pl-12 xs:pl-14 md:pl-16"
            }`}
            role="toolbar"
            aria-label="Toolbar"
            aria-orientation="horizontal"
        >
            <div className="flex items-center space-x-2 xs:space-x-4">
                <InteractionSelectors />
                <NodeControls />
                <NodeInteractionShortcuts />
            </div>
            <DarkModeToggle />
        </header>
    );
}
