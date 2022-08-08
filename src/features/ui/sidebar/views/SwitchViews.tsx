import { SidebarViews } from "../../../../types";

interface Props {
    active: SidebarViews;
    children?: React.ReactElement[];
}

export default function SwitchViews({ active, children }: Props) {
    // Switch all children and return the "active" one
    return <>{children?.filter((child: JSX.Element) => child.type.name == active) ?? children}</>;
}
