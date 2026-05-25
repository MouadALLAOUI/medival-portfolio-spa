import { useMemo, useState } from 'react';
import skills from '../../../data/skills';
import { markdownToHtml } from '../../../lib/utils/markdownToHtml';
import { useImageViewer } from '../../../lib/useImageViewer';
import styles from './skillsSection.module.scss';
import CSection from '../../../templates/Section';

const SKILLS_PER_PAGE = 6;

const SkillsSection = () => {
  const { openImage } = useImageViewer();
  const [currentGroup, setCurrentGroup] = useState('general');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSkillId, setActiveSkillId] = useState(null);

  const filteredSkills = useMemo(
    () => skills.filter((skill) => (skill.group || 'general') === currentGroup),
    [currentGroup],
  );

  const pageCount = Math.max(1, Math.ceil(filteredSkills.length / SKILLS_PER_PAGE));

  const paginatedSkills = useMemo(() => {
    const startIndex = (currentPage - 1) * SKILLS_PER_PAGE;
    return filteredSkills.slice(startIndex, startIndex + SKILLS_PER_PAGE);
  }, [filteredSkills, currentPage]);

  const activeSkill = useMemo(
    () => filteredSkills.find((skill) => skill.id === activeSkillId) || null,
    [filteredSkills, activeSkillId],
  );

  const onGroupChange = (group) => {
    setCurrentGroup(group);
    setCurrentPage(1);
    setActiveSkillId(null);
  };

  const onSkillClick = (skill) => {
    if (activeSkillId === skill.id) {
      setActiveSkillId(null);
      return;
    }
    setActiveSkillId(skill.id);
    const skillIndex = filteredSkills.findIndex((s) => s.id === skill.id);
    if (skillIndex >= 0) {
      setCurrentPage(Math.floor(skillIndex / SKILLS_PER_PAGE) + 1);
    }
  };

  return (
    <CSection id="skills" title="Arcane Codex of Skills" className="section" classname="section">
      <div className="section-content">
        <div className="parchment visible" id="skills-parchment">
          <h2 className="section-title">Arcane Codex of Skills</h2>
          <p className="section-intro">
            Through years of arcane study and mystical practice, I have mastered these powerful arts:
            <code>click card bellow for more details</code>
          </p>

          <div className={styles['skills-template']}>
            {/* Toggle buttons — ABOVE cards */}
            <div className={styles['toggle-row']} aria-label="Skills category filter">
              {['general', 'specialized'].map((group) => (
                <button
                  key={group}
                  className={`${styles['toggle-btn']} ${currentGroup === group ? styles['active'] : ''}`}
                  type="button"
                  onClick={() => onGroupChange(group)}
                >
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </button>
              ))}
            </div>

            {/* Grid + pagination */}
            <div className={`${styles['skills-grid-container']} ${activeSkill ? styles['active'] : ''}`}>
              <div className={styles['skills-grid']}>
                {paginatedSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`${styles['skill-card']} ${activeSkillId === skill.id ? styles['active'] : ''}`}
                    data-skill={`skill-${skill.id}`}
                    onClick={() => onSkillClick(skill)}
                  >
                    <div className={styles['skill-name-container']}>
                      <span className={styles['skill-icon']}>{skill.icon}</span>
                      <h3 className={styles['skill-name']}>{skill.name}</h3>
                    </div>
                    <p className={styles['skill-description']} dangerouslySetInnerHTML={{ __html: skill.description }} />
                    <div className={styles['proficiency']}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx} className={`${styles['star']} ${idx < skill.level ? '' : styles['empty']}`}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles['pagination']}>
                <nav className={styles['pagination-container']}>
                  {currentPage > 1 && (
                    <a href="#" className={styles['pagination-container-link']} onClick={(e) => { e.preventDefault(); setCurrentPage((p) => p - 1); }}>{'<'}</a>
                  )}
                  {Array.from({ length: pageCount }).map((_, idx) => {
                    const page = idx + 1;
                    return (
                      <a
                        key={page}
                        href="#"
                        className={`${styles['pagination-container-link']} ${page === currentPage ? styles['active'] : ''}`}
                        onClick={(e) => { e.preventDefault(); setCurrentPage(page); }}
                      >
                        {page}
                      </a>
                    );
                  })}
                  {currentPage < pageCount && (
                    <a href="#" className={styles['pagination-container-link']} onClick={(e) => { e.preventDefault(); setCurrentPage((p) => p + 1); }}>{'>'}</a>
                  )}
                </nav>
              </div>
            </div>

            {/* Overview panel */}
            <div className={`${styles['skills-overview']} ${activeSkill ? styles['active'] : ''}`}>
              {activeSkill && (
                <div className={styles['skill-overview']}>
                  <div className={styles['thumbnail']}>
                    <img src={activeSkill.overview.thumbnail} alt={`${activeSkill.name} thumbnail`} />
                  </div>

                  <div className={styles['skill-name-container-overview']}>
                    <div className={styles['skill-name-icon']}>
                      <p className={styles['skill-icon-overview']}>{activeSkill.icon}</p>
                      <h2 className={styles['skill-name-overview']}>{activeSkill.name}</h2>
                    </div>
                    <div className={styles['proficiency']}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx} className={`${styles['star']} ${idx < activeSkill.level ? '' : styles['empty']}`}>
                          {idx < activeSkill.level ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: activeSkill.overview.intro || 'not defined' }} />
                  </div>

                  {activeSkill.overview.desc && (
                    <>
                      <h3>Detailled desciprion</h3>
                      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: markdownToHtml(activeSkill.overview.desc) }} />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CSection>
  );
};

export default SkillsSection;
