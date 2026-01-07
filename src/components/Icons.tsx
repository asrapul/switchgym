"use client";

import React from "react";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// Navigation Icons
export const HomeIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L3 9V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H9V14H15V22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V9L12 2Z" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <rect x="7" y="14" width="3" height="3" fill={color} />
  </svg>
);

export const ChartIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <path d="M3 3L21 3" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="7" r="4" />
    <path d="M4 21V19C4 17.9391 4.42143 16.9217 5.17157 16.1716C5.92172 15.4214 6.93913 15 8 15H16C17.0609 15 18.0783 15.4214 18.8284 16.1716C19.5786 16.9217 20 17.9391 20 19V21" />
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

// Workout Icons
export const MuscleIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14L4.14 5.57L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L18.43 19.86L19.86 21.29L21.29 19.86L19.86 18.43L22 16.29L20.57 14.86Z" />
  </svg>
);

export const LegIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M11 2C11 2 9 4 9 6S11 10 11 12S9 16 9 18V22H11V18C11 16 13 14 13 12S11 8 11 6C11 4 13 2 13 2H11Z" />
    <path d="M15 2C15 2 13 4 13 6S15 10 15 12S13 16 13 18V22H17V20C16 20 15 19 15 18C15 16 17 14 17 12S15 8 15 6C15 4 17 2 17 2H15Z" />
    <path d="M7 20V22H11V20H7Z" />
  </svg>
);

export const SwimIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <circle cx="8.5" cy="4.5" r="2" />
    <path d="M2 18C4 16 6 16 8 18C10 20 12 20 14 18C16 16 18 16 20 18C22 20 22 20 22 20" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M6 12L5 14L10 16L15 11L13 9C12 8 10 8 9 9L6 12Z" />
  </svg>
);

export const SleepIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M21.64 13C20.76 15.44 18.54 17.25 15.89 17.65C14.76 17.83 13.61 17.73 12.55 17.38C11.49 17.04 10.54 16.45 9.78 15.68C9.01 14.91 8.45 13.97 8.13 12.93C7.82 11.89 7.76 10.79 7.97 9.71C8.44 7.3 10.27 5.26 12.68 4.64C13.36 4.46 14.06 4.38 14.76 4.42C15 4.44 15.21 4.27 15.26 4.03C15.31 3.79 15.17 3.54 14.94 3.46C14.17 3.19 13.35 3.03 12.52 3C9.85 2.87 7.34 4.21 5.92 6.48C4.5 8.76 4.42 11.59 5.72 13.94C7.02 16.29 9.44 17.82 12.11 17.99C12.56 18.02 13.01 18.02 13.45 17.98C16.31 17.67 18.84 15.81 20 13.18C20.09 12.96 20 12.71 19.79 12.6C19.58 12.5 19.32 12.57 19.18 12.77L19.16 12.8C19.35 12.71 19.54 12.77 19.64 12.96C19.73 13.14 19.66 13.36 19.47 13.48C19.29 13.59 19.12 13.72 18.95 13.85C18.76 14.01 18.44 14.01 18.25 13.85C18.07 13.7 17.89 13.56 17.71 13.43C17.54 13.3 17.36 13.18 17.16 13.08C17.26 13.15 17.36 13.21 17.47 13.26C17.66 13.35 17.76 13.55 17.74 13.76C17.71 13.97 17.45 14.1 17.26 14.04L21.64 13Z" />
    <path d="M17 6H21L17 10H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M14 2H16L14 4H16" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

// Training Mode Icons
export const WeightliftingIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9C12.83 9 13.5 8.33 13.5 7.5S12.83 6 12 6S10.5 6.67 10.5 7.5S11.17 9 12 9Z" />
    <path d="M4 15V13C4 12.45 4.45 12 5 12H7V10H5C4.45 10 4 9.55 4 9V7H2V9C2 9.55 2.45 10 3 10V14C2.45 14 2 14.45 2 15V17H4V15Z" />
    <path d="M20 15V13C20 12.45 19.55 12 19 12H17V10H19C19.55 10 20 9.55 20 9V7H22V9C22 9.55 21.55 10 21 10V14C21.55 14 22 14.45 22 15V17H20V15Z" />
    <path d="M15 10H9V14H15V10Z" />
    <path d="M15 15.5C15 15.22 14.78 15 14.5 15H9.5C9.22 15 9 15.22 9 15.5V22H11V18H13V22H15V15.5Z" />
  </svg>
);

export const LightningIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
  </svg>
);

// Stats & Progress Icons
export const FireIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2ZM14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5Z" />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H17V2H7V4H4C2.9 4 2 4.9 2 6V7C2 9.55 3.92 11.63 6.39 11.94C7.02 13.44 8.37 14.57 10 14.9V18H7V20H17V18H14V14.9C15.63 14.57 16.98 13.44 17.61 11.94C20.08 11.63 22 9.55 22 7V6C22 4.9 21.1 4 20 4ZM4 7V6H7V9.82C5.26 9.4 4 7.87 4 7ZM20 7C20 7.87 18.74 9.4 17 9.82V6H20V7Z" />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

// Action Icons
export const VideoIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="4" width="16" height="16" rx="2" />
    <path d="M22 6L18 10L22 14V6Z" fill={color} />
  </svg>
);

