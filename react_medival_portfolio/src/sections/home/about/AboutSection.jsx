import { useState } from 'react';
import CSection from "../../../templates/Section";
import timelines from '../../../data/timelines';
import { useSettings } from '../../../lib/useSettings';

function AboutSection() {
  const { t } = useSettings();
  const [activeId, setActiveId] = useState(null);

  const handleTimelineClick = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <CSection id="about" title={t('home.about.title')} subtitle={t('home.about.subtitle')}>
      <div className="timeline-container">
        <div className="timeline">
          {timelines.map((item) => (
            <div
              key={item.id}
              className={`timeline-item ${activeId === item.id ? 'active' : ''}`}
              onClick={() => handleTimelineClick(item.id)}
            >
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.desc}</p>
                {activeId === item.id && (
                  <div className="timeline-detail">
                    <p>{item.detailledDesc}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="philosophy-quote">
          <blockquote>
            "Code is poetry written in logic. Each function a verse, each module a stanza, each application an epic tale."
          </blockquote>
        </div>
      </div>
    </CSection>
  );
}

export default AboutSection;