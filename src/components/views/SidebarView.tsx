import { toast } from "react-toastify";

import { ReactComponent as AboutSvg } from "../../assets/about.svg";
import { ReactComponent as GithubSvg } from "../../assets/github.svg";
import { ReactComponent as SettingsSvg } from "../../assets/settings.svg";
import { useStore } from "../../store/nodes";
import { useStore as useUtilsStore } from "../../store/utils";
import { INode, SidebarViews } from "../../types";
import Patterns from "../Patterns";
import SelectMenu from "../SelectMenu";
import UtilsBtn from "../UtilsBtn";

export default function SidebarView({ setActiveView }: { setActiveView: React.Dispatch<React.SetStateAction<SidebarViews>> }) {
    const { addNode, removeNode, selectedNode, selectNode } = useStore((state) => state);
    const { setCurrEvent } = useUtilsStore((state) => state);

    const handleRemove = (selectedNode?: INode) => {
        if (selectedNode) {
            removeNode(selectedNode.id);
            selectNode(undefined);
        } else {
            toast.error("Select a node to be removed.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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

            <UtilsBtn classNames="py-4" onClick={handleClick} onDragStart={handleDrag} onDragEnd={handleDragEnd}>
                Add Node
            </UtilsBtn>
            <UtilsBtn classNames="py-4" onClick={() => handleRemove(selectedNode)}>
                Remove Node
            </UtilsBtn>
        </div>
    );

    const Explanation = () => (
        <div className="w-full">
            <h3 className="text-base mb-2 font-medium">Explanation</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, quis accusantium? Vel assumenda reprehenderit dolore!</p>
        </div>
    );

    const SettingsBtn = () => (
        <UtilsBtn
            onClick={() => setActiveView("SettingsView")}
            classNames="w-min text-sm px-4 py-2 flex flex-row items-center justify-center space-x-1.5"
        >
            <SettingsSvg />
            <span>Settings</span>
        </UtilsBtn>
    );

    const Info = () => (
        <div className="flex flex-row items-center justify-between space-x-6">
            <UtilsBtn
                onClick={() => setActiveView("AboutView")}
                classNames="bg-transparent flex flex-row items-center justify-center space-x-1.5 hover:underline"
            >
                <AboutSvg />
                <span>About</span>
            </UtilsBtn>
            <a
                className="flex flex-row items-center justify-center space-x-1.5 hover:underline focus:border-contrast focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-contrast focus-visible:ring-offset-2 focus-visible:border-contrast"
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
        <>
            <SelectMenu />

            <Interaction />

            {/* Common patterns... */}
            <Patterns />

            <Explanation />

            <SettingsBtn />

            <Info />
        </>
    );
}
