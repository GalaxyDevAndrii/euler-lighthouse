import { useState, useEffect } from "react";

/**
 * Use last state
 */

export default function useLast(lastValue: any) {
    const [last, setLast] = useState(lastValue);

    useEffect(() => {
        setLast(lastValue);
    }, [lastValue]);

    return last;
}
