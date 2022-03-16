import { useState } from "react";

import { ReactComponent as AboutSvg } from "../assets/about.svg";
import { ReactComponent as GithubSvg } from "../assets/github.svg";
import Patterns from "../components/Patterns";
import SelectMenu from "../components/SelectMenu";
import UtilsBtn from "../components/UtilsBtn";
import { useStore } from "../store/nodes";
import { useStore as useUtilsStore } from "../store/utils";
import { INode } from "../types";

export default function Sidebar() {
    const { addNode, removeNode, selectedNode } = useStore((state) => state);
    const { setCurrEvent, setLineActive } = useUtilsStore((state) => state);
    const [warning, setWarning] = useState(false);

    const handleRemove = (selectedNode?: INode) => {
        if (selectedNode) {
            removeNode(selectedNode.id);
            setWarning(false);
        } else {
            setWarning(true);

            setTimeout(() => {
                setWarning(false); // close warning after 3s
            }, 3000);
        }
    };

    const handleClick = () => {
        addNode();
        setCurrEvent("click");
    };

    const handleDrag = () => {
        addNode();
        setCurrEvent("drag");
    };

    const handleDragEnd = () => {
        setCurrEvent(undefined);
    };

    const Interaction = () => (
        <div className="space-y-1">
            <span className="text-sm text-gray-500 mb-2">Click or drag to create or remove a node</span>

            <UtilsBtn classNames="py-4" onClick={handleClick} draggable={true} onDragStart={handleDrag} onDragEnd={handleDragEnd}>
                Add Node
            </UtilsBtn>
            <UtilsBtn classNames="py-4" onClick={() => handleRemove(selectedNode)}>
                Remove Node
            </UtilsBtn>

            <span className={`text-sm text-red-600 mt-2 transition ${warning ? "" : "opacity-0"}`}>Select a node to be removed</span>
        </div>
    );

    const Explanation = () => (
        <div className="w-full">
            <h3 className="text-base mb-2 font-medium">Explanation</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, quis accusantium? Vel assumenda reprehenderit dolore!</p>
        </div>
    );

    const SettingsBtn = () => <button className="bg-black/10 text-sm px-4 py-1.5 rounded-md">Settings</button>;

    const Info = () => (
        <div className="flex flex-row items-center justify-between space-x-6">
            <button className="flex flex-row items-center justify-center space-x-1 hover:underline">
                <AboutSvg />
                <span>About</span>
            </button>
            <a
                className="flex flex-row items-center justify-center space-x-1 hover:underline"
                href="https://github.com/rortan134/euler-lighthouse"
                target="_blank"
                rel="noreferrer"
            >
                <GithubSvg />
                <span>Repository</span>
            </a>
        </div>
    );

    return (
        <aside
            onMouseEnter={() => setLineActive(false)}
            className="fixed top-0 left-0 select-none h-full w-64 px-4 pt-14 pb-10 flex flex-col items-center justify-between z-20 bg-white"
        >
            <SelectMenu />

            <Interaction />

            {/* Common patterns... */}
            <Patterns />

            <Explanation />

            <SettingsBtn />

            <Info />
        </aside>
    );
}
