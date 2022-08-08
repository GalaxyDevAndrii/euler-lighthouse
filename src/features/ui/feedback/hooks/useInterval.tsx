import { useEffect, useRef } from "react";

type UseIntervalParams = {
    callback: () => any;
    delay?: number | null;
};

const useInterval = ({ callback, delay }: UseIntervalParams) => {
    const savedCallback = useRef<() => any>(() => {});

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        if (delay !== null) {
            const interval = setInterval(() => savedCallback.current(), delay || 0);
            return () => clearInterval(interval);
        }

        return undefined;
    }, [delay]);
};

export default useInterval;
