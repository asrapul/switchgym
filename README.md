# SwitchGym 🏋️

A modern, mobile-first personal workout manager built with Next.js. Track your workouts, personal records, achievements, and body measurements.

![Switch Gym](./switchgym_logo.svg)

**by Asrap**

---

## ✨ Features

### 🏠 Dashboard
- Monthly workout statistics
- Water intake tracker (resets daily)
- Training mode selector (Strength/Hypertrophy/Endurance)
- Daily quest system
- Hourly motivational quotes

### 📅 Workout Schedule
- Weekly workout plan (Upper/Lower body split)
- Exercise tracking with sets/reps
- Rest timer with audio cues
- Video tutorials for each exercise (YouTube embed)
- Swim day tracking

### 🏆 Achievements
- **55 achievement badges** across 4 difficulty levels
- Sound notification on unlock
- Categories: Workouts, Streaks, PRs, Swimming, Time-based, Body parts

### 📊 Progress Tracking
- Workout history calendar
- Personal Records (PR) tracking with CRUD
- Body measurements tracking
- Streak counter

### ⚙️ Settings
- **Language switcher** (Indonesian 🇮🇩 / English 🇺🇸)
- **Reset all data** with confirmation
- Light/Dark theme toggle

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: React Hooks + localStorage
- **Deployment**: Vercel-ready

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/switchgym.git

# Navigate to project
cd switchgym

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── page.tsx         # Homepage
│   ├── schedule/        # Workout schedule
│   ├── progress/        # Progress & achievements
│   ├── pr/              # Personal records
│   └── measurements/    # Body measurements
├── components/          # Reusable components
│   ├── BottomNav.tsx
│   ├── RestTimerModal.tsx
│   ├── VideoTutorialModal.tsx
│   ├── SettingsModal.tsx
│   └── AchievementNotification.tsx
├── contexts/            # React contexts
│   ├── ThemeContext.tsx
│   └── LanguageContext.tsx
├── data/                # Static data
│   ├── schedule.ts      # Workout plan
│   ├── timer.ts         # Training modes
│   └── quotes.ts        # Motivational quotes
└── lib/                 # Utilities
    └── storage.ts       # localStorage handlers
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Asrap** - Creator & Developer

---

Made with ❤️ and 💪
