import { Nodes } from "../../../types";

export const generateId = (nodes: Nodes): number => {
    const arr = nodes.map((node) => node.id);
    const n = arr.length;
    let total = ((n + 2) * (n + 1)) / 2;

    for (let i = 0; i < n; i++) {
        total -= arr[i];
    }

    return total;
};
