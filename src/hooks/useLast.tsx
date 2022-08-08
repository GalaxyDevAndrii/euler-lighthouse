import { useState, useEffect } from "react";

/**
 * Use previous state
 */

export default function useLast<T>(lastValue: T) {
    const [last, setLast] = useState(lastValue);

    useEffect(() => {
        setLast(lastValue);
    }, [lastValue]);

    return last;
}
