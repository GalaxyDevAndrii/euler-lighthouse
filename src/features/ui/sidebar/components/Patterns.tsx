import UtilsBtn from "../../../../components/UtilityBtn";

interface previewProps {
    img?: string;
}

export default function Patterns() {
    const Preview = ({ img }: previewProps) => (
        <div className="p-5">
            <div className="h-full w-full rounded-md aspect-square" />
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="relative w-full grid grid-cols-2 gap-1">
                {[...Array(6)].map((e, i) => (
                    <UtilsBtn classNames="animate-pulse" key={i}>
                        <Preview img="" />
                    </UtilsBtn>
                ))}
                <div className="absolute w-full h-full bg-gradient-to-t via-transparent from-white" />
            </div>
            <button className="relative bottom-5 text-secondaryText/75 text-sm underline focus-acc">See more</button>
        </div>
    );
}
