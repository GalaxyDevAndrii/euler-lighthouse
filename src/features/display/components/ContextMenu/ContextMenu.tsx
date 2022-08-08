import { useMenuState, ControlledMenu } from "@szhsin/react-menu";
import { useState, cloneElement, Children, PropsWithChildren, ReactElement, LegacyRef } from "react";

import { ORIGIN } from "../../../../config";
import { useStore as useUtilsStore } from "../../../../stores/utils";
import { forwardRefWithAs } from "../../../../utils/misc";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import ContextMenuOptions from "./ContextMenuOptions";

const ContextMenuRoot = forwardRefWithAs(function ContextMenu(props: PropsWithChildren<unknown>, ref: LegacyRef<HTMLElement> | undefined) {
    const setEdgeCallback = useUtilsStore((state) => state.setEdgeCallback);

    const [menuProps, toggleMenu] = useMenuState({ transition: true });
    const [anchorPoint, setAnchorPoint] = useState(ORIGIN);

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
                      ref: ref,
                  })
                : null}
            <ControlledMenu
                {...menuProps}
                anchorPoint={anchorPoint}
                position="initial"
                onClose={() => {
                    toggleMenu(false);
                    setEdgeCallback(undefined);
                }}
                menuClassName="rounded-md shadow-md shadow-inner border"
            >
                <ContextMenuOptions anchorPoint={anchorPoint} close={() => toggleMenu(false)} />
            </ControlledMenu>
        </>
    );
});

const ContextMenu = Object.assign(ContextMenuRoot);

export default ContextMenu;
