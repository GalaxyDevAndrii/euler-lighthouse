import { useStore } from "../store/utils";
import { CreateNode, Nodes, INode, ConnectNodes } from "../types";

const findId = (nodes: Nodes): number => {
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
    public connectedTo: number[] | [];
    public domEl: HTMLElement | undefined;

    constructor(nodes: Nodes) {
        this.id = findId(nodes);
        this.posX = Math.abs(useStore.getState().gridMiddle.x);
        this.posY = Math.abs(useStore.getState().gridMiddle.y);
        this.isActive = false;
        this.connectedTo = [];
        this.domEl = undefined;
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

    public removeConnection(node: INode) {
        const newConnections = this.connectedTo.filter((i) => i !== node.id);
        this.connectedTo = newConnections;
    }

    public clearConnections() {
        this.connectedTo = [];
    }
}

export const createNode: CreateNode = (nodes: Nodes): INode => {
    return new Node(nodes);
};

export const connectNodes: ConnectNodes = (node1, node2) => {
    if (!node1 || !node2) throw new Error("Invalid nodes provided.");

    node2.addConnection(node1);
    node1.addConnection(node2);
};
