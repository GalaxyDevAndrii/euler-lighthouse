import { useState, useEffect } from "react";

interface IWindowSize {
    width: number;
    height: number;
}

export default function useWindowSize(): IWindowSize {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();
        // cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
