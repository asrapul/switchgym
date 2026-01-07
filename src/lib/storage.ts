// LocalStorage utilities for workout tracking

import { IconName } from "@/components/Icons";

export interface CompletedExercise {
  exerciseId: string;
  exerciseName: string;
  dayId: string;
  completedAt: string; // ISO date string
  sets: number;
  reps?: string;
  duration?: string;
  note?: string;
  mood?: "great" | "good" | "normal" | "tired";
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  dayId: string;
  exercises: CompletedExercise[];
  completedAt?: string;
}

export interface MonthlyStats {
  month: string; // YYYY-MM
  totalWorkouts: number;
  totalExercises: number;
  totalSets: number;
  swimDays: number;
  restDays: number;
  streakDays: number;
  logs: DailyLog[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  icon: string;
  target: number;
  current: number;
  type: "daily" | "weekly" | "monthly";
  reward: string;
  rewardIcon?: string;
  completed: boolean;
  category: "workout" | "streak" | "exercise" | "special";
}

// ========== NEW FEATURE INTERFACES ==========

// Personal Records
export interface PersonalRecord {
  id: string;
  exerciseId: string;
  exerciseName: string;
  weight: number; // in kg
  reps: number;
  date: string; // ISO date
  notes?: string;
}

// Body Measurements
export interface BodyMeasurement {
  id: string;
  date: string;
  weight?: number; // kg
  chest?: number; // cm
  waist?: number; // cm
  hips?: number; // cm
  arms?: number; // cm
  thighs?: number; // cm
  bodyFat?: number; // percentage
}

// Water Intake
export interface WaterIntake {
  date: string;
  glasses: number;
  goal: number;
}

// Achievement Badge
export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  color: string;
  unlockedAt?: string; // ISO date when unlocked, undefined if locked
  category: "workout" | "streak" | "milestone" | "special";
  difficulty: "easy" | "medium" | "hard" | "legendary";
}

// Theme
export type ThemeMode = "dark" | "light";

const STORAGE_KEYS = {
  MONTHLY_STATS: "asrapgym_monthly_stats",
  COMPLETED_TODAY: "asrapgym_completed_today",
  QUESTS: "asrapgym_quests",
  LAST_QUOTE_HOUR: "asrapgym_last_quote_hour",
  CURRENT_QUOTE_INDEX: "asrapgym_quote_index",
  // New feature keys
  PERSONAL_RECORDS: "asrapgym_personal_records",
  BODY_MEASUREMENTS: "asrapgym_body_measurements",
  WATER_INTAKE: "asrapgym_water_intake",
  WATER_GOAL: "asrapgym_water_goal",
  BADGES: "asrapgym_badges",
  THEME: "asrapgym_theme",
};

// Get current month key
export function getCurrentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

// Get today's date key
export function getTodayKey(): string {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

// Initialize or get monthly stats
export function getMonthlyStats(monthKey?: string): MonthlyStats {
  if (typeof window === "undefined") {
    return createEmptyMonthlyStats(monthKey || getCurrentMonthKey());
  }
  
  const key = monthKey || getCurrentMonthKey();
  const stored = localStorage.getItem(`${STORAGE_KEYS.MONTHLY_STATS}_${key}`);
  
  if (stored) {
    return JSON.parse(stored);
  }
  
  return createEmptyMonthlyStats(key);
}

function createEmptyMonthlyStats(month: string): MonthlyStats {
  return {
    month,
    totalWorkouts: 0,
    totalExercises: 0,
    totalSets: 0,
    swimDays: 0,
    restDays: 0,
    streakDays: 0,
    logs: [],
  };
}

// Save monthly stats
export function saveMonthlyStats(stats: MonthlyStats): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    `${STORAGE_KEYS.MONTHLY_STATS}_${stats.month}`,
    JSON.stringify(stats)
  );
}

// Mark exercise as completed
export function markExerciseComplete(
  exercise: CompletedExercise,
  dayId: string
): void {
  if (typeof window === "undefined") return;

  const today = getTodayKey();
  const monthKey = getCurrentMonthKey();
  const stats = getMonthlyStats(monthKey);

  // Find or create today's log
  let todayLog = stats.logs.find((log) => log.date === today);
  if (!todayLog) {
    todayLog = {
      date: today,
      dayId,
      exercises: [],
    };
    stats.logs.push(todayLog);
    stats.totalWorkouts++;
  }

  // Check if exercise already completed
  const existingIndex = todayLog.exercises.findIndex(
    (ex) => ex.exerciseId === exercise.exerciseId
  );
  
  if (existingIndex === -1) {
    todayLog.exercises.push(exercise);
    stats.totalExercises++;
    stats.totalSets += exercise.sets;
  }

  // Calculate streak
  stats.streakDays = calculateStreak(stats.logs);

  saveMonthlyStats(stats);
  updateQuests(stats);
}

