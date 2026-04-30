const CSection = ({ id = "", title = "", subtitle = "", children, classname = "", ...rest }) => {
    return (
        <section
            id={id.toLowerCase()}
            className={`
                section
                medieval-section ${id.toLowerCase()}-section
            `}
            {...rest}
        >
            <div className={`parchment-container ${classname}`}>
                {title && <h2 className="section-title">{title}</h2>}
                {subtitle && <h2 className="section-subtitle">{subtitle}</h2>}

                {children}
            </div>
        </section>
    );
};

export default CSection;