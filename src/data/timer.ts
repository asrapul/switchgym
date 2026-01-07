// Training mode configurations for rest timers

export type TrainingMode = "strength" | "hypertrophy" | "endurance";

export interface TrainingModeConfig {
  id: TrainingMode;
  name: string;
  nameBahasa: string;
  description: string;
  restTime: number; // in seconds
  icon: string;
  color: string;
  benefits: string[];
}

import { IconName } from "@/components/Icons";

export const trainingModes: TrainingModeConfig[] = [
  {
    id: "strength",
    name: "Strength",
    nameBahasa: "Kekuatan",
    description: "Fokus meningkatkan kekuatan maksimal",
    restTime: 210, // 3:30 minutes
    icon: "weightlifting" as IconName,
    color: "#DC2626",
    benefits: ["Kekuatan maksimal", "Power & explosiveness", "Nervous system adaptation"],
  },
  {
    id: "hypertrophy",
    name: "Hypertrophy",
    nameBahasa: "Pembentukan Otot",
    description: "Fokus membangun massa otot",
    restTime: 90, // 1:30 minutes
    icon: "muscle" as IconName,
    color: "#F59E0B",
    benefits: ["Muscle growth", "Aesthetic physique", "Metabolic stress"],
  },
  {
    id: "endurance",
    name: "Endurance",
    nameBahasa: "Ketahanan",
    description: "Fokus meningkatkan ketahanan otot",
    restTime: 40, // 40 seconds
    icon: "lightning" as IconName,
    color: "#10B981",
    benefits: ["Muscular endurance", "Cardiovascular health", "Fat burning"],
  },
];

export function getTrainingMode(id: TrainingMode): TrainingModeConfig {
  return trainingModes.find((mode) => mode.id === id) || trainingModes[1]; // default hypertrophy
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// LocalStorage keys for training mode
const STORAGE_KEY = "asrapgym_training_mode";

export function getSelectedTrainingMode(): TrainingMode {
  if (typeof window === "undefined") return "hypertrophy";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && ["strength", "hypertrophy", "endurance"].includes(stored)) {
    return stored as TrainingMode;
  }
  return "hypertrophy";
}

export function setSelectedTrainingMode(mode: TrainingMode): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, mode);
}
