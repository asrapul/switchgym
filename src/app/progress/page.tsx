"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  getMonthlyStats,
  getQuests,
  Quest,
  MonthlyStats,
  getBadges,
  Badge,
  getAllMonthKeys,
  getWorkoutByDate,
  getWorkoutDaysInMonth,
  DailyLog,
} from "@/lib/storage";
import { getHourlyQuote, MotivationalQuote, getGoogleFontsUrl } from "@/data/quotes";
import {
  ChartIcon,
  CalendarIcon,
  WeightliftingIcon,
  MuscleIcon,
  FireIcon,
  LightningIcon,
  TargetIcon,
  TrendUpIcon,
  CheckCircleIcon,
  NotepadIcon,
  SparklesIcon,
  Icon,
  IconName,
  MedalIcon,
} from "@/components/Icons";
import BottomNav from "@/components/BottomNav";

const difficultyColors = {
  easy: { bg: "#10B981", text: "Easy" },
  medium: { bg: "#3B82F6", text: "Medium" },
  hard: { bg: "#F59E0B", text: "Hard" },
  legendary: { bg: "#FFD700", text: "Legendary" },
};

export default function ProgressPage() {
  const [stats, setStats] = useState<MonthlyStats | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [quote, setQuote] = useState<MotivationalQuote | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [activeTab, setActiveTab] = useState<"stats" | "quests" | "badges" | "history">("stats");
  const [exporting, setExporting] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [workoutDays, setWorkoutDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<DailyLog | null>(null);
  const [badgeFilter, setBadgeFilter] = useState<"all" | "easy" | "medium" | "hard" | "legendary">("all");
  const exportRef = useRef<HTMLDivElement>(null);

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
    setBadges(getBadges());
    
    // Load available months
    const months = getAllMonthKeys();
    setAvailableMonths(months);
    if (months.length > 0) {
      setSelectedMonth(months[0]);
      setWorkoutDays(getWorkoutDaysInMonth(months[0]));
    }

    // Update quote every hour
    const interval = setInterval(() => {
      setQuote(getHourlyQuote());
    }, 3600000);

    return () => {
      clearInterval(interval);
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      setWorkoutDays(getWorkoutDaysInMonth(selectedMonth));
      setStats(getMonthlyStats(selectedMonth));
    }
  }, [selectedMonth]);

  const getMonthName = (monthKey: string): string => {
    const [year, month] = monthKey.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    const workout = getWorkoutByDate(date);
    setSelectedWorkout(workout);
  };

  const completedQuests = quests.filter((q) => q.completed);
  const activeQuests = quests.filter((q) => !q.completed);
  const unlockedBadges = badges.filter((b) => b.unlockedAt);
  const lockedBadges = badges.filter((b) => !b.unlockedAt);
  
  const filteredBadges = badgeFilter === "all" 
    ? badges 
    : badges.filter(b => b.difficulty === badgeFilter);

  const handleExport = async () => {
    if (!exportRef.current) return;
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(exportRef.current, {
        backgroundColor: "#0A0A0A",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = `asrapgym-progress-${new Date().toISOString().split("T")[0]}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export gagal. Pastikan koneksi internet stabil.");
    }
    setExporting(false);
  };

  // Generate calendar days
  const getCalendarDays = (): { emptyDays: null[]; days: { date: string; day: number; isWorkout: boolean }[] } => {
    if (!selectedMonth) return { emptyDays: [], days: [] };
    const [year, month] = selectedMonth.split("-").map(Number);
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    const days: { date: string; day: number; isWorkout: boolean }[] = [];
    
    for (let i = 0; i < daysInMonth; i++) {
      const day = i + 1;
      const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      days.push({
        date: dateStr,
        day,
        isWorkout: workoutDays.includes(dateStr),
      });
    }
    
    // Add empty days for alignment
    const emptyDays: null[] = Array(startDayOfWeek).fill(null);
    return { emptyDays, days };
  };

  const calendar = getCalendarDays();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-effect">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[#A3A3A3] hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold">Progress</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={exporting}
              className="px-3 py-1.5 bg-[#DC2626] hover:bg-[#B91C1C] rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
            >
              {exporting ? "..." : "📤 Export"}
            </button>
            <ChartIcon size={28} color="#DC2626" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24 px-4 max-w-lg mx-auto">
        {/* Tab Switcher */}
        <section className="mb-4">
          <div className="flex bg-[#1A1A1A] rounded-xl p-1">
            {[
              { id: "stats", label: "Stats", icon: TrendUpIcon },
              { id: "history", label: "Riwayat", icon: CalendarIcon },
              { id: "badges", label: "Badges", icon: MedalIcon },
              { id: "quests", label: "Quests", icon: TargetIcon },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex-1 py-2 px-1 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1 ${
                  activeTab === tab.id
                    ? "bg-[#DC2626] text-white"
                    : "text-[#A3A3A3] hover:text-white"
                }`}
              >
                <tab.icon size={12} color={activeTab === tab.id ? "#fff" : "#A3A3A3"} />
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <div ref={exportRef}>
            {/* Motivational Quote */}
            {quote && (
              <section className="mb-6">
                <div className="bg-gradient-to-br from-[#DC2626]/20 to-[#991B1B]/20 rounded-2xl p-6 border border-[#DC2626]/30 relative overflow-hidden">
                  <div className="absolute top-2 right-3 opacity-20">
                    <MuscleIcon size={48} color="#FAFAFA" />
                  </div>
                  <blockquote
                    className="text-lg leading-relaxed mb-2"
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
                    <p className="text-sm text-[#A3A3A3]">— {quote.author}</p>
                  )}
                </div>
              </section>
            )}

            {/* Month Selector */}
            <div className="mb-4">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white"
              >
                {availableMonths.map((month) => (
                  <option key={month} value={month}>
                    {getMonthName(month)}
                  </option>
                ))}
              </select>
            </div>

            {/* Stats Grid */}
            {stats && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D]">
                  <div className="flex items-center gap-2 mb-2">
                    <WeightliftingIcon size={20} color="#DC2626" />
                    <span className="text-xs text-[#A3A3A3]">Workout Days</span>
                  </div>
                  <div className="text-3xl font-bold text-[#DC2626]">{stats.totalWorkouts}</div>
                </div>

                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D]">
                  <div className="flex items-center gap-2 mb-2">
                    <MuscleIcon size={20} color="#F59E0B" />
                    <span className="text-xs text-[#A3A3A3]">Exercises</span>
                  </div>
                  <div className="text-3xl font-bold text-[#F59E0B]">{stats.totalExercises}</div>
                </div>

                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D]">
                  <div className="flex items-center gap-2 mb-2">
                    <FireIcon size={20} color="#EF4444" />
                    <span className="text-xs text-[#A3A3A3]">Total Sets</span>
                  </div>
                  <div className="text-3xl font-bold text-[#EF4444]">{stats.totalSets}</div>
                </div>

                <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D]">
                  <div className="flex items-center gap-2 mb-2">
                    <LightningIcon size={20} color="#10B981" />
                    <span className="text-xs text-[#A3A3A3]">Streak Days</span>
                  </div>
                  <div className="text-3xl font-bold text-[#10B981]">{stats.streakDays}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <section>
            {/* Month Selector */}
            <div className="mb-4">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white"
              >
                {availableMonths.map((month) => (
                  <option key={month} value={month}>
                    {getMonthName(month)}
                  </option>
                ))}
              </select>
            </div>

            {/* Calendar */}
            <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D] mb-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
                  <div key={day} className="text-center text-xs text-[#A3A3A3] py-1">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendar.emptyDays?.map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {calendar.days?.map((day) => (
                  <button
                    key={day.date}
                    onClick={() => handleDateClick(day.date)}
                    className={`aspect-square rounded-lg text-sm flex items-center justify-center transition-all ${
                      selectedDate === day.date
                        ? "bg-[#DC2626] text-white"
                        : day.isWorkout
                        ? "bg-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/50"
                        : "bg-[#2D2D2D] text-[#A3A3A3] hover:bg-[#404040]"
                    }`}
                  >
                    {day.day}
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-[#10B981]/30"></div>
                  <span className="text-[#A3A3A3]">Latihan</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-[#2D2D2D]"></div>
                  <span className="text-[#A3A3A3]">Tidak latihan</span>
                </div>
              </div>
            </div>

            {/* Selected Date Workout */}
            {selectedDate && (
              <div className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D]">
                <h3 className="text-sm font-semibold mb-3">
                  {new Date(selectedDate).toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h3>
                {selectedWorkout ? (
                  <div className="space-y-2">
                    <p className="text-xs text-[#A3A3A3] mb-2">
                      {selectedWorkout.exercises.length} latihan • {selectedWorkout.exercises.reduce((a, e) => a + e.sets, 0)} sets
                    </p>
                    {selectedWorkout.exercises.map((ex) => (
                      <div key={ex.exerciseId} className="bg-[#2D2D2D] rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{ex.exerciseName}</span>
                          <span className="text-xs text-[#A3A3A3]">{ex.sets} sets</span>
                        </div>
                        {ex.note && (
                          <p className="text-xs text-[#A3A3A3] mt-1">📝 {ex.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-[#A3A3A3]">Tidak ada latihan di tanggal ini</p>
                )}
              </div>
            )}

            {/* Monthly Summary */}
            {stats && (
              <div className="mt-4 bg-gradient-to-r from-[#DC2626]/20 to-[#F59E0B]/20 rounded-xl p-4 border border-[#DC2626]/30">
                <h3 className="text-sm font-semibold mb-2">Rekap {getMonthName(selectedMonth)}</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#DC2626]">{stats.totalWorkouts}</div>
                    <div className="text-[10px] text-[#A3A3A3]">Hari Latihan</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#F59E0B]">{stats.totalExercises}</div>
                    <div className="text-[10px] text-[#A3A3A3]">Latihan</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#10B981]">{stats.totalSets}</div>
                    <div className="text-[10px] text-[#A3A3A3]">Total Sets</div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Badges Tab */}
        {activeTab === "badges" && (
          <section className="space-y-4">
            {/* Difficulty Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { id: "all", label: "Semua", color: "#A3A3A3" },
                { id: "easy", label: "Easy", color: "#10B981" },
                { id: "medium", label: "Medium", color: "#3B82F6" },
                { id: "hard", label: "Hard", color: "#F59E0B" },
                { id: "legendary", label: "Legendary", color: "#FFD700" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setBadgeFilter(filter.id as typeof badgeFilter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all ${
                    badgeFilter === filter.id
                      ? "text-white"
                      : "text-[#A3A3A3] border-[#2D2D2D]"
                  }`}
                  style={{
                    backgroundColor: badgeFilter === filter.id ? filter.color : "transparent",
                    borderColor: badgeFilter === filter.id ? filter.color : undefined,
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Badge Count */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#A3A3A3]">
                {filteredBadges.filter(b => b.unlockedAt).length}/{filteredBadges.length} unlocked
              </span>
            </div>

            {/* Badge Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredBadges.map((badge) => {
                const isUnlocked = !!badge.unlockedAt;
                const diffColor = difficultyColors[badge.difficulty];
                return (
                  <div
                    key={badge.id}
                    className={`bg-[#1A1A1A] rounded-xl p-4 border text-center transition-all ${
                      isUnlocked ? "border-[#2D2D2D]" : "border-[#2D2D2D] opacity-50"
                    }`}
                    style={{ borderColor: isUnlocked ? `${badge.color}50` : undefined }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                      style={{ backgroundColor: isUnlocked ? `${badge.color}20` : "#2D2D2D" }}
                    >
                      <Icon name={badge.icon} size={24} color={isUnlocked ? badge.color : "#A3A3A3"} />
                    </div>
                    <h4 
                      className="text-sm font-semibold"
                      style={{ color: isUnlocked ? badge.color : "#A3A3A3" }}
                    >
                      {badge.title}
                    </h4>
                    <p className="text-[10px] text-[#A3A3A3] mt-1 line-clamp-2">{badge.description}</p>
                    <span 
                      className="inline-block mt-2 px-2 py-0.5 rounded-full text-[8px] font-medium"
                      style={{ backgroundColor: `${diffColor.bg}20`, color: diffColor.bg }}
                    >
                      {diffColor.text}
                    </span>
                    {isUnlocked && (
                      <p className="text-[8px] text-[#A3A3A3] mt-1">
                        {new Date(badge.unlockedAt!).toLocaleDateString("id-ID")}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Quests Tab */}
        {activeTab === "quests" && (
          <section className="space-y-4">
            {activeQuests.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TargetIcon size={16} color="#DC2626" />
                  <h3 className="text-sm font-medium text-[#A3A3A3]">Quest Aktif</h3>
                </div>
                <div className="space-y-3">
                  {activeQuests.map((quest) => (
                    <QuestCard key={quest.id} quest={quest} />
                  ))}
                </div>
              </div>
            )}

            {completedQuests.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircleIcon size={16} color="#10B981" />
                  <h3 className="text-sm font-medium text-[#A3A3A3]">Quest Selesai</h3>
                </div>
                <div className="space-y-3">
                  {completedQuests.map((quest) => (
                    <QuestCard key={quest.id} quest={quest} />
                  ))}
                </div>
              </div>
            )}

            {quests.length === 0 && (
              <div className="bg-[#1A1A1A] rounded-xl p-8 border border-[#2D2D2D] text-center">
                <div className="flex justify-center mb-3">
                  <TargetIcon size={48} color="#A3A3A3" />
                </div>
                <p className="text-[#A3A3A3]">Quest akan muncul setelah kamu mulai latihan!</p>
              </div>
            )}
          </section>
        )}
      </main>

      <BottomNav />
    </div>
  );
}

function QuestCard({ quest }: { quest: Quest }) {
  const progress = Math.min((quest.current / quest.target) * 100, 100);
  const typeColors = {
    daily: "#10B981",
    weekly: "#3B82F6",
    monthly: "#8B5CF6",
  };

  return (
    <div
      className={`bg-[#1A1A1A] rounded-xl p-4 border transition-all ${
        quest.completed
          ? "border-[#10B981]/50 bg-[#10B981]/5"
          : "border-[#2D2D2D] hover:border-[#404040]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            quest.completed ? "bg-[#10B981]/20" : "bg-[#2D2D2D]"
          }`}
        >
          {quest.completed ? (
            <CheckCircleIcon size={24} color="#10B981" />
          ) : (
            <Icon name={quest.icon as IconName} size={24} color="#FAFAFA" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm">{quest.title}</h4>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ backgroundColor: `${typeColors[quest.type]}20`, color: typeColors[quest.type] }}
            >
              {quest.type}
            </span>
          </div>
          <p className="text-xs text-[#A3A3A3] mb-2">{quest.description}</p>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-[#2D2D2D] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  backgroundColor: quest.completed ? "#10B981" : "#DC2626",
                }}
              />
            </div>
            <span className="text-xs text-[#A3A3A3] min-w-[50px] text-right">
              {quest.current}/{quest.target}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-1">
            <span className="text-[10px] text-[#A3A3A3]">Reward:</span>
            <div className="flex items-center gap-1">
              {quest.rewardIcon && (
                <Icon name={quest.rewardIcon as IconName} size={12} color="#F59E0B" />
              )}
              <span className="text-xs font-medium text-[#F59E0B]">{quest.reward}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
