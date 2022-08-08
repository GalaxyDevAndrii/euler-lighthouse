import { Popover } from "@headlessui/react";
import { useEffect, useState, lazy, Suspense } from "react";

import { ReactComponent as ExportSVG } from "../../../../../assets/export.svg";
import Loader from "../../../../../components/Loader";
import SubtleBtn from "../../../../../components/SubtleBtn";
import { useStore as useAlgorithmStore } from "../../../../../stores/algorithm";

const Content = lazy(() => import("./Content"));

export default function Export() {
    const vertices = useAlgorithmStore((state) => state.vertices);

    const [canExport, setCanExport] = useState(false);

    useEffect(() => {
        setCanExport(vertices > 0);
    }, [vertices]);

    return (
        <Popover>
            <Popover.Button as="div">
                <SubtleBtn
                    classNames={`!py-1 !px-2 !border-none hidden xr:flex flex-row justify-between items-center gap-1 !bg-primaryTheme !text-white ${
                        canExport ? "" : "opacity-60"
                    }`}
                    aria-label="Export algoritm visualization"
                    aria-disabled={!canExport}
                >
                    <ExportSVG aria-hidden="true" role="img" focusable="false" className="w-4 h-4 stroke-white" />
                    <span className="hidden sm:block">Export</span>
                </SubtleBtn>
            </Popover.Button>

            {canExport && (
                <Popover.Panel className="absolute z-10 py-4 border shadow-lg bg-white rounded-md m-2 right-0 xr:right-32">
                    <Suspense
                        fallback={
                            <div className="bg-white px-4 rounded-md flex items-center justify-center">
                                <Loader size={28} />
                            </div>
                        }
                    >
                        <Content />
                    </Suspense>
                </Popover.Panel>
            )}
        </Popover>
    );
}
