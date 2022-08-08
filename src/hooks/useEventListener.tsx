import { useEffect, RefObject } from "react";

export default function useEventListener<K extends keyof GlobalEventHandlersEventMap>(
    ref: RefObject<HTMLElement | null>,
    event: K,
    listener: (event: GlobalEventHandlersEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions,
    window?: Window
) {
    useEffect(() => {
        const node = ref?.current;

        if (!node) {
            return;
        }

        const listenerWrapper = ((e: GlobalEventHandlersEventMap[K]) => listener(e)) as EventListener;

        (window ?? node).addEventListener(event, listenerWrapper, options);

        return () => node.removeEventListener(event, listenerWrapper);
    }, [ref, event, listener, options, window]);
}
