import { Listbox } from "@headlessui/react";
import { useEffect, Dispatch, SetStateAction } from "react";

import type { Algorithms } from "../../../../../types";

interface ISelectMenuDropdownProps {
    algorithm: Algorithms;
    setActiveAlgorithm: Dispatch<SetStateAction<Algorithms>>;
}

export default function SelectMenuOption({ algorithm, setActiveAlgorithm }: ISelectMenuDropdownProps) {
    const Option = ({ algorithm, selected, active }: { algorithm: Algorithms; selected: boolean; active: boolean }) => {
        useEffect(() => {
            if (active) {
                setActiveAlgorithm(algorithm);
            }
        }, [active, algorithm]);

        return <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{algorithm}</span>;
    };

    return (
        <Listbox.Option
            className={({ active }) =>
                `cursor-default select-none relative py-2 px-4 flex items-center justify-between ${
                    active ? "text-white bg-primaryTheme dark:bg-secondaryDark" : "text-gray-900 dark:text-white"
                }`
            }
            value={algorithm}
        >
            {({ selected, active }) => <Option algorithm={algorithm} selected={selected} active={active} />}
        </Listbox.Option>
    );
}
