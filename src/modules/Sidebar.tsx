import { useState } from "react";

import { ReactComponent as ExpandedSvg } from "../assets/left.svg";
import { ReactComponent as RetractedSvg } from "../assets/right.svg";
import AboutView from "../components/views/AboutView";
import SettingsView from "../components/views/SettingsView";
import SidebarView from "../components/views/SidebarView";
import SwitchViews from "../components/views/SwitchViews";
import { useStore as useUtilsStore } from "../store/utils";
import { SidebarViews } from "../types";

export default function Sidebar() {
    const { setLineActive, sidebarExpanded, toggleSidebar } = useUtilsStore((state) => state);
    const [activeView, setActiveView] = useState<SidebarViews>("SidebarView");

    const ExpandComponent = () => (
        <button onClick={toggleSidebar} className="fixed top-0 left-0 m-1.5 p-2 rounded-full transition active:bg-gray-100">
            {sidebarExpanded ? <ExpandedSvg /> : <RetractedSvg />}
        </button>
    );

    return (
        <aside
            onMouseEnter={() => setLineActive(false)}
            className="fixed transition-[left] top-0 left-0 select-none h-full w-64 px-4 pb-10 pt-14 flex flex-col items-center justify-between z-20 bg-white"
            style={!sidebarExpanded ? { left: "-255px" } : {}}
        >
            <ExpandComponent />
            <SwitchViews active={activeView}>
                <SidebarView setActiveView={setActiveView} />
                <SettingsView setActiveView={setActiveView} />
                <AboutView setActiveView={setActiveView} />
            </SwitchViews>
        </aside>
    );
}
