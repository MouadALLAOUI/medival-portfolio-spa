import DynamicCard from "../../../components/card";
import { PRESETS } from "../../../config/presets";
import skills from "../../../data/skills";
import CSection from "../../../templates/Section";

function SkillsSection() {
    const skillsSubTitle = () => (<> Through years of arcane study and mystical
        practice, I have mastered these powerful arts:
        <code>click card bellow for more details</code></>);
    return (
        <CSection id="Skills" title="Skills" subtitle={skillsSubTitle}>
            <div className="skills-template grid-container">
                {skills.map((skill) => (
                    <DynamicCard key={skill.id} item={skill} config={PRESETS.LANGUAGE} />
                ))}
            </div>
        </CSection>
    )
}

export default SkillsSection;