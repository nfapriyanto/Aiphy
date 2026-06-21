"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, FileText, Code2, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

export default function CourseDetailPage() {
  // Simulator states
  const [code, setCode] = useState(`import numpy as np\n\n# Let's initialize a dataset\nx = np.array([1, 2, 3, 4, 5])\ny = x * 2 + 1\nprint("X data:", x)\nprint("Y labels:", y)`);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  // Quiz states
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<string | null>(null);

  const runCode = () => {
    setRunning(true);
    setConsoleLogs(["Initializing Python compiler...", "Running script..."]);
    setTimeout(() => {
      setConsoleLogs([
        "Initializing Python compiler...",
        "Running script...",
        "X data: [1 2 3 4 5]",
        "Y labels: [ 3  5  7  9 11]",
        "",
        "Process finished with exit code 0"
      ]);
      setRunning(false);
    }, 1200);
  };

  const submitQuiz = () => {
    if (selectedOption === null) return;
    setQuizSubmitted(true);
    if (selectedOption === 2) {
      setQuizScore("Skor: 100/100 (Benar! Regresi linear bertujuan menemukan garis linier terbaik yang meminimalkan MSE).");
    } else {
      setQuizScore("Skor: 0/100 (Salah. Regresi linear meminimalkan Mean Squared Error (MSE), bukan memaksimalkannya).");
    }
  };

  const resetQuiz = () => {
    setSelectedOption(null);
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  const syllabus = [
    { title: "Pengenalan Kursus & Pre-Requisite", duration: "10m", type: "video", active: false },
    { title: "Definisi Machine Learning Secara Matematis", duration: "25m", type: "video", active: false },
    { title: "Pengenalan Model Regresi Linear", duration: "35m", type: "video", active: true },
    { title: "Latihan: Menghitung Linear Cost Function", duration: "40m", type: "code", active: false },
    { title: "Kuis Evaluasi Modul 2", duration: "15m", type: "quiz", active: false }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pl-20 dark:bg-slate-950">
      <Sidebar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-4">
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Katalog
          </Link>
        </div>

        <Header userName="Nadya Najelina" userTitle="Ruang belajar interaktif AIphy." />

        {/* Player Workspace Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-4">
          
          {/* Main workspace (Left & Mid column) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Lecture Player Screen */}
            <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-900 shadow-lg border border-slate-800 flex items-center justify-center text-center">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/20" />
              {/* Play placeholder graphic */}
              <div className="relative z-10 flex flex-col items-center">
                <button className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 hover:scale-105 transition active:scale-95">
                  <Play className="h-6 w-6 fill-white ml-1" />
                </button>
                <span className="block mt-4 text-xs font-bold text-slate-350 tracking-wider">
                  MEMUTAR: Bab 2.3 - Algoritma Regresi Linier Dasar
                </span>
              </div>
            </div>

            {/* Sandbox Coding Simulator */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-indigo-600" />
                  AIphy Coding Lab (Python 3.x)
                </h3>
                <button
                  onClick={runCode}
                  disabled={running}
                  className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white hover:bg-slate-850 transition disabled:opacity-75 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                >
                  {running ? "Menjalankan..." : "Jalankan Koding"}
                </button>
              </div>

              {/* Code Editor Area */}
              <div className="font-mono text-xs">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  rows={8}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-800 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-indigo-200"
                />
              </div>

              {/* Console Output logs */}
              {consoleLogs.length > 0 && (
                <div className="mt-4 rounded-2xl bg-slate-900 p-4 font-mono text-[11px] text-slate-300">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Output Konsol:</span>
                  {consoleLogs.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Playlist & interactive quiz (Right Column) */}
          <div className="space-y-8">
            {/* Playlist Syllabus */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-bold text-slate-900 mb-4 dark:text-white">Silabus Modul</h3>
              <div className="space-y-2">
                {syllabus.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3.5 rounded-2xl transition border ${
                      item.active
                        ? "bg-indigo-50/50 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/40"
                        : "border-transparent hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs">
                        {item.type === "video" ? "📹" : item.type === "code" ? "💻" : "📝"}
                      </span>
                      <div className="text-left">
                        <span className={`block text-xs font-bold ${item.active ? "text-indigo-600 dark:text-indigo-400" : "text-slate-800 dark:text-slate-300"}`}>
                          {item.title}
                        </span>
                        <span className="block text-[10px] text-slate-400 mt-0.5">{item.duration}</span>
                      </div>
                    </div>
                    {item.active && <span className="h-2 w-2 rounded-full bg-indigo-600" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Multiple Choice Quiz */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-extrabold text-slate-900 mb-2 dark:text-white flex items-center gap-1.5">
                <HelpCircle className="h-5 w-5 text-indigo-600" />
                Kuis Cepat AIphy
              </h3>
              <p className="text-xs text-slate-500 mb-4 dark:text-slate-400">
                Latihan: Tujuan utama dari algoritma Regresi Linier adalah meminimalkan nilai...
              </p>

              {/* Options */}
              <div className="space-y-2">
                {[
                  "Mean Absolute Deviation (MAD)",
                  "R-Squared Score",
                  "Mean Squared Error (MSE)",
                  "Root Mean Squared Logarithmic Error (RMSLE)"
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => !quizSubmitted && setSelectedOption(i)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border text-xs font-bold text-left transition ${
                      selectedOption === i
                        ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20 dark:text-indigo-400"
                        : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-slate-100 font-extrabold text-slate-500 dark:bg-slate-850">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-2">
                {!quizSubmitted ? (
                  <button
                    onClick={submitQuiz}
                    disabled={selectedOption === null}
                    className="w-full rounded-2xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition disabled:opacity-50"
                  >
                    Kirim Kuis
                  </button>
                ) : (
                  <button
                    onClick={resetQuiz}
                    className="w-full rounded-2xl border border-slate-200 py-3 text-xs font-bold hover:bg-slate-50 transition dark:border-slate-800 dark:hover:bg-slate-800"
                  >
                    Ulangi Kuis
                  </button>
                )}
              </div>

              {/* Results */}
              {quizScore && (
                <div className={`mt-4 rounded-2xl p-4 text-xs font-semibold ${
                  selectedOption === 2 
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30"
                    : "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-450 border border-rose-100/50 dark:border-rose-900/30"
                }`}>
                  {quizScore}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
