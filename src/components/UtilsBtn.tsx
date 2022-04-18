import { ReactNode } from "react";

interface Props {
    children: ReactNode | ReactNode[];
    classNames?: string;
    draggable?: boolean;
    id?: string;
    title?: string;
    onClick?: () => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
}

export default function UtilsBtn({ children, classNames, ...props }: Props) {
    return (
        <button
            {...props}
            className={`w-full bg-gray-200 dark:bg-lightDark dark:border-lightGray dark:border dark:text-white rounded-md focus:border-contrast focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-contrast focus-visible:ring-offset-2 focus-visible:border-contrast active:bg-gray-300 ${classNames}`}
        >
            {children}
        </button>
    );
}
