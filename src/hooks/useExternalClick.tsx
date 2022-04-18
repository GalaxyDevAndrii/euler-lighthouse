import { useState, useEffect, RefObject } from "react";

/**
 * Return true if clicked on outside of an element
 */

export function useExternalClick(ref: RefObject<HTMLElement>, secRef?: RefObject<HTMLElement>, thirdRef?: RefObject<HTMLElement>) {
    const [clickedOutside, setClickedOutside] = useState(false);

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (
                ref.current &&
                !ref.current.contains(event.target) &&
                secRef?.current &&
                !secRef?.current.contains(event.target) &&
                thirdRef?.current &&
                !thirdRef?.current.contains(event.target)
            ) {
                setClickedOutside(true);
            } else setClickedOutside(false);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Cleanup
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, secRef, thirdRef]);

    return clickedOutside;
}
