import { useEffect } from "react";
import ReactTooltip from "react-tooltip";

import UtilsBtn from "../../../../components/UtilityBtn";
import { useStore as useOnboardStore } from "../../../../stores/onboarding";
import { useStore as useSettingsStore } from "../../../../stores/settings";

import WelcomeModal from "./WelcomeModal";

export default function Onboard() {
    const darkMode = useSettingsStore((state) => state.darkMode);
    const { status, step, nextStep, refs, skip } = useOnboardStore();

    useEffect(() => {
        if (refs[step - 1]?.current) {
            ReactTooltip.show(refs[step - 1]?.current as HTMLElement);
        }
    }, [step, refs]);

    return (
        <>
            {step === 0 ? (
                <>
                    <WelcomeModal />
                </>
            ) : (
                status !== "finished" && (
                    <ReactTooltip
                        id="onboarding"
                        className="!px-6 !rounded-md"
                        event="onload"
                        type={darkMode ? "light" : "dark"}
                        effect="solid"
                        multiline={true}
                        clickable={true}
                        scrollHide={false}
                        resizeHide={false}
                        getContent={(dataTip) => (
                            <div className="flex flex-col items-start space-y-2 m-2">
                                <span className="mb-2">{dataTip}</span>
                                <div className="font-medium flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 text-black dark:text-white">
                                    <UtilsBtn onClick={nextStep} classNames="truncate text-white px-3 py-1 !bg-primaryTheme w-fit">
                                        Next
                                    </UtilsBtn>
                                    <button
                                        onClick={skip}
                                        className="truncate px-2 py-1 text-gray-300 dark:text-secondaryGray hover:underline"
                                    >
                                        Skip tutorial
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                )
            )}
        </>
    );
}
