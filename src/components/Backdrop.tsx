import { useStore as useUtilsStore } from "../store/utils";

import FadeInOut from "./FadeInOut";

export default function Backdrop({ clickCallback }: { clickCallback?: () => void }) {
    const backdropActive = useUtilsStore((state) => state.backdropActive);

    return (
        <FadeInOut active={backdropActive} enter leave>
            <div className="absolute h-full w-full bg-black/20 dark:bg-black/40 z-40" onClick={clickCallback} role="presentation" />
        </FadeInOut>
    );
}
