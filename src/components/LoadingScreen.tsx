"use client";

import { useState, useEffect } from "react";

interface LoadingScreenProps {
  minDuration?: number;
}

export default function LoadingScreen({ minDuration = 2500 }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => setIsLoading(false), 500);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0A] ${
        isFading ? "animate-fade-out" : ""
      }`}
    >
      {/* Animated Circles */}
      <div className="relative mb-8">
        {/* Outer Ring */}
        <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-[#DC2626]/20"></div>
        
        {/* Pulsing Ring */}
        <div className="w-24 h-24 rounded-full border-4 border-[#DC2626] animate-pulse-ring"></div>
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-[#DC2626]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
          </svg>
        </div>
      </div>

      {/* Brand Name */}
      <h1
        className="text-3xl font-bold tracking-wider mb-4 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <span className="text-[#FAFAFA]">Switch</span>
        <span className="text-[#DC2626]">Gym</span>
      </h1>

      {/* Tagline */}
      <p
        className="text-[#A3A3A3] text-sm tracking-widest mb-8 animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        YOUR PERSONAL WORKOUT MANAGER
      </p>

      {/* Loading Bar */}
      <div
        className="w-48 h-1 bg-[#2D2D2D] rounded-full overflow-hidden animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="h-full bg-gradient-to-r from-[#DC2626] to-[#EF4444] rounded-full animate-loading-bar"></div>
      </div>
    </div>
  );
}
