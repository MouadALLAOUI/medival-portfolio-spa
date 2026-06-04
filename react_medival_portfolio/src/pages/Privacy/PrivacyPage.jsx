import { useSettings } from '../../lib/useSettings';
import CSection from '../../templates/Section';
import styles from './PrivacyPage.module.scss';

const PrivacyPage = () => {
  const { t } = useSettings();

  return (
    <div className={styles['privacy-page']}>
      <CSection
        title={t('COMMON.privacy.title') || 'Privacy Scroll'}
        subtitle={t('COMMON.privacy.subtitle') || 'How we handle thy data'}
        id="privacy"
      >
        <div className={styles['content']}>
          <h2>{t('COMMON.privacy.sections.collection.title')}</h2>
          <p>{t('COMMON.privacy.sections.collection.desc')}</p>

          <h2>{t('COMMON.privacy.sections.cookies.title')}</h2>
          <p>{t('COMMON.privacy.sections.cookies.desc')}</p>

          <h2>{t('COMMON.privacy.sections.thirdParties.title')}</h2>
          <p>{t('COMMON.privacy.sections.thirdParties.desc')}</p>

          <h2>{t('COMMON.privacy.sections.rights.title')}</h2>
          <p>{t('COMMON.privacy.sections.rights.desc')}</p>
        </div>
      </CSection>
    </div>
  );
};

export default PrivacyPage;
