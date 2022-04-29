import Rive from "@rive-app/react-canvas";
import { useEffect } from "react";

import { useStore as useOnboardStore } from "../store/onboarding";
import { useStore as useUtilsStore } from "../store/utils";

import Backdrop from "./Backdrop";
import FadeInOut from "./FadeInOut";
import UtilsBtn from "./UtilsBtn";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const anim = require("../assets/euler_lighthouse.riv");

export default function WelcomeModal() {
    const nextStep = useOnboardStore((state) => state.nextStep);
    const toggleBackdrop = useUtilsStore((state) => state.toggleBackdrop);

    useEffect(() => {
        toggleBackdrop(true);
    }, [toggleBackdrop]);

    const handleNext = () => {
        nextStep();
        toggleBackdrop(false);
    };

    return (
        <FadeInOut enter leave>
            <div className="absolute w-full h-full top-0 left-0">
                <Backdrop />
                <div className="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 z-50 pb-8 w-11/12 md:w-[600px] md:h-[600px] flex flex-col items-center justify-center shadow-md bg-white dark:bg-mainDark rounded-lg overflow-hidden space-y-6">
                    <div className="relative w-full h-64 md:h-[400px] bg-[#FAFBFF]">
                        <div className="w-full h-full pt-12 md:pb-8 px-8">
                            <Rive src={anim} width="100%" height="100%" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center space-y-8 w-8/12">
                        <h1 className="text-2xl font-bold dark:text-white">Welcome</h1>
                        <span className="text-center dark:text-white">
                            Euler&apos;s Lighthouse is a way to visualize Euler&apos;s path finding algorithms through nodes, take a look,
                            learn something new and have fun!
                        </span>
                        <UtilsBtn onClick={handleNext} classNames="w-fit px-8 py-1 m-auto !bg-contrast text-white">
                            Next
                        </UtilsBtn>
                    </div>
                </div>
            </div>
        </FadeInOut>
    );
}
