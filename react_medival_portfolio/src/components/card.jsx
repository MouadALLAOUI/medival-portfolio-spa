import styles from './card.module.scss';

/**
 * @param {Object} item - The data object (e.g., from projects.js or languages.js)
 * @param {Object} config - Configuration on how to map the data
 * @param {Function} onClick - Optional click handler
 */
function DynamicCard({ item, config = {}, onClick, children }) {
    const {
        baseClass = "skill-card",
        variant = 'parchment',   // 'parchment', 'dark', 'golden'
        hoverEffect = 'lift',    // 'lift', 'glow'
        titleKey = "name",       // Which key holds the title (name, title, caption)
        descKey = "description", // Which key holds the text (desc, intro, meta)
        showStars = false,       // Whether to render proficiency stars
        isLink = false,          // Force treat as <a> tag
        linkKey = "href",        // Which key holds the URL
        showTags = false,        // Whether to render a tech-stack/tags list
        showStatus = false,      // Whether to render a status badge
        imageKey = null,         // Which key holds an image source (src, thumbnail)
        className = ""           // Custom className
    } = config || {};

    const TitleTag = (config && config.titleTag) || "h3";
    const ContainerTag = (isLink || (item && item[linkKey])) ? 'a' : 'div';

    const renderStars = (level) => (
        <div className={styles.proficiency} aria-label={`Proficiency: ${level} out of 5`}>
            {[...Array(5)].map((_, i) => (
                <span key={i} className={`${styles.star} ${i < (level || 0) ? "" : styles.empty}`}>★</span>
            ))}
        </div>
    );

    const mappedBaseClass = baseClass.split(" ").map(cls => styles[cls] || cls).join(" ");
    const variantClass = styles[`variant-${variant}`] || "";
    const hoverClass = styles[`hover-${hoverEffect}`] || "";

    return (
        <ContainerTag
            className={`${mappedBaseClass} ${variantClass} ${hoverClass} ${item && item.isBlur ? styles.blured : ''} ${className}`}
            href={item && item[linkKey]}
            target={item && item[linkKey] ? "_blank" : undefined}
            rel="noopener noreferrer"
            onClick={(e) => onClick && onClick(item, e)}
            style={item && item.style} // Pass custom styles like --bg-img from projects.js
        >
            {children ? children : (
                <>
                    <div className={styles['card-head']}>
                        {item && item.icon && <span className={styles['card-icon']}>{item.icon}</span>}
                        {item && item[titleKey] && <TitleTag className={styles['card-title']}>{item[titleKey]}</TitleTag>}
                    </div>

                    {imageKey && item && item[imageKey] && (
                        <img src={item[imageKey]} alt={item[titleKey]} className={styles['card-media']} loading="lazy" />
                    )}

                    {showStatus && item && (item.status || item.overview?.status) && (
                        <span className={`${styles['status-badge']} ${styles[(item.status || item.overview?.status).toLowerCase()]}`}>
                            {item.status || item.overview?.status}
                        </span>
                    )}

                    {item && item.levelLabel && <p className={styles['card-meta']}>{item.levelLabel}</p>}
                    {showStars && item && item.level !== undefined && renderStars(item.level)}

                    {item && item[descKey] && (
                        <p className={styles['card-desc']} dangerouslySetInnerHTML={{ __html: item[descKey] }} />
                    )}

                    {showTags && item && item.tags && (
                        <div className={styles['tech-stack']}>
                            {item.tags.map(tag => (
                                <span key={tag} className={styles['tech-item']}>{tag}</span>
                            ))}
                        </div>
                    )}
                </>
            )}
        </ContainerTag>
    );
}
export default DynamicCard;