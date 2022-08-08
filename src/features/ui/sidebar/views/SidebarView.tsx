import { ReactComponent as SettingsSvg } from "../../../../assets/settings.svg";
import Run from "../../../../components/Run";
import UtilsBtn from "../../../../components/UtilityBtn";
import { useTrackedStore as useTrackedNodes } from "../../../../stores/nodes";
import { useStore as useUtilsStore } from "../../../../stores/utils";
import { SidebarViews } from "../../../../types";
import { isMobile } from "../../../../utils/misc";
import { Feedback } from "../../feedback";
import Patterns from "../components/Patterns";
import SelectAlgorithmMenu from "../components/SelectAlgorithmMenu/SelectAlgorithmMenu";

export default function SidebarView({ setActiveView }: { setActiveView: React.Dispatch<React.SetStateAction<SidebarViews>> }) {
    const { addNode, selectedNode, removeNode, isSelected } = useTrackedNodes();
    const toggleSidebar = useUtilsStore((state) => state.toggleSidebar);

    const handleClick = () => {
        addNode();

        if (isMobile()) {
            toggleSidebar();
        }
    };

    const BetaChip = () => (
        <span
            aria-label="Feature Release Label: Beta"
            className="h-min px-2 py-0.5 rounded-lg shadow shadow-primaryTheme bg-primaryTheme text-white text-xs font-semibold select-none"
        >
            BETA
        </span>
    );

    const Algorithms = () => (
        <div>
            <div className="mb-2">
                <div className="flex flex-row items-end justify-between w-full">
                    <h3 className="title-default">Algorithm</h3>
                    <BetaChip />
                </div>
                <p className="text-[0.80rem] leading-5 text-secondaryText dark:text-secondaryDark">Select an Eulerian algorithm</p>
            </div>
            <div className="flex flex-nowrap items-center justify-between space-x-3">
                <SelectAlgorithmMenu />
                <Run />
            </div>
        </div>
    );

    const Interaction = () => (
        <div className="flex flex-row items-center justify-between select-none">
            <UtilsBtn classNames="py-2 px-2 text-primaryText basis-[45%] truncate" onClick={handleClick}>
                Add Node
            </UtilsBtn>
            <UtilsBtn
                classNames={`py-2 px-2 text-primaryText basis-[45%] truncate ${
                    isSelected() ? "" : "opacity-60 hover:bg-tertiaryTheme/75 active:!bg-tertiaryTheme/75" // override other styles
                }`}
                onClick={() => removeNode(selectedNode)}
                data-for={!isSelected() ? "tooltip" : ""}
                data-tip={isSelected() ? "" : "Select at least one node"}
            >
                Delete Node
            </UtilsBtn>
        </div>
    );

    const CommonGraphs = () => (
        <div>
            <div className="mb-2">
                <h3 className="title-default">Common Graphs</h3>
                <p className="text-[0.80rem] leading-5 text-secondaryText dark:text-secondaryDark">
                    A set of the most common eulerian graphs
                </p>
            </div>

            <Patterns />
        </div>
    );

    const SettingsBtn = () => (
        <UtilsBtn
            onClick={() => setActiveView("SettingsView")}
            classNames="px-4 py-2 flex flex-row items-center justify-center space-x-1.5 mx-auto select-none"
        >
            <SettingsSvg className="dark:fill-white" />
            <span className="text-primaryText">Settings</span>
        </UtilsBtn>
    );

    return (
        <>
            <Algorithms />

            <Interaction />

            <CommonGraphs />

            <SettingsBtn />

            <Feedback />
        </>
    );
}
