"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { language, setLanguage, t } = useLanguage();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const handleResetData = () => {
    // Clear all localStorage data for asrapgym
    const keysToRemove = Object.keys(localStorage).filter(key => 
      key.startsWith("asrapgym_")
    );
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Keep language preference
    localStorage.setItem("asrapgym_language", language);
    
    // Reload the page to reset all state
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 bg-[#1A1A1A] rounded-2xl border border-[#2D2D2D] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-[#2D2D2D] flex items-center justify-between">
          <h2 className="text-xl font-bold">{t("settings.title")}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center hover:bg-[#404040] transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Language Selection */}
          <div>
            <h3 className="text-sm font-medium text-[#A3A3A3] mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              {t("settings.language")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLanguage("id")}
                className={`p-3 rounded-xl border-2 transition-all ${
                  language === "id"
                    ? "border-[#DC2626] bg-[#DC2626]/10"
                    : "border-[#2D2D2D] hover:border-[#404040]"
                }`}
              >
                <div className="text-2xl mb-1">🇮🇩</div>
                <div className="text-sm font-medium">{t("settings.indonesian")}</div>
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`p-3 rounded-xl border-2 transition-all ${
                  language === "en"
                    ? "border-[#DC2626] bg-[#DC2626]/10"
                    : "border-[#2D2D2D] hover:border-[#404040]"
                }`}
              >
                <div className="text-2xl mb-1">🇺🇸</div>
                <div className="text-sm font-medium">{t("settings.english")}</div>
              </button>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-[#2D2D2D]" />

          {/* Reset Data */}
          <div>
            <h3 className="text-sm font-medium text-[#A3A3A3] mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              {t("settings.resetData")}
            </h3>
            <p className="text-sm text-[#A3A3A3] mb-3">{t("settings.resetDescription")}</p>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-3 px-4 rounded-xl bg-[#EF4444]/20 text-[#EF4444] font-medium hover:bg-[#EF4444]/30 transition-colors border border-[#EF4444]/30"
            >
              {t("settings.resetButton")}
            </button>
          </div>
        </div>

        {/* Close Button */}
        <div className="p-4 border-t border-[#2D2D2D]">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-[#2D2D2D] font-medium hover:bg-[#404040] transition-colors"
          >
            {t("settings.close")}
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/90">
          <div className="w-full max-w-sm mx-4 bg-[#1A1A1A] rounded-2xl border border-[#EF4444]/50 overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#EF4444]/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">{t("settings.resetConfirmTitle")}</h3>
              <p className="text-sm text-[#A3A3A3] mb-6">{t("settings.resetConfirmMessage")}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#2D2D2D] font-medium hover:bg-[#404040] transition-colors"
                >
                  {t("settings.cancel")}
                </button>
                <button
                  onClick={handleResetData}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#EF4444] text-white font-medium hover:bg-[#DC2626] transition-colors"
                >
                  {t("settings.confirm")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
