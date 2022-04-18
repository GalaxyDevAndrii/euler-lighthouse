import { ReactNode } from "react";

interface Props {
    children: ReactNode | ReactNode[];
    classNames?: string;
    setRef?: any;
    draggable?: boolean;
    id?: string;
    title?: string;
    onClick?: () => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
}

export default function SubtleBtn({ children, classNames, setRef, ...props }: Props) {
    return (
        <button
            ref={setRef}
            className={`bg-gray-100 p-1 border dark:border-lightGray rounded-md font-semibold text-sm active:bg-gray-200 dark:bg-mainGray dark:active:bg-lightDark ${classNames}`}
            {...props}
        >
            {children}
        </button>
    );
}
