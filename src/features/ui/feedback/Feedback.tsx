import { useEffect, useState, useCallback, startTransition } from "react";

import { ReactComponent as OnboardIllustration } from "../../../assets/onboard.svg";
import tipsJSON from "../../../assets/tips.json";
import FadeInOut from "../../../components/FadeInOut";
import { useTrackedStore as useTrackedNodes } from "../../../stores/nodes";
import { useStore as useUtilsStore } from "../../../stores/utils";
import { isMobile } from "../../../utils/misc";

import useInterval from "./hooks/useInterval";

interface ITipData {
    illustration: string;
    content: string;
}

const TIP_DURATION = 15000;

export default function Feedback() {
    const { addNode, nodes } = useTrackedNodes();
    const toggleSidebar = useUtilsStore((state) => state.toggleSidebar);

    const [tips, setTips] = useState<Set<ITipData>>(new Set());
    const [activeTipIndex, setActiveTip] = useState(0);
    const [isShowing, setIsShowing] = useState(true);
    const [hasFinishedTutorial, setFinishedTutorial] = useState(localStorage.feedbackCompleted === "true");

    const nodeHasOneOrMoreConnections = nodes.some((node) => node.connectedTo.length >= 1);

    useEffect(() => {
        if (tipsJSON) {
            setTips(new Set(tipsJSON));
        }
    }, []);

    const cycleTip = useCallback(() => {
        setIsShowing(false);

        setActiveTip((count) => (count + 1) % tips.size);

        setTimeout(() => {
            startTransition(() => {
                setIsShowing(true);
            });
        }, 500);
    }, [tips]);

    useInterval({ callback: cycleTip, delay: hasFinishedTutorial ? TIP_DURATION : null });

    useEffect(() => {
        if (!hasFinishedTutorial && nodeHasOneOrMoreConnections) {
            setIsShowing(false);

            setFinishedTutorial(true);
            localStorage.feedbackCompleted = true;

            setTimeout(() => {
                setIsShowing(true);
            }, 500);
        }
    }, [hasFinishedTutorial, nodeHasOneOrMoreConnections]);

    const handleClick = () => {
        addNode();

        if (isMobile()) {
            toggleSidebar();
        }
    };

    const OnboardMessageComponent = () => (
        <div className="w-full h-fit flex flex-col items-center justify-center">
            <div className="basis-1/2 p-6 select-none">
                <OnboardIllustration className="w-full h-28" />
            </div>
            <div className="basis-1/2 flex flex-col items-center justify-center space-y-3">
                <h3 className="title-default !text-lg">Learn something new</h3>
                <p className="text-[0.80rem] leading-4 text-secondaryText dark:text-secondaryDark text-center">
                    Try connecting two or more nodes to get a detailed explanation of the algorithm and what is happening at a deeper level.
                </p>
                <button onClick={handleClick} className="text-primaryTheme text-sm py-1 px-2 rounded focus-acc hover:bg-tertiaryTheme">
                    Add Node
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex items-center justify-center !mb-12 h-72">
            <FadeInOut active={isShowing} enter leave>
                {!hasFinishedTutorial ? (
                    <div className="h-fit w-full">
                        <OnboardMessageComponent />
                    </div>
                ) : (
                    <div className="w-full h-fit flex flex-col items-center justify-center">
                        {Array.from(tips)[activeTipIndex] && (
                            <>
                                <div className="basis-1/2 p-6 select-none">
                                    <img
                                        className="w-full h-28"
                                        src={`${window.location.origin}/illustrations/${Array.from(tips)[activeTipIndex].illustration}`}
                                        alt={`Fun math fact illustration: ${
                                            Array.from(tips)[activeTipIndex].illustration.toString().split(".")[0] // svg file name
                                        }`}
                                    />
                                </div>
                                <div className="basis-1/2 flex flex-col items-center justify-center space-y-3">
                                    <h3 className="title-default !text-lg">Learn something new</h3>
                                    <p
                                        className="text-[0.80rem] leading-4 text-secondaryText dark:text-secondaryDark text-center"
                                        dangerouslySetInnerHTML={{ __html: Array.from(tips)[activeTipIndex].content }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                )}
            </FadeInOut>
        </div>
    );
}
