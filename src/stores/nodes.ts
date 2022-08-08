import { toast } from "react-toastify";
import { createTrackedSelector } from "react-tracked";
import create from "zustand";

// import { DELAY_BETWEEN_NODE_DELETE } from "../config";
import { createNode } from "../features/nodes";
import type { INode, Nodes, NodeTypes, Point } from "../types";

import { useStore as useAlgorithmStore } from "./algorithm";
import { useStore as useUtilsStore } from "./utils";

interface INodeState {
    nodes: Nodes;
    addNode: (position?: Point, type?: NodeTypes, edges?: number[]) => INode;
    getNode: (node: number) => INode;
    removeNode: (node: INode | Nodes | undefined) => void;
    clearNodes: () => void;
    selectedNode: INode | Nodes | undefined;
    selectNode: (el: INode | Nodes | undefined) => void;
    isSelected: (node?: INode) => boolean;
}

export const useStore = create<INodeState>((set, get) => ({
    nodes: [],
    addNode: (position?: Point, type?: NodeTypes, edges?: number[]) => {
        const nodes = get().nodes;

        const newNode = createNode(nodes, position ?? useUtilsStore.getState().gridMiddle, type, edges);
        set((state) => ({ nodes: [...state.nodes, newNode] }));

        useAlgorithmStore.getState().updateVertices(get().nodes.length);
        return newNode;
    },
    getNode: (nodeId: number): INode => {
        const nodes = get().nodes;
        const foundNode = nodes.find((i) => i.id === nodeId);

        if (!foundNode) {
            throw new Error(`Failed getting node`);
        }

        return foundNode;
    },
    removeNode: (toRemoveNode: INode | Nodes | undefined) => {
        if (!toRemoveNode) {
            toast.error("Select a node to be removed.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const { nodes, getNode, selectNode, isSelected } = get();
        const isAtSidebar = useUtilsStore.getState().isAtSidebar;

        const removeSingle = (toRemoveNode: INode) => {
            toRemoveNode.connectedTo.forEach((i: number) => {
                getNode(i).removeConnection(toRemoveNode.id);
                useAlgorithmStore.getState().updateDegrees(-1);
            });

            const newNodes = nodes.filter((i) => i.id !== toRemoveNode.id);
            set({ nodes: newNodes });

            selectNode(undefined);
            useAlgorithmStore.getState().updateVertices(get().nodes.length);
        };

        const removeMultiple = (toRemoveNodes: Nodes) => {
            toRemoveNodes.forEach((child: INode) => {
                child.connectedTo.forEach((i: number) => {
                    getNode(i).removeConnection(child.id);
                    useAlgorithmStore.getState().updateDegrees(-1);
                });
            });

            const newNodes = nodes.filter((el: INode) => !toRemoveNodes.find((node) => node.id === el.id));
            set({ nodes: newNodes });

            selectNode(undefined);
            useAlgorithmStore.getState().updateVertices(get().nodes.length);
        };

        if (isAtSidebar && !Array.isArray(toRemoveNode) && isSelected(toRemoveNode)) {
            removeSingle(toRemoveNode);
            return;
        }

        if (Array.isArray(toRemoveNode)) {
            removeMultiple(toRemoveNode);
            return;
        } else {
            removeSingle(toRemoveNode);
            return;
        }
    },
    clearNodes: () => {
        const nodes = get().nodes;

        if (nodes.length <= 0) return;

        useUtilsStore.getState().setIsAtSidebar(false);

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

        // this is gross
        useAlgorithmStore.getState().updateVertices(get().nodes.length);
        useAlgorithmStore.getState().updateDegrees(-useAlgorithmStore.getState().degrees);
    },
    selectedNode: undefined,
    selectNode: (node) => {
        set({ selectedNode: node });
    },

    isSelected: (node?: INode) => {
        const selectedNode = get().selectedNode;

        if (!node) {
            // if there is no node specified, return true for any node selected, no matter which
            return Array.isArray(selectedNode) ? selectedNode.length > 0 : !!selectedNode;
        }

        if (!selectedNode) {
            // no nodes selected
            return false;
        }

        // return boolean if specified node is selected
        // check if it's an array of selected nodes or a single node
        if (Array.isArray(selectedNode)) {
            return selectedNode.some((arrNode) => arrNode.id === node.id);
        } else {
            return selectedNode.id === node.id;
        }
    },
}));

export const useTrackedStore = createTrackedSelector(useStore);
