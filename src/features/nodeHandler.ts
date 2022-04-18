import { toast } from "react-toastify";

import { useStore } from "../store/nodes";
import { useStore as useUtilsStore } from "../store/utils";
import { CreateNode, Nodes, INode, ConnectNodes, NodeTypes, NodeTypesArr } from "../types/index.d";

const generateId = (nodes: Nodes): number => {
    const arr = nodes.map((node) => node.id);
    const n = arr.length;
    let total = ((n + 2) * (n + 1)) / 2;

    for (let i = 0; i < n; i++) {
        total -= arr[i];
    }

    return total;
};

class Node implements INode {
    public readonly id: number;
    public posX: number;
    public posY: number;
    public isActive: boolean;
    public connectedTo: number[];
    public domEl: HTMLElement | undefined;
    public type: NodeTypes;

    constructor(nodes: Nodes) {
        this.id = generateId(nodes);
        this.posX = Math.abs(useUtilsStore.getState().gridMiddle.x);
        this.posY = Math.abs(useUtilsStore.getState().gridMiddle.y);
        this.isActive = false;
        this.connectedTo = [];
        this.domEl = undefined;
        this.type = "Normal";
    }

    public updatePos(pos: number[]) {
        this.posX = pos[0];
        this.posY = pos[1];
    }

    public setElement(el: HTMLElement | undefined) {
        this.domEl = el;
    }

    public addConnection(to: INode) {
        this.connectedTo = [...this.connectedTo, to.id];
    }

    public removeConnection(nodeId: number) {
        const newConnections = this.connectedTo.filter((i) => i !== nodeId);
        this.connectedTo = newConnections;
    }

    public clearConnections() {
        this.connectedTo = [];
    }

    public changeType() {
        const nextType = NodeTypesArr[(NodeTypesArr.indexOf(this.type) + 1) % NodeTypesArr.length];
        this.type = nextType;

        return nextType;
    }

    public animate(animation: Keyframe[] | PropertyIndexedKeyframes, options: number | KeyframeAnimationOptions) {
        if (this.domEl) {
            this.domEl.animate(animation, options);
        }
    }
}

export const createNode: CreateNode = (nodes: Nodes): INode => {
    return new Node(nodes);
};

export const connectNodes: ConnectNodes = (node1, node2) => {
    if (!node1 || !node2) throw new Error("Invalid nodes provided.");

    if (node1.connectedTo.includes(node2.id) || node2.connectedTo.includes(node1.id)) return;

    node2.addConnection(node1);
    node1.addConnection(node2);
};

export const handleRemove = (selectedNode?: INode) => {
    if (selectedNode) {
        useStore.getState().removeNode(selectedNode.id);
        useStore.getState().selectNode(undefined);
    } else {
        toast.error("Select a node to be removed.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};
