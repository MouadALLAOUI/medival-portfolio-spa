import { useContext } from "react";
import { AchievementsContext } from "./contexts/achievements.context";

export function useAchievements() {
    const ctx = useContext(AchievementsContext);
    return ctx;
}

