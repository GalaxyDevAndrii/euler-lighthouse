import { Point } from "../types";

export const between = (min: number, max: number, value: number) => {
    return Math.min(max, Math.max(min, value));
};

export const toRound = (obj: Point): Point => {
    return { x: Math.round(obj.x * 100) / 100, y: Math.round(obj.y * 100) / 100 };
};

export const sum = (a: Point, b: Point): Point => {
    return { x: a.x + b.x, y: a.y + b.y };
};

export const scale = (values: Point, factor: number): Point => {
    return { x: values.x * factor, y: values.y * factor };
};
