import Tooltip from "../components/Tooltip";
import { Display } from "../features/display";
import { Onboard } from "../features/onboarding";
import { Footer } from "../features/ui/footer";

import KeyboardShortcuts from "./KeyboardShortcuts";
import LayoutProvider from "./Layout";
import MobileBackdrop from "./MobileBackdrop";

import "simplebar/dist/simplebar.min.css";

function App() {
    return (
        <div className="h-full w-full relative max-h-screen overflow-hidden">
            <LayoutProvider>
                <main role="application" className="relative w-full h-full min-w-[280px] grow flex flex-col z-0">
                    <Display />
                    <Footer />
                    <MobileBackdrop />
                </main>
            </LayoutProvider>
            <Tooltip />
            {/* <Toast />
            <LoadingToast /> */}
            <Onboard />
            <KeyboardShortcuts />
        </div>
    );
}

export default App;
