import { RefObject } from "react";

import { forwardRefWithAs } from "../../../utils/misc";

export const NodeSVG = forwardRefWithAs((props: any, ref: RefObject<HTMLElement>) => {
    const { size, zoom, middleColor, borderColor, ...rest } = props;

    return (
        <svg xmlns="http://www.w3.org/2000/svg" ref={ref} height={size} width={size} {...rest}>
            <g transform={`scale(${zoom})`} className="pointer-events-none">
                <path fill={middleColor} d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z" />
                <path
                    fill={borderColor}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 41.5c9.665 0 17.5-7.835 17.5-17.5S33.665 6.5 24 6.5 6.5 14.335 6.5 24 14.335 41.5 24 41.5Zm0 2.5c11.046 0 20-8.954 20-20S35.046 4 24 4 4 12.954 4 24s8.954 20 20 20Z"
                />
            </g>
        </svg>
    );
});
