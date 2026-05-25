import CSection from '../../../templates/Section';
import { crmefProfile } from '../../../data/crmef.data';
import styles from './CrmefProfileSection.module.scss';

const CrmefProfileSection = () => (
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
        <p className={styles.profileBio}>{crmefProfile.bio}</p>
      </div>
    </div>
  </CSection>
);

export default CrmefProfileSection;
