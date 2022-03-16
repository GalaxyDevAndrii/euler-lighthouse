import Display from "./modules/Display";
import Sidebar from "./modules/Sidebar";
import Toolbar from "./modules/Toolbar";

function App() {
    return (
        <div className="h-full w-full">
            <Toolbar />
            <Sidebar />
            <div className="pl-64 pt-12 w-full h-full fixed">
                <Display />
            </div>
        </div>
    );
}

export default App;
