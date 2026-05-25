import CSection from "../../../templates/Section";
import profileImg from "../../../media/mouad-pic.png";
import styles from "./presentation.module.scss";

const PresentationSection = () => {
    return (
        <CSection id="presentation" title="The Wizard's Grimoire" classname="presentation-section">
            <div className={styles['presentation-container']}>
                <div className={styles['portrait-frame']}>
                    <img
                        src={profileImg}
                        alt="Portrait of Mouad"
                    />
                </div>

                <div className={`${styles['description-scroll']} combined-legendary-bio`}>
                    <div className={`${styles['scroll-content']} ${styles['visible']}`}>
                        <h2 className={styles['scroll-title']}>🛡️ The Knight Behind the Code</h2>

                        <p className={styles['drop-cap']}>
                            <span className={styles['initial']}>G</span>reetings, fellow travelers of the digital realm! I am <strong>Mouad the
                                Coder</strong>,
                            a modern-day craftsman and conjurer of immersive digital experiences. My journey began in the ancient
                            lands of HTML,
                            where I first learned to structure the foundations of the web — a discipline I now wield with the
                            precision of a master blacksmith.
                        </p>

                        <div className={styles['scroll-separator']}></div>

                        <p>
                            Through tireless study and quests across countless frameworks and languages, I have mastered many
                            magical tools:
                            the elegant spells of JavaScript, the powerful incantations of Python, and the flexible artistry of
                            React. These are my sword and shield in battle against the dragons of complexity and inefficiency.
                        </p>

                        <div className={styles['scroll-separator']}></div>

                        <p>
                            Like a knight sworn to protect the realm, I champion clean code, secure architecture, and
                            user-friendly design. Whether working solo or with fellow warriors, my mission is to forge applications that blend ancient
                            design wisdom with cutting-edge technology — digital creations that stand the test of time.
                        </p>

                        <div className={styles['scroll-separator']}></div>

                        <p>
                            When not crafting code, I delve into technological tomes, explore uncharted tools, or share knowledge
                            with apprentice developers. My quest is ongoing — to solve real-world problems with creativity, precision, and technical
                            excellence.
                        </p>
                    </div>
                </div>

            </div>
        </CSection>
    )
}

export default PresentationSection;