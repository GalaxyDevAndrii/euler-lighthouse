import { MenuDivider, SubMenu } from "@szhsin/react-menu";
import { useCallback } from "react";

import { ReactComponent as ChangeTypeSVG } from "../../../../assets/changeType.svg";
import { ReactComponent as DeleteNodeSVG } from "../../../../assets/node-minus.svg";
import { ReactComponent as AddNodeSVG } from "../../../../assets/node-plus.svg";
import { ReactComponent as ClearSVG } from "../../../../assets/trash.svg";
import { ReactComponent as UnlinkSVG } from "../../../../assets/unlink.svg";
import ContextMenuOption from "../../../../components/ContextMenuOption";
import { HEADER_OFFSET, SIDEBAR_OFFSET } from "../../../../config";
import { useTrackedStore as useTrackedNodes } from "../../../../stores/nodes";
import { useTrackedStore as useTracking } from "../../../../stores/tracking";
import { useTrackedStore as useTrackedUtils } from "../../../../stores/utils";
import { NodeTypes, Point } from "../../../../types";
import { revertValues } from "../../../../utils/math";
import { getDelta, mutateTransform } from "../../../../utils/tracking";

export default function ContextMenuOptions({ anchorPoint, close }: { anchorPoint: Point; close: () => void }) {
    const { cameraOffset, cameraZoom } = useTracking();
    const { selectedNode, selectNode, addNode, removeNode, clearNodes, isSelected } = useTrackedNodes();
    const { sidebarExpanded, edgeCallback } = useTrackedUtils();
    const twoOrMoreNodesSelected = Array.isArray(selectedNode) && selectedNode.length > 1;
    const singleNodeSelected = !Array.isArray(selectedNode);

    const handleAddNode = useCallback(() => {
        const anchorDelta = getDelta(anchorPoint, { x: sidebarExpanded ? SIDEBAR_OFFSET : 0, y: HEADER_OFFSET });
        const cameraDelta = getDelta(anchorDelta, mutateTransform(revertValues(cameraOffset), cameraZoom));
        return addNode(cameraDelta);
    }, [addNode, anchorPoint, cameraOffset, cameraZoom, sidebarExpanded]);

    const handleTypeChange = useCallback(
        (nodeType: NodeTypes) => {
            if (singleNodeSelected) {
                selectedNode?.changeType(nodeType);
            }
            selectNode(undefined);
        },
        [selectNode, selectedNode, singleNodeSelected]
    );

    const handleUnlinkAll = useCallback(() => {
        if (singleNodeSelected) {
            selectedNode?.clearConnections();
        } else {
            selectedNode.forEach((node) => {
                node.clearConnections();
            });
        }
    }, [selectedNode, singleNodeSelected]);

    const ChangeTypeMenu = () => (
        <SubMenu
            label={
                <div className="flex flex-row items-center space-x-1.5">
                    <ChangeTypeSVG />
                    <span>Change Type</span>
                </div>
            }
            className="text-sm font-semibold text-primaryText"
        >
            <ContextMenuOption text="Starting Node" handler={() => handleTypeChange("Initial")} />
            <ContextMenuOption text="Final Node" handler={() => handleTypeChange("Final")} />
            <ContextMenuOption text="Regular Node" handler={() => handleTypeChange("Normal")} />
        </SubMenu>
    );

    const AddNodeMenu = () => (
        <SubMenu
            label={
                <button
                    className="flex flex-row items-center space-x-1.5"
                    onClick={() => {
                        handleAddNode();
                        close();
                    }}
                >
                    <AddNodeSVG />
                    <span>Add Node</span>
                </button>
            }
            className="text-sm font-semibold text-primaryText"
        >
            <ContextMenuOption
                text="Starting Node"
                handler={() => {
                    const node = handleAddNode();
                    node.changeType("Initial");
                }}
            />
            <ContextMenuOption
                text="Ending Node"
                handler={() => {
                    const node = handleAddNode();
                    node.changeType("Final");
                }}
            />
            <ContextMenuOption text="Regular Node" handler={handleAddNode} />
        </SubMenu>
    );

    const Divider = () => <MenuDivider className="w-3/4 mx-auto bg-tertiaryTheme" />;

    return (
        <>
            {edgeCallback ? (
                <ContextMenuOption text="Delete connection" handler={edgeCallback} />
            ) : isSelected() ? (
                <>
                    {singleNodeSelected && <ChangeTypeMenu />}
                    <ContextMenuOption
                        text="Unlink connections"
                        label="Unlink all connections"
                        handler={handleUnlinkAll}
                        icon={<UnlinkSVG />}
                    />
                    <Divider />
                    <ContextMenuOption
                        type="delete"
                        text={twoOrMoreNodesSelected ? "Delete Selected" : "Delete Node"}
                        handler={() => removeNode(selectedNode)}
                        icon={<DeleteNodeSVG />}
                    />
                </>
            ) : (
                <>
                    <AddNodeMenu />
                    <Divider />
                    <ContextMenuOption
                        type="delete"
                        text="Clear"
                        handler={clearNodes}
                        label="Clear all nodes"
                        icon={<ClearSVG className="w-5 h-5" />}
                    />
                </>
            )}
        </>
    );
}
