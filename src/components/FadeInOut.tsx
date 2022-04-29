import { Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface Props {
    children: ReactNode | ReactNode[];
    active?: boolean;
    enter?: boolean;
    leave?: boolean;
}

export default function FadeInOut({ children, active = true, enter, leave }: Props) {
    return (
        <Transition
            show={active}
            as={Fragment}
            {...(enter
                ? {
                      enter: "transition ease-in duration-150",
                      enterFrom: "opacity-0",
                      enterTo: "opacity-100",
                  }
                : {})}
            {...(leave
                ? {
                      leave: "transition ease-in duration-150",
                      leaveFrom: "opacity-100",
                      leaveTo: "opacity-0",
                  }
                : {})}
        >
            {children}
        </Transition>
    );
}
