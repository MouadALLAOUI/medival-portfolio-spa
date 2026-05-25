import styles from './ContactSection.module.scss';
import CSection from '../../../templates/Section';

const ContactSection = () => {
  return (
    <CSection id="contact" title="Send a Raven" className="section" classname="section">
      <div className="section-content">
        <div className={`parchment visible ${styles['contact-section']}`} id="contact-parch">
          <h2 className="section-title">Send a Raven</h2>
          <p className="section-intro">Seek my counsel or propose an alliance through these mystical channels:</p>

          <div className={styles['contact-container']}>
            <div className={styles['contact-form']}>
              <form id="contact-form" action="https://formsubmit.co/moadallaoui1@gmail.com" method="POST">
                <div className={styles['form-group']}>
                  <label htmlFor="name">Your Name</label>
                  <input name="name" type="text" id="name" placeholder="Enter your noble name" required />
                </div>

                <div className={styles['form-group']}>
                  <label htmlFor="email">Pigeon Address</label>
                  <input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="What realm shall the raven call home? (your email)"
                    required
                  />
                </div>

                <div className={styles['form-group']}>
                  <label htmlFor="message">Your Message</label>
                  <textarea name="message" id="message" rows="5" placeholder="Inscribe your message here..." required></textarea>
                </div>

                <input type="hidden" name="_next" value="https://mouadallaoui.netlify.app/thankyou.html" />

                <button type="submit" className={styles['wax-seal']} id="seal-btn"></button>
              </form>
            </div>

            <div className={styles['contact-info']}>
              <h3>Guild Connections</h3>
              <p>Seek me in these digital realms where I share my arcane knowledge:</p>

              <div className={styles['social-links']}>
                <a href="https://github.com/MouadALLAOUI" className={styles['social-link']} title="GitHub" target="_blank" rel="noreferrer">
                  ⌖
                </a>
                <a
                  href="https://www.linkedin.com/in/mouad-allaoui-975514223/"
                  className={styles['social-link']}
                  title="LinkedIn"
                  target="_blank"
                  rel="noreferrer"
                >
                  🕴
                </a>
              </div>

              <h3 style={{ marginTop: '30px' }}>Raven Delivery</h3>
              <p>For urgent matters, dispatch a raven to:</p>
              <div className={styles['email-copy']}>
                <span
                  className={styles['email-code']}
                  data-target="code-100101110"
                  id="code-100101110"
                >
                  moadallaoui1@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSection>
  );
};

export default ContactSection;
