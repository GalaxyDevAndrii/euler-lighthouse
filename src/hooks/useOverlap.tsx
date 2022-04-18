import { useState, useEffect, RefObject } from "react";

/**
 * Return true if element is overlapping with another element
 */

export default function useOverlap(ref: RefObject<HTMLElement>, secRef?: RefObject<HTMLElement>) {
    const [overlap, setOverlap] = useState(false);

    useEffect(() => {
        if (!ref.current || !secRef?.current) return;

        const el1 = ref.current.getBoundingClientRect();
        const el2 = secRef?.current.getBoundingClientRect();
        const isOverlapping = !(el1.top > el2.bottom || el1.right < el2.left || el1.bottom < el2.top || el1.left > el2.right);

        setOverlap(isOverlapping);
    }, [ref, secRef]);

    return overlap;
}
