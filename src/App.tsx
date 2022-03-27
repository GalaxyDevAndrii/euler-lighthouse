import { Slide, ToastContainer } from "react-toastify";

import Display from "./modules/Display";
import Sidebar from "./modules/Sidebar";
import Toolbar from "./modules/Toolbar";
import { useStore } from "./store/utils";

import "react-toastify/dist/ReactToastify.css";

function App() {
    const { sidebarExpanded } = useStore((state) => state);

    return (
        <div className="h-full w-full">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                transition={Slide}
            />
            <Toolbar />
            <Sidebar />
            <div className={`${sidebarExpanded ? "pl-64" : "pl-0"} transition-[padding] pt-12 w-full h-full fixed`}>
                <Display />
            </div>
        </div>
    );
}

export default App;
