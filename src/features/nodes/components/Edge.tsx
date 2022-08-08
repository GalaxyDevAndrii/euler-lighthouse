import { useState, useRef, useEffect } from "react";
import Xarrow from "react-xarrows";

import { useStore as useAlgorithmStore } from "../../../stores/algorithm";
import { useStore as useNodesStore } from "../../../stores/nodes";
import { useStore as useSettingsStore } from "../../../stores/settings";
import { useStore as useTrackingStore } from "../../../stores/tracking";
import { useStore as useUtilsStore } from "../../../stores/utils";
import { useExternalClick } from "../hooks/useExternalClick";

interface IEdgeProps {
    from: string;
    to: string;
    existingPairings: Set<string>;
    forceRender?: () => void;
}

export default function Edge({ from, to, existingPairings, forceRender }: IEdgeProps) {
    const getNode = useNodesStore((state) => state.getNode);
    const setEdgeCallback = useUtilsStore((state) => state.setEdgeCallback);
    const cameraZoom = useTrackingStore((state) => state.cameraZoom);
    const darkMode = useSettingsStore((state) => state.darkMode);
    const updateDegrees = useAlgorithmStore((state) => state.updateDegrees);

    const [mouseOver, setMouseOver] = useState(false);
    const [contextOpen, setContextOpen] = useState(false);
    const edgeRef = useRef(null);
    const clickedOutside = useExternalClick([edgeRef]);

    useEffect(() => {
        if (clickedOutside) {
            setContextOpen(false);
        }
    }, [clickedOutside]);

    if (!from || !to) {
        return null;
    }

    if (existingPairings.has(to + from)) {
        return null; // Exists opposite pair
    }

    existingPairings.add(from + to);

    return (
        <Xarrow
            start={from}
            end={to}
            path="straight"
            color={darkMode ? "#fff" : "#000"}
            startAnchor="middle"
            endAnchor="middle"
            showHead={false}
            strokeWidth={7 * cameraZoom}
            passProps={{
                ref: edgeRef,
                onMouseEnter: () => setMouseOver(true),
                onMouseLeave: () => setMouseOver(false),
                onContextMenu: () => {
                    setContextOpen(true);
                    setEdgeCallback(() => {
                        getNode(Number(from.slice(6, 100))).removeConnection(getNode(Number(to.slice(6, 100))).id);
                        getNode(Number(to.slice(6, 100))).removeConnection(getNode(Number(from.slice(6, 100))).id);
                        existingPairings.delete(from + to);
                        updateDegrees(-1);
                        setContextOpen(false);
                        forceRender && forceRender();
                    });
                },
                filter: `${
                    mouseOver
                        ? "drop-shadow(-1px -1px 0px rgba(59, 130, 246, 0.5)) drop-shadow(1px -1px 0px rgba(59, 130, 246, 0.5)) drop-shadow(1px 1px 0px rgba(59, 130, 246, 0.5))drop-shadow(-1px 1px 0px rgba(59, 130, 246, 0.5))"
                        : contextOpen
                        ? "drop-shadow(-1px -1px 0px rgb(185, 28, 28)) drop-shadow(1px -1px 0px rgb(185, 28, 28)) drop-shadow(1px 1px 0px rgb(185, 28, 28))drop-shadow(-1px 1px 0px rgb(185, 28, 28))"
                        : ""
                }`,
            }}
        />
    );
}