// Remove exercise completion
export function unmarkExerciseComplete(exerciseId: string): void {
  if (typeof window === "undefined") return;

  const today = getTodayKey();
  const monthKey = getCurrentMonthKey();
  const stats = getMonthlyStats(monthKey);

  const todayLog = stats.logs.find((log) => log.date === today);
  if (todayLog) {
    const exerciseIndex = todayLog.exercises.findIndex(
      (ex) => ex.exerciseId === exerciseId
    );
    if (exerciseIndex !== -1) {
      const removed = todayLog.exercises.splice(exerciseIndex, 1)[0];
      stats.totalExercises--;
      stats.totalSets -= removed.sets;
    }
  }

  saveMonthlyStats(stats);
}

// Check if exercise is completed today
export function isExerciseCompletedToday(exerciseId: string): boolean {
  if (typeof window === "undefined") return false;

  const today = getTodayKey();
  const stats = getMonthlyStats();
  const todayLog = stats.logs.find((log) => log.date === today);

  return todayLog?.exercises.some((ex) => ex.exerciseId === exerciseId) || false;
}

// Get today's completed exercises
export function getTodayCompletedExercises(): CompletedExercise[] {
  if (typeof window === "undefined") return [];

  const today = getTodayKey();
  const stats = getMonthlyStats();
  const todayLog = stats.logs.find((log) => log.date === today);

  return todayLog?.exercises || [];
}

// Check if swim is completed today
export function isSwimCompletedToday(): boolean {
  if (typeof window === "undefined") return false;

  const today = getTodayKey();
  const stats = getMonthlyStats();
  const todayLog = stats.logs.find((log) => log.date === today);

  return todayLog?.dayId === "swim";
}

// Calculate streak days
function calculateStreak(logs: DailyLog[]): number {
  if (logs.length === 0) return 0;

  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedLogs.length; i++) {
    const logDate = new Date(sortedLogs[i].date);
    logDate.setHours(0, 0, 0, 0);

    const expectedDate = new Date(today);
    expectedDate.setDate(today.getDate() - i);

    if (logDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// Get workout on a specific date
export function getWorkoutByDate(date: string): DailyLog | null {
  if (typeof window === "undefined") return null;
  
  const [year, month] = date.split("-").slice(0, 2);
  const monthKey = `${year}-${month}`;
  const stats = getMonthlyStats(monthKey);
  
  return stats.logs.find(log => log.date === date) || null;
}

// Get all available month keys
export function getAllMonthKeys(): string[] {
  if (typeof window === "undefined") return [];
  
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_KEYS.MONTHLY_STATS + "_")) {
      const monthKey = key.replace(STORAGE_KEYS.MONTHLY_STATS + "_", "");
      keys.push(monthKey);
    }
  }
  
  // Always include current month
  const currentMonth = getCurrentMonthKey();
  if (!keys.includes(currentMonth)) {
    keys.push(currentMonth);
  }
  
  return keys.sort().reverse(); // Most recent first
}

// Get all workout days in a month for calendar
export function getWorkoutDaysInMonth(monthKey: string): string[] {
  if (typeof window === "undefined") return [];
  
  const stats = getMonthlyStats(monthKey);
  return stats.logs.map(log => log.date);
}

// Quest system
export function getQuests(): Quest[] {
  if (typeof window === "undefined") return getDefaultQuests();

  const stored = localStorage.getItem(STORAGE_KEYS.QUESTS);
  if (stored) {
    return JSON.parse(stored);
  }

  const defaultQuests = getDefaultQuests();
  localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(defaultQuests));
  return defaultQuests;
}


