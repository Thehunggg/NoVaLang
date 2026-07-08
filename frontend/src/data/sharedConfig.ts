import authProvidersJson from "../../../shared/config/auth_providers.json";
import dailyGoalsJson from "../../../shared/config/daily_goal_options.json";
import placementPolicyJson from "../../../shared/config/placement_policy.json";
import type { DailyGoal, LevelId, SupportedUILanguage } from "../types/index";

type LocalizedLabel = Record<"en" | "vi", string>;

export interface AuthProviderOption {
  id: "google" | "facebook" | "instagram" | "apple" | "email" | "guest";
  label: LocalizedLabel;
  implemented: boolean;
  requiredEnv?: string[];
}

export interface DailyGoalOption {
  minutes: DailyGoal;
  name: LocalizedLabel;
}

export const authProviders = authProvidersJson as AuthProviderOption[];
export const dailyGoalOptions = dailyGoalsJson as DailyGoalOption[];
export const placementPolicy = placementPolicyJson as {
  questionCount: number;
  bands: { min: number; max: number; levelCode: LevelId }[];
};

export const localizedConfigLabel = (label: LocalizedLabel, uiLanguage: SupportedUILanguage): string =>
  label[uiLanguage === "vi" ? "vi" : "en"];

export const placementLevelFromScore = (score: number): LevelId =>
  placementPolicy.bands.find((band) => score >= band.min && score <= band.max)?.levelCode ?? "A0";
