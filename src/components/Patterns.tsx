import pattern1 from "../assets/patterns/DVP_101_200-35.png";

import UtilsBtn from "./UtilsBtn";

interface previewProps {
    img?: string;
}

export default function Patterns() {
    const Preview = ({ img }: previewProps) => (
        <div className="border-2 border-black dark:border-lightGray bg-transparent rounded-md">
            <img className="rounded-md" src={img} alt="Preview" />
        </div>
    );

    return (
        <div>
            <h3 className="text-base mb-2 font-medium dark:text-white">Common Patterns</h3>
            <div className="w-full grid grid-cols-2 gap-2">
                <UtilsBtn>
                    <Preview img={pattern1} />
                </UtilsBtn>
                <UtilsBtn>
                    <Preview img={pattern1} />
                </UtilsBtn>
                <UtilsBtn>
                    <Preview img={pattern1} />
                </UtilsBtn>
                <UtilsBtn>
                    <Preview img={pattern1} />
                </UtilsBtn>
            </div>
        </div>
    );
}
