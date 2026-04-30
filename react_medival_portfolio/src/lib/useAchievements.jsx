import { useContext } from "react";
import { AchievementsContext } from "./contexts/achievements.context";

export function useAchievements() {
    const ctx = useContext(AchievementsContext);
    if (!ctx) throw new Error("useAchievements must be used within AchievementsProvider");
    return ctx;
}

