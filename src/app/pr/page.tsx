"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { weeklySchedule } from "@/data/schedule";
import {
  getPersonalRecords,
  savePersonalRecord,
  deletePersonalRecord,
  updatePersonalRecord,
  PersonalRecord,
} from "@/lib/storage";
import {
  MuscleIcon,
  TrophyIcon,
} from "@/components/Icons";
import BottomNav from "@/components/BottomNav";

// Get unique exercises from schedule
const allExercises = weeklySchedule.flatMap(day => 
  day.exercises.map(ex => ({ id: ex.id, name: ex.name }))
);

export default function PRPage() {
  const [records, setRecords] = useState<PersonalRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PersonalRecord | null>(null);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [notes, setNotes] = useState("");
  const [mounted, setMounted] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setRecords(getPersonalRecords());
  }, []);

  const resetForm = () => {
    setSelectedExercise("");
    setWeight("");
    setReps("");
    setNotes("");
    setEditingRecord(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const exercise = allExercises.find(ex => ex.id === selectedExercise);
    if (!exercise || !weight || !reps) return;

    if (editingRecord) {
      // Update existing record
      const updatedRecord: PersonalRecord = {
        ...editingRecord,
        exerciseId: selectedExercise,
        exerciseName: exercise.name,
        weight: parseFloat(weight),
        reps: parseInt(reps),
        notes: notes || undefined,
      };
      updatePersonalRecord(updatedRecord);
    } else {
      // Create new record
      const newRecord: PersonalRecord = {
        id: `pr-${Date.now()}`,
        exerciseId: selectedExercise,
        exerciseName: exercise.name,
        weight: parseFloat(weight),
        reps: parseInt(reps),
        date: new Date().toISOString(),
        notes: notes || undefined,
      };
      savePersonalRecord(newRecord);
    }

    setRecords(getPersonalRecords());
    resetForm();
  };

  const handleEdit = (record: PersonalRecord) => {
    setEditingRecord(record);
    setSelectedExercise(record.exerciseId);
    setWeight(record.weight.toString());
    setReps(record.reps.toString());
    setNotes(record.notes || "");
    setShowForm(true);
  };

  const handleDelete = (recordId: string) => {
    deletePersonalRecord(recordId);
    setRecords(getPersonalRecords());
    setDeleteConfirm(null);
  };

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
            <h1 className="text-xl font-bold">Personal Records</h1>
          </div>
          <TrophyIcon size={28} color="#F59E0B" />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24 px-4 max-w-lg mx-auto">
        {/* Add PR Button */}
        <button
          onClick={() => {
            if (showForm && !editingRecord) {
              resetForm();
            } else {
              resetForm();
              setShowForm(true);
            }
          }}
          className="w-full mb-6 py-3 px-4 bg-gradient-to-r from-[#DC2626] to-[#F59E0B] rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <MuscleIcon size={20} color="#fff" />
          {showForm ? "Tutup Form" : "Tambah Personal Record"}
        </button>

        {/* Add/Edit PR Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D] mb-6">
            <h3 className="text-sm font-semibold mb-4">
              {editingRecord ? "Edit Record" : "Tambah Record Baru"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#A3A3A3] mb-2">Pilih Latihan</label>
                <select
                  value={selectedExercise}
                  onChange={(e) => setSelectedExercise(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#DC2626] focus:outline-none"
                  required
                >
                  <option value="">-- Pilih Latihan --</option>
                  {allExercises.map((ex) => (
                    <option key={ex.id} value={ex.id}>{ex.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-[#A3A3A3] mb-2">Beban (kg)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 20"
                    className="w-full bg-[#0A0A0A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#DC2626] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#A3A3A3] mb-2">Repetisi</label>
                  <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="e.g. 10"
                    className="w-full bg-[#0A0A0A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#DC2626] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#A3A3A3] mb-2">Catatan (opsional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Form sempurna, naik 2.5kg"
                  className="w-full bg-[#0A0A0A] border border-[#2D2D2D] rounded-lg px-3 py-2 text-white focus:border-[#DC2626] focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 bg-[#2D2D2D] hover:bg-[#404040] rounded-lg text-white font-semibold transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#DC2626] hover:bg-[#B91C1C] rounded-lg text-white font-semibold transition-colors"
                >
                  {editingRecord ? "Update" : "Simpan"}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* PR List */}
        {mounted && (
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrophyIcon size={20} color="#F59E0B" />
              Daftar Personal Records ({records.length})
            </h2>

            {records.length > 0 ? (
              <div className="space-y-3">
                {records.map((record) => (
                  <div
                    key={record.id}
                    className="bg-[#1A1A1A] rounded-xl p-4 border border-[#2D2D2D]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-[#FAFAFA]">{record.exerciseName}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <span className="text-2xl font-bold text-[#F59E0B]">{record.weight}</span>
                            <span className="text-sm text-[#A3A3A3]">kg</span>
                          </div>
                          <div className="w-px h-6 bg-[#2D2D2D]"></div>
                          <div className="flex items-center gap-1">
                            <span className="text-2xl font-bold text-[#10B981]">{record.reps}</span>
                            <span className="text-sm text-[#A3A3A3]">reps</span>
                          </div>
                        </div>
                        {record.notes && (
                          <p className="text-xs text-[#A3A3A3] mt-2">📝 {record.notes}</p>
                        )}
                        <p className="text-[10px] text-[#A3A3A3] mt-2">
                          {new Date(record.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEdit(record)}
                          className="w-10 h-10 rounded-lg bg-[#3B82F6]/20 flex items-center justify-center hover:bg-[#3B82F6]/30 transition-colors"
                        >
                          <svg className="w-5 h-5 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(record.id)}
                          className="w-10 h-10 rounded-lg bg-[#EF4444]/20 flex items-center justify-center hover:bg-[#EF4444]/30 transition-colors"
                        >
                          <svg className="w-5 h-5 text-[#EF4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Delete Confirmation */}
                    {deleteConfirm === record.id && (
                      <div className="mt-4 pt-4 border-t border-[#2D2D2D]">
                        <p className="text-sm text-[#A3A3A3] mb-3">Hapus record ini?</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="flex-1 py-2 bg-[#2D2D2D] rounded-lg text-sm"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => handleDelete(record.id)}
                            className="flex-1 py-2 bg-[#EF4444] rounded-lg text-sm"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#1A1A1A] rounded-xl p-8 border border-[#2D2D2D] text-center">
                <div className="flex justify-center mb-4">
                  <TrophyIcon size={48} color="#A3A3A3" />
                </div>
                <p className="text-[#A3A3A3]">Belum ada Personal Record</p>
                <p className="text-xs text-[#A3A3A3] mt-1">Tambahkan PR pertamamu!</p>
              </div>
            )}
          </section>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
