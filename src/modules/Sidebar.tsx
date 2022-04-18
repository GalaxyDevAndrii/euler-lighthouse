import { useEffect, useState, useRef } from "react";
import SimpleBar from "simplebar-react";

import { ReactComponent as AboutSvg } from "../assets/about.svg";
import { ReactComponent as GithubSvg } from "../assets/github.svg";
import { ReactComponent as ExpandedSvg } from "../assets/left.svg";
import { ReactComponent as RetractedSvg } from "../assets/right.svg";
import { ReactComponent as TrashSVG } from "../assets/trash.svg";
import UtilsBtn from "../components/UtilsBtn";
import AboutView from "../components/views/AboutView";
import SettingsView from "../components/views/SettingsView";
import SidebarView from "../components/views/SidebarView";
import SwitchViews from "../components/views/SwitchViews";
import useDeviceDetect from "../hooks/useDeviceDetect";
import { useTrackedStore as useTrackedUtils } from "../store/utils";
import { SidebarViews } from "../types";

import "simplebar/dist/simplebar.min.css";

export default function Sidebar() {
    const { setSidebarRef, toggleSidebar, sidebarExpanded, isAtSidebar } = useTrackedUtils();
    const isMobile = useDeviceDetect();

    const [activeView, setActiveView] = useState<SidebarViews>("SidebarView");
    const sidebarRef = useRef(null);

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

    const CollapseComponent = () => (
        <button
            onClick={toggleSidebar}
            className="fixed top-0 left-0 m-1.5 p-2 rounded-full transition active:bg-gray-100 dark:active:bg-lightDark z-30"
            data-for="tooltip"
            data-tip={sidebarExpanded ? "Collapse" : "Expand"}
            data-event={isMobile ? "none" : "mouseenter"}
            data-event-off={isMobile ? "none" : "mouseleave"}
            data-place="right"
        >
            {sidebarExpanded ? (
                <ExpandedSvg className="dark:fill-white" aria-label="Retract sidebar" />
            ) : (
                <RetractedSvg className="dark:fill-white" aria-label="Expand sidebar" />
            )}
        </button>
    );

    const Info = () => (
        <div className="py-2 px-3 dark:text-white bg-gray-200 border-t rounded dark:bg-lightDark dark:border-mainGray">
            <div className="bg-gray-100 dark:bg-mainGray rounded-md flex flex-row items-center justify-between py-2.5 px-4">
                <UtilsBtn
                    onClick={() => setActiveView("AboutView")}
                    classNames="!bg-transparent !border-transparent flex flex-nowrap items-center justify-start space-x-1.5 hover:underline"
                >
                    <AboutSvg className="dark:fill-white" />
                    <span>About</span>
                </UtilsBtn>
                <a
                    className="flex flex-nowrap items-center justify-end space-x-1.5 hover:underline focus:border-contrast focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-contrast focus-visible:ring-offset-2 focus-visible:border-contrast"
                    href="https://github.com/rortan134/euler-lighthouse"
                    target="_blank"
                    rel="noreferrer"
                >
                    <GithubSvg className="dark:fill-white" />
                    <span>Repository</span>
                </a>
            </div>
        </div>
    );

    return (
        <aside
            ref={sidebarRef}
            className="fixed select-none transition-[left] top-0 left-0 h-full w-64 z-20 bg-white dark:bg-mainDark overflow-hidden"
            aria-label="Sidebar"
            style={sidebarExpanded ? {} : { left: "-256px" }}
        >
            {isAtSidebar && <DeleteOverlay />}
            <CollapseComponent />
            <div className="flex flex-col h-full w-full pt-14 relative">
                <SimpleBar className="overflow-x-hidden h-full">
                    <div className="relative h-full w-full pr-5 pl-3 space-y-7">
                        <SwitchViews active={activeView}>
                            <SidebarView setActiveView={setActiveView} />
                            <SettingsView setActiveView={setActiveView} />
                            <AboutView setActiveView={setActiveView} />
                        </SwitchViews>
                    </div>
                </SimpleBar>
                <Info />
            </div>
        </aside>
    );
}
