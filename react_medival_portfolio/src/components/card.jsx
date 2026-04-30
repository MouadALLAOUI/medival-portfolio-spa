/**
 * @param {Object} item - The data object (e.g., from projects.js or languages.js)
 * @param {Object} config - Configuration on how to map the data
 * @param {Function} onClick - Optional click handler
 */
function DynamicCard({ item, config, onClick }) {
    const {
        baseClass = "skill-card",
        titleKey = "name",       // Which key holds the title (name, title, caption)
        descKey = "description", // Which key holds the text (desc, intro, meta)
        showStars = false,       // Whether to render proficiency stars
        isLink = false,          // Force treat as <a> tag
        linkKey = "href",        // Which key holds the URL
        showTags = false,        // Whether to render a tech-stack/tags list
        imageKey = null          // Which key holds an image source (src, thumbnail)
    } = config;

    const TitleTag = config.titleTag || "h3";
    const ContainerTag = (isLink || item[linkKey]) ? 'a' : 'div';

    const renderStars = (level) => (
        <div className="proficiency" aria-label={`Proficiency: ${level} out of 5`}>
            {[...Array(5)].map((_, i) => (
                <span key={i} className={`star ${i < (level || 0) ? "" : "empty"}`}>★</span>
            ))}
        </div>
    );

    return (
        <ContainerTag
            className={`${baseClass} ${item.isBlur ? 'blured' : ''}`}
            href={item[linkKey]}
            target={item[linkKey] ? "_blank" : undefined}
            rel="noopener noreferrer"
            onClick={() => onClick && onClick(item)}
            style={item.style} // Pass custom styles like --bg-img from projects.js
        >
            <div className="card-head">
                {item.icon && <span className="card-icon">{item.icon}</span>}
                {item[titleKey] && <TitleTag className="card-title">{item[titleKey]}</TitleTag>}
            </div>

            {imageKey && item[imageKey] && (
                <img src={item[imageKey]} alt={item[titleKey]} className="card-media" />
            )}

            {item.levelLabel && <p className="card-meta">{item.levelLabel}</p>}
            {showStars && item.level !== undefined && renderStars(item.level)}

            {item[descKey] && (
                <p className="card-desc" dangerouslySetInnerHTML={{ __html: item[descKey] }} />
            )}

            {showTags && item.tags && (
                <div className="tech-stack">
                    {item.tags.map(tag => (
                        <span key={tag} className="tech-item">{tag}</span>
                    ))}
                </div>
            )}
        </ContainerTag>
    );
}
export default DynamicCard;