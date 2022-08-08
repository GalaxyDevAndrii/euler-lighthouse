import { RefObject, TouchEvent as SyntheticTouchEvent, Touch } from "react";

import { Point } from "../types";

export const getDistanceBetweenPoints = (pointA: Point, pointB: Point): number => {
    return Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2));
};

export const getPointFromTouch = (touch: Touch, ref: RefObject<HTMLElement | null>): Point | undefined => {
    if (!touch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
    };
};

export const getMidpoint = (pointA: Point, pointB: Point): Point => {
    return {
        x: (pointA.x + pointB.x) / 2,
        y: (pointA.y + pointB.y) / 2,
    };
};

// Returns a scaled position for a 2d graph
export const mutateTransform = (offset: Point, multiplier: number): Point => {
    return {
        x: offset.x * multiplier,
        y: offset.y * multiplier,
    };
};

export const getDelta = (pointA: Point, pointB: Point): Point => {
    return {
        x: pointA.x - pointB.x,
        y: pointA.y - pointB.y,
    };
};

// TS Type Guard
export const isTouchEvent = (e: any): e is SyntheticTouchEvent => {
    return (e as SyntheticTouchEvent).touches !== undefined;
};
