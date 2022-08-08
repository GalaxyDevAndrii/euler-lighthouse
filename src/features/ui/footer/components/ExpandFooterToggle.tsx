import { ReactComponent as DownArrow } from "../../../../assets/down-arrow.svg";
import { ReactComponent as TipFrame } from "../../../../assets/frame.svg";

export default function ExpandFooterToggle({ state, onClick }: { state: boolean; onClick: () => void }) {
    return (
        <div className="relative bottom-2 flex items-center justify-center">
            <button onClick={onClick} className="flex items-center justify-center">
                <TipFrame className="absolute w-28 h-auto" />
                <DownArrow className={`absolute fill-black dark:fill-white transition-transform ${state ? "" : "rotate-180"}`} />
            </button>
        </div>
    );
}
