
import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/Headers";
import Footer from "../components/footer";
import SettingsModal from "../components/SettingsModal";
import { useSettings } from "../lib/useSettings";

const Layouts = () => {
    const { isSettingsOpen, closeSettings } = useSettings();

    return (
        <div className="body-container">
            <HeaderComponent />

            <main className="relative flex-1 p-3 bg-ambient-vignette">
                <Outlet />
            </main>

            <Footer />
            <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
        </div>
    )
}

export default Layouts;