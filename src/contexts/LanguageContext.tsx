"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  id: {
    // Navigation
    "nav.home": "Home",
    "nav.schedule": "Jadwal",
    "nav.progress": "Progress",
    "nav.pr": "PR",
    
    // Home Page
    "home.title": "ASRAPGYM",
    "home.monthStats": "Bulan Ini",
    "home.detail": "Detail",
    "home.workouts": "Latihan",
    "home.exercises": "Gerakan",
    "home.sets": "Set",
    "home.streak": "Streak",
    "home.days": "hari",
    "home.waterIntake": "Minum Air",
    "home.glasses": "gelas",
    "home.todaySchedule": "Jadwal Hari Ini",
    "home.viewSchedule": "Lihat Jadwal →",
    "home.personalRecords": "Personal Records",
    "home.trackPR": "Track PR →",
    "home.prsRecorded": "PR tercatat",
    "home.bodyStats": "Body Stats",
    "home.measure": "Ukur →",
    "home.measurements": "pengukuran",
    "home.achievementBadges": "Achievement Badges",
    "home.unlocked": "unlocked",
    "home.viewAll": "Lihat Semua →",
    "home.dailyQuests": "Quest Harian",
    "home.progress": "progress",
    "home.noQuests": "Semua quest selesai hari ini! 🎉",
    "home.motivationalQuote": "Quote Motivasi",
    
    // Settings
    "settings.title": "Pengaturan",
    "settings.language": "Bahasa",
    "settings.indonesian": "Indonesia",
    "settings.english": "English",
    "settings.resetData": "Reset Data",
    "settings.resetDescription": "Hapus semua data dan mulai dari awal",
    "settings.resetButton": "Reset Semua Data",
    "settings.resetConfirmTitle": "Konfirmasi Reset",
    "settings.resetConfirmMessage": "Apakah Anda yakin ingin menghapus SEMUA data? Tindakan ini tidak dapat dibatalkan.",
    "settings.cancel": "Batal",
    "settings.confirm": "Ya, Hapus Semua",
    "settings.close": "Tutup",
    
    // Schedule Page
    "schedule.title": "Jadwal Latihan",
    "schedule.swimMessage": "Waktu untuk berenang! Nikmati active recovery hari ini.",
    "schedule.swimCompleted": "Selamat! Kamu sudah berenang hari ini! 🎉",
    "schedule.markSwim": "Tandai Sudah Berenang",
    "schedule.swamToday": "Sudah Berenang ✓",
    "schedule.restMessage": "Istirahat total. Biarkan otot pulih dan berkembang.",
    "schedule.tutorial": "Tutorial",
    "schedule.startTraining": "Mulai Latihan",
    "schedule.completed": "Selesai",
    "schedule.todayProgress": "Progress Hari Ini",
    "schedule.exercisesCompleted": "gerakan selesai hari ini",
    "schedule.viewProgress": "Lihat Progress",
    "schedule.set": "Set",
    "schedule.reps": "Repetisi",
    "schedule.duration": "Durasi",
    
    // Progress Page
    "progress.title": "Progress",
    "progress.thisMonth": "Bulan Ini",
    "progress.workouts": "Latihan",
    "progress.streak": "Streak",
    "progress.sets": "Set",
    "progress.swimDays": "Renang",
    "progress.history": "Riwayat Latihan",
    "progress.noWorkout": "Tidak ada latihan",
    "progress.exercises": "gerakan",
    "progress.achievements": "Achievement Badges",
    "progress.all": "Semua",
    "progress.easy": "Mudah",
    "progress.medium": "Menengah",
    "progress.hard": "Sulit",
    "progress.legendary": "Legendaris",
    "progress.locked": "Terkunci",
    "progress.unlocked": "Terbuka",
    
    // PR Page
    "pr.title": "Personal Records",
    "pr.addNew": "Tambah PR Baru",
    "pr.exerciseName": "Nama Gerakan",
    "pr.weight": "Beban (kg)",
    "pr.reps": "Repetisi",
    "pr.notes": "Catatan (opsional)",
    "pr.save": "Simpan",
    "pr.edit": "Edit",
    "pr.delete": "Hapus",
    "pr.deleteConfirm": "Yakin hapus PR ini?",
    "pr.noPRs": "Belum ada PR tercatat",
    "pr.startTracking": "Mulai catat PR pertamamu!",
    
    // Days
    "day.monday": "Senin",
    "day.tuesday": "Selasa",
    "day.wednesday": "Rabu",
    "day.thursday": "Kamis",
    "day.friday": "Jumat",
    "day.saturday": "Sabtu",
    "day.sunday": "Minggu",
    "day.mon": "Sen",
    "day.tue": "Sel",
    "day.wed": "Rab",
    "day.thu": "Kam",
    "day.fri": "Jum",
    "day.sat": "Sab",
    "day.sun": "Min",
    
    // Workout Types
    "workout.upper": "Upper Body",
    "workout.lower": "Lower Body",
    "workout.swim": "Renang",
    "workout.rest": "Istirahat",
    
    // Common
    "common.loading": "Memuat...",
    "common.error": "Terjadi kesalahan",
    "common.retry": "Coba Lagi",
    "common.back": "Kembali",
    "common.next": "Lanjut",
    "common.done": "Selesai",
    "common.today": "Hari Ini",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.schedule": "Schedule",
    "nav.progress": "Progress",
    "nav.pr": "PR",
    
    // Home Page
    "home.title": "ASRAPGYM",
    "home.monthStats": "This Month",
    "home.detail": "Detail",
    "home.workouts": "Workouts",
    "home.exercises": "Exercises",
    "home.sets": "Sets",
    "home.streak": "Streak",
    "home.days": "days",
    "home.waterIntake": "Water Intake",
    "home.glasses": "glasses",
    "home.todaySchedule": "Today's Schedule",
    "home.viewSchedule": "View Schedule →",
    "home.personalRecords": "Personal Records",
    "home.trackPR": "Track PR →",
    "home.prsRecorded": "PRs recorded",
    "home.bodyStats": "Body Stats",
    "home.measure": "Measure →",
    "home.measurements": "measurements",
    "home.achievementBadges": "Achievement Badges",
    "home.unlocked": "unlocked",
    "home.viewAll": "View All →",
    "home.dailyQuests": "Daily Quests",
    "home.progress": "progress",
    "home.noQuests": "All quests completed today! 🎉",
    "home.motivationalQuote": "Motivational Quote",
    
    // Settings
    "settings.title": "Settings",
    "settings.language": "Language",
    "settings.indonesian": "Indonesian",
    "settings.english": "English",
    "settings.resetData": "Reset Data",
    "settings.resetDescription": "Delete all data and start fresh",
    "settings.resetButton": "Reset All Data",
    "settings.resetConfirmTitle": "Confirm Reset",
    "settings.resetConfirmMessage": "Are you sure you want to delete ALL data? This action cannot be undone.",
    "settings.cancel": "Cancel",
    "settings.confirm": "Yes, Delete All",
    "settings.close": "Close",
    
    // Schedule Page
    "schedule.title": "Workout Schedule",
    "schedule.swimMessage": "Time to swim! Enjoy active recovery today.",
    "schedule.swimCompleted": "Congratulations! You've already swam today! 🎉",
    "schedule.markSwim": "Mark as Swam",
    "schedule.swamToday": "Already Swam ✓",
    "schedule.restMessage": "Full rest. Let your muscles recover and grow.",
    "schedule.tutorial": "Tutorial",
    "schedule.startTraining": "Start Training",
    "schedule.completed": "Completed",
    "schedule.todayProgress": "Today's Progress",
    "schedule.exercisesCompleted": "exercises completed today",
    "schedule.viewProgress": "View Progress",
    "schedule.set": "Set",
    "schedule.reps": "Reps",
    "schedule.duration": "Duration",
    
    // Progress Page
    "progress.title": "Progress",
    "progress.thisMonth": "This Month",
    "progress.workouts": "Workouts",
    "progress.streak": "Streak",
    "progress.sets": "Sets",
    "progress.swimDays": "Swim Days",
    "progress.history": "Workout History",
    "progress.noWorkout": "No workout",
    "progress.exercises": "exercises",
    "progress.achievements": "Achievement Badges",
    "progress.all": "All",
    "progress.easy": "Easy",
    "progress.medium": "Medium",
    "progress.hard": "Hard",
    "progress.legendary": "Legendary",
    "progress.locked": "Locked",
    "progress.unlocked": "Unlocked",
    
    // PR Page
    "pr.title": "Personal Records",
    "pr.addNew": "Add New PR",
    "pr.exerciseName": "Exercise Name",
    "pr.weight": "Weight (kg)",
    "pr.reps": "Reps",
    "pr.notes": "Notes (optional)",
    "pr.save": "Save",
    "pr.edit": "Edit",
    "pr.delete": "Delete",
    "pr.deleteConfirm": "Delete this PR?",
    "pr.noPRs": "No PRs recorded yet",
    "pr.startTracking": "Start tracking your first PR!",
    
    // Days
    "day.monday": "Monday",
    "day.tuesday": "Tuesday",
    "day.wednesday": "Wednesday",
    "day.thursday": "Thursday",
    "day.friday": "Friday",
    "day.saturday": "Saturday",
    "day.sunday": "Sunday",
    "day.mon": "Mon",
    "day.tue": "Tue",
    "day.wed": "Wed",
    "day.thu": "Thu",
    "day.fri": "Fri",
    "day.sat": "Sat",
    "day.sun": "Sun",
    
    // Workout Types
    "workout.upper": "Upper Body",
    "workout.lower": "Lower Body",
    "workout.swim": "Swimming",
    "workout.rest": "Rest Day",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "An error occurred",
    "common.retry": "Retry",
    "common.back": "Back",
    "common.next": "Next",
    "common.done": "Done",
    "common.today": "Today",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("asrapgym_language") as Language;
    if (saved && (saved === "id" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("asrapgym_language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Default translations function for SSR
const defaultTranslations = translations.id;

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  // Return default values for SSR or when provider is not yet mounted
  if (context === undefined) {
    return {
      language: "id" as const,
      setLanguage: () => {},
      t: (key: string) => defaultTranslations[key] || key,
    };
  }
  
  return context;
}
