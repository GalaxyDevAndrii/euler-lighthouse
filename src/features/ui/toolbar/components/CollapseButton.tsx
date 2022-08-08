import { useEffect, useRef } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { ReactComponent as ExpandedSVG } from "../../../../assets/left.svg";
import { ReactComponent as RetractedSVG } from "../../../../assets/right.svg";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";
import { useTrackedStore as useTrackedUtils } from "../../../../stores/utils";

/**
 * Collapse/Expand Sidebar component
 */

export default function CollapseButton() {
    const { toggleSidebar, sidebarExpanded, toggleBackdrop } = useTrackedUtils();

    const isMobile = useDeviceDetect();
    const overrideToggle = useRef(false);

    const handleCollapse = () => {
        toggleSidebar();
        toggleBackdrop();
        overrideToggle.current = !overrideToggle.current;
    };

    useHotkeys("ctrl+m", handleCollapse);

    useEffect(() => {
        if (isMobile) {
            if (overrideToggle.current) return;
            toggleSidebar(false);
            toggleBackdrop(true);
        } else {
            toggleSidebar(true);
            toggleBackdrop(false);
        }
    }, [isMobile, toggleBackdrop, toggleSidebar]);

    return (
        <div className={`shrink-0 ${sidebarExpanded ? "w-72" : "w-14 xs:w-16"}`}>
            <button
                className="ml-2 p-2 rounded-full transition active:bg-tertiaryTheme dark:active:bg-lightDark focus-acc"
                onClick={handleCollapse}
                data-for="tooltip"
                data-tip={sidebarExpanded ? "Collapse, Ctrl + M" : "Expand, Ctrl + M"}
                data-event={isMobile ? "none" : "mouseenter"}
                data-event-off={isMobile ? "none" : "mouseleave"}
                data-place="right"
            >
                {sidebarExpanded ? (
                    <ExpandedSVG aria-hidden="true" role="img" focusable="false" className="dark:fill-white" aria-label="Retract sidebar" />
                ) : (
                    <RetractedSVG aria-hidden="true" role="img" focusable="false" className="dark:fill-white" aria-label="Expand sidebar" />
                )}
            </button>
        </div>
    );
}
