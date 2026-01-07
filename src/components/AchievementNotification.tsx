"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/lib/storage";
import { Icon, IconName } from "./Icons";

interface AchievementNotificationProps {
  badge: Badge | null;
  onClose: () => void;
}

export default function AchievementNotification({ badge, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    if (badge) {
      // Play sound
      const audio = new Audio("/achievment.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Silently fail if audio can't play (user hasn't interacted with page yet)
      });

      // Show notification
      setIsVisible(true);
      setIsExiting(false);

      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [badge, handleClose]);

  if (!badge || !isVisible) return null;

  const difficultyColors = {
    easy: { bg: "#10B981", text: "Easy" },
    medium: { bg: "#3B82F6", text: "Medium" },
    hard: { bg: "#F59E0B", text: "Hard" },
    legendary: { bg: "#FFD700", text: "Legendary" },
  };

  const difficulty = difficultyColors[badge.difficulty] || difficultyColors.easy;

  return (
    <div 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
        isExiting ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <div 
        className="bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] rounded-2xl p-4 border-2 shadow-2xl min-w-[300px] max-w-[90vw]"
        style={{ borderColor: badge.color }}
      >
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#404040] flex items-center justify-center hover:bg-[#525252] transition-colors"
        >
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-4">
          {/* Badge Icon */}
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center animate-badge-unlock"
            style={{ backgroundColor: `${badge.color}30` }}
          >
            <Icon name={badge.icon as IconName} size={32} color={badge.color} />
          </div>

          {/* Badge Info */}
          <div className="flex-1">
            <p className="text-xs text-[#A3A3A3] mb-1">🎉 Achievement Unlocked!</p>
            <h3 className="text-lg font-bold" style={{ color: badge.color }}>
              {badge.title}
            </h3>
            <p className="text-sm text-[#A3A3A3]">{badge.description}</p>
            <span 
              className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{ backgroundColor: `${difficulty.bg}20`, color: difficulty.bg }}
            >
              {difficulty.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook to manage achievement notifications
export function useAchievementNotification() {
  const [unlockedBadge, setUnlockedBadge] = useState<Badge | null>(null);
  const [pendingBadges, setPendingBadges] = useState<Badge[]>([]);

  const showNotification = useCallback((badge: Badge) => {
    setPendingBadges(prev => [...prev, badge]);
  }, []);

  const showNextBadge = useCallback(() => {
    if (pendingBadges.length > 0) {
      setUnlockedBadge(pendingBadges[0]);
      setPendingBadges(prev => prev.slice(1));
    }
  }, [pendingBadges]);

  useEffect(() => {
    if (!unlockedBadge && pendingBadges.length > 0) {
      showNextBadge();
    }
  }, [unlockedBadge, pendingBadges, showNextBadge]);

  const handleClose = useCallback(() => {
    setUnlockedBadge(null);
  }, []);

  return {
    unlockedBadge,
    showNotification,
    handleClose,
  };
}
