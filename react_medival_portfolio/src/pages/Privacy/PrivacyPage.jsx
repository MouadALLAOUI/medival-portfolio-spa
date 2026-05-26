import styles from './PrivacyPage.module.scss';
import CSection from '../../templates/Section';

const PrivacyPage = () => {
  return (
    <div className={styles['privacy-page']}>
      <CSection title="Privacy Scroll" subtitle="How we handle thy data" id="privacy">
        <div className={styles['content']}>
          <h2>I. Data Collection</h2>
          <p>We do not collect any personal data unless thou voluntarily provideth it through the contact form.</p>

          <h2>II. Cookies</h2>
          <p>We use local storage and cookies only to remember thy preferences (theme, language, achievements).</p>

          <h2>III. Third Parties</h2>
          <p>We do not share thy data with any third parties, forsooth!</p>

          <h2>IV. Thy Rights</h2>
          <p>Thou hast the right to clear thy local storage at any time to remove thy saved data.</p>
        </div>
      </CSection>
    </div>
  );
};

export default PrivacyPage;
