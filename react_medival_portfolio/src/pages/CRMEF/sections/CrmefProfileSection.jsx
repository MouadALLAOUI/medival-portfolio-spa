import CSection from '../../../templates/Section';
import { crmefProfile } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefProfileSection.module.scss';

const CrmefProfileSection = () => {
  const { t } = useSettings();

  const resolvedBio = t(crmefProfile.bio);

  return (
    <CSection variant="crmef" id="profile" className={styles.section}>
      <div className={styles.profileCard}>
        <div className={styles.profilePortrait}>
          {crmefProfile.isAvatarEmoji ? (
            <span className={styles.avatarEmoji}>{crmefProfile.avatar}</span>
          ) : (
            <img
              src={crmefProfile.avatar}
              alt={crmefProfile.name}
              className={styles.avatarImg}
              loading="lazy"
              onError={(e) => {
                if (crmefProfile.avatar.startsWith('..')) {
                  e.target.src = crmefProfile.avatar.replace('..', '');
                }
              }}
            />
          )}
        </div>
        <div className={styles.profileContent}>
          <h1 className={styles.profileName}>{crmefProfile.name}</h1>
          <p className={styles.profileBio}>{resolvedBio}</p>
        </div>
      </div>
    </CSection>
  );
};

export default CrmefProfileSection;
