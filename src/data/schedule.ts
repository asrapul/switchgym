export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps?: string;
  duration?: string;
  notes?: string;
  videoUrl?: string;
}

export interface WorkoutDay {
  id: string;
  day: string;
  dayShort: string;
  type: "upper" | "lower" | "swim" | "rest";
  title: string;
  subtitle?: string;
  icon: string;
  color: string;
  exercises: Exercise[];
}

import { IconName } from "@/components/Icons";

export const weeklySchedule: WorkoutDay[] = [
  {
    id: "monday",
    day: "Senin",
    dayShort: "Sen",
    type: "upper",
    title: "Upper Body A",
    subtitle: "Chest & Back Focus",
    icon: "muscle" as IconName,
    color: "#DC2626",
    exercises: [
      { id: "mon-1", name: "Flat Dumbbell Bench Press", sets: 4, reps: "8-10", videoUrl: "https://www.youtube.com/watch?v=VmB1G1K7v94" },
      { id: "mon-2", name: "One-Arm Dumbbell Row", sets: 4, reps: "10-12", videoUrl: "https://www.youtube.com/watch?v=pYcpY20QaE8" },
      { id: "mon-3", name: "Dumbbell Chest Flyes", sets: 3, reps: "12-15", videoUrl: "https://www.youtube.com/watch?v=eozdVDA78K0" },
      { id: "mon-4", name: "Dumbbell Pullover", sets: 3, reps: "12", videoUrl: "https://www.youtube.com/watch?v=FK4rHfWKEac" },
      { id: "mon-5", name: "Dead Hang", sets: 3, duration: "45-60 detik", videoUrl: "https://www.youtube.com/watch?v=mRy9m2Q9_1I" },
    ],
  },
  {
    id: "tuesday",
    day: "Selasa",
    dayShort: "Sel",
    type: "lower",
    title: "Lower Body A",
    subtitle: "Quad & Core Focus",
    icon: "leg" as IconName,
    color: "#F59E0B",
    exercises: [
      { id: "tue-1", name: "Dumbbell Goblet Squat", sets: 4, reps: "10-12", videoUrl: "https://www.youtube.com/watch?v=MeIiIdhvXT4" },
      { id: "tue-2", name: "Dumbbell Walking Lunges", sets: 3, reps: "12 langkah", videoUrl: "https://www.youtube.com/watch?v=L8fvypPrzzs" },
      { id: "tue-3", name: "Dumbbell Step-Ups", sets: 3, reps: "10", videoUrl: "https://www.youtube.com/watch?v=6sFhbT7VQGE" },
      { id: "tue-4", name: "Dumbbell Leg Raises", sets: 3, reps: "15", videoUrl: "https://www.youtube.com/watch?v=JB2oyawG9KI" },
    ],
  },
  {
    id: "wednesday",
    day: "Rabu",
    dayShort: "Rab",
    type: "swim",
    title: "Renang",
    subtitle: "Active Recovery",
    icon: "swim" as IconName,
    color: "#3B82F6",
    exercises: [],
  },
  {
    id: "thursday",
    day: "Kamis",
    dayShort: "Kam",
    type: "upper",
    title: "Upper Body B",
    subtitle: "Shoulders & Arms Focus",
    icon: "muscle" as IconName,
    color: "#DC2626",
    exercises: [
      { id: "thu-1", name: "Seated Dumbbell Shoulder Press", sets: 4, reps: "8-10", videoUrl: "https://www.youtube.com/watch?v=qEwKCR5JCog" },
      { id: "thu-2", name: "Dumbbell Lateral Raise", sets: 4, reps: "12-15", videoUrl: "https://www.youtube.com/watch?v=3VcKaXpzqRo" },
      { id: "thu-3", name: "Dumbbell Bicep Curl", sets: 3, reps: "10-12", videoUrl: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo" },
      { id: "thu-4", name: "Dumbbell Overhead Tricep Extension", sets: 3, reps: "15", videoUrl: "https://www.youtube.com/watch?v=YbX7Wd8jQ-Q" },
      { id: "thu-5", name: "Dumbbell Shrugs", sets: 3, reps: "15", videoUrl: "https://www.youtube.com/watch?v=cJRVVxmytaM" },
    ],
  },
  {
    id: "friday",
    day: "Jumat",
    dayShort: "Jum",
    type: "lower",
    title: "Lower Body B",
    subtitle: "Hamstring & Glute Focus",
    icon: "leg" as IconName,
    color: "#F59E0B",
    exercises: [
      { id: "fri-1", name: "Dumbbell Romanian Deadlift", sets: 4, reps: "10-12", videoUrl: "https://www.youtube.com/watch?v=hCDzSR6bW10" },
      { id: "fri-2", name: "Bulgarian Split Squat", sets: 3, reps: "8-10", videoUrl: "https://www.youtube.com/watch?v=2C-uNgKwPLE" },
      { id: "fri-3", name: "Dumbbell Calf Raises", sets: 4, reps: "15-20", videoUrl: "https://www.youtube.com/watch?v=-M4-G8p8fmc" },
      { id: "fri-4", name: "Superman Pose", sets: 3, duration: "1 menit", videoUrl: "https://www.youtube.com/watch?v=z6PJMT2y8GQ" },
    ],
  },
  {
    id: "saturday",
    day: "Sabtu",
    dayShort: "Sab",
    type: "swim",
    title: "Renang",
    subtitle: "Active Recovery",
    icon: "swim" as IconName,
    color: "#3B82F6",
    exercises: [],
  },
  {
    id: "sunday",
    day: "Minggu",
    dayShort: "Min",
    type: "rest",
    title: "Rest Day",
    subtitle: "Recovery & Regeneration",
    icon: "sleep" as IconName,
    color: "#6B7280",
    exercises: [],
  },
];

export function getTodaySchedule(): WorkoutDay {
  const dayIndex = new Date().getDay();
  // Convert Sunday (0) to index 6, Monday (1) to 0, etc.
  const scheduleIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  return weeklySchedule[scheduleIndex];
}

export function getWorkoutStats(schedule: WorkoutDay[]): {
  totalWorkouts: number;
  totalExercises: number;
  swimDays: number;
  restDays: number;
} {
  const workoutDays = schedule.filter(
    (day) => day.type === "upper" || day.type === "lower"
  );
  const totalExercises = workoutDays.reduce(
    (acc, day) => acc + day.exercises.length,
    0
  );

  return {
    totalWorkouts: workoutDays.length,
    totalExercises,
    swimDays: schedule.filter((day) => day.type === "swim").length,
    restDays: schedule.filter((day) => day.type === "rest").length,
  };
}
