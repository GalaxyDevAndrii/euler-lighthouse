import { Disclosure } from "@headlessui/react";

import { ReactComponent as DownArrow } from "../../assets/down-arrow.svg";
import { ReactComponent as SettingsSvg } from "../../assets/settings.svg";
import { handleRemove } from "../../features/nodeHandler";
import { useStore } from "../../store/nodes";
import { useStore as useUtilsStore } from "../../store/utils";
import { SidebarViews } from "../../types";
import { isMobile } from "../../utils/misc";
import Patterns from "../Patterns";
import SelectMenu from "../SelectMenu";
import UtilsBtn from "../UtilsBtn";

export default function SidebarView({ setActiveView }: { setActiveView: React.Dispatch<React.SetStateAction<SidebarViews>> }) {
    const addNode = useStore((state) => state.addNode);
    const selectedNode = useStore((state) => state.selectedNode);
    const toggleSidebar = useUtilsStore((state) => state.toggleSidebar);

    const handleClick = () => {
        addNode();

        if (isMobile()) {
            toggleSidebar();
        }
    };

    const handleDrag = () => {
        addNode();
    };

    const Interaction = () => (
        <div className="space-y-1">
            <span className="text-sm text-gray-500 dark:text-gray-300 mb-2">Click or drag to create or remove a node</span>

            <UtilsBtn classNames="py-4" onClick={handleClick} onDragStart={handleDrag}>
                Add Node
            </UtilsBtn>
            <UtilsBtn classNames="py-4" onClick={() => handleRemove(selectedNode)}>
                Remove Node
            </UtilsBtn>
        </div>
    );

    const Explanation = () => (
        <Disclosure as="div" role="definition">
            {({ open }: { open: boolean }) => (
                <>
                    <Disclosure.Button
                        as={UtilsBtn}
                        classNames="py-1.5 px-4 w-full flex items-center justify-between w-full !dark:bg-lightDark"
                    >
                        <span className="text-base !font-medium dark:text-white" aria-label="Algorithm explanation">
                            Explanation
                        </span>
                        <DownArrow
                            className={`pointer-events-none transition fill-gray-500 group-hover:fill-black dark:group-hover:fill-white ${
                                open ? "transform rotate-180" : ""
                            } `}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="text-sm text-black dark:text-white p-4 dark:bg-mainDark">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, quis accusantium? Vel assumenda reprehenderit
                        dolore!
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );

    const SettingsBtn = () => (
        <UtilsBtn
            onClick={() => setActiveView("SettingsView")}
            classNames="w-min text-sm px-4 py-2 flex flex-row items-center justify-center space-x-1.5 mx-auto !mb-8"
        >
            <SettingsSvg className="dark:fill-white" />
            <span>Settings</span>
        </UtilsBtn>
    );

    return (
        <>
            <SelectMenu />

            <Interaction />

            {/* Common patterns... */}
            <Patterns />

            <Explanation />

            <SettingsBtn />
        </>
    );
}