function getDefaultQuests(): Quest[] {
  return [
    {
      id: "daily-complete",
      title: "Daily Champion",
      description: "Selesaikan semua latihan hari ini",
      icon: "trophy" as IconName,
      target: 1,
      current: 0,
      type: "daily",
      reward: "+10 Strength",
      rewardIcon: "muscle" as IconName,
      completed: false,
      category: "workout",
    },
    {
      id: "weekly-streak",
      title: "Week Warrior",
      description: "Latihan 4 hari dalam seminggu",
      icon: "fire" as IconName,
      target: 4,
      current: 0,
      type: "weekly",
      reward: "+25 Energy",
      rewardIcon: "lightning" as IconName,
      completed: false,
      category: "streak",
    },
    {
      id: "exercise-master",
      title: "Exercise Master",
      description: "Selesaikan 50 gerakan bulan ini",
      icon: "target" as IconName,
      target: 50,
      current: 0,
      type: "monthly",
      reward: "Master Badge",
      rewardIcon: "crown" as IconName,
      completed: false,
      category: "exercise",
    },
    {
      id: "early-bird",
      title: "Early Bird",
      description: "Latihan sebelum jam 8 pagi",
      icon: "sunrise" as IconName,
      target: 1,
      current: 0,
      type: "daily",
      reward: "+5 Health",
      rewardIcon: "star" as IconName,
      completed: false,
      category: "special",
    },
    {
      id: "set-crusher",
      title: "Set Crusher",
      description: "Selesaikan 100 set bulan ini",
      icon: "explosion" as IconName,
      target: 100,
      current: 0,
      type: "monthly",
      reward: "Crusher Medal",
      rewardIcon: "medal" as IconName,
      completed: false,
      category: "exercise",
    },
    {
      id: "swim-lover",
      title: "Swim Lover",
      description: "Berenang 4x bulan ini",
      icon: "swim" as IconName,
      target: 4,
      current: 0,
      type: "monthly",
      reward: "Aqua Spirit",
      rewardIcon: "wave" as IconName,
      completed: false,
      category: "special",
    },
  ];
}

export function updateQuests(stats: MonthlyStats): void {
  if (typeof window === "undefined") return;

  const quests = getQuests();
  const today = getTodayKey();
  const todayLog = stats.logs.find((log) => log.date === today);

  quests.forEach((quest) => {
    switch (quest.id) {
      case "daily-complete":
        // Check if today's workout is complete (all exercises done)
        quest.current = todayLog ? 1 : 0;
        quest.completed = quest.current >= quest.target;
        break;
      case "weekly-streak":
        quest.current = stats.streakDays;
        quest.completed = quest.current >= quest.target;
        break;
      case "exercise-master":
        quest.current = stats.totalExercises;
        quest.completed = quest.current >= quest.target;
        break;
      case "set-crusher":
        quest.current = stats.totalSets;
        quest.completed = quest.current >= quest.target;
        break;
      case "early-bird":
        const now = new Date();
        if (todayLog && now.getHours() < 8) {
          quest.current = 1;
          quest.completed = true;
        }
        break;
      case "swim-lover":
        quest.current = stats.swimDays;
        quest.completed = quest.current >= quest.target;
        break;
    }
  });

  localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(quests));
}

export function markSwimDay(): void {
  if (typeof window === "undefined") return;

  const monthKey = getCurrentMonthKey();
  const stats = getMonthlyStats(monthKey);
  const today = getTodayKey();

  // Check if already marked
  const todayLog = stats.logs.find((log) => log.date === today);
  if (!todayLog) {
    stats.logs.push({
      date: today,
      dayId: "swim",
      exercises: [],
    });
    stats.swimDays++;
    stats.totalWorkouts++;
    stats.streakDays = calculateStreak(stats.logs);
    saveMonthlyStats(stats);
    updateQuests(stats);
  }
}

export function resetDailyQuests(): void {
  if (typeof window === "undefined") return;

  const quests = getQuests();
  quests.forEach((quest) => {
    if (quest.type === "daily") {
      quest.current = 0;
      quest.completed = false;
    }
  });
  localStorage.setItem(STORAGE_KEYS.QUESTS, JSON.stringify(quests));
}

// ========== PERSONAL RECORDS ==========

export function getPersonalRecords(): PersonalRecord[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.PERSONAL_RECORDS);
  return stored ? JSON.parse(stored) : [];
}

export function savePersonalRecord(record: PersonalRecord): void {
  if (typeof window === "undefined") return;
  const records = getPersonalRecords();
  
  // Check if this is a new PR for this exercise
  const existingIndex = records.findIndex(r => r.exerciseId === record.exerciseId);
  
  if (existingIndex !== -1) {
    // Only update if the new record is better (higher weight or more reps at same weight)
    const existing = records[existingIndex];
    if (record.weight > existing.weight || 
        (record.weight === existing.weight && record.reps > existing.reps)) {
      records[existingIndex] = record;
    }
  } else {
    records.push(record);
  }
  
  localStorage.setItem(STORAGE_KEYS.PERSONAL_RECORDS, JSON.stringify(records));
  checkBadgeUnlocks(); // Check if PR badge should be unlocked
}

export function getExercisePR(exerciseId: string): PersonalRecord | null {
  const records = getPersonalRecords();
  return records.find(r => r.exerciseId === exerciseId) || null;
}

export function deletePersonalRecord(recordId: string): void {
  if (typeof window === "undefined") return;
  const records = getPersonalRecords();
  const filtered = records.filter(r => r.id !== recordId);
  localStorage.setItem(STORAGE_KEYS.PERSONAL_RECORDS, JSON.stringify(filtered));
}

