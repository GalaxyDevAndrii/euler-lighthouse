import { SidebarViews } from "../../types";

interface Props {
    active: SidebarViews;
    children?: any;
}

export default function SwitchViews({ active, children }: Props) {
    // Switch all children and return the "active" one
    return children?.filter((child: any) => child.type.name == active);
}
