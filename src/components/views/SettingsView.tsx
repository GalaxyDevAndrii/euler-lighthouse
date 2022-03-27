import { SidebarViews } from "../../types";
import UtilsBtn from "../UtilsBtn";

export default function SettingsView({ setActiveView }: { setActiveView: React.Dispatch<React.SetStateAction<SidebarViews>> }) {
    return (
        <div className="w-full flex flex-col items-center">
            <UtilsBtn
                classNames="w-min mb-4 text-sm px-4 py-2 rounded-md flex flex-row items-center justify-center space-x-1.5"
                onClick={() => setActiveView("SidebarView")}
            >
                Back
            </UtilsBtn>
            <span>currently no cope&apos;ing</span>
        </div>
    );
}
