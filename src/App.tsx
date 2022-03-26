import Display from "./modules/Display";
import Sidebar from "./modules/Sidebar";
import Toolbar from "./modules/Toolbar";
import { useStore } from "./store/utils";

function App() {
    const { sidebarExpanded } = useStore((state) => state);

    return (
        <div className="h-full w-full">
            <Toolbar />
            <Sidebar />
            <div className={`${sidebarExpanded ? "pl-64" : "pl-0"} transition-[padding] pt-12 w-full h-full fixed`}>
                <Display />
            </div>
        </div>
    );
}

export default App;
