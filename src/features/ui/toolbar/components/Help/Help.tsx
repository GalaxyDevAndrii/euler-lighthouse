import { Popover } from "@headlessui/react";

import { ReactComponent as InfoIcon } from "../../../../../assets/question-mark.svg";
import SubtleBtn from "../../../../../components/SubtleBtn";

import Content from "./Content";

export default function Help() {
    return (
        <Popover>
            {({ open }) => (
                <>
                    <Popover.Button as="div">
                        <SubtleBtn
                            classNames="relative bg-tertiaryTheme/60 dark:bg-primaryGray p-1.5 !rounded-full"
                            aria-label="Help and Resources"
                            data-for="tooltip"
                            data-tip="Help and Resources"
                        >
                            <InfoIcon
                                aria-hidden="true"
                                role="img"
                                focusable="false"
                                className="fill-secondaryGray/80 dark:fill-secondaryText w-3.5 h-3.5"
                            />
                        </SubtleBtn>
                    </Popover.Button>

                    <Popover.Panel
                        static
                        className={`${
                            open ? "block" : "hidden"
                        } absolute z-10 p-2 pr-0 border shadow-lg bg-white rounded-md m-2 inset-x-0 xm:left-auto xm:right-16 sm:right-[4.5rem] md:!right-20`}
                    >
                        <Content />
                    </Popover.Panel>
                </>
            )}
        </Popover>
    );
}
