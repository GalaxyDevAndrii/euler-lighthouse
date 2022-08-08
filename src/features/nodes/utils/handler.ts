import { useStore } from "../../../stores/algorithm";
import { NodeTypesArr } from "../../../types";
import type { CreateNode, Nodes, INode, ConnectNodes, NodeTypes, Point } from "../../../types";

import { generateId } from "./utils";

class Node implements INode {
    public readonly id: number;
    public posX: number;
    public posY: number;
    public isActive: boolean;
    public connectedTo: number[];
    public domEl: HTMLElement | undefined;
    public type: NodeTypes;

    constructor(nodes: Nodes, initialPos: Point, type?: NodeTypes, edges?: number[]) {
        this.id = generateId(nodes);
        this.posX = initialPos.x;
        this.posY = initialPos.y;
        this.isActive = false;
        this.connectedTo = edges || [];
        this.domEl = undefined;
        this.type = type || "Normal";
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

    public changeType(type?: NodeTypes) {
        const nextType = NodeTypesArr[(NodeTypesArr.indexOf(this.type) + 1) % NodeTypesArr.length];
        this.type = type ?? nextType;

        return nextType;
    }

    public animate(animation: Keyframe[] | PropertyIndexedKeyframes, options: number | KeyframeAnimationOptions) {
        if (this.domEl) {
            this.domEl.animate(animation, options);
        }
    }
}

export const createNode: CreateNode = (nodes: Nodes, initialPos: Point, type?: NodeTypes, edges?: number[]): INode => {
    return new Node(nodes, initialPos, type, edges);
};

export const connectNodes: ConnectNodes = (node1, node2) => {
    if (!node1 || !node2) throw new Error("Invalid nodes provided.");

    if (node1.connectedTo.includes(node2.id) || node2.connectedTo.includes(node1.id)) return;

    node2.addConnection(node1);
    node1.addConnection(node2);
    useStore.getState().updateDegrees(1);
};

export const getNodeId = (el: HTMLElement): number => {
    return Number(el.id.slice(6, 100)); // grabs node id number from dom node: "node__1" => 1
};

export const nodesToJson = (nodes: Nodes): string => {
    const JSONApendantNodes = nodes.map((node) => {
        // removing the dom element prop is necessary since it is not serializable
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { domEl, ...newNode } = node;
        return newNode;
    });

    return JSON.stringify(JSONApendantNodes);
};
