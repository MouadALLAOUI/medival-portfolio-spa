import styles from './CrmefSemesterPage.module.scss';

export default function FileGroupSection({ icon, label, files, renderFileCard }) {
  if (!files || files.length === 0) return null;

  return (
    <div className={styles.fileGroupSection}>
      <h4 className={styles.fileGroupHeading}>
        <span className={styles.fileGroupIcon}>{icon}</span> {label}
      </h4>
      <div className={styles.fileGroupList}>
        {files.map((fileItem, index) => (
          <div key={index} className="w-full max-w-full overflow-hidden truncate block">
            {renderFileCard(fileItem, index, label)}
          </div>
        ))}
      </div>
    </div>
  );
}
