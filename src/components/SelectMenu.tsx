import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { ReactComponent as DownArrow } from "../assets/down-arrow.svg";
import { useStore } from "../store/algorithm";
import { Algorithms } from "../types/index.d";

export default function SelectMenu() {
    const { selected, setSelected } = useStore((state) => state);

    return (
        <div className="w-full">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                    <div className="mb-2">
                        <h3 className="text-base font-medium dark:text-white">Algorithm</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">Select an Eulerian Algorithm</p>
                    </div>
                    <Listbox.Button className="group text-sm relative flex flex-row justify-between items-center w-full py-2 px-3 text-left bg-white dark:bg-mainDark border border-gray-300 dark:border-lightGray rounded shadow-sm cursor-default focus:border-contrast focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-contrast focus-visible:ring-offset-2 focus-visible:border-contrast">
                        <span className="truncate dark:text-white">{selected}</span>
                        <DownArrow className="pointer-events-none transition fill-gray-500 group-hover:fill-black dark:group-hover:fill-white" />
                    </Listbox.Button>
                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="text-sm absolute w-full py-1 mt-1 overflow-auto bg-white dark:bg-mainDark rounded shadow-sm max-h-60 ring-1 ring-black dark:ring-lightGray ring-opacity-5 focus:outline-none">
                            {Object.values(Algorithms).map((algorithm: string, index: number) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                            active ? "text-contrast bg-mainLight dark:bg-lightDark" : "text-gray-900 dark:text-white"
                                        }`
                                    }
                                    value={algorithm}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                                {algorithm}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-mainDark dark:text-contrast">
                                                    <div className="w-5 h-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
