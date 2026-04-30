import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/Headers";
import Footer from "../components/footer";

const Layouts = () => {
    return (
        <div className="body-container">
            <HeaderComponent />

            <main className="relative flex-1 p-3 bg-ambient-vignette">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export default Layouts;