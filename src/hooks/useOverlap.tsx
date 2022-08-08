import { useState, useEffect, RefObject, useCallback } from "react";

import type { BoxBoundingPos } from "../types";

/**
 * Return true if element is overlapping with another element
 */

type UseOverlapParams = {
    ref: RefObject<HTMLElement>;
    node: RefObject<HTMLElement> | string | undefined;
};

interface UseOverlapReturnType {
    overlap: boolean;
    overlappedElements: Element[];
}

// type guards
function isRefObject(object: any): object is RefObject<any> {
    return "current" in object;
}

function isString(value: any) {
    return typeof value === "string" || value instanceof String;
}

// array compare
const equalsIgnoreOrder = (a: any[], b: any[]) => {
    if (a.length !== b.length) return false;
    const uniqueValues = new Set([...a, ...b]);
    for (const v of Array.from(uniqueValues)) {
        const aCount = a.filter((e) => e === v).length;
        const bCount = b.filter((e) => e === v).length;
        if (aCount !== bCount) return false;
    }
    return true;
};

export default function useOverlap({ ref, node }: UseOverlapParams): UseOverlapReturnType {
    const [overlap, setOverlap] = useState(false);
    const [overlappedElements, setOverlappedElements] = useState<Element[]>([]);

    const checkIntersection = useCallback((boxA: BoxBoundingPos, boxB: BoxBoundingPos) => {
        if (
            boxA.left <= boxB.left + boxB.width &&
            boxA.left + boxA.width >= boxB.left &&
            boxA.top <= boxB.top + boxB.height &&
            boxA.top + boxA.height >= boxB.top
        ) {
            return true;
        }
        return false;
    }, []);

    useEffect(() => {
        const el = ref?.current;

        if (!el || !node) {
            return;
        }

        const selectionBox = el.getBoundingClientRect();

        if (isString(node)) {
            const foundItems = document.querySelectorAll(`[id^="${node}"]`);

            if (!foundItems[0]) return;

            const overlappedItems: Element[] = Array.prototype.slice
                .call(foundItems)
                .flatMap((item) => (checkIntersection(selectionBox, item.getBoundingClientRect()) ? item : []));

            // return early if state is the same
            if (equalsIgnoreOrder(overlappedItems, overlappedElements)) return;

            setOverlappedElements(overlappedItems);
            setOverlap(overlappedItems.length > 0);
        } else if (isRefObject(node)) {
            const child = node?.current;

            if (!child) {
                return;
            }

            const childBox = child.getBoundingClientRect();
            setOverlap(checkIntersection(selectionBox, childBox));
        }
    }, [checkIntersection, node, overlappedElements, ref]);

    return { overlap, overlappedElements };
}
