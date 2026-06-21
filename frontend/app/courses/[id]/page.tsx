"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Play, FileText, Code2, CheckCircle2, ChevronRight, HelpCircle, 
  Star, Users, Clock, BookOpen, Check, ShoppingBag, Award, Heart, MessageSquare 
} from "lucide-react";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const courseId = params.id;
  
  // Track if this course is enrolled/owned. 
  // By default, course ID 1 (Basic Machine Learning Algorithm) is enrolled for Nadya.
  const [isEnrolled, setIsEnrolled] = useState(courseId === "1");

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

  const handlePurchase = () => {
    setIsEnrolled(true);
    alert("Pembelian berhasil! Anda sekarang terdaftar dalam kelas ini.");
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

        <Header userName="Nadya Najelina" userTitle={isEnrolled ? "Ruang belajar interaktif AIphy." : "Detail kelas dan kurikulum pembelajaran."} />

        {isEnrolled ? (
          /* ========================================================================= */
          /* OWNED/ENROLLED VIEW: Interactive study workspace (video, text, code, quiz) */
          /* ========================================================================= */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-4">
            {/* Main workspace (Left & Mid column) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Video Lecture Player */}
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-900 shadow-lg border border-slate-800 flex items-center justify-center text-center">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-slate-950/20" />
                <div className="relative z-10 flex flex-col items-center">
                  <button className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 hover:scale-105 transition active:scale-95">
                    <Play className="h-6 w-6 fill-white ml-1" />
                  </button>
                  <span className="block mt-4 text-xs font-bold text-slate-355 tracking-wider">
                    MEMUTAR: Bab 2.3 - Algoritma Regresi Linier Dasar
                  </span>
                </div>
              </div>

              {/* Lecture Reading Material (Text) */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  Catatan Kuliah: Regresi Linear
                </h3>
                <p className="text-xs text-slate-650 leading-relaxed dark:text-slate-300">
                  Regresi Linear adalah salah satu algoritma supervised learning paling mendasar yang bertujuan untuk memodelkan hubungan linier antara variabel dependen (Y) dan satu atau lebih variabel independen (X). Dalam latihan ini, kita meminimalkan fungsi biaya kuadrat terkecil (Least Squares cost function) dengan mengoptimalkan parameter bobot (weight/bias) menggunakan algoritma optimasi seperti Gradient Descent.
                </p>
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

                <div className="font-mono text-xs">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows={8}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-55 p-4 text-slate-850 outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-indigo-200"
                  />
                </div>

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

              {quizScore && (
                <div className={`mt-4 rounded-2xl p-4 text-xs font-semibold ${
                  selectedOption === 2 
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                    : "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-450"
                }`}>
                  {quizScore}
                </div>
              )}
            </div>
          </div>
        </div>
        ) : (
          /* ========================================================================= */
          /* UNOWNED VIEW: Course details description, syllabus list, and purchase widget */
          /* ========================================================================= */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-4">
            
            {/* Left Content Area (Syllabus, Overview) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header Info */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs font-extrabold text-amber-500">
                    <Star className="h-4.5 w-4.5 fill-amber-500" />
                    <span>4.5</span>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">(236 reviews)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-4 dark:text-white">
                  Basic Machine Learning Algorithm
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed mt-4 dark:text-slate-350">
                  Learn the fundamentals of Machine Learning and discover how intelligent systems make predictions from data. In this course, you will study essential machine learning algorithms such as Linear Regression, Logistic Regression, Decision Trees, K-Nearest Neighbors (KNN), and Clustering techniques. This beginner-friendly course provides a step-by-step learning experience through interactive explanations, practical case studies, and hands-on projects using real-world datasets. You will also understand the complete machine learning workflow, starting from data preprocessing and model training to evaluation and optimization.
                </p>

                {/* Micro Stats */}
                <div className="mt-8 flex flex-wrap gap-6 items-center border-t border-slate-100 pt-5 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-650 dark:text-slate-300">
                    <Users className="h-4.5 w-4.5 text-indigo-500" />
                    <span>10.7k students bought this course</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-650 dark:text-slate-300">
                    <MessageSquare className="h-4.5 w-4.5 text-indigo-500" />
                    <span>98% students recommend this course</span>
                  </div>
                </div>
              </div>

              {/* What You'll Learn Checkmarks */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-5">What you'll learn</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Understand linear and logistic regression mathematically",
                    "Implement Decision Tree, Random Forest, and SVM from scratch",
                    "Apply K-Means and DBSCAN clustering algorithms",
                    "Choose the right algorithm based on data type and size",
                    "Perform hyperparameter tuning with GridSearchCV"
                  ].map((learn, idx) => (
                    <div key={idx} className="flex gap-3 text-xs text-slate-650 dark:text-slate-350 font-medium">
                      <Check className="h-4.5 w-4.5 text-indigo-600 shrink-0" />
                      <span>{learn}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Syllabus Outline */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Course Content</h3>
                    <div className="flex gap-4 text-[10px] font-bold text-slate-450 dark:text-slate-500 mt-1">
                      <span>Beginner</span>
                      <span>•</span>
                      <span>10 Chapters</span>
                      <span>•</span>
                      <span>17h 50min total length</span>
                    </div>
                  </div>
                </div>

                {/* Section Accordions */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-900/30">
                    <div className="p-4 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white border-b border-slate-250/20">
                      <span>Regression: Predicting Continuous Values</span>
                      <span className="text-[10px] text-slate-400">7 lessons • 1h 24m</span>
                    </div>
                    <div className="p-4 space-y-3.5">
                      {[
                        { title: "Read before you start", dur: "4 min", type: "doc" },
                        { title: "Linear Regression: Intuition & Mathematics", dur: "4 min", type: "video" },
                        { title: "Polynomial Regression & Regularization (Ridge, Lasso)", dur: "4 min", type: "video" },
                        { title: "Regression Evaluation Metrics: MAE, MSE, R²", dur: "4 min", type: "video" },
                        { title: "Boston House Price Prediction", dur: "54 min", type: "code" }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-semibold">
                            <span>{item.type === "video" ? "📹" : item.type === "code" ? "💻" : "📝"}</span>
                            <span>{item.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-450 dark:text-slate-500 font-bold">{item.dur}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {["Basic Classification", "Advanced Neural Network Concepts", "Clustering Algorithms"].map((sec, i) => (
                    <div key={i} className="rounded-2xl border border-slate-200 p-4 flex items-center justify-between text-xs font-bold text-slate-800 dark:border-slate-800 dark:text-slate-300">
                      <span>{sec}</span>
                      <ChevronRight className="h-4.5 w-4.5 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Pricing & Actions Card */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 relative">
                {/* Graphics Overlay Placeholder */}
                <div className="aspect-video w-full rounded-2xl bg-indigo-50 flex items-center justify-center text-center dark:bg-slate-950/50 mb-6 border border-slate-100 dark:border-slate-800/80">
                  <span className="text-3xl">🐍</span>
                </div>

                {/* Price tag */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">Rp520.000</span>
                  <span className="text-xs font-semibold text-slate-400 line-through">Rp720.000</span>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button 
                    onClick={() => alert("Ditambahkan ke Keranjang Belanja!")}
                    className="w-full rounded-2xl border border-slate-200 py-3.5 text-xs font-bold hover:bg-slate-50 dark:border-slate-850 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={handlePurchase}
                    className="w-full rounded-2xl bg-indigo-600 py-3.5 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/10 cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>

                {/* Key features checklist */}
                <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-800">
                  <span className="block text-xs font-bold text-slate-900 dark:text-white mb-4">This course includes:</span>
                  <div className="space-y-3 text-[11px] font-semibold text-slate-650 dark:text-slate-350">
                    <div className="flex gap-2">
                      <span>📹</span>
                      <span>65 hours on demand video</span>
                    </div>
                    <div className="flex gap-2">
                      <span>📥</span>
                      <span>45 downloadable resources</span>
                    </div>
                    <div className="flex gap-2">
                      <span>📄</span>
                      <span>86 articles</span>
                    </div>
                    <div className="flex gap-2">
                      <span>📅</span>
                      <span>30 min personal weekly session</span>
                    </div>
                    <div className="flex gap-2">
                      <span>🏅</span>
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
