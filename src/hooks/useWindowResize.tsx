import { useState, useEffect } from "react";

interface IWindowSize {
    width: number;
    height: number;
}

export default function useWindowSize(): { width: number; height: number } {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}
