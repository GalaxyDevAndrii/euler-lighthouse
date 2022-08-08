import { Listbox } from "@headlessui/react";
import { useState, Fragment } from "react";
import { usePopper } from "react-popper";

import FadeInOut from "../../../../../components/FadeInOut";
import { useStore } from "../../../../../stores/algorithm";
import { Algorithms } from "../../../../../types";

import AlgorithmMenuDescription from "./AlgorithmMenuDescription";
import SelectMenuDropdown from "./SelectMenuDropdown";
import SelectMenuOption from "./SelectMenuOption";

export default function SelectAlgorithmMenu() {
    const { selected, setSelected } = useStore((state) => state);
    const [activeAlgorithm, setActiveAlgorithm] = useState<Algorithms>(selected);

    // handle algorithm description menu position
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: "right-start",
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: [42, 2],
                },
            },
        ],
    });

    return (
        <div ref={setReferenceElement} className="relative w-full z-10" aria-hidden={!open}>
            <Listbox value={selected} onChange={setSelected}>
                {({ open }: { open: boolean }) => (
                    <>
                        <SelectMenuDropdown open={open} selected={selected} />
                        <FadeInOut active={open} enter leave shouldUnmount={false}>
                            <Listbox.Options
                                static
                                className={`${
                                    open ? "" : "hidden"
                                } text-sm absolute w-full py-1 mt-1 overflow-auto bg-white rounded shadow max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-mainDark dark:ring-lightGray`}
                            >
                                {Object.values(Algorithms).map((algorithm, i) => (
                                    <Fragment key={i}>
                                        <SelectMenuOption algorithm={algorithm} setActiveAlgorithm={setActiveAlgorithm} />
                                    </Fragment>
                                ))}
                                <AlgorithmMenuDescription
                                    open={open}
                                    setPopperElement={setPopperElement}
                                    styles={styles.popper}
                                    attributes={attributes}
                                    selectedAlgorithm={selected}
                                    activeAlgorithm={activeAlgorithm}
                                    setSelected={setSelected}
                                />
                                <a
                                    href="https://github.com/rortan134/euler-lighthouse/issues/new"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block text-xs my-0.5 text-center text-spot hover:underline"
                                >
                                    Suggest an algorithm
                                </a>
                            </Listbox.Options>
                        </FadeInOut>
                    </>
                )}
            </Listbox>
        </div>
    );
}
