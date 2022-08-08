import { useEffect, useState, useRef, createRef } from "react";
import SimpleBar from "simplebar-react";

import { ReactComponent as TrashSVG } from "../../../assets/trash.svg";
import { useTrackedStore as useTrackedUtils } from "../../../stores/utils";
import type { SidebarViews } from "../../../types";

import GoToTop from "./components/GoToTop";
import SettingsView from "./views/SettingsView";
import SidebarView from "./views/SidebarView";
import SwitchViews from "./views/SwitchViews";

export default function Sidebar() {
    const { setSidebarRef, sidebarExpanded, isAtSidebar } = useTrackedUtils();

    const [activeView, setActiveView] = useState<SidebarViews>("SidebarView");
    const sidebarRef = useRef(null);
    const scrollRef = createRef<HTMLElement | null>();

    useEffect(() => {
        if (sidebarRef.current) {
            setSidebarRef(sidebarRef);
        }
    }, [setSidebarRef]);

    const DeleteOverlay = () => (
        <div className="absolute h-full w-full top-0 left-0 bg-gradient-to-b via-black/20 z-30 backdrop-blur-[1px] transition-colors flex justify-center items-center">
            <TrashSVG className="fill-red-600 animate-wiggle" />
        </div>
    );

    const Footer = () => (
        <footer className="w-full p-8 flex flex-row justify-center items-center bg-primaryTheme text-white">
            <div className="w-full flex items-center justify-center space-x-16 font-medium">
                <a href="https://github.com/rortan134/euler-lighthouse" target="_blank" rel="noopener noreferrer">
                    Source
                </a>
                <a href="https://github.com/rortan134/euler-lighthouse/issues" target="_blank" rel="noopener noreferrer">
                    Issues
                </a>
            </div>
        </footer>
    );

    return (
        <aside
            ref={sidebarRef}
            className={`relative h-full shrink-0 w-72 z-20 bg-white dark:bg-mainDark overflow-hidden ${sidebarExpanded ? "" : "basis-0"}`}
            aria-label="Sidebar"
        >
            {isAtSidebar && <DeleteOverlay />}
            <GoToTop parent={scrollRef} />
            <SimpleBar scrollableNodeProps={{ ref: scrollRef }} className="overflow-x-hidden h-full">
                <div className="h-full w-full px-5 space-y-7">
                    <SwitchViews active={activeView}>
                        <SidebarView setActiveView={setActiveView} />
                        <SettingsView setActiveView={setActiveView} />
                    </SwitchViews>
                </div>
                <Footer />
            </SimpleBar>
        </aside>
    );
}
