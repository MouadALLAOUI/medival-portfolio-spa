import CSection from '../../../templates/Section';
import Chatbot from '../../../components/CHATBOT/chatbot';

const HeroSection = () => {
  return (
    <CSection id="hero" classname="hero-section">
      <h1 className="hero-title">Mouad the Coder</h1>
      <div className="crystal-ball"></div>
      <p className="hero-subtitle">Ask the Oracle anything about Mouad</p>
      <Chatbot />
    </CSection>
  );
};

export default HeroSection;
