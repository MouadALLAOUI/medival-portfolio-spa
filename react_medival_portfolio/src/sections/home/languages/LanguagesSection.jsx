import DynamicCard from "../../../components/card";
import { PRESETS } from "../../../config/presets";
import CSection from "../../../templates/Section";

const LocalLanguages = [
    {
        id: 1,
        icon: "🗣️",
        name: "Arabic",
        levelLabel: "Native / Bilingual",
        level: 5
    },
    {
        id: 2,
        icon: "📚",
        name: "French",
        levelLabel: "Professional Working",
        level: 3
    },
    {
        id: 3,
        icon: "🧭",
        name: "English",
        levelLabel: "Professional Working",
        level: 4
    }
]

function LanguagesSection() {
    return (
        <CSection id="languages" title="Tongues of the Realm" subtitle="Languages I speak + proficiency:">
            <div className="grid-container languages-grid">
                {LocalLanguages.map(lang => (
                    <DynamicCard key={lang.id} item={lang} config={PRESETS.LANGUAGE} />
                ))}
            </div>
        </CSection>
    )
}

export default LanguagesSection;