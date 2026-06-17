import { useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { crmefMspObser } from '../../../../data/crmef.data';
import { useSettings } from '../../../../lib/useSettings';
import styles from '../CrmefMspPage.module.scss';

const LEVEL_ORDER = ['1AC', '2AC', '3AC'];

function getRating(obs) {
  if (!obs.rubric) return null;
  const { pedagogy, management, engagement } = obs.rubric;
  return (pedagogy + management + engagement) / 3;
}

function getLevelGroup(level) {
  return LEVEL_ORDER.indexOf(level) >= 0 ? level : 'OTHER';
}

export default function MspObservationsTab() {
  const { t } = useSettings();

  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [groupBy, setGroupBy] = useState('level');
  const [sortBy, setSortBy] = useState('date');
  const [selectedObs, setSelectedObs] = useState(null);

  const levels = useMemo(() => {
    const set = new Set(crmefMspObser.map(o => o.session.level));
    return ['ALL', ...LEVEL_ORDER.filter(l => set.has(l))];
  }, []);

  const filtered = useMemo(() => {
    let items = [...crmefMspObser];

    if (levelFilter !== 'ALL') {
      items = items.filter(o => o.session.level === levelFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      items = items.filter(o =>
        o.session.sessionTitle.toLowerCase().includes(q) ||
        o.session.courseTitle.toLowerCase().includes(q) ||
        o.courseInstructor.name.toLowerCase().includes(q)
      );
    }

    items.sort((a, b) => {
      if (sortBy === 'rating') return (getRating(b) || 0) - (getRating(a) || 0);
      const [dA, dB] = [a.session.date, b.session.date].map(d => {
        const [day, month, year] = d.split('-').map(Number);
        return new Date(year, month - 1, day);
      });
      return dA - dB;
    });

    return items;
  }, [levelFilter, searchQuery, sortBy]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(o => {
      let g;
      if (groupBy === 'instructor') {
        g = o.courseInstructor.name;
      } else {
        g = getLevelGroup(o.session.level);
      }
      if (!map[g]) map[g] = [];
      map[g].push(o);
    });
    if (groupBy === 'level') {
      return Object.fromEntries(
        Object.entries(map).sort(([a], [b]) => LEVEL_ORDER.indexOf(a) - LEVEL_ORDER.indexOf(b))
      );
    }
    return map;
  }, [filtered, groupBy]);

  const handleCloseDrawer = useCallback(() => setSelectedObs(null), []);

  return (
    <div className={styles.obsContainer}>
      <div className={styles.obsControls}>
        <input
          type="text"
          className={styles.obsSearch}
          placeholder={t('CRMEF.msp.observations.search') || 'Search session, course, instructor...'}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className={styles.obsFilterGroup}>
          <select className={styles.obsSelect} value={levelFilter} onChange={e => setLevelFilter(e.target.value)}>
            {levels.map(l => (
              <option key={l} value={l}>{l === 'ALL' ? (t('CRMEF.msp.observations.allLevels') || 'All Levels') : l}</option>
            ))}
          </select>
          <select className={styles.obsSelect} value={groupBy} onChange={e => setGroupBy(e.target.value)}>
            <option value="level">{t('CRMEF.msp.observations.groupLevel') || 'Group by Level'}</option>
            <option value="instructor">{t('CRMEF.msp.observations.groupInstructor') || 'Group by Instructor'}</option>
          </select>
          <select className={styles.obsSelect} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="date">{t('CRMEF.msp.observations.sortDate') || 'Date'}</option>
            <option value="rating">{t('CRMEF.msp.observations.sortRating') || 'Rating'}</option>
          </select>
        </div>
      </div>

      {Object.entries(grouped).map(([groupKey, sessions]) => (
        <div key={groupKey} className={styles.obsGroup}>
          <h4 className={styles.obsGroupTitle}>{groupKey}</h4>
          <div className={styles.obsRows}>
            {sessions.map(obs => (
              <button
                key={obs.id}
                type="button"
                className={styles.obsRow}
                onClick={() => setSelectedObs(obs)}
              >
                <span className={styles.obsRowNum}>#{String(obs.session.number).padStart(2, '0')}</span>
                <span className={styles.obsRowDate}>{obs.session.date}</span>
                <span className={styles.obsRowLevel}>{obs.session.level}</span>
                <span className={styles.obsRowTitle}>{obs.session.sessionTitle}</span>
                <span className={styles.obsRowInstructor}>{obs.courseInstructor.name}</span>
                <span className={styles.obsRowRating}>
                  <span className={styles.ratingBadge}>{getRating(obs) !== null ? getRating(obs).toFixed(1) : '—'}</span>
                </span>
                <span className={styles.obsRowAction}>{t('CRMEF.msp.observations.view') || 'View'}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className={styles.obsEmpty}>{t('CRMEF.msp.observations.noResults') || 'No sessions match your filters.'}</p>
      )}

      {selectedObs && (
        <ObsDetailDrawer obs={selectedObs} onClose={handleCloseDrawer} t={t} />
      )}
    </div>
  );
}

function ObsDetailDrawer({ obs, onClose, t }) {
  const { session, institution, courseInstructor, isSelfInstructor, observation,
    positivePoints, pointsToImprove, note, selfObservation, rubric } = obs;

  return createPortal(
    <div className={styles.drawerOverlay} onClick={onClose}>
      <div className={styles.drawerPanel} onClick={e => e.stopPropagation()}>
        <div className={styles.drawerHeader}>
          <h3 className={styles.drawerTitle}>{session.sessionTitle}</h3>
          <button type="button" className={styles.drawerClose} onClick={onClose}>×</button>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.drawerMetaRow}>
            <span>{session.courseTitle}</span>
            <span>{session.date} · {session.level} · {session.group}</span>
          </div>

          <div className={styles.drawerContextGrid}>
            <div className={styles.drawerContextItem}>
              <span className={styles.drawerContextLabel}>{t('CRMEF.msp.observations.instructor') || 'Instructor'}</span>
              <span>{courseInstructor.name}</span>
            </div>
            <div className={styles.drawerContextItem}>
              <span className={styles.drawerContextLabel}>{t('CRMEF.msp.observations.duration') || 'Duration'}</span>
              <span>{session.duration}</span>
            </div>
            <div className={styles.drawerContextItem}>
              <span className={styles.drawerContextLabel}>{t('CRMEF.msp.observations.students') || 'Students'}</span>
              <span>{session.studentCount}</span>
            </div>
            <div className={styles.drawerContextItem}>
              <span className={styles.drawerContextLabel}>{t('CRMEF.msp.observations.institution') || 'Institution'}</span>
              <span>{institution}</span>
            </div>
          </div>

          <div className={styles.drawerSection}>
            <h4 className={styles.drawerSectionTitle}>{t('CRMEF.msp.observations.observation') || 'Observation'}</h4>
            <p className={styles.drawerText}>{observation}</p>
          </div>

          <div className={styles.drawerAnalysis}>
            <div className={styles.drawerAnalysisBlock}>
              <h4 className={styles.drawerAnalysisTitle} style={{ color: '#27ae60' }}>
                {t('CRMEF.msp.observations.positivePoints') || 'Positive Points'}
              </h4>
              <p className={styles.drawerText}>{positivePoints}</p>
            </div>
            <div className={styles.drawerAnalysisBlock}>
              <h4 className={styles.drawerAnalysisTitle} style={{ color: '#e74c3c' }}>
                {t('CRMEF.msp.observations.pointsToImprove') || 'Points to Improve'}
              </h4>
              <p className={styles.drawerText}>{pointsToImprove}</p>
            </div>
            <div className={styles.drawerAnalysisBlock}>
              <h4 className={styles.drawerAnalysisTitle} style={{ color: '#9b59b6' }}>
                {t('CRMEF.msp.observations.note') || 'Note'}
              </h4>
              <p className={styles.drawerText}>{note}</p>
            </div>
          </div>

          {rubric && (
            <div className={styles.drawerSection}>
              <h4 className={styles.drawerSectionTitle}>{t('CRMEF.msp.observations.rubric') || 'Rubric'}</h4>
              <div className={styles.drawerRubric}>
                {Object.entries(rubric).map(([key, val]) => (
                  <div key={key} className={styles.drawerRubricItem}>
                    <span className={styles.drawerRubricLabel}>{key}</span>
                    <div className={styles.drawerRubricBar}>
                      <div className={styles.drawerRubricFill} style={{ width: `${(val / 10) * 100}%` }} />
                    </div>
                    <span className={styles.drawerRubricVal}>{val}/10</span>
                  </div>
                ))}
                <div className={styles.drawerRubricItem}>
                  <span className={styles.drawerRubricLabel}>{t('CRMEF.msp.observations.overall') || 'Overall'}</span>
                  <div className={styles.drawerRubricBar}>
                    <div className={styles.drawerRubricFill} style={{ width: `${(getRating(obs) / 10) * 100}%`, background: 'var(--accent)' }} />
                  </div>
                  <span className={styles.drawerRubricVal}>{getRating(obs).toFixed(1)}/10</span>
                </div>
              </div>
            </div>
          )}

          {isSelfInstructor && selfObservation && (
            <div className={styles.drawerSection}>
              <h4 className={styles.drawerSectionTitle}>
                {t('CRMEF.msp.observations.selfReflection') || 'Self Reflection'}
              </h4>
              <p className={styles.drawerText}>{selfObservation}</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
