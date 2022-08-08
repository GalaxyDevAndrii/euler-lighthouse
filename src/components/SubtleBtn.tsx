import { ReactNode } from "react";

interface Props {
    type?: "submit" | "reset" | "button";
    children: ReactNode | ReactNode[];
    classNames?: string;
    setRef?: any;
    draggable?: boolean;
    id?: string;
    title?: string;
    onClick?: () => void;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    disabled?: boolean;
}

export default function SubtleBtn({ type, children, setRef, classNames = "", ...rest }: Props) {
    return (
        <button type={type} ref={setRef} className={`p-1 border font-semibold text-sm btn-default focus-acc ${classNames}`} {...rest}>
            {children}
        </button>
    );
}
