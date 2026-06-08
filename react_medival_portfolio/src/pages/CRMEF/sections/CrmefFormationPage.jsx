import { useState } from 'react';
import CSection from '../../../templates/Section';
import { crmefFormation } from '../../../data/crmef.data';
import { useSettings } from '../../../lib/useSettings';
import styles from './CrmefFormationPage.module.scss';

const FORMATION_TABS = [
  { id: 'definition', label: 'CRMEF Definition' },
  { id: 'gratitude', label: 'Gratitude' },
  { id: 'map', label: 'Map of CRMEF' },
];

const CrmefFormationPage = () => {
  const [activeTab, setActiveTab] = useState('definition');
  const { t } = useSettings();

  return (
    <CSection
      variant="crmef"
      id="formation"
      title={t('CRMEF.formation.title') || 'About the Formation'}
      className={styles.section}
    >
      <div className={styles.tabsNav}>
        {FORMATION_TABS.map(tab => (
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
        {activeTab === 'definition' && (
          <div className={styles.definitionSection}>
            <div className={styles.textBlock}>
              <h3 className={styles.tabSubTitle}>{crmefFormation.definition.title}</h3>
              {crmefFormation.definition.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className={styles.tabText}>{paragraph}</p>
              ))}
            </div>
            {crmefFormation.definition.image && (
              <div className={styles.imageWrapper}>
                <img
                  src={crmefFormation.definition.image}
                  alt="CRMEF Center"
                  loading="lazy"
                  className={styles.sectionImage}
                />
              </div>
            )}
          </div>
        )}

        {activeTab === 'gratitude' && (
          <div className={styles.gratitudeSection}>
            <div className={styles.textBlock}>
              <h3 className={styles.tabSubTitle}>{crmefFormation.gratitude.title}</h3>
              {crmefFormation.gratitude.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className={styles.tabText}>{paragraph}</p>
              ))}
            </div>

            {crmefFormation.gratitude.acknowledgments?.length > 0 && (
              <div className={styles.acknowledgmentsGrid}>
                {crmefFormation.gratitude.acknowledgments.map((ack, i) => (
                  <div key={i} className={styles.ackCard}>
                    <span className={styles.ackName}>{ack.name}</span>
                    <span className={styles.ackRole}>{ack.role}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'map' && (
          <div className={styles.mapSection}>
            <div className={styles.textBlock}>
              <h3 className={styles.tabSubTitle}>{crmefFormation.map.title}</h3>
              <p className={styles.tabText}>{crmefFormation.map.description}</p>
              <div className={styles.mapAddress}>
                <span className={styles.addressLabel}>📍 Address:</span>
                <span className={styles.addressValue}>{crmefFormation.map.address}</span>
              </div>
            </div>

            {crmefFormation.map.image && (
              <div className={styles.imageWrapper}>
                <img
                  src={crmefFormation.map.image}
                  alt="CRMEF Location"
                  loading="lazy"
                  className={styles.sectionImage}
                />
              </div>
            )}

            {crmefFormation.map.coordinates && (
              <div className={styles.mapEmbed}>
                <iframe
                  title="CRMEF Location"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${crmefFormation.map.coordinates.lng - 0.01}%2C${crmefFormation.map.coordinates.lat - 0.01}%2C${crmefFormation.map.coordinates.lng + 0.01}%2C${crmefFormation.map.coordinates.lat + 0.01}&layer=mapnik&marker=${crmefFormation.map.coordinates.lat}%2C${crmefFormation.map.coordinates.lng}`}
                  className={styles.mapFrame}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}
      </div>
    </CSection>
  );
};

export default CrmefFormationPage;
