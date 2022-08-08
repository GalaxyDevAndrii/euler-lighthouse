import { RefObject, useEffect, useState } from "react";

import { ORIGIN } from "../config";
import type { DraggableEvent, Point } from "../types";

/**
 * Cursor coordinates
 */

type UseCursorPositionParams = {
    ref?: RefObject<HTMLElement> | null;
    offset?: Point;
};

export function useCursorPosition({ ref, offset }: UseCursorPositionParams): Point {
    const [position, setPosition] = useState(ORIGIN);

    useEffect(() => {
        const setFromEvent = (e: DraggableEvent) => {
            if (e instanceof MouseEvent) {
                setPosition({ x: e.clientX - (offset?.x ?? 0), y: e.clientY - (offset?.y ?? 0) });
            } else if (e instanceof TouchEvent) {
                setPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
            }
        };

        let refStore: RefObject<HTMLElement> | null = null;

        if (ref?.current) {
            ref.current.addEventListener("mousemove", setFromEvent);
            // ref.current.addEventListener("wheel", setFromEvent);
            refStore = ref;
        } else {
            window.addEventListener("mousemove", setFromEvent);
        }

        return () => {
            if (refStore?.current) {
                refStore.current.removeEventListener("mousemove", setFromEvent);
                // refStore.current.removeEventListener("wheel", setFromEvent);
            } else {
                window.removeEventListener("mousemove", setFromEvent);
            }
        };
    }, [offset?.x, offset?.y, ref]);

    return position;
}
