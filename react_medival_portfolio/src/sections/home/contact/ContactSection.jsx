import { useState } from 'react';
import { useSettings } from '../../../lib/useSettings';
import { useAlerts } from '../../../lib/useAlerts';
import { useAchievements } from '../../../lib/useAchievements';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Globe,
  Youtube,
  Instagram,
  Facebook,
  ExternalLink,
} from 'lucide-react';
import styles from './ContactSection.module.scss';
import CSection from '../../../templates/Section';

const SOCIAL_ICON_MAP = {
  github:    Github,
  linkedin:  Linkedin,
  twitter:   Twitter,
  email:     Mail,
  website:   Globe,
  youtube:   Youtube,
  instagram: Instagram,
  facebook:  Facebook,
  default:   ExternalLink,
};

const ContactSection = () => {
  const { t } = useSettings();
  const { showAlert } = useAlerts();
  const { unlockAchievement } = useAchievements();

  // Load email dynamically from environment variables (set VITE_CONTACT_EMAIL in Netlify dashboard)
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "";

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const handleSubmit = (e) => {
    // 1. Spam bot honeypot detection
    if (honeypot.trim()) {
      e.preventDefault();
      console.warn("Spam-bot submission blocked via noble_title honeypot field.");
      return;
    }

    // 2. Client-side length validations
    if (name.trim().length < 2) {
      e.preventDefault();
      showAlert(t('HOME.CONTACT.errorNameShort') || "Noble name must contain at least 2 characters!", "warning", 3500);
      return;
    }

    if (message.trim().length < 10) {
      e.preventDefault();
      showAlert(t('HOME.CONTACT.errorMessageShort') || "Your message scroll is too short! Write at least 10 characters.", "warning", 3500);
      return;
    }

    unlockAchievement('sent_contact');
  };

  return (
    <CSection id="contact" title={t('HOME.CONTACT.title')} subtitle={t('HOME.CONTACT.desc')} classname="contact">
      <div className={styles['contact-container']}>
        <div className={styles['contact-form']}>
          <form
            id="contact-form"
            action={`https://formsubmit.co/${contactEmail}`}
            method="POST"
            onSubmit={handleSubmit}
          >
            {/* 🍯 Visually hidden bot-field honeypot protection */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <input
                type="text"
                name="noble_title"
                tabIndex="-1"
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="name">{t('HOME.CONTACT.nameLabel')}</label>
              <input
                name="name"
                type="text"
                id="name"
                placeholder={t('HOME.CONTACT.namePlaceholder')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="email">{t('HOME.CONTACT.emailLabel')}</label>
              <input
                name="email"
                type="email"
                id="email"
                placeholder={t('HOME.CONTACT.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles['form-group']}>
              <label htmlFor="message">{t('HOME.CONTACT.messageLabel')}</label>
              <textarea
                name="message"
                id="message"
                rows="5"
                placeholder={t('HOME.CONTACT.messagePlaceholder')}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <input type="hidden" name="_next" value="https://mouadallaoui.netlify.app/thankyou" />

            <button
              type="submit"
              className={styles['wax-seal']}
              id="seal-btn"
              title={t('HOME.CONTACT.submit')}
              aria-label={t('HOME.CONTACT.submit') || "Seal and Send Message"}
            ></button>
          </form>
        </div>

        <div className={styles['contact-info']}>
          <h3>{t('HOME.CONTACT.connectionsTitle')}</h3>
          <p>{t('HOME.CONTACT.connectionsDesc')}</p>

          <div className={styles['social-links']}>
            {[
              { type: 'github', url: 'https://github.com/MouadALLAOUI', label: 'GitHub' },
              { type: 'linkedin', url: 'https://www.linkedin.com/in/mouad-allaoui-975514223/', label: 'LinkedIn' }
            ].map(social => {
              const Icon = SOCIAL_ICON_MAP[social.type] || SOCIAL_ICON_MAP.default;
              return (
                <a
                  key={social.type}
                  href={social.url}
                  target={social.type === 'email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className={styles['social-link']}
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon size={24} strokeWidth={1.5} />
                  <span style={{ display: 'none' }}>{social.label}</span>
                </a>
              );
            })}
          </div>

          <h3 style={{ marginTop: '30px' }}>{t('HOME.CONTACT.deliveryTitle')}</h3>
          <p>{t('HOME.CONTACT.deliveryDesc')}</p>
          <div className={styles['email-copy']}>
            <span
              className={styles['email-code']}
              data-target="code-100101110"
              id="code-100101110"
            >
              {contactEmail}
            </span>
          </div>
        </div>
      </div>
    </CSection>
  );
};

export default ContactSection;
