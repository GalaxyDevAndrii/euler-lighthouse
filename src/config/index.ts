import type { Point } from "../types";

export const ORIGIN: Point = Object.freeze({ x: 0, y: 0 });
export const MIN_ZOOM_SCALE = 0.5;
export const MAX_ZOOM_SCALE = 3;
export const DELAY_BETWEEN_NODE_DELETE = 140;
export const NODE_LIMIT = 100;
export const HEADER_OFFSET = 56;
export const SIDEBAR_OFFSET = 288;
export const ALGORITHMS_DESCRIPTION = {
    "Euler Tour": "hello1",
    "Euler Walk": "hello2",
    "Euler Trail": "hello3",
};
