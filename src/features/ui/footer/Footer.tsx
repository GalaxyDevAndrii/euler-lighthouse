import { Transition } from "@headlessui/react";
import { useState, Fragment } from "react";

import FadeInOut from "../../../components/FadeInOut";

import AuxiliaryButtons from "./components/AuxiliaryButtons";
import DisplayInfo from "./components/DisplayInfo";
import Drawer from "./components/Drawer";
import ExpandFooterToggle from "./components/ExpandFooterToggle";

export default function Footer() {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpandState = () => {
        setIsExpanded((state) => !state);
    };

    return (
        <footer
            aria-expanded={isExpanded}
            aria-controls="footer__drawer"
            className="relative w-full bg-white border-t drop-shadow-2xl z-20 flex flex-col justify-between items-center"
        >
            <ExpandFooterToggle state={isExpanded} onClick={toggleExpandState} />
            <Transition
                show={isExpanded}
                as={Fragment}
                enter="transition-[transform,opacity]"
                enterFrom="translate-y-48 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transition-[transform,opacity]"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="translate-y-48 opacity-0"
            >
                <div aria-hidden={!isExpanded} id="footer__drawer" className="relative bg-white w-full h-36">
                    <Drawer active={isExpanded} />
                </div>
            </Transition>
            <div className="w-full h-10 flex flex-row items-center justify-between px-3 md:px-6 z-20">
                <div>
                    <FadeInOut active={!isExpanded} enter leave>
                        <div className="flex items-center justify-start flex-row space-x-3 md:space-x-8 p-1.5">
                            <DisplayInfo />
                        </div>
                    </FadeInOut>
                </div>
                <div className="flex items-center justify-end flex-row space-x-3 md:space-x-6">
                    <AuxiliaryButtons />
                </div>
            </div>
        </footer>
    );
}
