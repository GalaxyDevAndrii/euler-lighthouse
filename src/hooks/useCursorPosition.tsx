import { RefObject, useEffect, useState } from "react";

import { ORIGIN } from "../config";
import { DraggableEvent } from "../types";

/**
 * Cursor coordinates
 */

export function useCursorPosition(ref?: RefObject<HTMLElement> | null, offset?: { x: number; y: number }): { x: number; y: number } {
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
            refStore = ref;
        } else window.addEventListener("mousemove", setFromEvent);

        return () => {
            if (refStore?.current) {
                refStore.current.removeEventListener("mousemove", setFromEvent);
            } else {
                window.removeEventListener("mousemove", setFromEvent);
            }
        };
    }, [offset?.x, offset?.y, ref]);

    return position;
}
