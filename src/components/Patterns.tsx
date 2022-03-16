import pattern1 from "../assets/patterns/DVP_101_200-35.png";

import UtilsBtn from "./UtilsBtn";

interface previewProps {
    img?: string;
}

export default function Patterns() {
    const Preview = ({ img }: previewProps) => (
        <div className="m-2 border-2 border-black ring-4 ring-white rounded">
            <img src={img} alt="Preview" />
        </div>
    );

    return (
        <div>
            <h3 className="text-base mb-2 font-medium">Common Patterns</h3>
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
