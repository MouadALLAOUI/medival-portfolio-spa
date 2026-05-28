import { useLocation } from "react-router-dom";
import { useAlerts } from "../../lib/useAlerts";
import { useEffect } from "react";
import { useAchievements } from "../../lib/useAchievements";
import { isFirstVisit } from "../../lib/utils/visitTracker";
import { useSettings } from "../../lib/useSettings";

import HeroSection from "../../sections/home/hero/heroSection";
import PresentationSection from "../../sections/home/presentation/presentation";
import LanguagesSection from "../../sections/home/languages/LanguagesSection";
import SkillsSection from "../../sections/home/skills/skillsSection";
import ProjectsSection from "../../sections/home/projects/ProjectsSection";
import LearningSection from "../../sections/home/learning/LearningSection";
import HobbiesSection from "../../sections/home/hobbies/HobbiesSection";
import DesignSection from "../../sections/home/design/DesignSection";
import AboutSection from "../../sections/home/about/AboutSection";
import ContactSection from "../../sections/home/contact/ContactSection";

export default function Home() {
    const { showAlert } = useAlerts();
    const { trackVisit, incrementCounter } = useAchievements();
    const { t } = useSettings();
    const location = useLocation();

    useEffect(() => {
        if (!isFirstVisit('home')) return;
        showAlert(t('COMMON.alerts.welcomeHome'), "royal", 4500);
    }, [showAlert, t]);

    useEffect(() => {
        trackVisit(`${location.pathname}${location.hash || ""}`);
    }, [location.pathname, location.hash, trackVisit]);

    useEffect(() => {
        const observerOptions = {
            root: document.getElementById("body-container") || null,
            rootMargin: "0px 0px -10% 0px",
            threshold: 0.1,
        };

        const revealCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    if (entry.target.id) {
                        incrementCounter(`section_seen_${entry.target.id}`);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(revealCallback, observerOptions);
        const elementsToReveal = document.querySelectorAll(".parchment, .scroll-content, .timeline-item-reveal");
        elementsToReveal.forEach((el) => observer.observe(el));

        return () => {
            observer.disconnect();
        };
    }, []);



    return (
        <div>
            <div className="alert-bar">
                <p>
                    {t('COMMON.alerts.developmentAlertBar')}
                </p>
            </div>
            <HeroSection />
            <PresentationSection />
            <LanguagesSection />
            <SkillsSection />
            <ProjectsSection />
            <LearningSection />
            <HobbiesSection />
            <DesignSection />
            <AboutSection />
            <ContactSection />
        </div>
    );
}
