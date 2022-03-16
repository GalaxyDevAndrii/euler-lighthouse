import Xarrow, { refType } from "react-xarrows";

interface Edge {
    from: string | refType | undefined;
    to: string | refType | undefined;
}

export default function Edge({ from, to }: Edge) {
    return from && to ? (
        <Xarrow start={from ? from : ""} end={to ? to : ""} color="black" endAnchor="middle" showHead={false} strokeWidth={7} curveness={0.1} />
    ) : null;
}
