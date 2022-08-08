import { ReactNode } from "react";

export default function Content() {
    const ExportBtn = ({ children, handler }: { children: ReactNode; handler: () => void }) => (
        <button
            className="w-full text-start py-2 px-4 rounded-md hover:bg-tertiaryTheme text-primaryText dark:text-white text-sm focus-acc"
            aria-label="Export"
            onClick={handler}
        >
            {children}
        </button>
    );

    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-full px-4">
                <h3 className="title-default">Export Algorithm</h3>
                <p className="text-[0.80rem] leading-4 text-secondaryText dark:text-secondaryDark">Choose file type</p>
            </div>
            <div className="relative overflow-y-auto max-h-[440px] mx-2">
                <ul className="w-full space-y-2 flex flex-col justify-start items-center break-words" role="listbox">
                    <button className="w-full p-4 flex justify-between items-center rounded-md bg-secondaryTheme shadow shadow-primaryTheme/25 space-x-12 focus-acc">
                        <span className="text-white font-semibold text-sm">Export as GIF</span>
                        <span className="px-1.5 py-1 bg-white rounded-md text-primaryTheme text-xs font-semibold">COMING SOON</span>
                    </button>
                    <li className="w-full">
                        <ExportBtn handler={() => {}}>Export as PNG</ExportBtn>
                    </li>
                    <li className="w-full">
                        <ExportBtn handler={() => {}}>Export as JPEG</ExportBtn>
                    </li>
                    <li className="w-full">
                        <ExportBtn handler={() => {}}>Export as WEBP</ExportBtn>
                    </li>
                    <li className="w-full">
                        <ExportBtn handler={() => {}}>Export as JSON</ExportBtn>
                    </li>
                </ul>
            </div>
        </div>
    );
}
