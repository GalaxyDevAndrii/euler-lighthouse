export enum Algorithms {
    tour = "Euler Tour",
    walk = "Euler Walk",
    trail = "Euler Trail",
}

export const NodeTypesArr = ["Initial", "Final", "Normal"] as const;

export type AlgorithmsT = Algorithms.tour | Algorithms.walk;

export type NodeTypes = typeof NodeTypesArr[number];

export type Point = { x: number; y: number };

export type Nodes = INode[] | [];

export type CurrentEvent = "click" | "drag" | undefined;

export type Tools = "selector" | "grab";

export type CreateNode = (nodes: Nodes) => INode;

export type ConnectNodes = (node1: INode | undefined, node2: INode | undefined) => void;

export type Directions = "x" | "y";

export type SidebarViews = "SidebarView" | "SettingsView" | "AboutView";

export type DraggableEvent =
    | React.MouseEvent<HTMLElement | SVGElement>
    | React.TouchEvent<HTMLElement | SVGElement>
    | MouseEvent
    | TouchEvent;

export interface INode {
    id: number;
    posX: number;
    posY: number;
    isActive: boolean;
    connectedTo: number[];
    domEl: HTMLElement | undefined;
    type: NodeTypes;

    updatePos: (pos: number[]) => void;
    setElement: (el: HTMLElement) => void;

    addConnection: (to: INode) => void;
    removeConnection: (nodeId: number) => void;
    clearConnections: () => void;

    changeType: () => NodeTypes;
    animate: (animation: any, options: any) => void;
}
