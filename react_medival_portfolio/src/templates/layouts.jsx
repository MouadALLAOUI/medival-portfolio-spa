
import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/Headers";
import Footer from "../components/footer";

const Layouts = () => {
  return (
    <div className="body-container">
      <HeaderComponent />
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
      <Footer />
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
    </div>
  );
};

export default Layouts;
