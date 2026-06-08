import { useMemo, useState, useEffect } from 'react';
import skillsMetadata from '../../../data/skills';
import { skills as skillsData } from '../../../data/skills.data';
import { useSettings } from '../../../lib/useSettings';
import { useAchievements } from '../../../lib/useAchievements';
import FilterBar from '../../../components/sections/skills/FilterBar';
import SkillCard from '../../../components/sections/skills/SkillCard';
import SkillRadarChart from './SkillRadarChart';
import SkillDetailModal from './SkillDetailModal';
import styles from './skillsSection.module.scss';
import CSection from '../../../templates/Section';

const skills = skillsMetadata.map(meta => {
  const data = skillsData.find(d => d.id === meta.id);
  return { ...meta, overview: data?.overview || {} };
});

const SKILLS_PER_PAGE = 8;

const SkillsSection = () => {
  const { t } = useSettings();
  const { unlockAchievement } = useAchievements();
  const [currentGroup, setCurrentGroup] = useState('general');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => { unlockAchievement('visited_skills'); }, [unlockAchievement]);

  const filteredSkills = useMemo(() => skills.filter((skill) => (skill.group || 'general') === currentGroup), [currentGroup]);
  const pageCount = Math.max(1, Math.ceil(filteredSkills.length / SKILLS_PER_PAGE));
  const paginatedSkills = useMemo(() => {
    const startIndex = (currentPage - 1) * SKILLS_PER_PAGE;
    return filteredSkills.slice(startIndex, startIndex + SKILLS_PER_PAGE);
  }, [filteredSkills, currentPage]);

  const onGroupChange = (group) => { setCurrentGroup(group); setCurrentPage(1); };

  const skillFilters = [
    { key: 'general', label: t('HOME.SKILLS.general') },
    { key: 'specialized', label: t('HOME.SKILLS.specialized') },
  ];

  return (
    <CSection id="skills" title={t('HOME.SKILLS.title')} subtitle={<>{t('HOME.SKILLS.intro')}<code>{t('HOME.SKILLS.introNote')}</code></>} classname="skills">
      <div className="section-content">
        <div className={styles['skills-template']}>
          <FilterBar filters={skillFilters} activeFilter={currentGroup} onFilterChange={onGroupChange} />
          <div className={styles['skills-grid-container']}>
            <div className={styles['skills-grid']}>
              {paginatedSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} onClick={setSelectedSkill} t={t} />
              ))}
            </div>
            <div className={styles['pagination']}>
              <nav className={styles['pagination-container']}>
                {currentPage > 1 && (
                  <button type="button" className={styles['pagination-container-link']} onClick={() => setCurrentPage((p) => p - 1)}>{'<'}</button>
                )}
                {Array.from({ length: pageCount }).map((_, idx) => {
                  const page = idx + 1;
                  return (
                    <button key={page} type="button" className={`${styles['pagination-container-link']} ${page === currentPage ? styles['active'] : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>
                  );
                })}
                {currentPage < pageCount && (
                  <button type="button" className={styles['pagination-container-link']} onClick={() => setCurrentPage((p) => p + 1)}>{'>'}</button>
                )}
              </nav>
            </div>
          </div>
          <div className={styles['skills-overview-static']}>
            <SkillRadarChart />
          </div>
        </div>
      </div>
      <SkillDetailModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
    </CSection>
  );
};

export default SkillsSection;
