import { useEffect } from "react";
import { Slide, ToastContainer } from "react-toastify";

import Tooltips from "./components/Tooltips";
import Layout from "./modules/Layout";
import { useStore as useSettingsStore } from "./store/settings";

function App() {
    const darkMode = useSettingsStore((state) => state.darkMode);

    useEffect(() => {
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        }
    }, []);

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
