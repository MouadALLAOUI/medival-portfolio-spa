import { useState } from 'react';
import CSection from '../../../templates/Section';
import { crmefMspInfo } from '../../../data/crmef.data';
import styles from './CrmefMspPage.module.scss';

const MSP_TABS = [
  { id: 'presentation', label: 'Présentation' },
  { id: 'observations', label: 'Observations' },
  { id: 'documents', label: 'Documents' },
];

const CrmefMspPage = () => {
  const [activeTab, setActiveTab] = useState('presentation');

  return (
    <CSection
      variant="crmef"
      id="msp"
      title="Mise en Situation Professionnelle"
      className={styles.section}
    >
      {/* Header info */}
      <div className={styles.mspHeader}>
        <div>Nom du lycée : <span className={styles.mspValue}>{crmefMspInfo.lyceeName}</span></div>
        <div>Nom de professeur : <span className={styles.mspValue}>{crmefMspInfo.profName}</span></div>
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
              <h3 className={styles.tabSubTitle}>Remerciement :</h3>
              <p className={styles.tabText}>{crmefMspInfo.remerciement}</p>
            </div>

            <div className={styles.textBlock}>
              <h3 className={styles.tabSubTitle}>Introduction :</h3>
              <p className={styles.tabText}>{crmefMspInfo.introduction}</p>
            </div>

            <div className={styles.textBlock}>
              <h3 className={styles.tabSubTitle}>Information générale :</h3>
              <p className={styles.facebookLink}>
                <a href={crmefMspInfo.fbLink} target="_blank" rel="noopener noreferrer">
                  🌐 Facebook Officiel : {crmefMspInfo.fbLabel}
                </a>
              </p>
              <div className={styles.tableWrapper}>
                <table className={styles.medievalTable}>
                  <thead>
                    <tr>
                      <th>Etablissement</th>
                      <th>Année de création</th>
                      <th>Nombre de salle</th>
                      <th>Nom de Directeur</th>
                      <th>Nom de professeur encadrant</th>
                      <th>Nombre des élèves</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{crmefMspInfo.tableData.establishment}</td>
                      <td>{crmefMspInfo.tableData.creationYear}</td>
                      <td>{crmefMspInfo.tableData.roomsCount}</td>
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
            <h3 className={styles.tabSubTitle}>🔮 Le Grimoire des Observations</h3>
            <p className={styles.tabText}>
              Les notes et constats effectués lors des séances d'enseignement seront transcrits ici.
            </p>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className={styles.centerContent}>
            <h3 className={styles.tabSubTitle}>🗝️ Les Archives</h3>
            <p className={styles.tabText}>
              Les documents officiels, fiches pédagogiques, et parchemins d'évaluation seront stockés dans cette chambre forte.
            </p>
          </div>
        )}

      </div>
    </CSection>
  );
};

export default CrmefMspPage;
