import CrmefHeader from '../components/CrmefHeader/CrmefHeader';
import Footer from '../components/footer';
import styles from './CrmefLayout.module.scss';

const CrmefLayout = ({ children }) => (
  <div className={styles.layout}>
    <CrmefHeader />
    <main className={styles.main}>
      {children}
    </main>
    <Footer />
  </div>
);

export default CrmefLayout;
