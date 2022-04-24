import { useStore as useUtilsStore } from "../store/utils";

import Display from "./Display";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

export default function Layout() {
    const sidebarExpanded = useUtilsStore((state) => state.sidebarExpanded);

    return (
        <div className="h-full w-full overflow-hidden">
            <Toolbar />
            <Sidebar />
            <div role="application" className={`${sidebarExpanded ? "pl-64" : "pl-0"} transition-[padding] pt-12 w-full h-full fixed`}>
                <Display />
            </div>
        </div>
    );
}
