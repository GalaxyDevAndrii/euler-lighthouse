import { test } from "./tour";
import { findEulerTrail } from "./trail";
import { test as test2 } from "./walk";

export { findEulerTrail, test2, test };

export const AlgorithmsExecution = {
    "Euler Trail": findEulerTrail,
    "Euler Tour": findEulerTrail,
    "Euler Walk": findEulerTrail,
} as const;
