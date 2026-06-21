"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Play, FileText, Code2, CheckCircle2, ChevronRight, HelpCircle, 
  Star, Users, Clock, BookOpen, Check, ShoppingBag, Award, Heart, MessageSquare,
  Bot, Send, Smile, Mic, Volume2, Copy, RotateCcw, ThumbsDown, Lock, Target
} from "lucide-react";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const courseId = params.id;
  
  // Track enrollment. By default, Course 1 is enrolled.
  const [isEnrolled, setIsEnrolled] = useState(courseId === "1");

  // Study Player Navigation
  const [activeTab, setActiveTab] = useState<"playlist" | "aichat">("playlist");
  const [activeModule, setActiveModule] = useState<"regression" | "classification" | "tree" | "svm">("classification");
  
  // Active lesson inside the playlist:
  // 0: Logistic Regression (Video)
  // 1: KNN (Video)
  // 2: Naive Bayes (Video) - Default active
  // 3: Diabetes Disease Classification (Code)
  // 4: Lesson Summary (Text)
  // 5: Quiz Practice (Quiz)
  const [activeLessonIdx, setActiveLessonIdx] = useState(2);

  // Video Playing States
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(20.3); // 12:00 / 59:00 is ~20%

  // AI Chat States (inside Course Player)
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: "user",
      isLink: true,
      title: "External Link Title",
      desc: "External link description",
      url: "https://www.externallink.com",
      time: "01:25"
    },
    {
      id: 2,
      sender: "ai",
      isLink: false,
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 💀",
      time: "02:25"
    }
  ]);

  // Code Notebook Simulator States
  const [codeCells, setCodeCells] = useState([
    {
      id: 1,
      code: `# Import Library\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import (\n  accuracy_score,\n  classification_report,\n  confusion_matrix,\n  ConfusionMatrixDisplay,\n  RocCurveDisplay\n)`,
      output: "WARNING:torchao.kernel.intmm:Warning: Detected no triton, on systems without Triton certain kernels will not work",
      running: false
    },
    {
      id: 2,
      code: `# Graph 1: Confusion Matrix\ncm = confusion_matrix(y_test, y_pred)\n\ndisp = ConfusionMatrixDisplay(\n  confusion_matrix=cm,\n  display_labels=["No Diabetes", "Diabetes"]\n)\n\ndisp.plot()\nplt.title("Confusion Matrix - Diabetes Classification")\nplt.show()`,
      output: "Confusion Matrix plotted successfully.",
      showPlot: true,
      running: false
    }
  ]);

  // Interactive Quiz States
  const [quizActiveQuestion, setQuizActiveQuestion] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({
    1: 2 // Option 2 (Whether the patient has diabetes or not) is selected by default in Figma
  });

  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    const newMsg = {
      id: chatMessages.length + 1,
      sender: "user" as const,
      isLink: false,
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([...chatMessages, newMsg]);
    setChatInput("");

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: "ai" as const,
        isLink: false,
        text: "Saya AIphy Tutor. Ini adalah simulasi jawaban kontekstual asisten berdasarkan materi yang sedang Anda pelajari.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1200);
  };

  const handleRunCell = (cellId: number) => {
    setCodeCells(prev => prev.map(c => c.id === cellId ? { ...c, running: true } : c));
    setTimeout(() => {
      setCodeCells(prev => prev.map(c => c.id === cellId ? { ...c, running: false, output: c.id === 1 ? "Model trained successfully. Accuracy: 84.5%" : c.output } : c));
    }, 1500);
  };

  const handlePurchase = () => {
    setIsEnrolled(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pl-20 dark:bg-slate-950">
      <Sidebar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-4">
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-505 hover:text-indigo-650 dark:text-slate-400">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Katalog
          </Link>
        </div>

        {isEnrolled ? (
          /* ========================================================================= */
          /* OWNED/ENROLLED VIEW: Figma Multi-View Study Player Workspace             */
          /* ========================================================================= */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mt-4">
            
            {/* 1. Left Sidebar Navigation inside Player (Playlist vs AI Chat) */}
            <div className="lg:col-span-4 xl:col-span-3 space-y-6">
              
              {/* Course Title and Global Progress */}
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950">
                    🎓
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-1">Basic Machine Learning</h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">10 moduls • 6 hours</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-[9px] font-bold text-slate-450 dark:text-slate-500 mb-1">
                    <span>60% Complete</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
              </div>

              {/* Tab Selector Buttons */}
              <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-850">
                <button
                  onClick={() => setActiveTab("playlist")}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                    activeTab === "playlist"
                      ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  Playlist
                </button>
                <button
                  onClick={() => setActiveTab("aichat")}
                  className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                    activeTab === "aichat"
                      ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400"
                      : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
                  }`}
                >
                  <Bot className="h-4 w-4" />
                  AI Chat
                </button>
              </div>

              {/* Tab Panel 1: Playlist view */}
              {activeTab === "playlist" && (
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
                  {/* Module 1: Regression (Completed) */}
                  <div className="border border-slate-100 rounded-2xl p-3 bg-slate-50/50 dark:border-slate-850 dark:bg-slate-950/20">
                    <button
                      onClick={() => setActiveModule(activeModule === "regression" ? "classification" : "regression")}
                      className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-800 dark:text-slate-300"
                    >
                      <div>
                        <span>Regression: Predicting Values</span>
                        <span className="block text-[9px] text-slate-400 font-semibold mt-0.5">10 lessons • 6 hours</span>
                      </div>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-400">100% Complete</span>
                    </button>
                  </div>

                  {/* Module 2: Classification (Active) */}
                  <div className="border-2 border-indigo-500/10 rounded-2xl p-3 bg-indigo-50/15 dark:border-indigo-900/20 dark:bg-indigo-950/5">
                    <button
                      onClick={() => setActiveModule("classification")}
                      className="w-full flex items-center justify-between text-left text-xs font-bold text-indigo-900 dark:text-indigo-300"
                    >
                      <div>
                        <span>Basic Classification</span>
                        <span className="block text-[9px] text-indigo-500/60 font-semibold mt-0.5">10 lessons • 6 hours</span>
                      </div>
                      <span className="text-[10px] text-indigo-600 dark:text-indigo-455">60% Complete</span>
                    </button>

                    {/* Classification Lesson Items */}
                    <div className="mt-4 space-y-2 pl-1.5 border-l-2 border-indigo-500/10">
                      {[
                        { title: "Logistic Regression: Sigmoid", idx: 0, done: true, isCode: false },
                        { title: "K-Nearest Neighbors (KNN)", idx: 1, done: true, isCode: false },
                        { title: "Naive Bayes: Probabilistic Classifier", idx: 2, done: true, active: true },
                        { title: "Diabetes Disease Classification", idx: 3, isCode: true },
                        { title: "Lesson Summary", idx: 4, isText: true },
                        { title: "Quiz Practice", idx: 5, isQuiz: true }
                      ].map((lesson, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveLessonIdx(lesson.idx)}
                          className={`w-full flex items-center justify-between p-2 rounded-xl text-left text-[11px] font-bold transition-all ${
                            activeLessonIdx === lesson.idx
                              ? "bg-indigo-600 text-white shadow-sm"
                              : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                          }`}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <span>
                              {lesson.isCode ? "💻" : lesson.isQuiz ? "📝" : lesson.isText ? "📄" : "📹"}
                            </span>
                            <span className="truncate">{lesson.title}</span>
                          </span>
                          {lesson.done && activeLessonIdx !== lesson.idx && (
                            <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Modules 3 & 4 (Locked) */}
                  {["Tree-Based Models", "SVM & Unsupervised Learning"].map((modName, i) => (
                    <div key={i} className="border border-slate-100 rounded-2xl p-3 opacity-60 dark:border-slate-850">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                        <span>{modName}</span>
                        <Lock className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab Panel 2: AI Chat Panel */}
              {activeTab === "aichat" && (
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col h-[520px] justify-between">
                  {/* Messages logs */}
                  <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex flex-col gap-1 max-w-[85%] ${msg.sender === "user" ? "ml-auto items-end" : "items-start"}`}>
                        {msg.isLink ? (
                          /* External Link Message block */
                          <div className="rounded-2xl bg-indigo-600 text-white p-3.5 shadow-sm space-y-2 w-full text-left">
                            <div className="flex justify-between items-start">
                              <span className="block text-xs font-extrabold">{msg.title}</span>
                              <span className="text-xs">🔗</span>
                            </div>
                            <p className="text-[10px] text-indigo-150 leading-relaxed">{msg.desc}</p>
                            <span className="block text-[10px] bg-white/10 px-2 py-1 rounded text-indigo-200 truncate">{msg.url}</span>
                            <span className="block text-[9px] text-indigo-200 text-right mt-1">{msg.time}</span>
                          </div>
                        ) : (
                          /* Plain Text AIphy bubble */
                          <div className={`rounded-2xl px-3.5 py-2.5 text-xs leading-normal shadow-sm ${
                            msg.sender === "user"
                              ? "bg-indigo-600 text-white rounded-tr-none"
                              : "bg-slate-50 text-slate-850 border border-slate-100 dark:bg-slate-950/40 dark:text-slate-350 dark:border-slate-850 rounded-tl-none"
                          }`}>
                            {msg.text}
                            <span className="block text-[9px] text-slate-400 mt-1.5 text-right">{msg.time}</span>
                          </div>
                        )}
                        {/* Interactive response controls for AI messages */}
                        {msg.sender === "ai" && (
                          <div className="flex items-center gap-2 mt-1 pl-2 text-slate-400">
                            <button className="hover:text-indigo-500"><Volume2 className="h-3.5 w-3.5" /></button>
                            <button className="hover:text-indigo-500"><Copy className="h-3.5 w-3.5" /></button>
                            <button className="hover:text-indigo-500"><RotateCcw className="h-3.5 w-3.5" /></button>
                            <button className="hover:text-indigo-550"><ThumbsDown className="h-3.5 w-3.5" /></button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Message Input Panel */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="relative">
                      <textarea
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendChat())}
                        placeholder="Stuck on a concept? Ask Alphy..."
                        rows={2}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-4 pr-12 text-[11px] text-slate-900 outline-none placeholder:text-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                      <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5">
                        <button className="text-slate-400 hover:text-slate-600"><Smile className="h-4.5 w-4.5" /></button>
                        <button className="text-slate-400 hover:text-slate-600"><Mic className="h-4.5 w-4.5" /></button>
                        <button
                          onClick={handleSendChat}
                          className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Right Main Content Workspace (Video Player OR Coding Notebook OR Text Summary OR MCQ Quiz) */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
              
              {/* Header Title Section */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                  {activeLessonIdx === 3 ? "Diabetes Disease Classification" : activeLessonIdx === 4 ? "Lesson Summary" : activeLessonIdx === 5 ? "Basic Classification" : "Naive Bayes: Probabilistic Classifier"}
                </h2>
                <div className="flex items-center gap-2">
                  <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-650 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-350 hover:bg-slate-50">
                    <Heart className="h-4.5 w-4.5" />
                  </button>
                  <button className="flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                    Mark Complete <Check className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Render dynamic view panels */}

              {/* VIEW 1 & 2: Video Player Panel */}
              {activeLessonIdx <= 2 && (
                <div className="space-y-6">
                  {/* Video Player Display Screen */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-slate-950 border border-slate-850 shadow-lg group">
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />
                    {/* Fake Video Screen backdrop */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative h-full w-full bg-[url('https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-70" />
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-600/30 hover:scale-105 transition active:scale-95 z-10"
                      >
                        <Play className="h-6 w-6 fill-white ml-1" />
                      </button>
                    </div>

                    {/* Bottom Custom Play Controls */}
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 to-slate-950/10 flex flex-col gap-2">
                      <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${videoProgress}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-white text-[10px] font-bold">
                        <div className="flex items-center gap-3">
                          <span>Play</span>
                          <span>10s</span>
                          <span>10s</span>
                          <span>Vol</span>
                          <span>12:00 / 59:00</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span>HD</span>
                          <span>CC</span>
                          <span>Gear</span>
                          <span>Full</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs Section (Overview, Resources, Ask AI) */}
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex gap-4 border-b border-slate-100 dark:border-slate-800 pb-3 mb-4 text-xs font-bold text-slate-500">
                      <span className="text-indigo-600 border-b-2 border-indigo-600 pb-3">Overview</span>
                      <span className="hover:text-slate-900 cursor-pointer">Resources</span>
                      <span className="hover:text-slate-900 cursor-pointer">Ask AI</span>
                    </div>
                    <div className="text-xs text-slate-650 leading-relaxed dark:text-slate-350 space-y-4">
                      <p>
                        Basic Classification introduces how machine learning models categorize data into specific classes based on patterns learned from previous examples. Unlike regression, which predicts continuous values, classification is used to predict labels or categories, such as identifying whether an email is spam or not, whether a comment is toxic or non-toxic, or whether an image contains a cat or a dog.
                      </p>
                      <p>
                        In this lesson, you will learn the fundamental concepts of classification, how models distinguish between different classes, and how training data helps the model make predictions. You will also explore several popular classification algorithms, such as Logistic Regression, Decision Tree, K-Nearest Neighbors, Naive Bayes, and Support Vector Machine.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 3: Coding Notebook Panel */}
              {activeLessonIdx === 3 && (
                <div className="space-y-6">
                  {/* Notebook header control toolbar */}
                  <div className="flex items-center justify-between px-4 py-2 bg-indigo-50/40 rounded-2xl border border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/40">
                    <div className="flex items-center gap-3 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                      <button className="hover:text-indigo-950">+ Code</button>
                      <button className="hover:text-indigo-950">+ Text</button>
                      <span className="text-slate-300">|</span>
                      <button onClick={() => handleRunCell(1)} className="flex items-center gap-1 hover:text-indigo-950">
                        ▶ Run All
                      </button>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">Connect v3.x ⚡</span>
                  </div>

                  {/* Notebook Cell Cards */}
                  {codeCells.map((cell) => (
                    <div key={cell.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => handleRunCell(cell.id)}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition dark:bg-slate-850 dark:hover:bg-slate-800"
                        >
                          {cell.running ? "⏳" : "▶"}
                        </button>
                        <div className="flex-1 font-mono text-[11px] leading-relaxed">
                          <textarea
                            value={cell.code}
                            onChange={(e) => {
                              const val = e.target.value;
                              setCodeCells(prev => prev.map(c => c.id === cell.id ? { ...c, code: val } : c));
                            }}
                            rows={cell.id === 1 ? 12 : 8}
                            className="w-full bg-slate-50 p-4 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-indigo-200"
                          />
                        </div>
                      </div>

                      {/* Output details */}
                      {cell.output && (
                        <div className="pl-10 font-mono text-[10px] text-slate-450 dark:text-slate-500">
                          <p className="bg-slate-100 p-3 rounded-xl dark:bg-slate-950/50">{cell.output}</p>
                        </div>
                      )}

                      {/* Graphic ROC Curve plot (cell 2) */}
                      {cell.showPlot && (
                        <div className="pl-10 pt-2 flex justify-center">
                          <div className="w-full max-w-md bg-white p-4 border border-slate-150 rounded-2xl dark:bg-slate-900/10">
                            {/* Graphic Mock of ROC Curve */}
                            <svg className="w-full h-48 text-indigo-600" viewBox="0 0 200 100">
                              <rect width="200" height="100" fill="none" />
                              <line x1="10" y1="90" x2="190" y2="90" stroke="#cbd5e1" strokeWidth="1" />
                              <line x1="10" y1="10" x2="10" y2="90" stroke="#cbd5e1" strokeWidth="1" />
                              {/* Baseline */}
                              <line x1="10" y1="90" x2="190" y2="10" stroke="#cbd5e1" strokeDasharray="3" strokeWidth="1" />
                              {/* ROC Curve */}
                              <path d="M 10 90 Q 30 30 190 10" fill="none" stroke="currentColor" strokeWidth="2" />
                              <text x="180" y="98" fontSize="6" fill="#94a3b8" textAnchor="end">False Positive Rate</text>
                              <text x="8" y="20" fontSize="6" fill="#94a3b8" transform="rotate(-90 8 20)" textAnchor="end">True Positive Rate</text>
                              <text x="120" y="60" fontSize="5" fill="#4f46e5" fontWeight="bold">AUC = 0.81</text>
                            </svg>
                            <span className="block text-center text-[10px] font-bold text-slate-500 mt-2">Graph 1: Confusion Matrix ROC Curve</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* VIEW 4: Lesson Summary (Text View) */}
              {activeLessonIdx === 4 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
                  <div className="flex gap-4 border-b border-slate-100 dark:border-slate-800 pb-3 text-xs font-bold text-slate-500">
                    <span className="text-indigo-600 border-b-2 border-indigo-600 pb-3">Overview</span>
                    <span className="hover:text-slate-900 cursor-pointer">Resources</span>
                  </div>

                  <div className="text-xs text-slate-650 leading-relaxed dark:text-slate-350 space-y-5">
                    <p>
                      Basic Classification introduces how machine learning models categorize data into specific classes based on patterns learned from previous examples. Unlike regression, which predicts continuous values, classification is used to predict labels or categories, such as identifying whether an email is spam or not, whether a comment is toxic or non-toxic, or whether an image contains a cat or a dog.
                    </p>
                    <p>
                      In this lesson, you will learn the fundamental concepts of classification, how models distinguish between different classes, and how training data helps the model make predictions. You will also explore several popular classification algorithms, such as Logistic Regression, Decision Tree, K-Nearest Neighbors, Naive Bayes, and Support Vector Machine.
                    </p>
                    <p>
                      By completing this topic, you are expected to understand the classification workflow, including data preparation, feature selection, model training, performance evaluation, and prediction interpretation using metrics such as accuracy, precision, recall, F1-score, and confusion matrix.
                    </p>

                    {/* Side-by-side Plots Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                      {/* Confusion Matrix Plot */}
                      <div className="border border-slate-150 rounded-2xl p-4 bg-white flex flex-col items-center">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Confusion Matrix</span>
                        <div className="grid grid-cols-2 gap-1 w-40 h-40 font-bold text-center text-xs">
                          <div className="bg-indigo-100 flex flex-col items-center justify-center text-indigo-750">
                            <span>82</span>
                            <span className="text-[8px] text-indigo-500/70">True Neg</span>
                          </div>
                          <div className="bg-slate-100 flex flex-col items-center justify-center text-slate-500">
                            <span>17</span>
                            <span className="text-[8px] text-slate-450">False Pos</span>
                          </div>
                          <div className="bg-slate-100 flex flex-col items-center justify-center text-slate-500">
                            <span>21</span>
                            <span className="text-[8px] text-slate-450">False Neg</span>
                          </div>
                          <div className="bg-indigo-100 flex flex-col items-center justify-center text-indigo-750">
                            <span>34</span>
                            <span className="text-[8px] text-indigo-500/70">True Pos</span>
                          </div>
                        </div>
                      </div>

                      {/* ROC Curve Plot */}
                      <div className="border border-slate-150 rounded-2xl p-4 bg-white flex flex-col items-center">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">ROC Curve</span>
                        <svg className="w-full h-40 text-indigo-650" viewBox="0 0 200 100">
                          <line x1="10" y1="90" x2="190" y2="90" stroke="#cbd5e1" strokeWidth="1" />
                          <line x1="10" y1="10" x2="10" y2="90" stroke="#cbd5e1" strokeWidth="1" />
                          <line x1="10" y1="90" x2="190" y2="10" stroke="#cbd5e1" strokeDasharray="3" strokeWidth="1" />
                          <path d="M 10 90 Q 30 30 190 10" fill="none" stroke="currentColor" strokeWidth="2" />
                          <text x="120" y="60" fontSize="5" fill="#4f46e5" fontWeight="bold">AUC = 0.81</text>
                        </svg>
                      </div>
                    </div>

                    <p>
                      Basic Classification introduces how machine learning models categorize data into specific classes based on patterns learned from previous examples. Unlike regression, which predicts continuous values, classification is used to predict labels or categories.
                    </p>
                  </div>
                </div>
              )}

              {/* VIEW 5: Quiz Practice View */}
              {activeLessonIdx === 5 && (
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
                  {/* Quiz Header Numbers & Timer */}
                  <div className="flex items-center justify-between pb-2">
                    {/* Numbers 1-8 */}
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <button
                          key={num}
                          onClick={() => setQuizActiveQuestion(num)}
                          className={`h-8 w-8 rounded-xl text-xs font-bold transition-all ${
                            quizActiveQuestion === num
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-100 text-slate-650 hover:bg-slate-200 dark:bg-slate-850 dark:text-slate-400"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>

                    {/* Timer Box */}
                    <div className="flex items-center gap-1.5 rounded-xl border border-indigo-200/50 bg-indigo-50/20 px-3.5 py-2 text-xs font-bold text-indigo-750 dark:border-indigo-900/30 dark:text-indigo-400">
                      <Clock className="h-4 w-4" />
                      <span>12:30</span>
                    </div>
                  </div>

                  {/* Active Question Cards */}
                  <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800 space-y-4">
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-relaxed">
                      In diabetes disease classification, what does the target label usually represent?
                    </h4>

                    {/* Radio Options */}
                    <div className="space-y-3 pt-2">
                      {[
                        { text: "The patient's age", id: 0 },
                        { text: "The number of glucose measurements", id: 1 },
                        { text: "Whether the patient has diabetes or not", id: 2 },
                        { text: "The accuracy of the model", id: 3 }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedAnswers({ ...selectedAnswers, [quizActiveQuestion]: opt.id })}
                          className={`w-full flex items-center gap-3 p-4 rounded-2xl border text-xs font-bold text-left transition-all ${
                            selectedAnswers[quizActiveQuestion] === opt.id
                              ? "border-indigo-600 bg-indigo-50/50 text-indigo-750 dark:bg-indigo-950/20 dark:text-indigo-400"
                              : "border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                          }`}
                        >
                          <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            selectedAnswers[quizActiveQuestion] === opt.id
                              ? "border-indigo-650 bg-indigo-600"
                              : "border-slate-300"
                          }`}>
                            {selectedAnswers[quizActiveQuestion] === opt.id && (
                              <span className="h-2 w-2 rounded-full bg-white" />
                            )}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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
                    <div key={idx} className="flex gap-3 text-xs text-slate-655 dark:text-slate-350 font-medium">
                      <Check className="h-4.5 w-4.5 text-indigo-650 shrink-0" />
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
                    className="w-full rounded-2xl border border-slate-200 py-3.5 text-xs font-bold hover:bg-slate-50 dark:border-slate-855 dark:hover:bg-slate-800 cursor-pointer"
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
                  <div className="space-y-3 text-[11px] font-semibold text-slate-655 dark:text-slate-350">
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
