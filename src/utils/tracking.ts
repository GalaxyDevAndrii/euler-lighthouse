import { RefObject, TouchEvent as SyntheticTouchEvent, Touch } from "react";

import { Point } from "../types";

// TS Type Guard
export const isTouchEvent = (e: any): e is SyntheticTouchEvent => {
    return (e as SyntheticTouchEvent).touches !== undefined;
};

export const getDelta = (pointA: Point, pointB: Point): Point => {
    return {
        x: pointA.x - pointB.x,
        y: pointA.y - pointB.y,
    };
};

export const getDistanceBetweenPoints = (pointA: Point, pointB: Point) => {
    return Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2));
};

export const getPointFromTouch = (touch: Touch, ref: RefObject<HTMLElement | null>) => {
    if (!touch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
    };
};

export const getMidpoint = (pointA: Point, pointB: Point) => {
    return {
        x: (pointA.x + pointB.x) / 2,
        y: (pointA.y + pointB.y) / 2,
    };
};

/**
 * Returns the scaled position for nodes in the canvas
 * @param cameraOffset - { x: number; y: number }
 * @param {number} currZoom - number = 1;
 * @returns { x: number; y: number }
 */
export const mutateTransform = (cameraOffset: Point, currZoom: number): Point => {
    return {
        x: cameraOffset.x * currZoom,
        y: cameraOffset.y * currZoom,
    };
};
