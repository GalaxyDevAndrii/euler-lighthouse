import { useState, useEffect, RefObject } from "react";

/**
 * Return true if clicked on outside of one or more elements
 */

type RefType = RefObject<HTMLElement | null> | undefined;

export function useExternalClick(refs: RefType[]): boolean {
    const [clickedOutside, setClickedOutside] = useState(false);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            refs.forEach((ref: RefType) => {
                const node = ref?.current;
                const target = e.target as HTMLElement;

                if (!node || !target) {
                    return;
                }

                if (!node.contains(target) && !target.id?.includes("node__") && !target.classList[0]?.includes("szh")) {
                    setClickedOutside(true);
                } else {
                    setClickedOutside(false);
                }
            });
        }

        document.addEventListener("mousedown", handleClickOutside, true);
        return () => {
            // Cleanup
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, [refs]);

    return clickedOutside;
}
