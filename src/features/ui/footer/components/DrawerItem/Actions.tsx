import { Menu, MenuButton, MenuDivider } from "@szhsin/react-menu";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import ContextMenuOption from "../../../../../components/ContextMenuOption";
import { useTrackedStore } from "../../../../../stores/nodes";
import { INode } from "../../../../../types";

export default function Actions({ node }: { node: INode }) {
    const { selectNode, removeNode } = useTrackedStore();

    const handleDelete = () => {
        selectNode(node);
        removeNode(node);
    };

    return (
        <Menu
            menuButton={
                <MenuButton
                    className="absolute top-0 right-0 py-2 px-2 my-0.5 rounded-lg hover:bg-gray-200 active:bg-gray-100 space-x-0.5 flex flex-nowrap items-center justify-center z-50 focus-acc"
                    data-for="tooltip"
                    data-tip="Actions"
                >
                    <span className="bg-black/75 rounded-full h-[3px] w-[3px]" />
                    <span className="bg-black/75 rounded-full h-[3px] w-[3px]" />
                    <span className="bg-black/75 rounded-full h-[3px] w-[3px]" />
                </MenuButton>
            }
            direction="right"
            position="anchor"
            viewScroll="close"
            transition
        >
            <ContextMenuOption text="Go to" handler={() => {}} />
            <ContextMenuOption
                text="Change type"
                handler={() => {
                    node.changeType();
                }}
            />
            <MenuDivider />
            <ContextMenuOption text="Delete node" handler={handleDelete} />
        </Menu>
    );
}
