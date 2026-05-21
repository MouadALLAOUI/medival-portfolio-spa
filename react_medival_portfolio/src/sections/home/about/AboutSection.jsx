import timelines from '../../../data/timelines';

const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="section-content">
        <div className="parchment visible" id="about-parch">
          <h2 className="section-title">Coding Lore</h2>
          <p className="section-intro">
            The chronicles of my journey through the realms of technology:
            <code>click card bellow for more details</code>
          </p>

          <div className="timeline">
            {timelines.map((item) => (
              <div key={item.id} className="timeline-item">
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3 className="timeline-title">{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="philosophy">
            <p>
              "I believe that code is a form of magic that transforms ideas into reality. Like the wizards of old who
              carefully crafted their spells, I approach each project with precision, creativity, and a commitment to
              excellence. My mission is to create digital experiences that feel intuitive and enchanting, solving real
              problems while delighting users with thoughtful interactions and beautiful design."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
