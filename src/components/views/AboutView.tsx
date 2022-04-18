import { SidebarViews } from "../../types";
import UtilsBtn from "../UtilsBtn";

export default function AboutView({ setActiveView }: { setActiveView: React.Dispatch<React.SetStateAction<SidebarViews>> }) {
    return (
        <div className="w-full flex flex-col items-center">
            <UtilsBtn
                classNames="w-min mb-4 text-sm px-4 py-2 rounded-md flex flex-row items-center justify-center space-x-1.5"
                onClick={() => setActiveView("SidebarView")}
            >
                Back
            </UtilsBtn>
            <div>
                <h3 className="text-base mb-2 font-medium">About</h3>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus exercitationem neque, ipsum minus iusto.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum minus blanditiis officia quis voluptates iure cumque id
                    dolorem, rem voluptas.
                </p>
                <span className="font-semibold">Made by Rortan</span>
            </div>
        </div>
    );
}
