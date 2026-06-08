import { useState, useRef, useCallback } from 'react';
import { useSettings } from '../../../lib/useSettings';
import { useAlerts } from '../../../lib/useAlerts';
import { useAchievements } from '../../../lib/useAchievements';
import { useSound } from '../../../lib/hooks/useSound';
import SocialLinks from './SocialLinks';
import styles from './ContactSection.module.scss';
import CSection from '../../../templates/Section';

const RavenSVG = () => (
  <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 35 C5 25, 15 10, 30 15 C35 8, 50 5, 55 12 L75 8 C72 14, 65 18, 60 16 C58 20, 50 25, 45 22 C40 28, 25 35, 15 38 Z" fill="#1a1a2e" stroke="#2d2d44" strokeWidth="1"/>
    <circle cx="35" cy="20" r="2.5" fill="#d4af37"/>
    <path d="M28 24 L20 26 L28 25" fill="#2d2d44" stroke="#1a1a2e" strokeWidth="0.5"/>
    <path d="M55 12 C58 8, 65 5, 72 3 C68 8, 62 10, 58 12" fill="#1a1a2e"/>
    <path d="M45 22 C48 28, 55 35, 65 40 C60 38, 50 32, 42 25" fill="#1a1a2e" stroke="#2d2d44" strokeWidth="0.5"/>
    <rect x="32" y="30" width="18" height="12" rx="2" fill="#f5e6ca" stroke="#8b6914" strokeWidth="1" transform="rotate(-10 41 36)"/>
    <line x1="35" y1="34" x2="47" y2="32" stroke="#8b6914" strokeWidth="0.5" transform="rotate(-10 41 36)"/>
    <line x1="35" y1="37" x2="47" y2="35" stroke="#8b6914" strokeWidth="0.5" transform="rotate(-10 41 36)"/>
  </svg>
);

const ContactSection = () => {
  const { t } = useSettings();
  const { showAlert } = useAlerts();
  const { unlockAchievement } = useAchievements();
  const formRef = useRef(null);
  const { play: playSound } = useSound();
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "";

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [ravenVisible, setRavenVisible] = useState(false);

  const handleSubmit = useCallback((e) => {
    if (honeypot.trim()) { e.preventDefault(); console.warn("Spam-bot blocked."); return; }
    if (name.trim().length < 2) { e.preventDefault(); showAlert(t('HOME.CONTACT.errorNameShort') || "Noble name must contain at least 2 characters!", "warning", 3500); return; }
    if (message.trim().length < 10) { e.preventDefault(); showAlert(t('HOME.CONTACT.errorMessageShort') || "Your message scroll is too short!", "warning", 3500); return; }
    e.preventDefault(); unlockAchievement('sent_contact'); setRavenVisible(true);
    setTimeout(() => { setRavenVisible(false); formRef.current?.submit(); }, 2800);
  }, [honeypot, name, message, showAlert, t, unlockAchievement]);

  return (
    <CSection id="contact" title={t('HOME.CONTACT.title')} subtitle={t('HOME.CONTACT.desc')} classname="contact">
      <div className={styles['contact-container']}>
        <div className={styles['contact-form']}>
          <form ref={formRef} id="contact-form" action={`https://formsubmit.co/${contactEmail}`} method="POST" onSubmit={handleSubmit}>
            <div style={{ display: 'none' }} aria-hidden="true">
              <input type="text" name="noble_title" tabIndex="-1" autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="name">{t('HOME.CONTACT.nameLabel')}</label>
              <input name="name" type="text" id="name" placeholder={t('HOME.CONTACT.namePlaceholder')} value={name} onChange={(e) => setName(e.target.value)} onKeyDown={() => playSound('quill')} required />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="email">{t('HOME.CONTACT.emailLabel')}</label>
              <input name="email" type="email" id="email" placeholder={t('HOME.CONTACT.emailPlaceholder')} value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={() => playSound('quill')} required />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="message">{t('HOME.CONTACT.messageLabel')}</label>
              <textarea name="message" id="message" rows="5" placeholder={t('HOME.CONTACT.messagePlaceholder')} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={() => playSound('quill')} required />
            </div>
            <input type="hidden" name="_next" value="https://mouadallaoui.netlify.app/thankyou" />
            <button type="submit" className={styles['wax-seal']} id="seal-btn" title={t('HOME.CONTACT.submit')} aria-label={t('HOME.CONTACT.submit') || "Seal and Send Message"} />
          </form>
          {ravenVisible && <div className={styles['raven']} aria-hidden="true"><RavenSVG /></div>}
        </div>

        <div className={styles['contact-info']}>
          <h3>{t('HOME.CONTACT.connectionsTitle')}</h3>
          <p>{t('HOME.CONTACT.connectionsDesc')}</p>
          <SocialLinks />
          <h3 style={{ marginTop: '30px' }}>{t('HOME.CONTACT.deliveryTitle')}</h3>
          <p>{t('HOME.CONTACT.deliveryDesc')}</p>
          <div className={styles['email-copy']}>
            <span className={styles['email-code']} data-target="code-100101110" id="code-100101110">{contactEmail}</span>
          </div>
        </div>
      </div>
    </CSection>
  );
};

export default ContactSection;
