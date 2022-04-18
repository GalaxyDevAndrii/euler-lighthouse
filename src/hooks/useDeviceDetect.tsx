import { useEffect, useState } from "react";

/**
 * Return true if is a mobile device
 */

const MIN_DEVICE_WIDTH = 768;

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

    return width <= MIN_DEVICE_WIDTH;
};

export default useDeviceDetect;
