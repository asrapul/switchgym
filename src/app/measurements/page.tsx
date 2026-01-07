"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getBodyMeasurements,
  saveBodyMeasurement,
  BodyMeasurement,
  getTodayKey,
} from "@/lib/storage";
import { ChartIcon, TrendUpIcon } from "@/components/Icons";
import BottomNav from "@/components/BottomNav";

export default function MeasurementsPage() {
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Form state
  const [weight, setWeight] = useState("");
  const [chest, setChest] = useState("");
  const [waist, setWaist] = useState("");
  const [hips, setHips] = useState("");
  const [arms, setArms] = useState("");
  const [thighs, setThighs] = useState("");
  const [bodyFat, setBodyFat] = useState("");

  useEffect(() => {
    setMounted(true);
    setMeasurements(getBodyMeasurements());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMeasurement: BodyMeasurement = {
      id: `m-${Date.now()}`,
      date: getTodayKey(),
      weight: weight ? parseFloat(weight) : undefined,
      chest: chest ? parseFloat(chest) : undefined,
      waist: waist ? parseFloat(waist) : undefined,
      hips: hips ? parseFloat(hips) : undefined,
      arms: arms ? parseFloat(arms) : undefined,
      thighs: thighs ? parseFloat(thighs) : undefined,
      bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
    };

    saveBodyMeasurement(newMeasurement);
    setMeasurements(getBodyMeasurements());
    setShowForm(false);
    
    // Reset form
    setWeight(""); setChest(""); setWaist("");
    setHips(""); setArms(""); setThighs(""); setBodyFat("");
  };

  const getLatestValue = (key: keyof BodyMeasurement): number | null => {
    for (let i = measurements.length - 1; i >= 0; i--) {
      const val = measurements[i][key];
      if (val !== undefined && typeof val === "number") return val;
    }
    return null;
  };

  const getProgress = (key: keyof BodyMeasurement): { value: number; change: number } | null => {
    const values = measurements
      .map(m => m[key])
      .filter((v): v is number => typeof v === "number");
    
    if (values.length < 1) return null;
    const latest = values[values.length - 1];
    const change = values.length > 1 ? latest - values[values.length - 2] : 0;
    return { value: latest, change };
  };

  const stats = [
    { key: "weight" as keyof BodyMeasurement, label: "Berat Badan", unit: "kg", color: "#DC2626" },
    { key: "chest" as keyof BodyMeasurement, label: "Dada", unit: "cm", color: "#F59E0B" },
    { key: "waist" as keyof BodyMeasurement, label: "Pinggang", unit: "cm", color: "#10B981" },
    { key: "arms" as keyof BodyMeasurement, label: "Lengan", unit: "cm", color: "#3B82F6" },
    { key: "thighs" as keyof BodyMeasurement, label: "Paha", unit: "cm", color: "#8B5CF6" },
    { key: "bodyFat" as keyof BodyMeasurement, label: "Body Fat", unit: "%", color: "#EC4899" },
  ];

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
            <h1 className="text-xl font-bold">Body Measurements</h1>
          </div>
          <ChartIcon size={28} color="#10B981" />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24 px-4 max-w-lg mx-auto">
        {/* Add Measurement Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full mb-6 py-3 px-4 bg-gradient-to-r from-[#10B981] to-[#3B82F6] rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <TrendUpIcon size={20} color="#fff" />
          {showForm ? "Tutup Form" : "Tambah Pengukuran"}
        </button>

        {/* Add Measurement Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D] mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-[#A3A3A3] mb-1">Berat (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70.5"
                  className="w-full bg-[#0A0A0A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#10B981] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A3A3A3] mb-1">Body Fat (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={bodyFat}
                  onChange={(e) => setBodyFat(e.target.value)}
                  placeholder="15"
                  className="w-full bg-[#0A0A0A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#10B981] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A3A3A3] mb-1">Dada (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={chest}
                  onChange={(e) => setChest(e.target.value)}
                  placeholder="100"
                  className="w-full bg-[#0A0A0A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#10B981] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A3A3A3] mb-1">Pinggang (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  placeholder="80"
                  className="w-full bg-[#0A0A0A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#10B981] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A3A3A3] mb-1">Lengan (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={arms}
                  onChange={(e) => setArms(e.target.value)}
                  placeholder="35"
                  className="w-full bg-[#0A0A0A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#10B981] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-[#A3A3A3] mb-1">Paha (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={thighs}
                  onChange={(e) => setThighs(e.target.value)}
                  placeholder="55"
                  className="w-full bg-[#0A0A0A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#10B981] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 bg-[#10B981] hover:bg-[#059669] rounded-lg text-white font-semibold transition-colors"
            >
              Simpan Pengukuran
            </button>
          </form>
        )}

        {/* Current Stats */}
        {mounted && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Pengukuran Terbaru</h2>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => {
                const progress = getProgress(stat.key);
                return (
                  <div
                    key={stat.key}
                    className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D]"
                  >
                    <p className="text-xs text-[#A3A3A3] mb-1">{stat.label}</p>
                    {progress ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-bold" style={{ color: stat.color }}>
                            {progress.value}
                          </span>
                          <span className="text-sm text-[#A3A3A3]">{stat.unit}</span>
                        </div>
                        {progress.change !== 0 && (
                          <p className={`text-xs mt-1 ${progress.change > 0 ? "text-green-500" : "text-red-500"}`}>
                            {progress.change > 0 ? "+" : ""}{progress.change.toFixed(1)} {stat.unit}
                          </p>
                        )}
                      </>
                    ) : (
                      <span className="text-[#A3A3A3]">-</span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* History */}
        {mounted && measurements.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">Riwayat Pengukuran</h2>
            <div className="space-y-2">
              {[...measurements].reverse().slice(0, 10).map((m) => (
                <div
                  key={m.id}
                  className="bg-[#1A1A1A] rounded-xl p-3 border border-[#2D2D2D]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">
                      {new Date(m.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {m.weight && <span className="bg-[#DC2626]/20 text-[#DC2626] px-2 py-1 rounded">{m.weight}kg</span>}
                    {m.chest && <span className="bg-[#F59E0B]/20 text-[#F59E0B] px-2 py-1 rounded">Dada {m.chest}cm</span>}
                    {m.waist && <span className="bg-[#10B981]/20 text-[#10B981] px-2 py-1 rounded">Pinggang {m.waist}cm</span>}
                    {m.arms && <span className="bg-[#3B82F6]/20 text-[#3B82F6] px-2 py-1 rounded">Lengan {m.arms}cm</span>}
                    {m.bodyFat && <span className="bg-[#EC4899]/20 text-[#EC4899] px-2 py-1 rounded">{m.bodyFat}% fat</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {mounted && measurements.length === 0 && !showForm && (
          <div className="bg-[#1A1A1A] rounded-xl p-8 border border-[#2D2D2D] text-center">
            <div className="flex justify-center mb-4">
              <ChartIcon size={48} color="#A3A3A3" />
            </div>
            <p className="text-[#A3A3A3]">Belum ada data pengukuran</p>
            <p className="text-xs text-[#A3A3A3] mt-1">Tambahkan pengukuran pertamamu!</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
