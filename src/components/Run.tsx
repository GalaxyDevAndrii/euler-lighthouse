import { useEffect, createRef } from "react";

import { ReactComponent as CancelSVG } from "../assets/close.svg";
import { ReactComponent as RunIcon } from "../assets/run.svg";
import { useStore as useAlgorithmStore } from "../stores/algorithm";
import { useStore as useOnboardStore } from "../stores/onboarding";
import { useStore as useUtilsStore } from "../stores/utils";

import SubtleBtn from "./SubtleBtn";

export default function Run() {
    const addRef = useOnboardStore((state) => state.addRef);
    const sidebarExpanded = useUtilsStore((state) => state.sidebarExpanded);
    const { initialize, cancel, isActive } = useAlgorithmStore();

    const hintRef = createRef<HTMLElement>();

    useEffect(() => {
        if (hintRef.current) {
            addRef(hintRef);
        }
    }, [addRef, hintRef]);

    const handleInitialize = () => {
        if (isActive) {
            cancel();
        } else {
            initialize();
        }
    };

    return (
        <>
            <SubtleBtn
                setRef={hintRef}
                aria-label="Run selected algorithm"
                data-for="tooltip"
                data-tip="Run, L"
                classNames={`${sidebarExpanded ? "h-full aspect-square !p-2 !bg-white shadow-sm !border-gray-300" : ""}`}
                onClick={handleInitialize}
            >
                {isActive ? (
                    <CancelSVG className={`stroke-red-500 stroke-2 ${sidebarExpanded ? "h-[20px] w-[20px]" : ""}`} />
                ) : (
                    <RunIcon className={`fill-primaryTheme ${sidebarExpanded ? "h-[20px] w-[20px]" : ""}`} />
                )}
            </SubtleBtn>
        </>
    );
}
