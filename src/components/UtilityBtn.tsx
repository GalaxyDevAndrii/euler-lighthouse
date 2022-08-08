import { ReactNode, LegacyRef } from "react";

import { forwardRefWithAs } from "../utils/misc";

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

const UtilityBtnRoot = forwardRefWithAs(function UtilityBtn(props: Props, ref: LegacyRef<HTMLButtonElement> | undefined) {
    const { type = "button", classNames = "", ...rest } = props;

    return (
        <button type={type} ref={ref} className={`font-medium text-sm py-2 px-4 btn-default focus-acc ${classNames}`} {...rest}>
            {props.children}
        </button>
    );
});

const UtilsBtn = Object.assign(UtilityBtnRoot);

export default UtilsBtn;
