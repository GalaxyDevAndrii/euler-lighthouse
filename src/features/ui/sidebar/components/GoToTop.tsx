import { useState, RefObject } from "react";

import { ReactComponent as ArrowSVG } from "../../../../assets/down-arrow.svg";
import UtilsBtn from "../../../../components/UtilityBtn";
import useDeviceDetect from "../../../../hooks/useDeviceDetect";
import useEventListener from "../../../../hooks/useEventListener";

export default function GoToTop({ parent }: { parent: RefObject<HTMLElement | null> }) {
    const [shouldRender, setRender] = useState(false);

    const isMobile = useDeviceDetect();

    useEventListener(parent, "scroll", () => {
        if (!parent.current) return;

        if (parent.current.scrollTop >= 50) {
            setRender(true);
        } else {
            setRender(false);
        }
    });

    const handleClick = () => {
        if (parent.current) {
            parent.current.scrollTop = 0;
        }
    };

    // only render if sidebar has been scrolled
    return shouldRender ? (
        <UtilsBtn
            classNames="absolute m-4 !p-2 bottom-0 right-0 ml-2 p-2 rounded-lg active:bg-tertiaryTheme dark:active:bg-lightDark z-50 opacity-75 hover:opacity-100"
            onClick={handleClick}
            data-for="tooltip"
            data-tip="Go to Top"
            data-event={isMobile ? "none" : "mouseenter"}
            data-event-off={isMobile ? "none" : "mouseleave"}
        >
            <ArrowSVG className="fill-black dark:fill-white rotate-180" aria-label="Go to Top" />
        </UtilsBtn>
    ) : null;
}
