import { useState } from 'react';
import CSection from "../../../templates/Section";
import { useSettings } from '../../../lib/useSettings';
import { useAlerts } from '../../../lib/useAlerts';

function ContactSection() {
  const { t } = useSettings();
  const { showAlert } = useAlerts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate raven flying animation
    setTimeout(() => {
      showAlert('Your raven has been dispatched!', 'success');
      setIsSubmitting(false);
      e.target.reset();
    }, 1500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mouad.allaoui@example.com');
    showAlert('Email address copied to clipboard!', 'info');
  };

  return (
    <CSection id="contact" title={t('home.contact.title')} subtitle={t('home.contact.subtitle')}>
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit} action="https://formsubmit.co/your-email@example.com" method="POST">
          <div className="form-group">
            <label htmlFor="name">{t('home.contact.name')}</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('home.contact.email')}</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">{t('home.contact.message')}</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>

          <button type="submit" className="wax-seal-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="raven-flying">🕊️ Sending...</span>
            ) : (
              <span>🔒 Seal & Send</span>
            )}
          </button>
        </form>

        <div className="social-links">
          <h4>{t('home.contact.social')}</h4>
          <div className="social-icons">
            <a href="https://github.com/MouadALLAOUI" target="_blank" rel="noopener noreferrer" className="social-icon">
              GitHub
            </a>
            <a href="https://linkedin.com/in/mouad-allaoui" target="_blank" rel="noopener noreferrer" className="social-icon">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              Twitter
            </a>
          </div>
        </div>

        <div className="email-copy">
          <p>{t('home.contact.direct')}</p>
          <button className="email-btn" onClick={handleCopyEmail}>
            📧 mouad.allaoui@example.com
          </button>
        </div>
      </div>
    </CSection>
  );
}

export default ContactSection;