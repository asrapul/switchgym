"use client";

import { useState, useEffect, useCallback } from "react";
import { formatTime } from "@/data/timer";

interface RestTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  exerciseName: string;
  totalSets: number;
  restTimeSeconds: number;
  onComplete: () => void;
  accentColor: string;
}

export default function RestTimerModal({
  isOpen,
  onClose,
  exerciseName,
  totalSets,
  restTimeSeconds,
  onComplete,
  accentColor,
}: RestTimerModalProps) {
  const [currentSet, setCurrentSet] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(restTimeSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [isResting, setIsResting] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentSet(1);
      setTimeRemaining(restTimeSeconds);
      setIsPaused(false);
      setIsResting(false);
    }
  }, [isOpen, restTimeSeconds]);

  // Timer countdown logic
  useEffect(() => {
    if (!isOpen || !isResting || isPaused || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Timer finished - move to next set
          if (currentSet < totalSets) {
            setCurrentSet((s) => s + 1);
            setIsResting(false);
            return restTimeSeconds;
          } else {
            // All sets completed
            setIsResting(false);
            onComplete();
            onClose();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isResting, isPaused, timeRemaining, currentSet, totalSets, restTimeSeconds, onComplete, onClose]);

  const handleStartSet = useCallback(() => {
    if (currentSet <= totalSets) {
      setIsResting(true);
      setTimeRemaining(restTimeSeconds);
      setIsPaused(false);
    }
  }, [currentSet, totalSets, restTimeSeconds]);

  const handleSkipRest = useCallback(() => {
    if (currentSet < totalSets) {
      setCurrentSet((s) => s + 1);
      setIsResting(false);
      setTimeRemaining(restTimeSeconds);
    } else {
      onComplete();
      onClose();
    }
  }, [currentSet, totalSets, restTimeSeconds, onComplete, onClose]);

  const handleTogglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Calculate progress percentage
  const progress = ((restTimeSeconds - timeRemaining) / restTimeSeconds) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-[#1A1A1A] rounded-2xl p-6 max-w-sm w-full mx-4 border border-[#2D2D2D] relative overflow-hidden">
        {/* Background accent */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at top right, ${accentColor}, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-sm text-[#A3A3A3] mb-1">Gerakan</p>
            <h3 className="text-lg font-bold text-[#FAFAFA] truncate">{exerciseName}</h3>
          </div>

          {/* Set Indicator */}
          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: totalSets }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i < currentSet - 1
                    ? "bg-[#10B981]" // Completed
                    : i === currentSet - 1
                    ? "" // Current
                    : "bg-[#2D2D2D]" // Pending
                }`}
                style={{
                  backgroundColor:
                    i === currentSet - 1 ? accentColor : undefined,
                }}
              />
            ))}
          </div>

          {/* Current Set Label */}
          <div className="text-center mb-4">
            <span
              className="text-sm font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              Set {currentSet} / {totalSets}
            </span>
          </div>

          {/* Timer Display */}
          {isResting ? (
            <div className="mb-6">
              {/* Circular Progress */}
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#2D2D2D"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 70}
                    strokeDashoffset={2 * Math.PI * 70 * (1 - progress / 100)}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-[#FAFAFA]">
                    {formatTime(timeRemaining)}
                  </span>
                  <span className="text-xs text-[#A3A3A3]">Istirahat</span>
                </div>
              </div>

              {/* Play/Pause Controls */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={handleTogglePause}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl transition-transform hover:scale-110"
                  style={{ backgroundColor: accentColor }}
                >
                  {isPaused ? "▶" : "⏸"}
                </button>
                <button
                  onClick={handleSkipRest}
                  className="w-14 h-14 rounded-full bg-[#2D2D2D] flex items-center justify-center text-white text-xl hover:bg-[#404040] transition-colors"
                  title="Skip Rest"
                >
                  ⏭
                </button>
              </div>

              {isPaused && (
                <p className="text-center text-[#A3A3A3] text-sm mt-3">
                  Timer dijeda
                </p>
              )}
            </div>
          ) : (
            <div className="text-center mb-6">
              <div className="w-40 h-40 mx-auto mb-4 rounded-full border-4 border-dashed border-[#2D2D2D] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">💪</div>
                  <p className="text-sm text-[#A3A3A3]">
                    {currentSet > totalSets ? "Selesai!" : "Lakukan Set"}
                  </p>
                </div>
              </div>

              <button
                onClick={handleStartSet}
                className="w-full py-3 rounded-xl font-semibold text-white transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: accentColor }}
              >
                {currentSet === 1 ? "Mulai Set 1" : `Set ${currentSet} Selesai - Mulai Istirahat`}
              </button>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full py-2 text-[#A3A3A3] text-sm hover:text-white transition-colors"
          >
            Tutup & Batalkan
          </button>
        </div>
      </div>
    </div>
  );
}