export function updatePersonalRecord(record: PersonalRecord): void {
  if (typeof window === "undefined") return;
  const records = getPersonalRecords();
  const index = records.findIndex(r => r.id === record.id);
  if (index !== -1) {
    records[index] = record;
    localStorage.setItem(STORAGE_KEYS.PERSONAL_RECORDS, JSON.stringify(records));
  }
}

// ========== BODY MEASUREMENTS ==========

export function getBodyMeasurements(): BodyMeasurement[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEYS.BODY_MEASUREMENTS);
  return stored ? JSON.parse(stored) : [];
}

export function saveBodyMeasurement(measurement: BodyMeasurement): void {
  if (typeof window === "undefined") return;
  const measurements = getBodyMeasurements();
  
  // Check if measurement for this date exists
  const existingIndex = measurements.findIndex(m => m.date === measurement.date);
  if (existingIndex !== -1) {
    measurements[existingIndex] = measurement;
  } else {
    measurements.push(measurement);
  }
  
  // Sort by date
  measurements.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  localStorage.setItem(STORAGE_KEYS.BODY_MEASUREMENTS, JSON.stringify(measurements));
}

export function getLatestMeasurement(): BodyMeasurement | null {
  const measurements = getBodyMeasurements();
  return measurements.length > 0 ? measurements[measurements.length - 1] : null;
}

// ========== WATER INTAKE ==========

export function getWaterIntake(date?: string): WaterIntake {
  if (typeof window === "undefined") return { date: getTodayKey(), glasses: 0, goal: 8 };
  
  const targetDate = date || getTodayKey();
  const stored = localStorage.getItem(`${STORAGE_KEYS.WATER_INTAKE}_${targetDate}`);
  const goal = getWaterGoal();
  
  if (stored) {
    return { ...JSON.parse(stored), goal };
  }
  
  return { date: targetDate, glasses: 0, goal };
}

export function addWaterGlass(): WaterIntake {
  if (typeof window === "undefined") return { date: getTodayKey(), glasses: 0, goal: 8 };
  
  const today = getTodayKey();
  const current = getWaterIntake(today);
  current.glasses++;
  
  localStorage.setItem(`${STORAGE_KEYS.WATER_INTAKE}_${today}`, JSON.stringify(current));
  
  // Check hydration badge
  if (current.glasses >= current.goal) {
    checkBadgeUnlocks();
  }
  
  return current;
}

export function removeWaterGlass(): WaterIntake {
  if (typeof window === "undefined") return { date: getTodayKey(), glasses: 0, goal: 8 };
  
  const today = getTodayKey();
  const current = getWaterIntake(today);
  if (current.glasses > 0) {
    current.glasses--;
  }
  
  localStorage.setItem(`${STORAGE_KEYS.WATER_INTAKE}_${today}`, JSON.stringify(current));
  return current;
}

export function getWaterGoal(): number {
  if (typeof window === "undefined") return 8;
  const stored = localStorage.getItem(STORAGE_KEYS.WATER_GOAL);
  return stored ? parseInt(stored) : 8;
}

export function setWaterGoal(goal: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.WATER_GOAL, goal.toString());
}

// ========== ACHIEVEMENT BADGES ==========

