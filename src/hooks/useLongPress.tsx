import { useState, useEffect, RefObject } from "react";

/**
 * callback on long mobile press
 * Usage:
 *    onLongPress(element, () => {
 *        console.log('Long pressed', element);
 *   });
 */

interface UseLongPressParams {
    element: RefObject<HTMLElement>;
    callback: () => void;
}

type UseLongPressReturnType = {
    isPressing: boolean;
};

type Timer = ReturnType<typeof setTimeout> | null;

const LONG_PRESS_TIMEOUT = 500; // in ms

export default function useLongPress({ element, callback }: UseLongPressParams): UseLongPressReturnType {
    const [isBeingPressed, setIsBeingPressed] = useState(false);

    useEffect(() => {
        const el = element?.current;

        if (!el) {
            return;
        }

        let timer: Timer;
        el.addEventListener(
            "touchstart",
            () => {
                setIsBeingPressed(true);
                timer = setTimeout(() => {
                    timer = null;
                    callback();
                    setIsBeingPressed(false);
                }, LONG_PRESS_TIMEOUT);
            },
            { passive: true }
        );

        function cancel() {
            if (timer) {
                clearTimeout(timer);
            }
        }

        el.addEventListener("touchend", cancel);
        el.addEventListener("touchmove", cancel, { passive: true });
    }, [callback, element]);

    return { isPressing: isBeingPressed };
}
