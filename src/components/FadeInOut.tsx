import { Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface IFadeInOutProps {
    children: ReactNode | ReactNode[];
    active?: boolean;
    enter?: boolean;
    leave?: boolean;
    shouldUnmount?: boolean;
}

/**
 * Headlessui Transition component abstraction, wraps child
 */

export default function FadeInOut({ children, active = true, enter, leave, shouldUnmount = true }: IFadeInOutProps) {
    return (
        <Transition
            show={active}
            as={Fragment}
            unmount={shouldUnmount}
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
