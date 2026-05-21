import { useMemo, useState } from 'react';
import skills from '../../../data/skills';
import { markdownToHtml } from '../../../lib/utils/markdownToHtml';
import { useImageViewer } from '../../../lib/useImageViewer';

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
    const endIndex = startIndex + SKILLS_PER_PAGE;
    return filteredSkills.slice(startIndex, endIndex);
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
    <section id="skills" className="section">
      <div className="section-content">
        <div className="parchment visible" id="skills-parchment">
          <h2 className="section-title">Arcane Codex of Skills</h2>
          <p className="section-intro">
            Through years of arcane study and mystical practice, I have mastered these powerful arts:
            <code>click card bellow for more details</code>
          </p>

          <div className="skills-template">
            <div className="skills-filter" aria-label="Skills category filter">
              <button
                className={`skills-filter-btn ${currentGroup === 'general' ? 'active' : ''}`}
                type="button"
                data-skill-group="general"
                onClick={() => onGroupChange('general')}
              >
                General
              </button>
              <button
                className={`skills-filter-btn ${currentGroup === 'specialized' ? 'active' : ''}`}
                type="button"
                data-skill-group="specialized"
                onClick={() => onGroupChange('specialized')}
              >
                Specialized
              </button>
            </div>

            <div className={`skills-grid-container ${activeSkill ? 'active' : ''}`}>
              <div className="skills-grid">
                {paginatedSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`skill-card skill-${skill.id} ${activeSkillId === skill.id ? 'active' : ''}`}
                    data-skill={`skill-${skill.id}`}
                    onClick={() => onSkillClick(skill)}
                  >
                    <div className="skill-name-container">
                      <span className="skill-icon">{skill.icon}</span>
                      <h3 className="skill-name">{skill.name}</h3>
                    </div>
                    <p className="skill-description" dangerouslySetInnerHTML={{ __html: skill.description }} />
                    <div className="proficiency">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx} className={`star ${idx < skill.level ? '' : 'empty'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pagination">
                <nav className="pagination-container">
                  {currentPage > 1 && (
                    <a href="#" className="pagination-container-link" onClick={(e) => { e.preventDefault(); setCurrentPage((p) => p - 1); }}>
                      {'<'}
                    </a>
                  )}

                  {Array.from({ length: pageCount }).map((_, idx) => {
                    const page = idx + 1;
                    return (
                      <a
                        key={page}
                        href="#"
                        className={`pagination-container-link ${page === currentPage ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                      >
                        {page}
                      </a>
                    );
                  })}

                  {currentPage < pageCount && (
                    <a href="#" className="pagination-container-link" onClick={(e) => { e.preventDefault(); setCurrentPage((p) => p + 1); }}>
                      {'>'}
                    </a>
                  )}
                </nav>
              </div>
            </div>

            <div className={`skills-overview ${activeSkill ? 'active' : ''}`}>
              {activeSkill && (
                <div className="skill-overview active">
                  <div className="thumbnail">
                    <img src={activeSkill.overview.thumbnail} alt={`${activeSkill.name} thumbnail`} />
                  </div>

                  <div className="skill-name-container">
                    <div className="skill-name-icon">
                      <p className="skill-icon">{activeSkill.icon}</p>
                      <h2 className="skill-name">{activeSkill.name}</h2>
                    </div>
                    <div className="proficiency">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx} className={`star ${idx < activeSkill.level ? '' : 'empty'}`}>
                          {idx < activeSkill.level ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <p className="skill-intro" dangerouslySetInnerHTML={{ __html: activeSkill.overview.intro || 'not defined' }} />
                  </div>

                  {activeSkill.overview.desc && (
                    <>
                      <h3>Detailled desciprion</h3>
                      <div
                        className="markdown-content"
                        dangerouslySetInnerHTML={{ __html: markdownToHtml(activeSkill.overview.desc) }}
                      />
                    </>
                  )}

                  {activeSkill.overview.features?.length > 0 && (
                    <>
                      <h3>Features</h3>
                      <ul>
                        {activeSkill.overview.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  {activeSkill.overview.imgs?.length > 0 && (
                    <>
                      <h3>Gallery</h3>
                      <div className="imgs-gal">
                        {activeSkill.overview.imgs.map((img, index) => (
                          <div
                            key={`${img.src}-${index}`}
                            className={`gal-item ${img.isBlur ? 'blured' : ''}`}
                            data-key={`item-${index}`}
                            onClick={() => openImage(img.src, img.alt || activeSkill.name)}
                          >
                            <img
                              src={img.src}
                              alt={img.alt || activeSkill.name}
                              className={img.isMobile ? 'mobile-img' : ''}
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {activeSkill.overview.storyBehindIt && (
                    <>
                      <h3>🛤️ Story Behind It</h3>
                      <div
                        className="markdown-content"
                        dangerouslySetInnerHTML={{ __html: markdownToHtml(activeSkill.overview.storyBehindIt) }}
                      />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
