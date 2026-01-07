"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { weeklySchedule, getTodaySchedule, WorkoutDay, Exercise } from "@/data/schedule";
import {
  markExerciseComplete,
  unmarkExerciseComplete,
  isExerciseCompletedToday,
  markSwimDay,
  isSwimCompletedToday,
  CompletedExercise,
  checkBadgeUnlocks,
} from "@/lib/storage";
import { getSelectedTrainingMode, getTrainingMode } from "@/data/timer";
import RestTimerModal from "@/components/RestTimerModal";
import VideoTutorialModal from "@/components/VideoTutorialModal";
import { Icon, IconName, ChartIcon, VideoIcon, RocketIcon, CheckIcon } from "@/components/Icons";
import BottomNav from "@/components/BottomNav";
import AchievementNotification, { useAchievementNotification } from "@/components/AchievementNotification";

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<WorkoutDay>(getTodaySchedule());
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);
  const [timerModalOpen, setTimerModalOpen] = useState(false);
  const [timerExercise, setTimerExercise] = useState<Exercise | null>(null);
  const [swimCompleted, setSwimCompleted] = useState(false);
  const { unlockedBadge, showNotification, handleClose } = useAchievementNotification();
  
  // Video tutorial modal state
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoExercise, setVideoExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    setMounted(true);
    // Load completed exercises from localStorage
    const loadCompleted = () => {
      const completed = new Set<string>();
      weeklySchedule.forEach((day) => {
        day.exercises.forEach((ex) => {
          if (isExerciseCompletedToday(ex.id)) {
            completed.add(ex.id);
          }
        });
      });
      setCompletedExercises(completed);
    };
    loadCompleted();
    setSwimCompleted(isSwimCompletedToday());
  }, []);

  const handleToggleComplete = (exercise: Exercise, dayId: string) => {
    const isCompleted = completedExercises.has(exercise.id);

    if (isCompleted) {
      unmarkExerciseComplete(exercise.id);
      setCompletedExercises((prev) => {
        const next = new Set(prev);
        next.delete(exercise.id);
        return next;
      });
    } else {
      const completedExercise: CompletedExercise = {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        dayId,
        completedAt: new Date().toISOString(),
        sets: exercise.sets,
        reps: exercise.reps,
        duration: exercise.duration,
      };
      markExerciseComplete(completedExercise, dayId);
      setCompletedExercises((prev) => {
        const next = new Set(prev);
        next.add(exercise.id);
        return next;
      });
      
      // Check for new badge unlocks
      const newBadges = checkBadgeUnlocks();
      newBadges.forEach(badge => showNotification(badge));
    }
  };

  const handleSwimComplete = () => {
    markSwimDay();
    setSwimCompleted(true);
    
    // Check for new badge unlocks
    const newBadges = checkBadgeUnlocks();
    newBadges.forEach(badge => showNotification(badge));
  };

  const getDayBgClass = (day: WorkoutDay, isSelected: boolean) => {
    if (isSelected) {
      switch (day.type) {
        case "upper":
          return "bg-[#DC2626]";
        case "lower":
          return "bg-[#F59E0B]";
        case "swim":
          return "bg-[#3B82F6]";
        case "rest":
          return "bg-[#6B7280]";
        default:
          return "bg-[#DC2626]";
      }
    }
    return "bg-[#1A1A1A]";
  };

  const completedCount = selectedDay.exercises.filter((ex) =>
    completedExercises.has(ex.id)
  ).length;
  const totalExercises = selectedDay.exercises.length;
  const progressPercent = totalExercises > 0 ? (completedCount / totalExercises) * 100 : 0;

  return (
    <>
      <AchievementNotification badge={unlockedBadge} onClose={handleClose} />
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
            <h1 className="text-xl font-bold">Jadwal Latihan</h1>
          </div>
          <div className="w-8 h-8 flex items-center justify-center">
            <Icon name={selectedDay.icon as IconName} size={28} color={selectedDay.color} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24 px-4 max-w-lg mx-auto">
        {/* Day Selector - Horizontal Scroll */}
        <section className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {weeklySchedule.map((day) => {
              const isSelected = selectedDay.id === day.id;
              const isToday = getTodaySchedule().id === day.id;

              return (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day)}
                  className={`flex-shrink-0 flex flex-col items-center p-3 rounded-xl transition-all duration-300 min-w-[60px] ${getDayBgClass(
                    day,
                    isSelected
                  )} ${isSelected ? "scale-105 shadow-lg" : "border border-[#2D2D2D] hover:border-[#404040]"}`}
                >
                  <span className={`text-xs font-medium ${isSelected ? "text-white/80" : "text-[#A3A3A3]"}`}>
                    {day.dayShort}
                  </span>
                  <div className="my-1">
                    <Icon name={day.icon as IconName} size={22} color={isSelected ? "#fff" : day.color} />
                  </div>
                  {isToday && (
                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-white" : "bg-[#DC2626]"}`}></div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected Day Header */}
        <section className="mb-6">
          <div
            className="rounded-2xl p-6 relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${selectedDay.color}, ${selectedDay.color}88)` }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/30 -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-black/20 translate-y-1/2 -translate-x-1/2"></div>
            </div>

            <div className="relative z-10">
              <p className="text-sm opacity-80 mb-1">{selectedDay.day}</p>
              <h2 className="text-2xl font-bold mb-1">{selectedDay.title}</h2>
              {selectedDay.subtitle && <p className="text-sm opacity-80">{selectedDay.subtitle}</p>}

              {/* Progress Bar for workout days */}
              {selectedDay.exercises.length > 0 && mounted && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs opacity-80">Progress Hari Ini</span>
                    <span className="text-sm font-bold">
                      {completedCount}/{totalExercises}
                    </span>
                  </div>
                  <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Large Icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30">
              <Icon name={selectedDay.icon as IconName} size={72} color="#fff" />
            </div>
          </div>
        </section>

        {/* Exercise List */}
        <section>
          {selectedDay.exercises.length > 0 ? (
            <div className="space-y-3">
              {selectedDay.exercises.map((exercise, index) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  index={index + 1}
                  isExpanded={expandedExercise === exercise.id}
                  isCompleted={completedExercises.has(exercise.id)}
                  onToggle={() => setExpandedExercise(expandedExercise === exercise.id ? null : exercise.id)}
                  onComplete={() => handleToggleComplete(exercise, selectedDay.id)}
                  onStartTraining={() => {
                    setTimerExercise(exercise);
                    setTimerModalOpen(true);
                  }}
                  onWatchTutorial={() => {
                    setVideoExercise(exercise);
                    setVideoModalOpen(true);
                  }}
                  accentColor={selectedDay.color}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#1A1A1A] rounded-xl p-8 text-center border border-[#2D2D2D]">
              <div className="flex justify-center mb-4">
                <Icon name={selectedDay.icon as IconName} size={72} color={selectedDay.color} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{selectedDay.title}</h3>
              <p className="text-[#A3A3A3] mb-4">
                {selectedDay.type === "swim"
                  ? swimCompleted 
                    ? "Selamat! Kamu sudah berenang hari ini! 🎉"
                    : "Waktu untuk berenang! Nikmati active recovery hari ini."
                  : "Istirahat total. Biarkan otot pulih dan berkembang."}
              </p>
              {selectedDay.type === "swim" && (
                <button
                  onClick={handleSwimComplete}
                  disabled={swimCompleted}
                  className={`inline-flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    swimCompleted
                      ? "bg-[#10B981] cursor-default"
                      : "bg-[#3B82F6] hover:bg-[#2563EB]"
                  }`}
                >
                  <CheckIcon size={16} color="#fff" />
                  {swimCompleted ? "Sudah Berenang ✓" : "Tandai Sudah Berenang"}
                </button>
              )}
            </div>
          )}
        </section>

        {/* Link to Progress */}
        {mounted && completedCount > 0 && (
          <section className="mt-6">
            <Link href="/progress">
              <div className="bg-gradient-to-r from-[#DC2626]/20 to-[#F59E0B]/20 rounded-xl p-4 border border-[#DC2626]/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ChartIcon size={28} color="#DC2626" />
                  <div>
                    <p className="text-sm font-medium">Lihat Progress</p>
                    <p className="text-xs text-[#A3A3A3]">{completedCount} gerakan selesai hari ini</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-[#A3A3A3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </section>
        )}
      </main>

      {/* Rest Timer Modal */}
      {timerExercise && (
        <RestTimerModal
          isOpen={timerModalOpen}
          onClose={() => {
            setTimerModalOpen(false);
            setTimerExercise(null);
          }}
          exerciseName={timerExercise.name}
          totalSets={timerExercise.sets}
          restTimeSeconds={getTrainingMode(getSelectedTrainingMode()).restTime}
          onComplete={() => {
            handleToggleComplete(timerExercise, selectedDay.id);
            setTimerModalOpen(false);
            setTimerExercise(null);
          }}
          accentColor={selectedDay.color}
        />
      )}

      {/* Video Tutorial Modal */}
      {videoModalOpen && videoExercise && (
        <VideoTutorialModal
          isOpen={videoModalOpen}
          onClose={() => {
            setVideoModalOpen(false);
            setVideoExercise(null);
          }}
          exerciseName={videoExercise.name}
          videoUrl={videoExercise.videoUrl || ""}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
    </>
  );
}

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  isExpanded: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  onComplete: () => void;
  onStartTraining: () => void;
  onWatchTutorial: () => void;
  accentColor: string;
}

function ExerciseCard({
  exercise,
  index,
  isExpanded,
  isCompleted,
  onToggle,
  onComplete,
  onStartTraining,
  onWatchTutorial,
  accentColor,
}: ExerciseCardProps) {
  return (
    <div
      className={`rounded-xl border-2 overflow-hidden transition-all duration-300 ${
        isCompleted
          ? "bg-[#10B981]/10 border-[#10B981]/50"
          : isExpanded
          ? "bg-[#1A1A1A]"
          : "bg-[#1A1A1A] border-[#2D2D2D] hover:border-[#404040]"
      }`}
      style={{ borderColor: isExpanded && !isCompleted ? accentColor : undefined }}
    >
      <button onClick={onToggle} className="w-full p-4 flex items-center gap-4 text-left">
        {/* Number Badge / Check */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white flex-shrink-0 transition-all ${
            isCompleted ? "bg-[#10B981]" : ""
          }`}
          style={{ backgroundColor: isCompleted ? undefined : accentColor }}
        >
          {isCompleted ? <CheckIcon size={20} color="#fff" /> : index}
        </div>

        {/* Exercise Info */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium truncate ${isCompleted ? "text-[#10B981] line-through" : "text-[#FAFAFA]"}`}>
            {exercise.name}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-sm text-[#A3A3A3]">
            <span>{exercise.sets} Set</span>
            <span className="w-1 h-1 rounded-full bg-[#404040]"></span>
            <span>{exercise.reps ? `${exercise.reps} Rep` : exercise.duration}</span>
          </div>
        </div>

        {/* Expand Icon */}
        <svg
          className={`w-5 h-5 text-[#A3A3A3] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-[#2D2D2D] pt-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
              <div className="text-xl font-bold" style={{ color: isCompleted ? "#10B981" : accentColor }}>
                {exercise.sets}
              </div>
              <div className="text-xs text-[#A3A3A3]">Set</div>
            </div>
            <div className="bg-[#0A0A0A] rounded-lg p-3 text-center">
              <div className="text-xl font-bold" style={{ color: isCompleted ? "#10B981" : accentColor }}>
                {exercise.reps || exercise.duration}
              </div>
              <div className="text-xs text-[#A3A3A3]">{exercise.reps ? "Repetisi" : "Durasi"}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            {exercise.videoUrl && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onWatchTutorial();
                }}
                className="flex-1 py-2 px-4 rounded-lg bg-[#2D2D2D] text-sm font-medium hover:bg-[#404040] transition-colors flex items-center justify-center gap-2"
              >
                <VideoIcon size={18} color="#A3A3A3" />
                Tutorial
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isCompleted) {
                  onComplete(); // Toggle back to incomplete
                } else {
                  onStartTraining(); // Open timer modal
                }
              }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                isCompleted
                  ? "bg-[#10B981] hover:bg-[#059669] text-white"
                  : "text-white hover:opacity-90"
              }`}
              style={{ backgroundColor: isCompleted ? undefined : accentColor }}
            >
              {isCompleted ? (
                <>
                  <CheckIcon size={16} color="#fff" />
                  Selesai
                </>
              ) : (
                <>
                  <RocketIcon size={16} color="#fff" />
                  Mulai Latihan
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
