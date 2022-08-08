import { Listbox } from "@headlessui/react";

import { ReactComponent as DownArrow } from "../../../../../assets/down-arrow.svg";
import type { TAlgorithms } from "../../../../../types";

interface ISelectMenuDropdownProps {
    open: boolean;
    selected: TAlgorithms;
}

export default function SelectMenuDropdown({ open, selected }: ISelectMenuDropdownProps) {
    return (
        <Listbox.Button
            className={`group text-sm flex flex-row justify-between items-center w-full py-2 px-3 text-left bg-white border rounded shadow-sm cursor-default focus-acc ${
                open ? "border-primaryTheme" : "border-gray-300"
            }`}
        >
            <span className="truncate dark:text-white">{selected}</span>
            <DownArrow className="pointer-events-none transition fill-gray-500 group-hover:fill-black dark:group-hover:fill-white" />
        </Listbox.Button>
    );
}
