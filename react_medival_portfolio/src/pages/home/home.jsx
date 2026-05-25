import { useLocation } from "react-router-dom";
import { useAlerts } from "../../lib/useAlerts";
import { useEffect } from "react";
import { useAchievements } from "../../lib/useAchievements";
import { useCodeCopy } from "../../lib/hooks/useCodeCopy";
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
    const { trackVisit } = useAchievements();
    const { copyCode } = useCodeCopy();
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
                }
            });
        };

        const observer = new IntersectionObserver(revealCallback, observerOptions);
        const elementsToReveal = document.querySelectorAll(".parchment, .scroll-content, .timeline-item-reveal");
        elementsToReveal.forEach((el) => observer.observe(el));

        return () => {
            elementsToReveal.forEach((el) => observer.unobserve(el));
        };
    }, []);

    useEffect(() => {
        const onClick = (e) => {
            const target = e.target;
            if (!(target instanceof HTMLElement)) return;

            const copyBtn = target.closest(".copy-btn");
            if (copyBtn instanceof HTMLElement) {
                const targetId = copyBtn.getAttribute("data-target");
                if (!targetId) return;
                const codeElement = document.getElementById(targetId);
                if (!codeElement) return;
                const text = codeElement.textContent || "";
                copyCode(text, "spellbook");
                return;
            }

            if (target.classList.contains("inline-code")) {
                const text = target.textContent || "";
                target.classList.add("copied");
                copyCode(text, "inline scroll");
                window.setTimeout(() => target.classList.remove("copied"), 1200);
            }
        };

        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, [copyCode]);

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
