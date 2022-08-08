import Rive from "@rive-app/react-canvas";
import { useEffect } from "react";
import { toast, ToastContentProps } from "react-toastify";

import { useStore as useAlgorithmStore } from "../../stores/algorithm";
import { useStore as useUtilsStore } from "../../stores/utils";
import UtilsBtn from "../UtilityBtn";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const anim = require("../../assets/LoadingAnim.riv");

const customId = "loadingToastId";

export default function LoadingToast() {
    const { isActive, cancel } = useAlgorithmStore();
    const toggleBackdrop = useUtilsStore((state) => state.toggleBackdrop);

    useEffect(() => {
        if (isActive) {
            toast(Content, {
                toastId: customId,
                autoClose: false,
                icon: false,
                closeButton: false,
                draggable: false,
                closeOnClick: false,
                pauseOnFocusLoss: false,
                className: "w-[30rem] rounded-t-none cursor-default",
            });
            toggleBackdrop(true);
            console.log("initiated");
        } else {
            toast.dismiss(customId);
        }
    }, [isActive, toggleBackdrop]);

    const handleCancel = (closeToast: undefined | (() => void)) => {
        if (!closeToast) return;
        closeToast();
        cancel();
        toggleBackdrop(false);
    };

    const Content = ({ closeToast }: ToastContentProps<unknown>) => {
        return (
            <>
                <div className="absolute top-0 left-0 bg-primaryTheme h-[3px] animate-borealis" />
                <div className="w-full h-full flex flex-row justify-between gap-8 p-3">
                    <div className="h-full w-full basis-1/3 shrink-0">
                        <Rive src={anim} width="100%" height="100%" />
                    </div>
                    <div className="h-full w-full flex flex-col">
                        <div className="mb-2">
                            <h3 className="title-default !font-bold">Finding shortest path...</h3>
                            <p className="text-[0.80rem] leading-5 text-secondaryText dark:text-secondaryDark">While you wait...</p>
                        </div>
                        <UtilsBtn
                            classNames="!text-red-500 !bg-transparent border-transparent !p-0 !w-min"
                            onClick={() => handleCancel(closeToast)}
                        >
                            Cancel
                        </UtilsBtn>
                    </div>
                </div>
            </>
        );
    };

    return null;
}
