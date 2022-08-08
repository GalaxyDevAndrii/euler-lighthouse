import { ReactNode } from "react";

import FadeInOut from "./FadeInOut";

interface IBackdropProps {
    active: boolean;
    children: ReactNode | ReactNode[];
    clickCallback?: () => void;
    classNames?: string;
}

export default function Backdrop({ children, active = false, clickCallback = () => {}, classNames = "" }: IBackdropProps) {
    return (
        <FadeInOut active={active} enter leave>
            <div
                aria-hidden="true"
                className={`h-full w-full absolute top-0 left-0 bg-black/10 dark:bg-black/40 z-40 ${classNames}`}
                onClick={() => clickCallback()}
                role="presentation"
            >
                {children}
            </div>
        </FadeInOut>
    );
}
