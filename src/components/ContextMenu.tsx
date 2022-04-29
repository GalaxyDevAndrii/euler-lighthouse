import { useMenuState, MenuItem, ControlledMenu, MenuDivider } from "@szhsin/react-menu";
import { PropsWithChildren, useState, cloneElement, Children, ReactElement } from "react";

import { handleRemove } from "../features/nodeHandler";
import { useTrackedStore } from "../store/nodes";
import { forwardRefWithAs } from "../utils/misc";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const ContextMenuRoot = forwardRefWithAs(function ContextMenu(props: PropsWithChildren<unknown>) {
    const { selectedNode, addNode, clearNodes } = useTrackedStore();

    const [menuProps, toggleMenu] = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    return (
        <>
            {props?.children
                ? // pass props down to single child
                  cloneElement(Children.only(props.children) as ReactElement, {
                      onContextMenu: (e: MouseEvent) => {
                          e.preventDefault();
                          setAnchorPoint({ x: e.clientX, y: e.clientY });
                          toggleMenu(true);
                      },
                  })
                : null}
            <ControlledMenu {...menuProps} anchorPoint={anchorPoint} position="initial" onClose={() => toggleMenu(false)}>
                {selectedNode ? (
                    <MenuItem onClick={() => handleRemove(selectedNode)}>Remove Node</MenuItem>
                ) : (
                    <MenuItem onClick={addNode}>Add Node</MenuItem>
                )}
                <MenuDivider />
                <MenuItem>Save</MenuItem>
                <MenuItem onClick={clearNodes}>Clear</MenuItem>
            </ControlledMenu>
        </>
    );
});

const ContextMenu = Object.assign(ContextMenuRoot);

export default ContextMenu;
