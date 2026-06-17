import { useState, useEffect } from 'react';
import CSection from '../../../templates/Section';
import { crmefMspInfo } from '../../../data/crmef.data';
import { loadSingleAsset } from '../../../lib/utils/assetUtils';
import { useSettings } from '../../../lib/useSettings';
import { useAchievements } from '../../../lib/useAchievements';
import FileLink from '../../../components/FileLink/FileLink';
import MspPresentationTab from './components/MspPresentationTab';
import MspObservationsTab from './components/MspObservationsTab';
import MspDocumentsTab from './components/MspDocumentsTab';
import styles from './CrmefMspPage.module.scss';

const CrmefMspPage = () => {
  const [activeTab, setActiveTab] = useState('presentation');
  const { t } = useSettings();
  const { unlockAchievement } = useAchievements();
  const rapportAsset = loadSingleAsset('crmef-rapport-msp');

  useEffect(() => {
    unlockAchievement('msp_explorer');
  }, [unlockAchievement]);

  const MSP_TABS = [
    { id: 'presentation', label: t('CRMEF.msp.tabs.presentation') },
    { id: 'observations', label: t('CRMEF.msp.tabs.observations') },
    { id: 'documents', label: t('CRMEF.msp.tabs.documents') },
  ];

  return (
    <CSection
      variant="crmef"
      id="msp"
      title={t('CRMEF.msp.title')}
      className={styles.section}
    >
      <div className={styles.mspHeader}>
        <div className={styles.headerItem}>
          <span className={styles.headerLabel}>{t('CRMEF.msp.header.lyceeName')}</span>
          <span className={styles.headerValue}>{t(crmefMspInfo.lyceeName)}</span>
        </div>
        <div className={styles.headerItem}>
          <span className={styles.headerLabel}>{t('CRMEF.msp.header.profName')}</span>
          <span className={styles.headerValue}>{t(crmefMspInfo.profName)}</span>
        </div>
      </div>

      <div className={styles.downloadArea}>
        <FileLink
          filePath={rapportAsset.path}
          label={t('CRMEF.msp.downloadRapport') || 'Download Rapport'}
          t={t}
        />
      </div>

      <div className={styles.tabsNav}>
        {MSP_TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'presentation' && <MspPresentationTab />}
        {activeTab === 'observations' && <MspObservationsTab />}
        {activeTab === 'documents' && <MspDocumentsTab />}
      </div>
    </CSection>
  );
};

export default CrmefMspPage;