function getDefaultBadges(): Badge[] {
  return [
    // === EASY (20 badges) ===
    { id: "first-workout", title: "First Step", description: "Selesaikan workout pertama", icon: "star", color: "#10B981", category: "workout", difficulty: "easy" },
    { id: "first-pr", title: "PR Rookie", description: "Cetak Personal Record pertama", icon: "trophy", color: "#F59E0B", category: "milestone", difficulty: "easy" },
    { id: "first-swim", title: "Water Baby", description: "Berenang untuk pertama kalinya", icon: "swim", color: "#06B6D4", category: "workout", difficulty: "easy" },
    { id: "hydration-start", title: "Sip Starter", description: "Minum 8 gelas air dalam sehari", icon: "wave", color: "#3B82F6", category: "special", difficulty: "easy" },
    { id: "3-day-streak", title: "Getting Started", description: "Latihan 3 hari berturut-turut", icon: "fire", color: "#EF4444", category: "streak", difficulty: "easy" },
    { id: "5-workouts", title: "High Five", description: "Selesaikan 5 workout", icon: "muscle", color: "#8B5CF6", category: "milestone", difficulty: "easy" },
    { id: "10-sets", title: "Set Beginner", description: "Selesaikan 10 set total", icon: "weightlifting", color: "#EC4899", category: "milestone", difficulty: "easy" },
    { id: "upper-body-start", title: "Upper Explorer", description: "Latihan upper body pertama", icon: "muscle", color: "#DC2626", category: "workout", difficulty: "easy" },
    { id: "lower-body-start", title: "Leg Day Starter", description: "Latihan lower body pertama", icon: "muscle", color: "#F97316", category: "workout", difficulty: "easy" },
    { id: "first-measurement", title: "Body Tracker", description: "Catat pengukuran tubuh pertama", icon: "chart", color: "#10B981", category: "special", difficulty: "easy" },
    { id: "morning-workout", title: "Early Riser", description: "Latihan sebelum jam 9 pagi", icon: "sunrise", color: "#F59E0B", category: "special", difficulty: "easy" },
    { id: "evening-workout", title: "After Hours", description: "Latihan setelah jam 6 sore", icon: "sleep", color: "#6366F1", category: "special", difficulty: "easy" },
    { id: "first-quest", title: "Quest Taker", description: "Selesaikan quest pertama", icon: "target", color: "#DC2626", category: "special", difficulty: "easy" },
    { id: "weekend-start", title: "Weekend Starter", description: "Latihan di hari weekend", icon: "calendar", color: "#8B5CF6", category: "special", difficulty: "easy" },
    { id: "note-taker", title: "Note Taker", description: "Tulis catatan di PR pertama", icon: "notepad", color: "#A3A3A3", category: "special", difficulty: "easy" },
    { id: "chest-day", title: "Chest Pump", description: "Latihan chest untuk pertama kali", icon: "muscle", color: "#EF4444", category: "workout", difficulty: "easy" },
    { id: "back-day", title: "Back Builder", description: "Latihan back untuk pertama kali", icon: "muscle", color: "#3B82F6", category: "workout", difficulty: "easy" },
    { id: "arm-day", title: "Gun Show", description: "Latihan arms untuk pertama kali", icon: "muscle", color: "#F97316", category: "workout", difficulty: "easy" },
    { id: "shoulder-day", title: "Boulder Shoulders", description: "Latihan shoulder untuk pertama kali", icon: "muscle", color: "#10B981", category: "workout", difficulty: "easy" },
    { id: "leg-day", title: "Never Skip", description: "Latihan legs untuk pertama kali", icon: "muscle", color: "#8B5CF6", category: "workout", difficulty: "easy" },

    // === MEDIUM (15 badges) ===
    { id: "week-streak", title: "7 Day Warrior", description: "Streak latihan 7 hari", icon: "fire", color: "#EF4444", category: "streak", difficulty: "medium" },
    { id: "10-workouts", title: "Dedicated", description: "Selesaikan 10 workout", icon: "star", color: "#F59E0B", category: "milestone", difficulty: "medium" },
    { id: "50-sets", title: "Halfway There", description: "Selesaikan 50 set total", icon: "weightlifting", color: "#3B82F6", category: "milestone", difficulty: "medium" },
    { id: "5-prs", title: "PR Collector", description: "Catat 5 Personal Records", icon: "trophy", color: "#F59E0B", category: "milestone", difficulty: "medium" },
    { id: "5-swims", title: "Fish Mode", description: "Berenang 5 kali", icon: "swim", color: "#06B6D4", category: "milestone", difficulty: "medium" },
    { id: "hydration-week", title: "Hydration Habit", description: "Capai target air 7 hari berturut", icon: "wave", color: "#3B82F6", category: "special", difficulty: "medium" },
    { id: "early-bird", title: "Early Bird", description: "Latihan sebelum jam 6 pagi", icon: "sunrise", color: "#F97316", category: "special", difficulty: "medium" },
    { id: "night-owl", title: "Night Owl", description: "Latihan setelah jam 10 malam", icon: "sleep", color: "#6366F1", category: "special", difficulty: "medium" },
    { id: "weekend-warrior", title: "Weekend Warrior", description: "Latihan di Sabtu DAN Minggu", icon: "muscle", color: "#EC4899", category: "special", difficulty: "medium" },
    { id: "25-workouts", title: "Quarter Century", description: "Selesaikan 25 workout", icon: "medal", color: "#10B981", category: "milestone", difficulty: "medium" },
    { id: "two-week-streak", title: "Fortnight Fighter", description: "Streak 14 hari berturut", icon: "fire", color: "#EF4444", category: "streak", difficulty: "medium" },
    { id: "all-upper", title: "Upper Master", description: "Selesaikan semua latihan upper body", icon: "crown", color: "#DC2626", category: "workout", difficulty: "medium" },
    { id: "all-lower", title: "Lower Master", description: "Selesaikan semua latihan lower body", icon: "crown", color: "#8B5CF6", category: "workout", difficulty: "medium" },
    { id: "10-quests", title: "Quest Hunter", description: "Selesaikan 10 quests", icon: "target", color: "#F59E0B", category: "special", difficulty: "medium" },
    { id: "body-tracker-pro", title: "Progress Tracker", description: "Catat 10 pengukuran tubuh", icon: "chart", color: "#10B981", category: "special", difficulty: "medium" },

    // === HARD (10 badges) ===
    { id: "month-streak", title: "30 Day Legend", description: "Streak latihan 30 hari", icon: "crown", color: "#8B5CF6", category: "streak", difficulty: "hard" },
    { id: "100-sets", title: "Century Club", description: "Selesaikan 100 set total", icon: "trophy", color: "#F59E0B", category: "milestone", difficulty: "hard" },
    { id: "50-workouts", title: "Half Century", description: "Selesaikan 50 workout", icon: "medal", color: "#10B981", category: "milestone", difficulty: "hard" },
    { id: "10-prs", title: "PR Master", description: "Catat 10 Personal Records", icon: "lightning", color: "#3B82F6", category: "milestone", difficulty: "hard" },
    { id: "10-swims", title: "Aqua Spirit", description: "Berenang 10 kali", icon: "swim", color: "#0EA5E9", category: "milestone", difficulty: "hard" },
    { id: "hydration-month", title: "Hydration Master", description: "Capai target air 30 hari berturut", icon: "wave", color: "#06B6D4", category: "special", difficulty: "hard" },
    { id: "200-sets", title: "Double Century", description: "Selesaikan 200 set total", icon: "weightlifting", color: "#EF4444", category: "milestone", difficulty: "hard" },
    { id: "all-exercises", title: "Complete Package", description: "Coba semua jenis latihan", icon: "sparkles", color: "#EC4899", category: "workout", difficulty: "hard" },
    { id: "streak-recovery", title: "Phoenix Rise", description: "Bangun kembali streak 14 hari setelah putus", icon: "fire", color: "#F97316", category: "streak", difficulty: "hard" },
    { id: "5-am-club", title: "5 AM Club", description: "Latihan jam 5 pagi sebanyak 5 kali", icon: "sunrise", color: "#F59E0B", category: "special", difficulty: "hard" },

    // === LEGENDARY (10 badges) ===
    { id: "90-day-streak", title: "Unstoppable", description: "Streak latihan 90 hari", icon: "crown", color: "#F59E0B", category: "streak", difficulty: "legendary" },
    { id: "365-day-streak", title: "Year of Iron", description: "Streak latihan 365 hari", icon: "crown", color: "#FFD700", category: "streak", difficulty: "legendary" },
    { id: "500-sets", title: "Set Legend", description: "Selesaikan 500 set total", icon: "trophy", color: "#FFD700", category: "milestone", difficulty: "legendary" },
    { id: "100-workouts", title: "Centurion", description: "Selesaikan 100 workout", icon: "medal", color: "#FFD700", category: "milestone", difficulty: "legendary" },
    { id: "25-prs", title: "PR Legend", description: "Catat 25 Personal Records", icon: "lightning", color: "#FFD700", category: "milestone", difficulty: "legendary" },
    { id: "50-swims", title: "Poseidon", description: "Berenang 50 kali", icon: "swim", color: "#FFD700", category: "milestone", difficulty: "legendary" },
    { id: "all-badges-easy", title: "Easy Completionist", description: "Unlock semua badge Easy", icon: "star", color: "#10B981", category: "special", difficulty: "legendary" },
    { id: "all-badges-medium", title: "Medium Completionist", description: "Unlock semua badge Medium", icon: "star", color: "#3B82F6", category: "special", difficulty: "legendary" },
    { id: "iron-will", title: "Iron Will", description: "Latihan 5 hari seminggu selama 1 bulan", icon: "muscle", color: "#FFD700", category: "special", difficulty: "legendary" },
    { id: "ultimate-athlete", title: "Ultimate Athlete", description: "Unlock 50 badge lainnya", icon: "crown", color: "#FFD700", category: "special", difficulty: "legendary" },
  ];
}

