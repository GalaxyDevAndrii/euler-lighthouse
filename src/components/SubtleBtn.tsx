import { ReactChild, ReactChildren } from "react";

interface Props {
    children: ReactChild | ReactChild[] | ReactChildren;
    classNames?: string;
    draggable?: boolean;
    id?: string;
    title?: string;
    onClick?: () => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
}

export default function SubtleBtn({ children, classNames, ...props }: Props) {
    return (
        <button {...props} className={`bg-gray-100 p-1 border rounded-md font-semibold text-sm active:bg-gray-200 ${classNames}`}>
            {children}
        </button>
    );
}
