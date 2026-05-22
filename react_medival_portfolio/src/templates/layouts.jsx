<<<<<<< HEAD
import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/Headers';
import Footer from '../components/footer';
import SettingsModal from '../components/SettingsModal';
import { useSettings } from '../lib/useSettings';

const Layouts = () => {
  const { isSettingsOpen, closeSettings } = useSettings();

  return (
    <div className="body-container" id="body-container">
      <div className="alert-bar">
        <p>
          Welcome to the portfolio of Mouad the Coder! this portfolio is still under development thank you for your
          understanding
        </p>
      </div>
=======
import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/Headers";
import Footer from "../components/footer";

const Layouts = () => {
    return (
        <div className="body-container">
            <HeaderComponent />
>>>>>>> parent of 11287c8 ([DEV01])

      <HeaderComponent />

<<<<<<< HEAD
      <main>
        <Outlet />
      </main>
=======
            <Footer />
        </div>
    )
}
>>>>>>> parent of 11287c8 ([DEV01])

      <Footer />
      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
    </div>
  );
};

export default Layouts;
