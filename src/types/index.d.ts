export interface ICursorPos {
    x?: number;
    y?: number;
}

export interface INode {
    id: number;
    posX: number;
    posY: number;
    isActive: boolean;
    connectedTo: number[] | [];
    domEl: HTMLElement | undefined;
    updatePos: (pos: number[]) => void;
    setElement: (el: HTMLElement) => void;
    addConnection: (to: INode) => void;
    removeConnection: (node: INode) => void;
    clearConnections: () => void;
}

type Nodes = INode[] | [];

export interface INodeState {
    nodes: Nodes;
    addNode: () => void;
    getNode: (nodeId: number) => INode;
    removeNode: (nodeId: number) => void;
    clearNodes: () => void;
    selectedNode: INode | undefined;
    selectNode: (el: INode | undefined) => void;
}

type CurrentEvent = "click" | "drag" | undefined;

export type Tools = "selector" | "grab";

export type CreateNode = (nodes: Nodes) => INode;

export type ConnectNodes = (node1: INode | undefined, node2: INode | undefined) => void;

export enum Algorithms {
    tour = "Euler Tour",
    walk = "Euler Walk",
}

export type AlgorithmsT = Algorithms.tour | Algorithms.walk;

export interface IAlgorithmState {
    selected: AlgorithmsT;
    setSelected: (selected: AlgorithmsT) => void;
}

export type Directions = "x" | "y";

export interface IUtilsState {
    shouldDrawGrid: boolean;
    setDrawGrid: (newState: boolean) => void;

    gridMiddle: { x: number; y: number };
    setMiddle: (direction: Directions, newState: number) => void;

    currEvent: CurrentEvent;
    setCurrEvent: (event: CurrentEvent) => void;

    selectedTool: Tools;
    setTool: (tool: Tools) => void;

    lineActive: boolean;
    setLineActive: (state: boolean) => void;
}
