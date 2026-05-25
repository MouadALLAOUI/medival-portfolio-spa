import styles from "./section.module.scss";

/**
 * CSection — universal section wrapper
 *
 * @param {string} id - section anchor id
 * @param {string} title - section heading (optional)
 * @param {string} subtitle - section subheading (optional)
 * @param {string} classname - additional class (compatibility for home page)
 * @param {string} className - additional class
 * @param {'default' | 'crmef'} variant - layout variant (default: 'default')
 * @param {ReactNode} children
 */
const CSection = ({
  id = "",
  title = "",
  subtitle = "",
  children,
  classname = "",
  className = "",
  variant = 'default',
  ...rest
}) => {
  const lowercaseId = id.toLowerCase();

  if (variant === 'crmef') {
    return (
      <section
        id={lowercaseId}
        className={[
          styles.section,
          styles.crmef,
          className || '',
        ].filter(Boolean).join(' ')}
        {...rest}
      >
        {title && (
          <h2 className={styles.sectionTitle}>{title}</h2>
        )}
        <div className={styles.sectionContent}>
          {children}
        </div>
      </section>
    );
  }

  // Default variant (identical to original home landing page)
  return (
    <section
      id={lowercaseId}
      className={`
        ${styles.section}
        ${styles.medieval_section} ${lowercaseId}-section ${className}
      `}
      {...rest}
    >
      <div className={`${styles.parchment_container} ${styles[classname] || classname}`}>
        {title && <h2 className={styles.section_title}>{title}</h2>}
        {subtitle && <h2 className="section-subtitle">{subtitle}</h2>}

        {children}
      </div>
    </section>
  );
};

export default CSection;