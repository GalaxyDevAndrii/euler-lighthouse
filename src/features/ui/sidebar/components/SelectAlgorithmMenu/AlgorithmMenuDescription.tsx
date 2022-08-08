import { Dispatch, SetStateAction, CSSProperties } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import ALGORITHMS_DATA from "../../../../../assets/algorithms.json";
import { ReactComponent as SourceSVG } from "../../../../../assets/source.svg";
import { Algorithms } from "../../../../../types"; // enum
import type { TAlgorithms } from "../../../../../types";
import { isMobile } from "../../../../../utils/misc";

interface IAlgorithmMenuDescriptionProps {
    open: boolean;
    setPopperElement: Dispatch<SetStateAction<HTMLDivElement | null>>;
    styles: CSSProperties;
    attributes: ReturnType<typeof usePopper>["attributes"];
    selectedAlgorithm: TAlgorithms;
    activeAlgorithm: Algorithms;
    setSelected: (selected: TAlgorithms) => void;
}

export default function AlgorithmMenuDescription({
    open,
    setPopperElement,
    styles,
    attributes,
    selectedAlgorithm,
    activeAlgorithm,
    setSelected,
}: IAlgorithmMenuDescriptionProps) {
    const activeAlgorithmIndex = ALGORITHMS_DATA.findIndex((alg) => alg.name === activeAlgorithm);
    const isSelected = selectedAlgorithm === activeAlgorithm;

    return !isMobile()
        ? createPortal(
              <div
                  className={`${
                      open ? "" : "hidden"
                  } relative w-64 h-64 bg-white flex flex-col space-y-1 rounded shadow px-4 py-3 z-50 ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-mainDark dark:ring-lightGray`}
                  ref={setPopperElement}
                  style={styles}
                  {...attributes.popper}
                  aria-hidden={!open}
              >
                  <div className="w-full h-full">
                      <a
                          href={ALGORITHMS_DATA[activeAlgorithmIndex].sourceURL}
                          className="group z-10 absolute px-2 py-1 rounded m-3 right-0 bottom-0 flex flex-nowrap items-center justify-end gap-1 text-xs hover:bg-tertiaryTheme hover:underline focus-acc"
                      >
                          Learn More
                          <SourceSVG className="w-4 h-4 stroke-primaryGray group-hover:!stroke-primaryTheme" />
                      </a>
                      <div className="w-full flex items-center justify-between">
                          <h3 className="title-default">{activeAlgorithm}</h3>
                          <button
                              title={isSelected ? "Selected" : "Click to select"}
                              className="w-4 h-4 p-0.5 rounded-full border border-secondaryDark flex items-center justify-center"
                              onClick={() => setSelected(activeAlgorithm)}
                          >
                              {isSelected && <div className="w-full h-full rounded-full bg-secondaryDark" />}
                          </button>
                      </div>

                      <p className="text-sm">{ALGORITHMS_DATA[activeAlgorithmIndex].description}</p>
                  </div>
              </div>,
              document.querySelector("#root") as HTMLElement
          )
        : null;
}
