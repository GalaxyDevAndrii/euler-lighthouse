import Xarrow from "react-xarrows";

interface Edge {
    from: string;
    to: string;
    existingPairings: Set<string>;
}

export default function Edge({ from, to, existingPairings }: Edge) {
    if (!from || !to) {
        return null;
    }

    if (existingPairings.has(to + from)) {
        return null; // Exists opposite pair
    }

    existingPairings.add(from + to);

    return <Xarrow start={from} end={to} path="straight" color="black" startAnchor="middle" endAnchor="middle" showHead={false} strokeWidth={7} />;
}
