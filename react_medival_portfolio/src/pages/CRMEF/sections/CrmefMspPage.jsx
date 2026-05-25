import { useState } from 'react';
import CSection from '../../../templates/Section';
import { crmefMspInfo } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefMspPage.module.scss';

const CrmefMspPage = () => {
  const [activeTab, setActiveTab] = useState('presentation');
  const { t } = useSettings();

  const MSP_TABS = [
    { id: 'presentation', label: t('CRMEF.msp.tabs.presentation') },
    { id: 'observations', label: t('CRMEF.msp.tabs.observations') },
    { id: 'documents', label: t('CRMEF.msp.tabs.documents') },
  ];

  const remerciementText = t('CRMEF.msp.presentation.remerciementText');
  const resolvedRemerciement = remerciementText !== 'CRMEF.msp.presentation.remerciementText' ? remerciementText : crmefMspInfo.remerciement;

  const introductionText = t('CRMEF.msp.presentation.introductionText');
  const resolvedIntroduction = introductionText !== 'CRMEF.msp.presentation.introductionText' ? introductionText : crmefMspInfo.introduction;

  const roomsCountVal = t('CRMEF.msp.table.roomsCountValue');
  const resolvedRoomsCount = roomsCountVal !== 'CRMEF.msp.table.roomsCountValue' ? roomsCountVal : crmefMspInfo.tableData.roomsCount;

  return (
    <CSection
      variant="crmef"
      id="msp"
      title={t('CRMEF.msp.title')}
      className={styles.section}
    >
      {/* Header info */}
      <div className={styles.mspHeader}>
        <div>{t('CRMEF.msp.header.lyceeName')} <span className={styles.mspValue}>{crmefMspInfo.lyceeName}</span></div>
        <div>{t('CRMEF.msp.header.profName')} <span className={styles.mspValue}>{crmefMspInfo.profName}</span></div>
      </div>

      {/* Tabs nav */}
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

      {/* Tab content */}
      <div className={styles.tabContent}>

        {activeTab === 'presentation' && (
          <>
            <div className={styles.lyceePlaceholder}>{crmefMspInfo.imageLabel}</div>

            <div className={styles.textBlock}>
              <h3 className={styles.tabSubTitle}>{t('CRMEF.msp.presentation.remerciement')}</h3>
              <p className={styles.tabText}>{resolvedRemerciement}</p>
            </div>

            <div className={styles.textBlock}>
              <h3 className={styles.tabSubTitle}>{t('CRMEF.msp.presentation.introduction')}</h3>
              <p className={styles.tabText}>{resolvedIntroduction}</p>
            </div>

            <div className={styles.textBlock}>
              <h3 className={styles.tabSubTitle}>{t('CRMEF.msp.presentation.generalInfo')}</h3>
              <p className={styles.facebookLink}>
                <a href={crmefMspInfo.fbLink} target="_blank" rel="noopener noreferrer">
                  {t('CRMEF.msp.presentation.fbOfficiel')} {crmefMspInfo.fbLabel}
                </a>
              </p>
              <div className={styles.tableWrapper}>
                <table className={styles.medievalTable}>
                  <thead>
                    <tr>
                      <th>{t('CRMEF.msp.table.establishment')}</th>
                      <th>{t('CRMEF.msp.table.creationYear')}</th>
                      <th>{t('CRMEF.msp.table.roomsCount')}</th>
                      <th>{t('CRMEF.msp.table.directorName')}</th>
                      <th>{t('CRMEF.msp.table.mentorName')}</th>
                      <th>{t('CRMEF.msp.table.studentsCount')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{crmefMspInfo.tableData.establishment}</td>
                      <td>{crmefMspInfo.tableData.creationYear}</td>
                      <td>{resolvedRoomsCount}</td>
                      <td>{crmefMspInfo.tableData.directorName}</td>
                      <td>{crmefMspInfo.tableData.mentorName}</td>
                      <td>{crmefMspInfo.tableData.studentsCount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'observations' && (
          <div className={styles.centerContent}>
            <h3 className={styles.tabSubTitle}>{t('CRMEF.msp.observations.title')}</h3>
            <p className={styles.tabText}>{t('CRMEF.msp.observations.desc')}</p>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className={styles.centerContent}>
            <h3 className={styles.tabSubTitle}>{t('CRMEF.msp.documents.title')}</h3>
            <p className={styles.tabText}>{t('CRMEF.msp.documents.desc')}</p>
          </div>
        )}

      </div>
    </CSection>
  );
};

export default CrmefMspPage;
