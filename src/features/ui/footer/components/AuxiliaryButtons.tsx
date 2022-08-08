import { ReactComponent as FullscreenIcon } from "../../../../assets/fullscreen.svg";
import { useStore as useTracking } from "../../../../stores/tracking";
import { useTrackedStore as useTrackedUtils } from "../../../../stores/utils";

export default function AuxiliaryButtons() {
    const { displayRef, toggleFullscreen } = useTrackedUtils();
    const cameraZoom = useTracking((state) => state.cameraZoom);

    const handleFullscreenClick = () => {
        if (!displayRef?.current) return;
        toggleFullscreen(displayRef?.current);
    };

    const getZoomPercentage = (zoom: number) => {
        return Math.round(zoom / 0.5) * 0.5 * 100;
    };

    return (
        <>
            <button
                className="px-4 py-1 rounded text-primaryText font-bold text-sm tracking-wide transition-colors hover:bg-tertiaryTheme focus-acc"
                data-for="tooltip"
                data-tip="Zoom In/Out"
            >
                {`${getZoomPercentage(cameraZoom)}%`}
            </button>
            <div className="h-[24px] w-[1px] bg-tertiaryTheme" />
            <button
                className="p-1.5 rounded transition-colors hover:bg-tertiaryTheme focus-acc"
                data-for="tooltip"
                data-tip="Show in Fullscreen, J"
                onClick={handleFullscreenClick}
            >
                <FullscreenIcon />
            </button>
        </>
    );
}
