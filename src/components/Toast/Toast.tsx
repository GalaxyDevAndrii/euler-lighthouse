import { ToastContainer, Slide } from "react-toastify";

import { useStore as useSettingsStore } from "../../stores/settings";

export default function Toast() {
    const darkMode = useSettingsStore((state) => state.darkMode);

    return (
        <ToastContainer
            position="top-right"
            className="top-16 right-44"
            autoClose={3000}
            hideProgressBar
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            transition={Slide}
            theme={darkMode ? "dark" : "light"}
            limit={5}
        />
    );
}
