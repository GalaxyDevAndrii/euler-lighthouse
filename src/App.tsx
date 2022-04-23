import { Slide, ToastContainer } from "react-toastify";

import Tooltips from "./components/Tooltips";
import Layout from "./modules/Layout";
import { useStore as useSettingsStore } from "./store/settings";

function App() {
    const darkMode = useSettingsStore((state) => state.darkMode);

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
                theme={darkMode ? "dark" : "light"}
            />
            <Tooltips />
            <Layout />
        </div>
    );
}

export default App;
