import { ReactComponent as InfoIcon } from "../assets/question-mark.svg";

export default function InfoBtn() {
    return (
        <button data-for="tooltip" data-tip="Help" className="relative bg-gray-200/60 dark:bg-lightGray p-1.5 rounded-full">
            <InfoIcon className="fill-gray-500/90 dark:fill-gray-100 w-3.5 h-3.5" />
            {/* <span className="absolute right-0 top-0 animate-ping bg-contrast h-1.5 w-1.5 rounded-full" /> */}
        </button>
    );
}
