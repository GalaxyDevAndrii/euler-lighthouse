import { useState, useEffect, RefObject } from "react";

export function useExternalClick(ref: RefObject<HTMLElement>, secRef?: RefObject<HTMLElement>) {
    const [clickedOutside, setClickedOutside] = useState(false);

    useEffect(() => {
        // Alert if clicked on outside of element
        function handleClickOutside(event: any) {
            if ((ref.current && !ref.current.contains(event.target)) || (secRef?.current && !secRef?.current.contains(event.target))) {
                setClickedOutside(true);
            } else setClickedOutside(false);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, secRef]);

    return clickedOutside;
}
