import { RadioGroup } from "@headlessui/react";

import { ReactComponent as SelectorIcon } from "../assets/cursor.svg";
import { ReactComponent as DragIcon } from "../assets/drag.svg";
import { ReactComponent as RunIcon } from "../assets/run.svg";
import SubtleBtn from "../components/SubtleBtn";
import { useStore } from "../store/nodes";
import { useStore as useUtilsStore } from "../store/utils";

export default function Toolbar() {
    const { selectedTool, setTool } = useUtilsStore((state) => state);
    const clearNodes = useStore((state) => state.clearNodes);

    return (
        <header className="fixed select-none w-[calc(100%-16rem)] top-0 right-0 h-12 z-10 flex items-center space-x-4">
            <RadioGroup className="flex items-center border rounded-md overflow-hidden" value={selectedTool} onChange={setTool}>
                <RadioGroup.Option value="selector">
                    {({ checked }) => (
                        <div title="Selector" className={`bg-gray-100 px-2 py-1 active:bg-gray-200 ${checked ? "!bg-gray-200" : ""}`}>
                            <SelectorIcon />
                        </div>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option value="grab">
                    {({ checked }) => (
                        <div title="Grab" className={`bg-gray-100 px-2 py-1 active:bg-gray-200 ${checked ? "!bg-gray-200" : ""}`}>
                            <DragIcon />
                        </div>
                    )}
                </RadioGroup.Option>
            </RadioGroup>
            <SubtleBtn title="Clear Nodes" onClick={clearNodes} classNames="px-2">
                Clear
            </SubtleBtn>
            <SubtleBtn title="Run">
                <RunIcon className="fill-contrast" />
            </SubtleBtn>
        </header>
    );
}
