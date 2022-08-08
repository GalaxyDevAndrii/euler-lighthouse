import { MenuItem } from "@szhsin/react-menu";
import { ReactElement } from "react";

type ContextMenuButtonTypes = "regular" | "delete";

interface IContextMenuOptionProps {
    label?: string;
    handler: () => void;
    text: string;
    icon?: ReactElement;
    type?: ContextMenuButtonTypes;
}

export default function ContextMenuOption({ label, handler, text, icon, type, ...rest }: IContextMenuOptionProps) {
    return (
        <MenuItem
            aria-label={label ?? text}
            className={`px-4 text-sm font-semibold text-primaryText fill-primaryText ${
                type === "delete" ? "text-red-500 !fill-red-500 hover:!fill-white hover:bg-red-500 hover:text-white" : ""
            }`}
            onClick={handler}
            {...rest}
        >
            <div className="flex flex-row items-center pointer-events-none w-full space-x-1.5">
                <span aria-hidden={true}>{icon}</span>
                <span>{text}</span>
            </div>
        </MenuItem>
    );
}
