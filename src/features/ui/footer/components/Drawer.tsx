import { Transition } from "@headlessui/react";
import { Menu } from "@szhsin/react-menu";
import { useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";

import { ReactComponent as NodeHintSVG } from "../../../../assets/add-node-hint.svg";
import { ReactComponent as NodePlusIcon } from "../../../../assets/node-plus.svg";
import { ReactComponent as RightIcon } from "../../../../assets/right.svg";
import ContextMenuOption from "../../../../components/ContextMenuOption";
import FadeInOut from "../../../../components/FadeInOut";
import UtilsBtn from "../../../../components/UtilityBtn";
import { useStore as useAlgorithmStore } from "../../../../stores/algorithm";
import { useTrackedStore as useTrackedNodes } from "../../../../stores/nodes";

import Actions from "./DrawerItem/Actions";
import ItemPreview from "./DrawerItem/ItemPreview";

export default function Drawer({ active }: { active: boolean }) {
    const { nodes, addNode } = useTrackedNodes();
    const vertices = useAlgorithmStore((state) => state.vertices);
    const degrees = useAlgorithmStore((state) => state.degrees);

    const simplebarRef = useRef<SimpleBar>(null);

    useEffect(() => {
        if (!simplebarRef?.current || nodes.length <= 0) return;
        simplebarRef.current.recalculate();

        // programatically scroll horizonally
        const bar: HTMLElement = simplebarRef.current.getScrollElement();

        const scroll = (e: WheelEvent) => {
            bar.scrollLeft += e.deltaY;
        };

        bar.addEventListener("wheel", scroll, { passive: true });
        return () => bar.removeEventListener("wheel", scroll);
    }, [nodes.length]);

    const getDelay = (i: number) => {
        return `${i * 80}ms`;
    };

    const Placeholder = () => (
        <div className="h-28 w-full flex flex-col justify-center items-center">
            <NodeHintSVG className="basis-1/2" />
            <div className="basis-1/2 flex flex-col justify-center items-center space-y-2">
                <p className="text-sm text-secondaryText dark:text-secondaryDark text-center">Added nodes will be displayed here.</p>
                <button onClick={() => addNode()} className="text-primaryTheme text-sm py-1 px-2 rounded focus-acc hover:bg-tertiaryTheme">
                    Add Node
                </button>
            </div>
        </div>
    );

    const LeftSideNodeInfo = () => (
        <>
            <div className="flex flex-row items-center justify-between w-full">
                <span className="text-primaryGray font-semibold text-base">Degrees</span>
                <span className="text-primaryText font-semibold text-sm bg-tertiaryTheme rounded-3xl px-2">{degrees}</span>
            </div>
            <div className="flex flex-row items-center justify-between w-full">
                <span className="text-primaryGray font-semibold text-base">Vertices</span>
                <span className="text-primaryText font-semibold text-sm bg-tertiaryTheme rounded-3xl px-2">{vertices}</span>
            </div>
        </>
    );

    const LeftSideAddNodeButton = () => (
        <div className="w-full grid grid-cols-4 grid-rows-1 divide-x" data-for="tooltip" data-tip="Add Node">
            <UtilsBtn
                onClick={() => addNode()}
                classNames="col-span-3 !bg-primaryTheme flex justify-center items-center px-2 py-1 !rounded-l-md !rounded-r-none"
            >
                <NodePlusIcon className="h-6 w-6 fill-white" />
            </UtilsBtn>
            <Menu
                menuButton={
                    <UtilsBtn classNames="col-span-1 !bg-primaryTheme flex justify-center items-center px-2 py-1 !rounded-l-none !rounded-r-md">
                        <RightIcon className="h-3.5 w-3.5 fill-white stroke-white" />
                    </UtilsBtn>
                }
            >
                <ContextMenuOption
                    text="Starting Node"
                    handler={() => {
                        const node = addNode();
                        node.changeType("Initial");
                    }}
                />
                <ContextMenuOption
                    text="Ending Node"
                    handler={() => {
                        const node = addNode();
                        node.changeType("Final");
                    }}
                />
                <ContextMenuOption text="Regular Node" handler={() => addNode()} />
            </Menu>
        </div>
    );

    return (
        <div className="w-full h-full px-4 py-6">
            {nodes.length <= 0 ? (
                <Placeholder />
            ) : (
                <SimpleBar ref={simplebarRef} className="overflow-y-hidden p-1 h-[calc(100%+22px)] w-full z-20">
                    <div className="w-full h-full flex flex-row items-center justify-start space-x-6">
                        <FadeInOut active={active} enter leave>
                            <div className="h-full flex flex-col justify-between items-center w-28 shrink-0 grow space-y-1.5">
                                <LeftSideNodeInfo />
                                <LeftSideAddNodeButton />
                            </div>
                        </FadeInOut>
                        <Transition appear show={active} className="w-full h-full flex flex-row items-center justify-start gap-4">
                            {nodes.map((node, i) => (
                                <Transition.Child
                                    enter="transition-[transform,opacity] delay-500"
                                    enterFrom="translate-y-48 opacity-0"
                                    enterTo="translate-y-0 opacity-100"
                                    style={{ transitionDelay: getDelay(i) }}
                                    key={i}
                                >
                                    <div className="font-medium text-sm py-2 px-4 btn-default relative h-24 w-24 shadow z-20">
                                        <div className="absolute h-full w-full inset-0">
                                            <Actions node={node} />
                                            <ItemPreview node={node} />
                                        </div>
                                    </div>
                                </Transition.Child>
                            ))}
                        </Transition>
                    </div>
                </SimpleBar>
            )}
        </div>
    );
}
