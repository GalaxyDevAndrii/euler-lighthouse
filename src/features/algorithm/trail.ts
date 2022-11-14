import type { INode, Nodes } from "../../types";
import { isEven } from "../../utils/math";

const DFSUtil = (v: number, visited: boolean[], adj: number[][]) => {
    // Mark the current node as visited
    visited[v] = true;

    // Recur for all the vertices adjacent to this vertex
    if (adj[v] === undefined) return;
    for (const i of adj[v]) {
        const n = i;
        if (!visited[n]) {
            DFSUtil(n, visited, adj);
        }
    }
};

// Method to check if all non-zero degree vertices are
// connected. It mainly does DFS traversal
const isConnected = (v: number, adj: number[][]) => {
    // Mark all the vertices as not visited
    const visited = new Array(v);
    let i;

    for (i = 0; i < v; i++) {
        visited[i] = false;
    }

    // Find a vertex with non-zero degree
    for (i = 0; i < v; i++) {
        if (adj[i].length != 0) {
            break;
        }
    }

    // If there are no edges in the graph, return true
    if (i === v) {
        return true;
    }

    // Start DFS traversal from a vertex with non-zero degree
    DFSUtil(i, visited, adj);

    // Check if all non-zero degree vertices are visited
    for (i = 0; i < v; i++) {
        if (visited[i] == false && adj[i].length > 0) {
            return false;
        }
    }

    return true;
};

const isEulerian = (v: number, adj: number[][]) => {
    // Check if all non-zero degree vertices are connected
    if (isConnected(v, adj) == false) {
        return 0;
    }

    // Count vertices with odd degree
    let odd = 0;
    for (let i = 0; i < v; i++) {
        if (!isEven(adj[i].length)) {
            odd++;
        }
    }

    // If count is more than 2, then graph is not Eulerian
    if (odd > 2) {
        return 0;
    }

    // If odd count is 2, then semi-eulerian, the graph contains a Euler Path, starting vertex should be of odd degree
    // If odd count is 0, then eulerian
    // Note that odd count can never be 1 for undirected graph
    return odd == 2 ? 1 : 2;
};

const getStartingNode = (nodeTree: Nodes): INode | undefined => {
    return nodeTree.find((node) => node.type === "Initial");
};

export const findEulerTrail = (nodeTree: Nodes) => {
    const vertex = nodeTree.length; // number of vertices
    const startingNodeId = getStartingNode(nodeTree)?.id;

    if (!startingNodeId || vertex === 0) {
        return; // no starting node
    }

    const adj: number[][] = Array(vertex + 1).fill([]);

    if (adj.length === 0) {
        return; // empty graph
    }

    // Determine if it's an eulerian graph
    const graphStatus = isEulerian(vertex, adj);

    if (graphStatus === 0) {
        console.log("Not eulerian graph");
        return;
    } else if (graphStatus === 1) {
        console.log("Semi-eulerian graph");
    }

    // If is eulerian graph, proceed to find trail
    const currPath: number[] = [];
    const circuit: number[] = [];

    const addEdge = (u: number, v: number) => {
        adj[u][v] = 1;
        adj[v][u] = 1;
    };

    const removeEdge = (u: number, v: number) => {
        adj[u].splice(v, 1);
        adj[v].splice(u, 1);
    };

    addEdge(1, 2);
    addEdge(2, 3);
    addEdge(3, 1);

    currPath.push(startingNodeId);

    while (currPath.length > 0) {
        const u = currPath.at(-1) as number; // current vertex, last element
        const adj_v = adj[u].filter(Boolean); // adjacent vertex

        if (adj_v.length === 0) {
            // if all edges from current vertex are visited
            circuit.push(currPath.pop() as number); // push current vertex to result
        } else {
            // if all edges from current vertex are not visited
            currPath.push(adj_v[0]); // get next edge and push
            removeEdge(u, adj_v[0]);
        }
    }

    console.log(circuit.reverse().join(" -> "));
};
