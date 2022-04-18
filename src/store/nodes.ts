import { toast } from "react-toastify";
import { createTrackedSelector } from "react-tracked";
import create, { SetState, GetState, State } from "zustand";

import { createNode } from "../features/nodeHandler";
import { INode, Nodes } from "../types";

import { useStore as useUtilsStore } from "./utils";

interface INodeState extends State {
    nodes: Nodes;

    addNode: () => void;
    getNode: (nodeId: number) => INode;
    removeNode: (nodeId: number) => void;
    clearNodes: () => void;

    selectedNode: INode | undefined;
    selectNode: (el: INode | undefined) => void;
}

export const useStore = create<INodeState>((set: SetState<INodeState>, get: GetState<INodeState>) => ({
    nodes: [],

    addNode: () => {
        set((state) => ({ nodes: [...state.nodes, createNode(state.nodes)] }));
    },

    getNode: (nodeId: number): INode => {
        const nodes = get().nodes;
        const foundNode = nodes.find((i) => i.id === nodeId);

        if (!foundNode) {
            throw new Error(`Failed getting node`);
        }

        return foundNode;
    },

    removeNode: (nodeId: number) => {
        const nodes = get().nodes;
        const getNode = get().getNode;

        getNode(nodeId).connectedTo.forEach((i: number) => {
            getNode(i).removeConnection(nodeId); // remove every connection related to this node
        });

        const newNodes = nodes.filter((i) => i.id !== nodeId);

        set({ nodes: newNodes });
    },

    clearNodes: () => {
        const nodes = get().nodes;
        if (nodes.length === 0) return;
        useUtilsStore.getState().setIsAtSidebar(false);

        const time = nodes.length <= 3 ? 1000 : nodes.length * 150;

        nodes.forEach((node, i) => {
            node.clearConnections();

            const tempPos = node.domEl?.getAttribute("transform")?.split("(")[1].split(")")[0].split(",") || ["0", "0"]; // get the position of the node => ex ["400px", "200px"]
            const pos = tempPos.map((i) => parseInt(i)); // convert to number => [400, 200]

            // correct position is node.posX or Y - pos constant
            // if pos[0] or pos[1] is positive, then subtract the constant from node.posX or Y, else add the constant to node.posX or Y
            const correctPos = [
                node.posX - pos[0] > 0 ? node.posX + pos[0] : node.posX - pos[0],
                node.posY - pos[1] > 0 ? node.posY + pos[1] : node.posY - pos[1],
            ];

            // clearing animation
            setTimeout(() => {
                node.animate(
                    [
                        { transform: `translate(${correctPos[0]}px, ${correctPos[1]}px)` },
                        { transform: `translate(${correctPos[0]}px, ${correctPos[1] - 200}px)`, opacity: "0" },
                    ],
                    {
                        duration: 500,
                        easing: "ease-in-out",
                        fill: "forwards",
                    }
                );
            }, 130 * i + 1);
        });

        setTimeout(() => {
            set({ nodes: [] });
            toast.success("Removed all nodes.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }, time);
    },

    selectedNode: undefined,
    selectNode: (node: INode | undefined) => {
        set({ selectedNode: node });
    },
}));

export const useTrackedStore = createTrackedSelector(useStore);
