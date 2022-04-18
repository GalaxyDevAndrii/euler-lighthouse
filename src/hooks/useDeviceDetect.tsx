import { useEffect, useState } from "react";

/**
 * Return true if is a mobile device
 */

const useDeviceDetect = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return width <= 768;
};

export default useDeviceDetect;
