import CrmefHeader from '../components/CrmefHeader/CrmefHeader';
import Footer from '../components/footer';
import ImageViewer from '../components/ImageViewer';
import styles from './CrmefLayout.module.scss';

const CrmefLayout = ({ children }) => (
  <div className={styles.layout}>
    <CrmefHeader />
    <main className={styles.main}>
      {children}
    </main>
    <Footer />
    <ImageViewer />
  </div>
);

export default CrmefLayout;
