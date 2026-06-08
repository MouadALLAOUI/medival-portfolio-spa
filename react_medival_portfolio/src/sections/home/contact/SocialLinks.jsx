import { Github, Linkedin, Mail, Globe, ExternalLink } from 'lucide-react';
import styles from './ContactSection.module.scss';

const SOCIAL_ICON_MAP = { github: Github, linkedin: Linkedin, email: Mail, website: Globe, default: ExternalLink };

const SOCIALS = [
  { type: 'github', url: 'https://github.com/MouadALLAOUI', label: 'GitHub' },
  { type: 'linkedin', url: 'https://www.linkedin.com/in/mouad-allaoui-975514223/', label: 'LinkedIn' },
];

export default function SocialLinks() {
  return (
    <div className={styles['social-links']}>
      {SOCIALS.map(social => {
        const Icon = SOCIAL_ICON_MAP[social.type] || SOCIAL_ICON_MAP.default;
        return (
          <a key={social.type} href={social.url} target="_blank" rel="noopener noreferrer" className={styles['social-link']} aria-label={social.label} title={social.label}>
            <Icon size={24} strokeWidth={1.5} />
            <span style={{ display: 'none' }}>{social.label}</span>
          </a>
        );
      })}
    </div>
  );
}