export const RocketIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.7 2.7C12.4 2.4 11.9 2.2 11.5 2.2C9.8 2.2 6.4 3.3 4.2 7.1C3.3 8.7 2.8 10.6 2.7 12.5L0.3 15C0.1 15.2 0 15.5 0 15.8V19.5C0 20.3 0.7 21 1.5 21H5.2C5.5 21 5.8 20.9 6 20.7L8.5 18.3C10.4 18.2 12.3 17.7 13.9 16.8C17.7 14.6 18.8 11.2 18.8 9.5C18.8 9.1 18.6 8.6 18.3 8.3L12.7 2.7ZM14 10C12.9 10 12 9.1 12 8C12 6.9 12.9 6 14 6C15.1 6 16 6.9 16 8C16 9.1 15.1 10 14 10Z" transform="translate(2.5 1.5)"/>
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" />
  </svg>
);

export const QuoteIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M10 8V12C10 14.21 8.21 16 6 16H5.5C4.67 16 4 15.33 4 14.5S4.67 13 5.5 13H6C6.55 13 7 12.55 7 12V10H5.5C3.57 10 2 8.43 2 6.5S3.57 3 5.5 3H6C8.21 3 10 4.79 10 7V8ZM18 12C18 14.21 16.21 16 14 16H13.5C12.67 16 12 15.33 12 14.5S12.67 13 13.5 13H14C14.55 13 15 12.55 15 12V10H13.5C11.57 10 10 8.43 10 6.5S11.57 3 13.5 3H14C16.21 3 18 4.79 18 7V12Z" />
  </svg>
);

export const WaveIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12C4 9 7 9 9 12C11 15 14 15 16 12C18 9 21 9 23 12" />
    <path d="M2 16C4 13 7 13 9 16C11 19 14 19 16 16C18 13 21 13 23 16" />
    <path d="M2 8C4 5 7 5 9 8C11 11 14 11 16 8C18 5 21 5 23 8" />
  </svg>
);

export const SunriseIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 18C17 15.24 14.76 13 12 13S7 15.24 7 18" />
    <line x1="12" y1="2" x2="12" y2="9" />
    <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
    <line x1="1" y1="18" x2="3" y2="18" />
    <line x1="21" y1="18" x2="23" y2="18" />
    <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
    <line x1="23" y1="22" x2="1" y2="22" />
    <polyline points="8 6 12 2 16 6" />
  </svg>
);

export const ExplosionIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14 8L20 6L16 10L22 12L16 14L20 18L14 16L12 22L10 16L4 18L8 14L2 12L8 10L4 6L10 8L12 2Z" />
  </svg>
);

export const MedalIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="15" r="6" />
    <path d="M9 2L7 8H3L6 11L5 17L12 9L9 2Z" />
    <path d="M15 2L17 8H21L18 11L19 17L12 9L15 2Z" />
    <circle cx="12" cy="15" r="3" fill="none" stroke="white" strokeWidth="1.5"/>
  </svg>
);

export const CrownIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17H21V19H3V17ZM3 15L6 7L12 10L18 7L21 15H3Z" />
    <circle cx="6" cy="5" r="2" />
    <circle cx="18" cy="5" r="2" />
    <circle cx="12" cy="3" r="2" />
  </svg>
);

export const NotepadIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
    <line x1="8" y1="9" x2="10" y2="9" />
  </svg>
);

export const TrendUpIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export const CheckCircleIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className = "", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" />
    <path d="M19 15L20 18L23 19L20 20L19 23L18 20L15 19L18 18L19 15Z" />
    <path d="M5 2L6 5L9 6L6 7L5 10L4 7L1 6L4 5L5 2Z" />
  </svg>
);

// Icon mapping for dynamic usage
export type IconName =
  | "home"
  | "calendar"
  | "chart"
  | "user"
  | "settings"
  | "muscle"
  | "leg"
  | "swim"
  | "sleep"
  | "weightlifting"
  | "lightning"
  | "fire"
  | "trophy"
  | "target"
  | "star"
  | "video"
  | "rocket"
  | "check"
  | "quote"
  | "wave"
  | "sunrise"
  | "explosion"
  | "medal"
  | "crown"
  | "notepad"
  | "trendUp"
  | "checkCircle"
  | "sparkles";

export const iconComponents: Record<IconName, React.FC<IconProps>> = {
  home: HomeIcon,
  calendar: CalendarIcon,
  chart: ChartIcon,
  user: UserIcon,
  settings: SettingsIcon,
  muscle: MuscleIcon,
  leg: LegIcon,
  swim: SwimIcon,
  sleep: SleepIcon,
  weightlifting: WeightliftingIcon,
  lightning: LightningIcon,
  fire: FireIcon,
  trophy: TrophyIcon,
  target: TargetIcon,
  star: StarIcon,
  video: VideoIcon,
  rocket: RocketIcon,
  check: CheckIcon,
  quote: QuoteIcon,
  wave: WaveIcon,
  sunrise: SunriseIcon,
  explosion: ExplosionIcon,
  medal: MedalIcon,
  crown: CrownIcon,
  notepad: NotepadIcon,
  trendUp: TrendUpIcon,
  checkCircle: CheckCircleIcon,
  sparkles: SparklesIcon,
};

// Dynamic Icon component for use with icon names from data
export const Icon: React.FC<IconProps & { name: IconName }> = ({ name, ...props }) => {
  const IconComponent = iconComponents[name];
  return IconComponent ? <IconComponent {...props} /> : null;
};