export function getBadges(): Badge[] {
  if (typeof window === "undefined") return getDefaultBadges();
  
  const stored = localStorage.getItem(STORAGE_KEYS.BADGES);
  const defaultBadges = getDefaultBadges();
  
  if (stored) {
    const savedBadges = JSON.parse(stored) as Badge[];
    
    // Merge saved badges with defaults (to add new badges and ensure difficulty field)
    const mergedBadges = defaultBadges.map(defaultBadge => {
      const savedBadge = savedBadges.find(b => b.id === defaultBadge.id);
      if (savedBadge) {
        // Keep unlocked status from saved, but use all other fields from default
        return {
          ...defaultBadge,
          unlockedAt: savedBadge.unlockedAt,
        };
      }
      return defaultBadge;
    });
    
    // Save merged badges back to storage
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(mergedBadges));
    return mergedBadges;
  }
  
  localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(defaultBadges));
  return defaultBadges;
}

export function unlockBadge(badgeId: string): Badge | null {
  if (typeof window === "undefined") return null;
  
  const badges = getBadges();
  const badge = badges.find(b => b.id === badgeId);
  
  if (badge && !badge.unlockedAt) {
    badge.unlockedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
    return badge;
  }
  return null;
}

export function checkBadgeUnlocks(): Badge[] {
  if (typeof window === "undefined") return [];
  
  const newlyUnlocked: Badge[] = [];
  const stats = getMonthlyStats();
  const badges = getBadges();
  const prs = getPersonalRecords();
  const measurements = getBodyMeasurements();
  const quests = getQuests();
  const completedQuests = quests.filter(q => q.completed).length;
  
  // Helper to track unlocks
  const tryUnlock = (badgeId: string) => {
    const badge = unlockBadge(badgeId);
    if (badge) newlyUnlocked.push(badge);
  };
  
  // Get workout day types from logs
  const allLogs = stats.logs;
  const uniqueDayTypes = new Set(allLogs.map(l => l.dayId));
  const today = new Date();
  const hour = today.getHours();
  const dayOfWeek = today.getDay();
  const todayLog = allLogs.find(log => log.date === getTodayKey());
  
  // ========== EASY (20 badges) ==========
  
  // First workout
  if (stats.totalWorkouts >= 1) tryUnlock("first-workout");
  
  // First PR
  if (prs.length >= 1) tryUnlock("first-pr");
  
  // First swim
  if (stats.swimDays >= 1) tryUnlock("first-swim");
  
  // Hydration start (8 glasses in a day) - tracked via water intake
  const waterIntake = getWaterIntake();
  if (waterIntake && waterIntake.glasses >= 8) tryUnlock("hydration-start");
  
  // 3 day streak
  if (stats.streakDays >= 3) tryUnlock("3-day-streak");
  
  // 5 workouts
  if (stats.totalWorkouts >= 5) tryUnlock("5-workouts");
  
  // 10 sets
  if (stats.totalSets >= 10) tryUnlock("10-sets");
  
  // Upper body start
  if (uniqueDayTypes.has("upper") || uniqueDayTypes.has("push") || uniqueDayTypes.has("pull")) {
    tryUnlock("upper-body-start");
  }
  
  // Lower body start
  if (uniqueDayTypes.has("lower") || uniqueDayTypes.has("legs")) {
    tryUnlock("lower-body-start");
  }
  
  // First measurement
  if (measurements.length >= 1) tryUnlock("first-measurement");
  
  // Morning workout (before 9 AM)
  if (todayLog && todayLog.exercises.length > 0 && hour < 9) tryUnlock("morning-workout");
  
  // Evening workout (after 6 PM)
  if (todayLog && todayLog.exercises.length > 0 && hour >= 18) tryUnlock("evening-workout");
  
  // First quest
  if (completedQuests >= 1) tryUnlock("first-quest");
  
  // Weekend start (workout on Saturday or Sunday)
  if ((dayOfWeek === 0 || dayOfWeek === 6) && todayLog) tryUnlock("weekend-start");
  
  // Note taker (PR with notes)
  const prWithNotes = prs.find(pr => pr.notes && pr.notes.length > 0);
  if (prWithNotes) tryUnlock("note-taker");
  
  // Body part specific badges - check exercise names in logs
  const allExerciseNames = allLogs.flatMap(l => l.exercises.map(e => e.exerciseName.toLowerCase()));
  
  if (allExerciseNames.some(n => n.includes("chest") || n.includes("bench") || n.includes("push"))) {
    tryUnlock("chest-day");
  }
  if (allExerciseNames.some(n => n.includes("back") || n.includes("row") || n.includes("lat") || n.includes("pull"))) {
    tryUnlock("back-day");
  }
  if (allExerciseNames.some(n => n.includes("arm") || n.includes("bicep") || n.includes("tricep") || n.includes("curl"))) {
    tryUnlock("arm-day");
  }
  if (allExerciseNames.some(n => n.includes("shoulder") || n.includes("delt") || n.includes("press"))) {
    tryUnlock("shoulder-day");
  }
  if (allExerciseNames.some(n => n.includes("leg") || n.includes("squat") || n.includes("lunge") || n.includes("hamstring"))) {
    tryUnlock("leg-day");
  }
  
  // ========== MEDIUM (15 badges) ==========
  
  // 7 day streak
  if (stats.streakDays >= 7) tryUnlock("week-streak");
  
  // 10 workouts
  if (stats.totalWorkouts >= 10) tryUnlock("10-workouts");
  
  // 50 sets
  if (stats.totalSets >= 50) tryUnlock("50-sets");
  
  // 5 PRs
  if (prs.length >= 5) tryUnlock("5-prs");
  
  // 5 swims
  if (stats.swimDays >= 5) tryUnlock("5-swims");
  
  // Hydration week (7 days of hitting water goal) - simplified check
  // Would need tracking of daily water goals met
  
  // Early bird (before 6 AM)
  if (todayLog && todayLog.exercises.length > 0 && hour < 6) tryUnlock("early-bird");
  
  // Night owl (after 10 PM)
  if (todayLog && todayLog.exercises.length > 0 && hour >= 22) tryUnlock("night-owl");
  
  // Weekend warrior (both Saturday and Sunday)
  const saturdayWorkout = allLogs.some(l => new Date(l.date).getDay() === 6);
  const sundayWorkout = allLogs.some(l => new Date(l.date).getDay() === 0);
  if (saturdayWorkout && sundayWorkout) tryUnlock("weekend-warrior");
  
  // 25 workouts
  if (stats.totalWorkouts >= 25) tryUnlock("25-workouts");
  
  // 14 day streak
  if (stats.streakDays >= 14) tryUnlock("two-week-streak");
  
  // All upper - check for multiple upper body exercises
  const upperExercises = ["chest", "back", "shoulder", "bicep", "tricep"];
  const hasAllUpper = upperExercises.every(part => 
    allExerciseNames.some(n => n.includes(part))
  );
  if (hasAllUpper) tryUnlock("all-upper");
  
  // All lower
  const lowerExercises = ["squat", "leg", "hamstring", "calf"];
  const hasAllLower = lowerExercises.filter(part => 
    allExerciseNames.some(n => n.includes(part))
  ).length >= 2;
  if (hasAllLower) tryUnlock("all-lower");
  
  // 10 quests
  if (completedQuests >= 10) tryUnlock("10-quests");
  
  // 10 measurements
  if (measurements.length >= 10) tryUnlock("body-tracker-pro");
  
  // ========== HARD (10 badges) ==========
  
  // 30 day streak
  if (stats.streakDays >= 30) tryUnlock("month-streak");
  
  // 100 sets
  if (stats.totalSets >= 100) tryUnlock("100-sets");
  
  // 50 workouts
  if (stats.totalWorkouts >= 50) tryUnlock("50-workouts");
  
  // 10 PRs
  if (prs.length >= 10) tryUnlock("10-prs");
  
  // 10 swims
  if (stats.swimDays >= 10) tryUnlock("10-swims");
  
  // 200 sets
  if (stats.totalSets >= 200) tryUnlock("200-sets");
  
  // 5 AM club (5 workouts before 5 AM) - would need time tracking per workout
  
  // ========== LEGENDARY (10 badges) ==========
  
  // 90 day streak
  if (stats.streakDays >= 90) tryUnlock("90-day-streak");
  
  // 365 day streak
  if (stats.streakDays >= 365) tryUnlock("365-day-streak");
  
  // 500 sets
  if (stats.totalSets >= 500) tryUnlock("500-sets");
  
  // 100 workouts
  if (stats.totalWorkouts >= 100) tryUnlock("100-workouts");
  
  // 25 PRs
  if (prs.length >= 25) tryUnlock("25-prs");
  
  // 50 swims
  if (stats.swimDays >= 50) tryUnlock("50-swims");
  
  // Completionist badges
  const easyBadges = badges.filter(b => b.difficulty === "easy");
  const easyUnlocked = easyBadges.filter(b => b.unlockedAt).length;
  if (easyUnlocked === easyBadges.length && easyBadges.length > 0) {
    tryUnlock("all-badges-easy");
  }
  
  const mediumBadges = badges.filter(b => b.difficulty === "medium");
  const mediumUnlocked = mediumBadges.filter(b => b.unlockedAt).length;
  if (mediumUnlocked === mediumBadges.length && mediumBadges.length > 0) {
    tryUnlock("all-badges-medium");
  }
  
  // Ultimate athlete (50 badges unlocked)
  const totalUnlocked = badges.filter(b => b.unlockedAt).length;
  if (totalUnlocked >= 50) tryUnlock("ultimate-athlete");
  
  return newlyUnlocked;
}

export function getUnlockedBadgesCount(): number {
  const badges = getBadges();
  return badges.filter(b => b.unlockedAt).length;
}

// ========== THEME ==========

export function getTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(STORAGE_KEYS.THEME);
  return (stored as ThemeMode) || "dark";
}

export function setTheme(theme: ThemeMode): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
}

export function toggleTheme(): ThemeMode {
  const current = getTheme();
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}
