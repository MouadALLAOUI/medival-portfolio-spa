import { useSettings } from '../../../../lib/useSettings';
import { PEOPLE } from '../../../../data/people.data';
import { crmefMspInfo } from '../../../../data/crmef.data';
import styles from '../CrmefMspPage.module.scss';

export default function MspPresentationTab() {
  const { t } = useSettings();

  const peopleParams = {};
  PEOPLE.forEach(p => {
    if (crmefMspInfo.peopleRefs.includes(p.id)) {
      peopleParams[`people_${p.id}`] = t(`PEOPLE.${p.id}`);
    }
  });

  const { tableData, infrastructure } = crmefMspInfo;

  return (
    <>
      {crmefMspInfo.image?.path ? (
        <img className={styles.lyceeImage} src={crmefMspInfo.image.path} alt={t(crmefMspInfo.imageLabel)} />
      ) : (
        <div className={styles.lyceePlaceholder}>{t(crmefMspInfo.imageLabel)}</div>
      )}

      <div className={styles.stageInfoGrid}>
        <div className={styles.stageInfoCard}>
          <span className={styles.stageInfoLabel}>{t('CRMEF.msp.presentation.period') || 'Period'}</span>
          <span className={styles.stageInfoValue}>{t(crmefMspInfo.stageDates)}</span>
        </div>
        <div className={styles.stageInfoCard}>
          <span className={styles.stageInfoLabel}>{t('CRMEF.msp.presentation.totalSessions') || 'Total Sessions'}</span>
          <span className={styles.stageInfoValue}>{crmefMspInfo.totalSessions}</span>
        </div>
        <div className={styles.stageInfoCard}>
          <span className={styles.stageInfoLabel}>{t('CRMEF.msp.presentation.selfTaught') || 'Self-Taught Sessions'}</span>
          <span className={styles.stageInfoValue}>{crmefMspInfo.selfTaughtSessions}</span>
        </div>
      </div>

      <div className={styles.textBlock}>
        <h3 className={styles.tabSubTitle}>{t('CRMEF.msp.presentation.remerciement')}</h3>
        <div className={styles.insetBlock}>
          <p className={styles.tabText}>{t(crmefMspInfo.remerciement, peopleParams)}</p>
        </div>
      </div>

      <div className={styles.textBlock}>
        <h3 className={styles.tabSubTitle}>{t('CRMEF.msp.presentation.introduction')}</h3>
        <div className={styles.insetBlock}>
          <p className={styles.tabText}>{t(crmefMspInfo.introduction)}</p>
        </div>
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
                <td>{t(tableData.establishment)}</td>
                <td>{t(tableData.creationYear)}</td>
                <td>{t(tableData.roomsCount)}</td>
                <td>{t(tableData.directorName)}</td>
                <td>{t(tableData.mentorName)}</td>
                <td>{t(tableData.studentsCount)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.textBlock}>
        <h3 className={styles.tabSubTitle}>{t('CRMEF.msp.presentation.infrastructure') || 'Infrastructure & Stats'}</h3>
        <div className={styles.tableWrapper}>
          <table className={styles.medievalTable}>
            <thead>
              <tr>
                <th>{t('CRMEF.msp.table.academie') || 'Academy'}</th>
                <th>{t('CRMEF.msp.table.province') || 'Province'}</th>
                <th>{t('CRMEF.msp.table.codeEtablissement') || 'School Code'}</th>
                <th>{t('CRMEF.msp.table.milieu') || 'Area'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t(crmefMspInfo.academie)}</td>
                <td>{t(crmefMspInfo.province)}</td>
                <td>{crmefMspInfo.codeEtablissement}</td>
                <td>{t(crmefMspInfo.milieu)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.infraGrid}>
          <div className={styles.infraItem}>
            <span className={styles.infraIcon}>👨‍🏫</span>
            <div className={styles.infraContent}>
              <span className={styles.infraLabel}>{t('CRMEF.msp.table.teachers') || 'Teachers'}</span>
              <span className={styles.infraValue}>{t(infrastructure.teacherCount)}</span>
            </div>
          </div>
          <div className={styles.infraItem}>
            <span className={styles.infraIcon}>👔</span>
            <div className={styles.infraContent}>
              <span className={styles.infraLabel}>{t('CRMEF.msp.table.admin') || 'Admin Staff'}</span>
              <span className={styles.infraValue}>{t(infrastructure.adminCount)}</span>
            </div>
          </div>
          <div className={styles.infraItem}>
            <span className={styles.infraIcon}>🖥️</span>
            <div className={styles.infraContent}>
              <span className={styles.infraLabel}>{t('CRMEF.msp.table.computerRoom') || 'Computer Lab'}</span>
              <span className={styles.infraValue}>{infrastructure.computerRoomPcs} PCs</span>
            </div>
          </div>
          <div className={styles.infraItem}>
            <span className={styles.infraIcon}>📚</span>
            <div className={styles.infraContent}>
              <span className={styles.infraLabel}>{t('CRMEF.msp.table.resourceRoom') || 'Resource Room'}</span>
              <span className={styles.infraValue}>{infrastructure.hasResourceRoom ? '✓' : '✗'}</span>
            </div>
          </div>
          <div className={styles.infraItem}>
            <span className={styles.infraIcon}>📖</span>
            <div className={styles.infraContent}>
              <span className={styles.infraLabel}>{t('CRMEF.msp.table.library') || 'Library'}</span>
              <span className={styles.infraValue}>{infrastructure.hasLibrary ? '✓' : '✗'}</span>
            </div>
          </div>
          <div className={styles.infraItem}>
            <span className={styles.infraIcon}>⚽</span>
            <div className={styles.infraContent}>
              <span className={styles.infraLabel}>{t('CRMEF.msp.table.sports') || 'Sports Facilities'}</span>
              <span className={styles.infraValue}>{infrastructure.hasSportsFacilities ? '✓' : '✗'}</span>
            </div>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.medievalTable}>
            <thead>
              <tr>
                <th>{t('CRMEF.msp.table.condition') || 'Condition'}</th>
                <th>{t('CRMEF.msp.table.successRate') || 'Success Rate'}</th>
                <th>{t('CRMEF.msp.table.redoublementRate') || 'Redoublement Rate'}</th>
                <th>{t('CRMEF.msp.table.abandonRate') || 'Abandon Rate'}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t(infrastructure.condition)}</td>
                <td>{t(infrastructure.successRate)}</td>
                <td>{t(infrastructure.redoublementRate)}</td>
                <td>{t(infrastructure.abandonRate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.textBlock}>
        <h3 className={styles.tabSubTitle}>{t('CRMEF.msp.presentation.supervisorEval') || "Supervisor's Evaluation"}</h3>
        <div className={styles.supervisorBlock}>
          <p className={styles.tabText} style={{ direction: 'rtl', fontFamily: 'serif' }}>
            {t(crmefMspInfo.supervisorEvaluation)}
          </p>
        </div>
      </div>
    </>
  );
}