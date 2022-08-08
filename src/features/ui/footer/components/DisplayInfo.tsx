import { useStore as useAlgorithmStore } from "../../../../stores/algorithm";

export default function DisplayInfo() {
    const degrees = useAlgorithmStore((state) => state.degrees);
    const vertices = useAlgorithmStore((state) => state.vertices);

    return (
        <>
            <div className="flex flex-row items-end md:space-x-0.5">
                <span className="text-primaryText font-semibold text-sm md:text-lg">{degrees}&#xA0;</span>
                <span className="text-primaryGray font-semibold text-sm leading-5 md:leading-6">Degrees</span>
            </div>
            <div className="flex flex-row items-end md:space-x-0.5">
                <span className="text-primaryText font-semibold text-sm md:text-lg">{vertices}&#xA0;</span>
                <span className="text-primaryGray font-semibold text-sm leading-5 md:leading-6">Vertices</span>
            </div>
        </>
    );
}
