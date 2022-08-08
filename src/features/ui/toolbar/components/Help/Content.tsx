import { Popover, Disclosure } from "@headlessui/react";
import { ReactNode } from "react";
import SimpleBar from "simplebar-react";

import { ReactComponent as CloseSVG } from "../../../../../assets/close.svg";
import { ReactComponent as DownArrowSVG } from "../../../../../assets/down-arrow.svg";
import { ReactComponent as SourceSVG } from "../../../../../assets/source.svg";
import { ReactComponent as WikipediaSVG } from "../../../../../assets/wikipedia-logo.svg";
import UtilsBtn from "../../../../../components/UtilityBtn";
import { isMobile } from "../../../../../utils/misc";

export default function Content() {
    const CloseHeader = () => (
        <Popover.Button aria-label="Close help &amp; resources" className="focus-acc">
            <CloseSVG aria-hidden={true} className="stroke-black" />
        </Popover.Button>
    );

    const Key = ({ children }: { children: ReactNode }) => (
        <kbd
            aria-label={`Keyboard Shortcut Key: ${children?.toString()}`}
            className="rounded py-0.5 px-1.5 h-full bg-secondaryDark text-white text-[0.80rem] leading-5 font-inter"
        >
            {children}
        </kbd>
    );

    const Shortcuts = () => (
        <div className="flex flex-col justify-center w-full mb-2">
            <h3 className="title-default mb-2">Shortcuts</h3>
            <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-row items-center justify-center mb-1.5 space-x-1.5">
                    <Key>↑</Key>
                    <Key>↓</Key>
                    <Key>←</Key>
                    <Key>→</Key>
                    <span className="text-xs" aria-label="Press the arrow keys (up, down, left, right) to navigate">
                        to navigate.
                    </span>
                </div>
                <div className="flex items-center justify-center mb-1.5 space-x-1.5">
                    <div>
                        <Key>Ctrl</Key> + <Key>D</Key>
                    </div>
                    <span className="text-xs" aria-label="Press Ctrl + D to add a node.">
                        to add a node.
                    </span>
                </div>
                <div className="flex items-center justify-center mb-1.5 space-x-1.5">
                    <Key>L</Key>
                    <span className="text-xs" aria-label="Press L to run the algorithm">
                        to run the algorithm.
                    </span>
                </div>
                <div className="flex items-center justify-center mb-1.5 space-x-1.5">
                    <Key>BACKSPACE</Key>
                    <span className="text-xs" aria-label="Press Backspace to remove a node">
                        to remove a node.
                    </span>
                </div>
            </div>
        </div>
    );

    const Discover = () => (
        <div className="grid grid-cols-6 gap-2">
            <h3 className="title-default col-span-6">Discover Euler</h3>
            <UtilsBtn classNames="col-span-4 !p-0 text-primaryText tracking-wide">
                <iframe
                    className="rounded-md"
                    width="100%"
                    height="100%"
                    src="https://www.youtube-nocookie.com/embed/sKtloBAuP74?controls=0&rel=0"
                    title="The Importance of Euler in math"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </UtilsBtn>
            <a
                href="https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)"
                target="_blank"
                rel="noreferrer"
                className="group relative col-span-2 pt-1 px-2 space-y-2 flex flex-col justify-center items-center rounded-md text-primaryText font-bold text-sm tracking-wide transition-colors hover:bg-tertiaryTheme focus-acc"
            >
                <SourceSVG className="w-4 h-4 absolute m-2 top-0 right-0 stroke-primaryGray group-hover:!stroke-primaryTheme" />
                <img
                    className="h-14"
                    loading="lazy"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/6n-graf.svg/480px-6n-graf.svg.png"
                    alt="Graph Theory wikipedia page"
                />
                <p
                    className="text-xs text-secondaryText font-light line-clamp group-hover:text-primaryGray"
                    title={`In mathematics, and more specifically in graph theory, a graph is a structure amounting to a set of objects in which some pairs of the objects are in some sense "related". The objects correspond to mathematical abstractions called vertices (also called nodes or points) and each of the related pairs of vertices is called an edge (also called link or line).`}
                >
                    In mathematics, graph theory is the study of graphs, which are mathematical structures used to...
                </p>
                <div className="w-full flex-nowrap flex flex-row justify-between items-center gap-1">
                    <WikipediaSVG className="w-4 h-4" />
                    <h4 className="title-default !text-[13px] whitespace-nowrap">Graph Theory</h4>
                </div>
            </a>
        </div>
    );

    const FAQQuestion = ({ title, answer }: { title: string; answer: string }) => (
        <Disclosure as="div">
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-secondaryTheme/30 px-4 py-2 text-left text-sm font-medium text-primaryThemeDark hover:bg-secondaryTheme/50 focus-acc">
                        <span>{title}</span>
                        <DownArrowSVG
                            className={`${open ? "rotate-180 transform" : ""} h-5 w-5 stroke-primaryThemeDark fill-primaryThemeDark`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">{answer}</Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );

    const FAQ = () => (
        <div className="w-full space-y-3">
            <h3 className="title-default">FAQs</h3>
            <FAQQuestion title="Do you provide technical support" answer="No." />
            <FAQQuestion title="Do you provide technical support" answer="No." />
            <FAQQuestion title="Do you provide technical support" answer="No." />
            <FAQQuestion title="Do you provide technical support" answer="No." />
            <FAQQuestion title="Do you provide technical support" answer="No." />
            <FAQQuestion title="Do you provide technical support" answer="No." />
        </div>
    );

    return (
        <SimpleBar forceVisible="y" autoHide={false} className="relative overflow-y-auto overflow-x-hidden max-h-[460px] xr:w-[400px] pr-3">
            <div className="flex flex-col items-center justify-center px-2 space-y-4">
                <div className="flex justify-between items-center w-full mt-2">
                    <h2 className="title-default !text-lg">Help &amp; Resources</h2>
                    <CloseHeader />
                </div>
                {!isMobile() && <Shortcuts />}
                <Discover />
                <FAQ />
                <span className="text-xs mx-auto">
                    Found an issue?{" "}
                    <a
                        href="https://github.com/rortan134/euler-lighthouse/issues/new"
                        target="_blank"
                        rel="noreferrer"
                        className="text-spot hover:underline"
                    >
                        Report it!
                    </a>
                </span>
            </div>
        </SimpleBar>
    );
}
