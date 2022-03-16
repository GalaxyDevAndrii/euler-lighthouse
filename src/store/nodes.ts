import create, { SetState, GetState } from "zustand";

import { createNode } from "../features/nodeHandler";
import { INode, INodeState } from "../types/index.d";

export const useStore = create<INodeState>((set: SetState<INodeState>, get: GetState<INodeState>) => ({
    nodes: [],

    addNode: (): void => {
        const { nodes } = get();

        set({ nodes: [...nodes, createNode(nodes)] });
    },

    getNode: (nodeId: number): INode => {
        const { nodes } = get();
        const foundNode = nodes.find((i) => i.id === nodeId);

        if (!foundNode) {
            throw new Error(`Failed getting node`);
        }

        return foundNode;
    },

    removeNode: (nodeId: number) => {
        const { nodes, getNode } = get();

        getNode(nodeId).clearConnections();
        const newArr = nodes.filter((i) => i.id !== nodeId);

        set({ nodes: newArr });
    },

    clearNodes: () => {
        const { nodes } = get();

        nodes.forEach((node) => {
            setTimeout(() => {
                node.clearConnections();
                node.domEl?.classList.add("animate-vanish");
            }, 100);
        });

        setTimeout(() => {
            set({ nodes: [] });
        }, 1000);
    },

    selectedNode: undefined,
    selectNode: (node: INode | undefined) => {
        set({ selectedNode: node });
    },
}));
