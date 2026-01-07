"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  HomeIcon,
  CalendarIcon,
  ChartIcon,
  TrophyIcon,
} from "@/components/Icons";

export default function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { id: "home", icon: HomeIcon, labelKey: "nav.home", href: "/" },
    { id: "schedule", icon: CalendarIcon, labelKey: "nav.schedule", href: "/schedule" },
    { id: "progress", icon: ChartIcon, labelKey: "nav.progress", href: "/progress" },
    { id: "pr", icon: TrophyIcon, labelKey: "nav.pr", href: "/pr" },
  ];

  const getActiveId = () => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/schedule")) return "schedule";
    if (pathname.startsWith("/progress")) return "progress";
    if (pathname.startsWith("/pr")) return "pr";
    if (pathname.startsWith("/measurements")) return "progress";
    return "home";
  };

  const activeId = getActiveId();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-effect border-t border-[#2D2D2D]">
      <div className="max-w-lg mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all ${
                  isActive
                    ? "text-[#DC2626]"
                    : "text-[#A3A3A3] hover:text-[#FAFAFA]"
                }`}
              >
                <IconComponent size={24} color={isActive ? "#DC2626" : "#A3A3A3"} />
                <span className="text-[10px] font-medium mt-1">{t(item.labelKey)}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
