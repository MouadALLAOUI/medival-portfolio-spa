import { useState } from 'react';
import { useSettings } from '../../../lib/useSettings';
import styles from './skillsSection.module.scss';

export default function SkillRadarChart() {
  const { t } = useSettings();
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const cx = 150, cy = 150, r = 90;
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
    return { x: cx + r * factor * Math.cos(angle), y: cy + r * factor * Math.sin(angle) };
  };

  const gridPolygons = levels.map((lvl) =>
    chartData.map((_, idx) => { const { x, y } = getCoordinates(idx, lvl); return `${x},${y}`; }).join(' ')
  );

  const dataPoints = chartData.map((d, idx) => { const { x, y } = getCoordinates(idx, d.value); return `${x},${y}`; }).join(' ');

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
          {gridPolygons.map((points, idx) => (
            <polygon key={idx} points={points} className={styles['radar-grid-poly']} fill="none" stroke="var(--color-gold-light, rgba(212, 175, 55, 0.25))" strokeWidth="1" strokeDasharray={idx === 4 ? 'none' : '3,3'} />
          ))}
          {chartData.map((_, idx) => {
            const outer = getCoordinates(idx, 5);
            return <line key={idx} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke="var(--color-gold-light, rgba(212, 175, 55, 0.25))" strokeWidth="1" />;
          })}
          {levels.map((lvl) => {
            const { x, y } = getCoordinates(0, lvl);
            return <text key={lvl} x={x + 3} y={y + 10} className={styles['radar-lvl-text']} fill="rgba(139, 69, 19, 0.6)" fontSize="8">{lvl}</text>;
          })}
          <polygon points={dataPoints} className={styles['radar-data-poly']} fill="rgba(212, 175, 55, 0.25)" stroke="var(--color-gold, #d4af37)" strokeWidth="2.5" filter="url(#radar-glow)" />
          {chartData.map((d, idx) => {
            const { x, y } = getCoordinates(idx, d.value);
            return <circle key={idx} cx={x} cy={y} r="4" className={styles['radar-vertex']} fill="var(--color-rust, #8b5a2b)" stroke="var(--color-gold, #d4af37)" strokeWidth="1.5" onMouseEnter={() => setHoveredPoint({ name: d.name, value: d.value, x, y })} onMouseLeave={() => setHoveredPoint(null)} />;
          })}
          {chartData.map((d, idx) => {
            const labelPos = getCoordinates(idx, 5.8);
            let textAnchor = 'middle';
            if (idx === 1 || idx === 2) textAnchor = 'start';
            if (idx === 4 || idx === 5) textAnchor = 'end';
            return <text key={idx} x={labelPos.x} y={labelPos.y + 4} className={styles['radar-label']} textAnchor={textAnchor} fill="var(--color-dark-brown, #3a2921)" fontSize="9.5" fontWeight="bold">{d.name}</text>;
          })}
        </svg>
        {hoveredPoint && (
          <div className={styles['radar-tooltip']} style={{ left: `${(hoveredPoint.x / 300) * 100}%`, top: `${(hoveredPoint.y / 300) * 100}%` }}>
            <span className={styles['radar-tooltip-title']}>{hoveredPoint.name}</span>
            <span className={styles['radar-tooltip-value']}>Level {hoveredPoint.value} / 5</span>
          </div>
        )}
      </div>
      <p className={styles['radar-footer']}>{t('HOME.SKILLS.radarFooter') || 'Hover over skills cards on the left to reveal specialized spell logs'}</p>
    </div>
  );
}
