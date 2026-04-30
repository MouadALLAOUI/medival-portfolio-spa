// import { useLocation } from "react-router-dom";
// import { useAlerts } from "../../lib/useAlerts";
// import { useEffect } from "react";
// import { useAchievements } from "../../lib/useAchievements";

import HeroSection from "../../sections/home/hero/heroSection";
import LanguagesSection from "../../sections/home/languages/LanguagesSection";
import PresentationSection from "../../sections/home/presentation/presentation";
import SkillsSection from "../../sections/home/skills/skillsSection";

export default function Home() {
    // const { showAlert } = useAlerts();
    // const { trackVisit } = useAchievements();
    // const location = useLocation();

    // useEffect(() => {
    //     showAlert("Welcome to my palace, hope you find whatever you desire", "greeting", 2000);
    //     showAlert("this portfolio is still under development thank you for your understanding", "chaos", 4000);
    //     showAlert("current section under development is projects", "info", 4000);
    // }, [showAlert]);

    // useEffect(() => {
    //     trackVisit(`${location.pathname}${location.hash || ""}`);
    // }, [location.pathname, location.hash, trackVisit]);

    // useEffect(() => {
    //     const onClick = (e) => {
    //         const target = e.target;
    //         if (!(target instanceof HTMLElement)) return;

    //         const copyBtn = target.closest(".copy-btn");
    //         if (copyBtn instanceof HTMLElement) {
    //             const targetId = copyBtn.getAttribute("data-target");
    //             if (!targetId) return;
    //             const codeElement = document.getElementById(targetId);
    //             if (!codeElement) return;
    //             const text = codeElement.textContent || "";
    //             navigator.clipboard
    //                 .writeText(text)
    //                 .then(() => showAlert("Copied to spellbook", "success", 1400))
    //                 .catch(() => showAlert("Copy spell failed", "error", 1800));
    //             return;
    //         }

    //         if (target.classList.contains("inline-code")) {
    //             const text = target.textContent || "";
    //             navigator.clipboard
    //                 .writeText(text)
    //                 .then(() => {
    //                     target.classList.add("copied");
    //                     showAlert("Copied to spellbook", "success", 1400);
    //                     window.setTimeout(() => target.classList.remove("copied"), 1200);
    //                 })
    //                 .catch(() => showAlert("Copy spell failed", "error", 1800));
    //         }
    //     };

    //     document.addEventListener("click", onClick);
    //     return () => document.removeEventListener("click", onClick);
    // }, [showAlert]);

    return (
        <main>
            <HeroSection />
            <PresentationSection />
            <LanguagesSection />
            <SkillsSection />
        </main>
    )
}