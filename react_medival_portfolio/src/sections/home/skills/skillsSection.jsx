import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import skills from '../../../data/skills';
import { markdownToHtml } from '../../../lib/utils/markdownToHtml';
import { useTheme } from '../../../lib/contexts/ThemeProvider';
import { getMarkdownThemeClass } from '../../../lib/markdown/markdownThemes';
import { useImageViewer } from '../../../lib/useImageViewer';
import { useSettings } from '../../../lib/useSettings';
import FilterBar from '../../../components/sections/skills/FilterBar';
import SkillCard from '../../../components/sections/skills/SkillCard';
import styles from './skillsSection.module.scss';
import CSection from '../../../templates/Section';

const SKILLS_PER_PAGE = 8;

const SkillsSection = () => {
  const { openImage } = useImageViewer();
  const { t } = useSettings();
  const { theme } = useTheme();
  const mdThemeClass = getMarkdownThemeClass(theme);
  const [currentGroup, setCurrentGroup] = useState('general');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState(null);

  const filteredSkills = useMemo(
    () => skills.filter((skill) => (skill.group || 'general') === currentGroup),
    [currentGroup],
  );

  const pageCount = Math.max(1, Math.ceil(filteredSkills.length / SKILLS_PER_PAGE));

  const paginatedSkills = useMemo(() => {
    const startIndex = (currentPage - 1) * SKILLS_PER_PAGE;
    return filteredSkills.slice(startIndex, startIndex + SKILLS_PER_PAGE);
  }, [filteredSkills, currentPage]);

  const onGroupChange = (group) => {
    setCurrentGroup(group);
    setCurrentPage(1);
  };

  const onSkillClick = (skill) => {
    setSelectedSkill(skill);
  };

  const skillFilters = [
    { key: 'general', label: t('HOME.SKILLS.general') },
    { key: 'specialized', label: t('HOME.SKILLS.specialized') },
  ];

  return (
    <CSection
      id="skills"
      title={t('HOME.SKILLS.title')}
      subtitle={<>{t('HOME.SKILLS.intro')}<code>{t('HOME.SKILLS.introNote')}</code></>}
      classname="skills"
    >
      <div className="section-content">
        <div className={styles['skills-template']}>
          {/* Toggle buttons — ABOVE cards */}
          <FilterBar
            filters={skillFilters}
            activeFilter={currentGroup}
            onFilterChange={onGroupChange}
          />

          {/* Grid + pagination */}
          <div className={styles['skills-grid-container']}>
            <div className={styles['skills-grid']}>
              {paginatedSkills.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onClick={onSkillClick}
                  t={t}
                />
              ))}
            </div>

            <div className={styles['pagination']}>
              <nav className={styles['pagination-container']}>
                {currentPage > 1 && (
                  <button
                    type="button"
                    className={styles['pagination-container-link']}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    {'<'}
                  </button>
                )}
                {Array.from({ length: pageCount }).map((_, idx) => {
                  const page = idx + 1;
                  return (
                    <button
                      key={page}
                      type="button"
                      className={`${styles['pagination-container-link']} ${page === currentPage ? styles['active'] : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
                {currentPage < pageCount && (
                  <button
                    type="button"
                    className={styles['pagination-container-link']}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    {'>'}
                  </button>
                )}
              </nav>
            </div>
          </div>

          {/* Static Overview / Radar Chart panel below the grid */}
          <div className={styles['skills-overview-static']}>
            <SkillRadarChart t={t} />
          </div>
        </div>
      </div>

      {/* Elegant Centered Grimoire Modal (rendered via React Portal) */}
      {selectedSkill && createPortal(
        <div className={styles['modal-overlay']} onClick={() => setSelectedSkill(null)}>
          <div
            className={styles['modal-grimoire']}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles['modal-close-btn']}
              onClick={() => setSelectedSkill(null)}
              aria-label="Close Codex"
            >
              ×
            </button>

            <div className={styles['modal-content']}>
              <div className={styles['modal-header']}>
                <div className={styles['modal-icon-title']}>
                  <span className={styles['modal-icon']}>{selectedSkill.icon}</span>
                  <h2 className={styles['modal-title']}>{selectedSkill.name}</h2>
                </div>

                <div className={styles['modal-proficiency']} title={t('HOME.SKILLS.level', { level: selectedSkill.level })}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span key={idx} className={`${styles['star']} ${idx < selectedSkill.level ? '' : styles['empty']}`}>★</span>
                  ))}
                  <div className={styles['modal-tooltip']}>
                    <span className={styles['modal-tooltip-title']}>
                      {t(`HOME.SKILLS.levelName.${selectedSkill.level}`) || `Level ${selectedSkill.level}`}
                    </span>
                    <p className={styles['modal-tooltip-desc']}>
                      {t(`HOME.SKILLS.levelDesc.${selectedSkill.level}`)}
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles['modal-body']}>
                {selectedSkill.overview?.thumbnail && (
                  <div className={styles['modal-thumbnail']}>
                    <img src={selectedSkill.overview.thumbnail} alt={`${selectedSkill.name} thumbnail`} loading="lazy" />
                  </div>
                )}

                {selectedSkill.overview?.intro && (
                  <p className={styles['modal-intro']} dangerouslySetInnerHTML={{ __html: selectedSkill.overview.intro }} />
                )}

                {selectedSkill.overview?.desc && (
                  <div className={styles['modal-details']}>
                    <h3>{t('HOME.SKILLS.detailsTitle')}</h3>
                    <div className={`markdown-content ${mdThemeClass}`} dangerouslySetInnerHTML={{ __html: markdownToHtml(selectedSkill.overview.desc) }} />
                  </div>
                )}
              </div>

              {/* <div className={styles['modal-footer']}>
                <button 
                  className={styles['modal-action-btn']} 
                  onClick={() => setSelectedSkill(null)}
                >
                  {t('COMMON.settings.closeBtn') || 'Close Codex'}
                </button>
              </div> */}
            </div>
          </div>
        </div>,
        document.body
      )}
    </CSection>
  );
};

/* 📊 Custom theme-aware responsive SVG Skills Radar Chart component */
const SkillRadarChart = ({ t }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const cx = 150;
  const cy = 150;
  const r = 90;
  const levels = [1, 2, 3, 4, 5];

  const chartData = [
    { name: t('HOME.SKILLS.general_frontend') || 'Frontend', value: 5 },
    { name: t('HOME.SKILLS.general_backend') || 'Backend', value: 4 },
    { name: t('HOME.SKILLS.general_ai') || 'AI Conjuring', value: 4 },
    { name: t('HOME.SKILLS.general_solving') || 'Problem Solving', value: 4 },
    { name: t('HOME.SKILLS.general_mobile') || 'Mobile Apps', value: 3 },
    { name: t('HOME.SKILLS.general_code') || 'Code Wards', value: 3 }
  ];

  const getCoordinates = (index, value) => {
    const angle = (index * 2 * Math.PI / 6) - Math.PI / 2;
    const factor = value / 5;
    const x = cx + r * factor * Math.cos(angle);
    const y = cy + r * factor * Math.sin(angle);
    return { x, y };
  };

  const gridPolygons = levels.map((lvl) => {
    const points = chartData.map((_, idx) => {
      const { x, y } = getCoordinates(idx, lvl);
      return `${x},${y}`;
    }).join(' ');
    return points;
  });

  const dataPoints = chartData.map((d, idx) => {
    const { x, y } = getCoordinates(idx, d.value);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className={styles['radar-chart-container']}>
      <h3 className={styles['radar-title']}>{t('HOME.SKILLS.radarTitle') || '📊 Arcane Capabilities Chart'}</h3>

      <div className={styles['radar-wrapper']}>
        <svg viewBox="0 0 300 300" className={styles['radar-svg']}>
          <defs>
            <filter id="radar-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Concentric Grid lines */}
          {gridPolygons.map((points, idx) => (
            <polygon
              key={idx}
              points={points}
              className={styles['radar-grid-poly']}
              fill="none"
              stroke="var(--color-gold-light, rgba(212, 175, 55, 0.25))"
              strokeWidth="1"
              strokeDasharray={idx === 4 ? 'none' : '3,3'}
            />
          ))}

          {/* Web Axes */}
          {chartData.map((_, idx) => {
            const outer = getCoordinates(idx, 5);
            return (
              <line
                key={idx}
                x1={cx}
                y1={cy}
                x2={outer.x}
                y2={outer.y}
                stroke="var(--color-gold-light, rgba(212, 175, 55, 0.25))"
                strokeWidth="1"
              />
            );
          })}

          {/* Level indicators */}
          {levels.map((lvl) => {
            const { x, y } = getCoordinates(0, lvl);
            return (
              <text
                key={lvl}
                x={x + 3}
                y={y + 10}
                className={styles['radar-lvl-text']}
                fill="rgba(139, 69, 19, 0.6)"
                fontSize="8"
              >
                {lvl}
              </text>
            );
          })}

          {/* Active Data Area */}
          <polygon
            points={dataPoints}
            className={styles['radar-data-poly']}
            fill="rgba(212, 175, 55, 0.25)"
            stroke="var(--color-gold, #d4af37)"
            strokeWidth="2.5"
            filter="url(#radar-glow)"
          />

          {/* Data Vertices Points */}
          {chartData.map((d, idx) => {
            const { x, y } = getCoordinates(idx, d.value);
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r="4"
                className={styles['radar-vertex']}
                fill="var(--color-rust, #8b5a2b)"
                stroke="var(--color-gold, #d4af37)"
                strokeWidth="1.5"
                onMouseEnter={() => setHoveredPoint({ name: d.name, value: d.value, x, y })}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            );
          })}

          {/* Label Texts */}
          {chartData.map((d, idx) => {
            const labelPos = getCoordinates(idx, 5.8);
            let textAnchor = 'middle';
            if (idx === 1 || idx === 2) textAnchor = 'start';
            if (idx === 4 || idx === 5) textAnchor = 'end';

            return (
              <text
                key={idx}
                x={labelPos.x}
                y={labelPos.y + 4}
                className={styles['radar-label']}
                textAnchor={textAnchor}
                fill="var(--color-dark-brown, #3a2921)"
                fontSize="9.5"
                fontWeight="bold"
              >
                {d.name}
              </text>
            );
          })}
        </svg>

        {hoveredPoint && (
          <div
            className={styles['radar-tooltip']}
            style={{
              left: `${(hoveredPoint.x / 300) * 100}%`,
              top: `${(hoveredPoint.y / 300) * 100}%`
            }}
          >
            <span className={styles['radar-tooltip-title']}>{hoveredPoint.name}</span>
            <span className={styles['radar-tooltip-value']}>Level {hoveredPoint.value} / 5</span>
          </div>
        )}
      </div>
      <p className={styles['radar-footer']}>{t('HOME.SKILLS.radarFooter') || 'Hover over skills cards on the left to reveal specialized spell logs'}</p>
    </div>
  );
};

export default SkillsSection;
