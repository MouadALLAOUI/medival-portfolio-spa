const ContactSection = () => {
  return (
    <section id="contact" className="section">
      <div className="section-content">
        <div className="parchment contact-section visible" id="contact-parch">
          <h2>Send a Raven</h2>
          <p className="section-intro">Seek my counsel or propose an alliance through these mystical channels:</p>

          <div className="contact-container">
            <div className="contact-form">
              <form id="contact-form" action="https://formsubmit.co/moadallaoui1@gmail.com" method="POST">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input name="name" type="text" id="name" placeholder="Enter your noble name" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Pigeon Address</label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="What realm shall the raven call home? (your email)"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea name="message" id="message" rows="5" placeholder="Inscribe your message here..." required></textarea>
                </div>

                <input type="hidden" name="_next" value="https://mouadallaoui.netlify.app/thankyou.html" />

                <button type="submit" className="wax-seal" id="seal-btn"></button>
              </form>
            </div>

            <div className="contact-info">
              <h3>Guild Connections</h3>
              <p>Seek me in these digital realms where I share my arcane knowledge:</p>

              <div className="social-links">
                <a href="https://github.com/MouadALLAOUI" className="social-link" title="GitHub" target="_blank" rel="noreferrer">
                  ⌖
                </a>
                <a
                  href="https://www.linkedin.com/in/mouad-allaoui-975514223/"
                  className="social-link"
                  title="LinkedIn"
                  target="_blank"
                  rel="noreferrer"
                >
                  🕴
                </a>
              </div>

              <h3 style={{ marginTop: '30px' }}>Raven Delivery</h3>
              <p>For urgent matters, dispatch a raven to:</p>
              <p
                className="inline-code"
                data-target="code-100101110"
                id="code-100101110"
                style={{ fontFamily: 'Cinzel, serif', marginTop: '10px', userSelect: 'text' }}
              >
                moadallaoui1@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
