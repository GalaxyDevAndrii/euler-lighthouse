import { useEffect, useState } from "react";

export const useCursorPosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const setFromEvent = (e: { pageX: number; pageY: number }) => setPosition({ x: e.pageX, y: e.pageY });
        window.addEventListener("mousemove", setFromEvent);

        return () => {
            window.removeEventListener("mousemove", setFromEvent);
        };
    }, []);

    return position;
};
