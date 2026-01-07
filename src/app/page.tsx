"use client";

import { useState, useEffect } from "react";
import { getTodaySchedule, weeklySchedule } from "@/data/schedule";
import { getMonthlyStats, getQuests, Quest, MonthlyStats, getWaterIntake, addWaterGlass, removeWaterGlass, WaterIntake, getBadges, getUnlockedBadgesCount, checkBadgeUnlocks } from "@/lib/storage";
import { getHourlyQuote, MotivationalQuote, getGoogleFontsUrl } from "@/data/quotes";
import {
  trainingModes,
  TrainingMode,
  getSelectedTrainingMode,
  setSelectedTrainingMode,
} from "@/data/timer";
import Link from "next/link";
import {
  SettingsIcon,
  MuscleIcon,
  LightningIcon,
  Icon,
  IconName,
  TrophyIcon,
  WaveIcon,
  FireIcon,
  MedalIcon,
  ChartIcon,
} from "@/components/Icons";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import BottomNav from "@/components/BottomNav";
import AchievementNotification, { useAchievementNotification } from "@/components/AchievementNotification";
import SettingsModal from "@/components/SettingsModal";

export default function Home() {
  const [stats, setStats] = useState<MonthlyStats | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [quote, setQuote] = useState<MotivationalQuote | null>(null);
  const [selectedMode, setSelectedMode] = useState<TrainingMode>("hypertrophy");
  const [waterIntake, setWaterIntake] = useState<WaterIntake | null>(null);
  const [badgeCount, setBadgeCount] = useState(0);
  const [totalBadges, setTotalBadges] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();
  const { t } = useLanguage();
  const { unlockedBadge, showNotification, handleClose } = useAchievementNotification();
  
  const todaySchedule = getTodaySchedule();

  useEffect(() => {
    // Load fonts dynamically
    const link = document.createElement("link");
    link.href = getGoogleFontsUrl();
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Load data
    setStats(getMonthlyStats());
    setQuests(getQuests());
    setQuote(getHourlyQuote());
    setSelectedMode(getSelectedTrainingMode());
    setWaterIntake(getWaterIntake());
    setBadgeCount(getUnlockedBadgesCount());
    setTotalBadges(getBadges().length);

    // Check for new badge unlocks
    const newBadges = checkBadgeUnlocks();
    newBadges.forEach(badge => showNotification(badge));

    // Update quote every hour
    const interval = setInterval(() => {
      setQuote(getHourlyQuote());
    }, 3600000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const activeQuests = quests.filter((q) => !q.completed).slice(0, 2);

  // Calculate countdown to next workout
  const getNextWorkoutCountdown = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(6, 0, 0, 0); // Assume workout at 6 AM
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours, minutes };
  };

  const countdown = getNextWorkoutCountdown();

  const handleAddWater = () => {
    const updated = addWaterGlass();
    setWaterIntake(updated);
  };

  const handleRemoveWater = () => {
    const updated = removeWaterGlass();
    setWaterIntake(updated);
  };

  return (
    <>
      <AchievementNotification badge={unlockedBadge} onClose={handleClose} />
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-effect">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/switchgym_logo.svg" alt="Switch Gym" className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold leading-tight">
                <span className="text-[#FAFAFA]">Switch</span>
                <span className="text-[#DC2626]">Gym</span>
              </h1>
              <p className="text-[9px] text-[#A3A3A3] -mt-0.5">by Asrap</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#2D2D2D] hover:border-[#DC2626] transition-colors"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5 text-[#F59E0B]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-[#6366F1]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <button 
              onClick={() => setSettingsOpen(true)}
              className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-[#2D2D2D] hover:border-[#DC2626] transition-colors"
            >
              <SettingsIcon size={20} color="#A3A3A3" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24 px-4 max-w-lg mx-auto">
        {/* Motivational Quote */}
        {quote && mounted && (
          <section className="mb-6">
            <div className="bg-gradient-to-br from-[#DC2626]/10 to-[#991B1B]/10 rounded-2xl p-5 border border-[#DC2626]/20 relative overflow-hidden">
              <div className="absolute top-2 right-3 opacity-10">
                <MuscleIcon size={40} color="#FAFAFA" />
              </div>
              <blockquote
                className="text-sm leading-relaxed"
                style={{
                  fontFamily: quote.fontFamily,
                  fontWeight: quote.fontWeight,
                  letterSpacing: quote.letterSpacing || "normal",
                  textTransform: (quote.textTransform as React.CSSProperties["textTransform"]) || "none",
                }}
              >
                "{quote.text}"
              </blockquote>
              {quote.author && (
                <p className="text-xs text-[#A3A3A3] mt-2">— {quote.author}</p>
              )}
            </div>
          </section>
        )}

        {/* Quick Actions Grid */}
        {mounted && (
          <section className="mb-6">
            <div className="grid grid-cols-2 gap-3">
              {/* Water Tracker Card */}
              <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <WaveIcon size={18} color="#3B82F6" />
                    <span className="text-xs text-[#A3A3A3]">{t("home.waterIntake")}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-[#3B82F6]">
                    {waterIntake?.glasses || 0}/{waterIntake?.goal || 8}
                  </span>
                  <span className="text-xs text-[#A3A3A3]">{t("home.glasses")}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleRemoveWater}
                    className="flex-1 py-1 bg-[#2D2D2D] hover:bg-[#404040] rounded text-sm transition-colors"
                  >
                    -
                  </button>
                  <button
                    onClick={handleAddWater}
                    className="flex-1 py-1 bg-[#3B82F6] hover:bg-[#2563EB] rounded text-sm transition-colors"
                  >
                    +
                  </button>
                </div>
                {waterIntake && waterIntake.glasses >= waterIntake.goal && (
                  <p className="text-[10px] text-[#10B981] mt-2 text-center">✓ Target tercapai!</p>
                )}
              </div>

              {/* Countdown Card */}
              <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D]">
                <div className="flex items-center gap-2 mb-2">
                  <FireIcon size={18} color="#F59E0B" />
                  <span className="text-xs text-[#A3A3A3]">{t("home.todaySchedule")}</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-[#F59E0B]">
                    {countdown.hours}h {countdown.minutes}m
                  </span>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-[10px] bg-[#F59E0B]/20 text-[#F59E0B] px-2 py-0.5 rounded">
                    {weeklySchedule[(new Date().getDay() === 6 ? 0 : new Date().getDay())].title}
                  </span>
                </div>
              </div>

              {/* PR Tracker Link */}
              <Link href="/pr" className="bg-gradient-to-br from-[#F59E0B]/20 to-[#F59E0B]/5 rounded-xl p-4 border border-[#F59E0B]/30 hover:border-[#F59E0B] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <TrophyIcon size={18} color="#F59E0B" />
                  <span className="text-xs text-[#A3A3A3]">{t("home.personalRecords")}</span>
                </div>
                <p className="text-sm font-medium">{t("home.trackPR")}</p>
              </Link>

              {/* Measurements Link */}
              <Link href="/measurements" className="bg-gradient-to-br from-[#10B981]/20 to-[#10B981]/5 rounded-xl p-4 border border-[#10B981]/30 hover:border-[#10B981] transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <ChartIcon size={18} color="#10B981" />
                  <span className="text-xs text-[#A3A3A3]">{t("home.bodyStats")}</span>
                </div>
                <p className="text-sm font-medium">{t("home.measure")}</p>
              </Link>
            </div>
          </section>
        )}

        {/* Badges Preview */}
        {mounted && (
          <section className="mb-6">
            <Link href="/progress">
              <div className="bg-gradient-to-r from-[#8B5CF6]/20 to-[#EC4899]/20 rounded-xl p-4 border border-[#8B5CF6]/30 flex items-center justify-between hover:border-[#8B5CF6] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/30 flex items-center justify-center">
                    <MedalIcon size={20} color="#8B5CF6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t("home.achievementBadges")}</p>
                    <p className="text-xs text-[#A3A3A3]">{badgeCount}/{totalBadges} {t("home.unlocked")}</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-[#A3A3A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </section>
        )}

        {/* Monthly Stats */}
        {mounted && stats && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">{t("home.monthStats")}</h3>
              <Link href="/progress" className="text-[#DC2626] text-sm font-medium hover:underline">
                {t("home.detail")}
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-[#1A1A1A] rounded-xl p-3 text-center border border-[#2D2D2D]">
                <div className="text-xl font-bold text-[#DC2626]">{stats.totalWorkouts}</div>
                <div className="text-[10px] text-[#A3A3A3]">{t("home.workouts")}</div>
              </div>
              <div className="bg-[#1A1A1A] rounded-xl p-3 text-center border border-[#2D2D2D]">
                <div className="text-xl font-bold text-[#F59E0B]">{stats.totalExercises}</div>
                <div className="text-[10px] text-[#A3A3A3]">{t("home.exercises")}</div>
              </div>
              <div className="bg-[#1A1A1A] rounded-xl p-3 text-center border border-[#2D2D2D]">
                <div className="text-xl font-bold text-[#EF4444]">{stats.totalSets}</div>
                <div className="text-[10px] text-[#A3A3A3]">{t("home.sets")}</div>
              </div>
              <div className="bg-[#1A1A1A] rounded-xl p-3 text-center border border-[#2D2D2D]">
                <div className="text-xl font-bold text-[#10B981]">{stats.streakDays}</div>
                <div className="text-[10px] text-[#A3A3A3]">{t("home.streak")}</div>
              </div>
            </div>
          </section>
        )}

        {/* Training Mode Selector */}
        {mounted && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <LightningIcon size={20} color="#F59E0B" />
                <h3 className="text-lg font-semibold">Mode Latihan</h3>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {trainingModes.map((mode) => {
                const isSelected = selectedMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setSelectedMode(mode.id);
                      setSelectedTrainingMode(mode.id);
                    }}
                    className={`relative rounded-xl p-3 text-center transition-all duration-300 border-2 ${
                      isSelected
                        ? "scale-[1.02]"
                        : "bg-[#1A1A1A] border-[#2D2D2D] hover:border-[#404040]"
                    }`}
                    style={{
                      backgroundColor: isSelected ? `${mode.color}20` : undefined,
                      borderColor: isSelected ? mode.color : undefined,
                    }}
                  >
                    <div className="flex justify-center mb-1">
                      <Icon name={mode.icon as IconName} size={28} color={isSelected ? mode.color : "#FAFAFA"} />
                    </div>
                    <div
                      className="text-xs font-semibold"
                      style={{ color: isSelected ? mode.color : "#FAFAFA" }}
                    >
                      {mode.name}
                    </div>
                    <div className="text-[10px] text-[#A3A3A3] mt-0.5">
                      {Math.floor(mode.restTime / 60)}:{(mode.restTime % 60).toString().padStart(2, "0")} rest
                    </div>
                    {isSelected && (
                      <div
                        className="absolute top-1 right-1 w-2 h-2 rounded-full"
                        style={{ backgroundColor: mode.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Today's Schedule */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Latihan Hari Ini</h3>
            <Link href="/schedule" className="text-[#DC2626] text-sm font-medium hover:underline">
              Lihat Semua
            </Link>
          </div>
          
          <Link href="/schedule">
            <div 
              className="rounded-xl p-5 border border-[#2D2D2D] hover:border-[#404040] transition-all card-hover cursor-pointer"
              style={{ 
                background: `linear-gradient(135deg, ${todaySchedule.color}15, ${todaySchedule.color}05)`,
                borderColor: `${todaySchedule.color}30`
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${todaySchedule.color}20` }}
                >
                  <Icon name={todaySchedule.icon as IconName} size={28} color={todaySchedule.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span 
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: todaySchedule.color, color: "white" }}
                    >
                      {todaySchedule.day}
                    </span>
                  </div>
                  <h4 className="font-semibold text-lg">{todaySchedule.title}</h4>
                  <p className="text-sm text-[#A3A3A3]">
                    {todaySchedule.exercises.length > 0 
                      ? `${todaySchedule.exercises.length} gerakan • ${todaySchedule.exercises.reduce((a, e) => a + e.sets, 0)} set`
                      : todaySchedule.subtitle}
                  </p>
                </div>
                <svg className="w-5 h-5 text-[#A3A3A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </section>

        {/* Week Overview */}
        <section>
          <h3 className="text-lg font-semibold mb-3">Minggu Ini</h3>
          <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D]">
            <div className="flex justify-between">
              {weeklySchedule.map((day) => {
                const isToday = getTodaySchedule().id === day.id;
                return (
                  <Link key={day.id} href="/schedule">
                    <div 
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all cursor-pointer hover:bg-[#2D2D2D] ${
                        isToday ? "ring-2 ring-[#DC2626]" : ""
                      }`}
                    >
                      <span className="text-[10px] text-[#A3A3A3]">{day.dayShort}</span>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <Icon name={day.icon as IconName} size={20} color={day.color} />
                      </div>
                      {isToday && <div className="w-1 h-1 rounded-full bg-[#DC2626]"></div>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
    </>
  );
}
