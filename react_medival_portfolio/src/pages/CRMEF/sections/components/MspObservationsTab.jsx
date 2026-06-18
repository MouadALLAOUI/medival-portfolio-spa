import { useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { crmefMspObser } from '../../../../data/crmef.data';
import { PEOPLE } from '../../../../data/people.data';
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
  const { t, language } = useSettings();

  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [peopleFilter, setPeopleFilter] = useState('ALL');
  const [groupBy, setGroupBy] = useState('level');
  const [sortBy, setSortBy] = useState('date');
  const [selectedObs, setSelectedObs] = useState(null);

  const peopleParams = useMemo(() => {
    const params = {};
    const ids = new Set();
    crmefMspObser.forEach(o => {
      const m = o.courseInstructor?.name?.match(/{{people_([^}]+)}}/);
      if (m) ids.add(m[1]);
    });
    ids.forEach(id => {
      if (PEOPLE[id]) params[`people_${id}`] = language === 'ar' ? PEOPLE[id].name_ar : PEOPLE[id].name;
    });
    return params;
  }, [language]);

  const levels = useMemo(() => {
    const set = new Set(crmefMspObser.map(o => o.session.level));
    return ['ALL', ...LEVEL_ORDER.filter(l => set.has(l))];
  }, []);

  const instructorOptions = useMemo(() => {
    const map = {};
    crmefMspObser.forEach(o => {
      const m = o.courseInstructor?.name?.match(/{{people_([^}]+)}}/);
      if (m && PEOPLE[m[1]]) map[m[1]] = language === 'ar' ? PEOPLE[m[1]].name_ar : PEOPLE[m[1]].name;
    });
    return Object.entries(map)
      .sort(([, a], [, b]) => a.localeCompare(b))
      .map(([id, name]) => ({ id, name }));
  }, [language]);

  const handleGroupByChange = useCallback(e => {
    setGroupBy(e.target.value);
    setLevelFilter('ALL');
    setPeopleFilter('ALL');
  }, []);

  const filtered = useMemo(() => {
    let items = [...crmefMspObser];

    if (groupBy === 'instructor') {
      if (peopleFilter !== 'ALL') {
        items = items.filter(o => {
          const m = o.courseInstructor?.name?.match(/{{people_([^}]+)}}/);
          return m && m[1] === peopleFilter;
        });
      }
    } else if (levelFilter !== 'ALL') {
      items = items.filter(o => o.session.level === levelFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      items = items.filter(o =>
        t(o.session.sessionTitle).toLowerCase().includes(q) ||
        t(o.session.courseTitle).toLowerCase().includes(q) ||
        t(o.courseInstructor.name, peopleParams).toLowerCase().includes(q)
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
  }, [levelFilter, peopleFilter, groupBy, searchQuery, sortBy, t, peopleParams]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach(o => {
      let g;
      if (groupBy === 'instructor') {
        g = t(o.courseInstructor.name, peopleParams);
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
  }, [filtered, groupBy, t, peopleParams]);

  const handleCloseDrawer = useCallback(() => setSelectedObs(null), []);

  return (
    <div className={styles.obsContainer}>
      <div className={styles.obsControls}>
        <input
          type="text"
          className={styles.obsSearch}
          placeholder={t('CRMEF.msp.observations.search')}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className={styles.obsFilterGroup}>
          <select
            className={styles.obsSelect}
            value={groupBy === 'instructor' ? peopleFilter : levelFilter}
            onChange={e => {
              if (groupBy === 'instructor') setPeopleFilter(e.target.value);
              else setLevelFilter(e.target.value);
            }}
          >
            {groupBy === 'instructor' ? (
              <>
                <option value="ALL">{t('CRMEF.msp.observations.allInstructors')}</option>
                {instructorOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </>
            ) : (
              levels.map(l => (
                <option key={l} value={l}>{l === 'ALL' ? t('CRMEF.msp.observations.allLevels') : l}</option>
              ))
            )}
          </select>
          <select className={styles.obsSelect} value={groupBy} onChange={handleGroupByChange}>
            <option value="level">{t('CRMEF.msp.observations.groupLevel')}</option>
            <option value="instructor">{t('CRMEF.msp.observations.groupInstructor')}</option>
          </select>
          <select className={styles.obsSelect} value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="date">{t('CRMEF.msp.observations.sortDate')}</option>
            <option value="rating">{t('CRMEF.msp.observations.sortRating')}</option>
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
                <span className={styles.obsRowTitle}>{t(obs.session.sessionTitle)}</span>
                <span className={styles.obsRowInstructor}>{t(obs.courseInstructor.name, peopleParams)}</span>
                <span className={styles.obsRowRating}>
                  <span className={styles.ratingBadge}>{getRating(obs) !== null ? getRating(obs).toFixed(1) : '—'}</span>
                </span>
                <span className={styles.obsRowAction}>{t('CRMEF.msp.observations.view')}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className={styles.obsEmpty}>{t('CRMEF.msp.observations.noResults')}</p>
      )}

      {selectedObs && (
        <ObsDetailDrawer obs={selectedObs} onClose={handleCloseDrawer} t={t} peopleParams={peopleParams} />
      )}
    </div>
  );
}

function ObsDetailDrawer({ obs, onClose, t, peopleParams }) {
  const { session, institution, courseInstructor, isSelfInstructor, observation,
    positivePoints, pointsToImprove, note, selfObservation, rubric } = obs;

  return createPortal(
    <div className={styles.drawerOverlay} onClick={onClose}>
      <div className={styles.drawerPanel} onClick={e => e.stopPropagation()}>
        <div className={styles.drawerHeader}>
          <h3 className={styles.drawerTitle}>{t(session.sessionTitle)}</h3>
          <button type="button" className={styles.drawerClose} onClick={onClose}>×</button>
        </div>

        <div className={styles.drawerBody}>
          <div className={styles.drawerMetaRow}>
            <span>{t(session.courseTitle)}</span>
            <span>{session.date} · {session.level} · {session.group}</span>
          </div>

          <div className={styles.drawerContextGrid}>
            <div className={styles.drawerContextItem}>
              <span className={styles.drawerContextLabel}>{t('CRMEF.msp.observations.instructor')}</span>
              <span>{t(courseInstructor.name, peopleParams)}</span>
            </div>
            <div className={styles.drawerContextItem}>
              <span className={styles.drawerContextLabel}>{t('CRMEF.msp.observations.duration')}</span>
              <span>{session.duration}</span>
            </div>
            <div className={styles.drawerContextItem}>
              <span className={styles.drawerContextLabel}>{t('CRMEF.msp.observations.students')}</span>
              <span>{session.studentCount}</span>
            </div>
            <div className={styles.drawerContextItem}>
              <span className={styles.drawerContextLabel}>{t('CRMEF.msp.observations.institution')}</span>
              <span>{t(institution)}</span>
            </div>
          </div>

          <div className={styles.drawerSection}>
            <h4 className={styles.drawerSectionTitle}>{t('CRMEF.msp.observations.observation')}</h4>
            <p className={styles.drawerText}>{t(observation)}</p>
          </div>

          <div className={styles.drawerAnalysis}>
            <div className={styles.drawerAnalysisBlock}>
              <h4 className={styles.drawerAnalysisTitle} style={{ color: '#27ae60' }}>
                {t('CRMEF.msp.observations.positivePoints')}
              </h4>
              <p className={styles.drawerText}>{t(positivePoints)}</p>
            </div>
            <div className={styles.drawerAnalysisBlock}>
              <h4 className={styles.drawerAnalysisTitle} style={{ color: '#e74c3c' }}>
                {t('CRMEF.msp.observations.pointsToImprove')}
              </h4>
              <p className={styles.drawerText}>{t(pointsToImprove)}</p>
            </div>
            <div className={styles.drawerAnalysisBlock}>
              <h4 className={styles.drawerAnalysisTitle} style={{ color: '#9b59b6' }}>
                {t('CRMEF.msp.observations.note')}
              </h4>
              <p className={styles.drawerText}>{t(note)}</p>
            </div>
          </div>

          {rubric && (
            <div className={styles.drawerSection}>
              <h4 className={styles.drawerSectionTitle}>{t('CRMEF.msp.observations.rubric')}</h4>
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
                  <span className={styles.drawerRubricLabel}>{t('CRMEF.msp.observations.overall')}</span>
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
                {t('CRMEF.msp.observations.selfReflection')}
              </h4>
              <p className={styles.drawerText}>{t(selfObservation)}</p>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
