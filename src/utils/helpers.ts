import { nodesToJson } from "../features/nodes";
import type { INode } from "../types";

import { isObject } from "./misc";

export const saveNodesToLocalStorage = (newState: INode[]) => {
    const stringified = nodesToJson(newState);
    localStorage.setItem("savedNodesState", stringified);
    return stringified;
};

// compare two objects deeply
export const isEqual = (obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean => {
    const props1 = Object.getOwnPropertyNames(obj1);
    const props2 = Object.getOwnPropertyNames(obj2);
    if (props1.length != props2.length) {
        return false;
    }
    for (let i = 0; i < props1.length; i++) {
        const val1: any = obj1[props1[i]];
        const val2: any = obj2[props1[i]];
        const isObjects = isObject(val1) && isObject(val2);
        if ((isObjects && !isEqual(val1, val2)) || (!isObjects && val1 !== val2)) {
            return false;
        }
    }
    return true;
};
