import { ReactNode } from "react";

import { Sidebar } from "../features/ui/sidebar";
import { Toolbar } from "../features/ui/toolbar";

export default function LayoutProvider({ children }: { children: ReactNode | ReactNode[] }) {
    return (
        <div className="relative flex flex-col h-screen">
            <Toolbar />
            <div className="relative w-full h-full flex flex-row items-center flex-1 overflow-hidden">
                <Sidebar />
                {children}
            </div>
        </div>
    );
}
