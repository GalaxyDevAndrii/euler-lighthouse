import Backdrop from "../components/Backdrop";
import { useStore as useUtilsStore } from "../stores/utils";
import { isMobile } from "../utils/misc";

export default function MobileBackdrop() {
    const sidebarExpanded = useUtilsStore((state) => state.sidebarExpanded);
    const toggleSidebar = useUtilsStore((state) => state.toggleSidebar);

    return (
        <Backdrop active={isMobile() && sidebarExpanded} clickCallback={toggleSidebar}>
            <div role="application" className="relative w-full h-full min-w-[280px] grow flex flex-col z-0"></div>
        </Backdrop>
    );
}
