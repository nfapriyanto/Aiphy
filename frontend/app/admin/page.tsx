"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { useState } from "react";
import { 
  Users, BookOpen, Coins, ShieldAlert, Plus, Trash2, Edit2, Check, TrendingUp,
  Play, FileText, Code2, HelpCircle, Shield
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeView, setActiveView] = useState("users"); // "users" | "courses" | "api"
  const [users, setUsers] = useState([
    { id: 1, name: "Nadya Najelina", email: "nadya@ug.ac.id", role: "Standard Learner", status: "Active" },
    { id: 2, name: "Budi Santoso", email: "budi@gmail.com", role: "Standard Learner", status: "Active" },
    { id: 3, name: "Prof. Hermawan", email: "hermawan@ug.ac.id", role: "Instructor Access", status: "Active" },
    { id: 4, name: "Dewi Lestari", email: "dewi.l@techsolusi.id", role: "Content Admin", status: "Active" }
  ]);

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Basic Machine Learning Algorithm",
      category: "Machine Learning",
      level: "Beginner",
      lessons: [
        { id: 1, title: "Logistic Regression: Sigmoid", type: "video", duration: "12m" },
        { id: 2, title: "K-Nearest Neighbors (KNN)", type: "video", duration: "15m" },
        { id: 3, title: "Naive Bayes: Probabilistic Classifier", type: "video", duration: "18m" },
        { id: 4, title: "Diabetes Disease Classification", type: "coding", duration: "30m" },
        { id: 5, title: "Lesson Summary", type: "text", duration: "5m" },
        { id: 6, title: "Quiz Practice", type: "quiz", duration: "15m" }
      ]
    },
    {
      id: 2,
      title: "Neural Networks & Deep Learning Fundamental",
      category: "Deep Learning",
      level: "Intermediate",
      lessons: [
        { id: 1, title: "Introduction to Neural Networks", type: "video", duration: "20m" }
      ]
    }
  ]);

  const [selectedCourseId, setSelectedCourseId] = useState<number>(1);

  // Form states (Module)
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("Machine Learning");
  const [newCourseLevel, setNewCourseLevel] = useState("Beginner");

  // Form states (Lesson CMS)
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonType, setNewLessonType] = useState("video");
  const [newLessonDuration, setNewLessonDuration] = useState("15m");

  // Handlers
  const handleBlockUser = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u));
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, {
      id: newId,
      title: newCourseTitle,
      category: newCourseCategory,
      level: newCourseLevel,
      lessons: []
    }]);
    setSelectedCourseId(newId);
    setNewCourseTitle("");
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
    if (selectedCourseId === id && courses.length > 1) {
      const remaining = courses.filter(c => c.id !== id);
      setSelectedCourseId(remaining[0].id);
    }
  };

  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;
    setCourses(courses.map(c => {
      if (c.id === selectedCourseId) {
        const nextLessonId = c.lessons.length > 0 ? Math.max(...c.lessons.map(l => l.id)) + 1 : 1;
        return {
          ...c,
          lessons: [
            ...c.lessons,
            {
              id: nextLessonId,
              title: newLessonTitle,
              type: newLessonType,
              duration: newLessonDuration
            }
          ]
        };
      }
      return c;
    }));
    setNewLessonTitle("");
  };

  const handleDeleteLesson = (courseId: number, lessonId: number) => {
    setCourses(courses.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          lessons: c.lessons.filter(l => l.id !== lessonId)
        };
      }
      return c;
    }));
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pl-20 dark:bg-slate-950">
      <Sidebar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header userName="Administrator" userTitle="Manajemen data pengguna, konten kurikulum, dan pemantauan AIphy." />

        {/* Core Stats Overview */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          {[
            { name: "Total Pengguna", val: users.length.toString(), icon: Users, diff: "+12.5% minggu ini", color: "text-blue-500" },
            { name: "Modul Aktif", val: courses.length.toString(), icon: BookOpen, diff: `${courses.reduce((acc, c) => acc + c.lessons.length, 0)} total materi pembelajaran`, color: "text-red-500" },
            { name: "Token API Terpakai", val: "4.2M", icon: Coins, diff: "$56.24 Estimasi Biaya", color: "text-emerald-500" },
            { name: "Isu Keamanan", val: "0", icon: ShieldAlert, diff: "Sistem Terlindungi", color: "text-rose-500" }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{stat.name}</span>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-850 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{stat.val}</span>
                  <span className="block mt-1 text-[10px] font-semibold text-slate-450 dark:text-slate-500">{stat.diff}</span>
                </div>
              </div>
            );
          })}
        </section>

        {/* View Switches */}
        <div className="mt-12 flex items-center gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
          {[
            { id: "users", name: "Manajemen Pengguna" },
            { id: "courses", name: "Manajemen Konten (CMS)" },
            { id: "api", name: "Konfigurasi & Token AI" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`rounded-2xl px-5 py-2.5 text-xs font-bold transition-all ${
                activeView === tab.id
                  ? "bg-red-650 text-white shadow-md shadow-red-650/10"
                  : "bg-white text-slate-650 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-350 dark:border-slate-800 dark:hover:bg-slate-800"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* View Content Panels */}
        <section className="mt-8">
          {/* User Management Panel */}
          {activeView === "users" && (
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="p-6 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Daftar Akun Pengguna</h3>
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-600 dark:bg-red-950/20 dark:text-red-400">
                  {users.length} Total
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs text-slate-600 dark:text-slate-300">
                  <thead className="bg-slate-50 text-slate-700 dark:bg-slate-950/20 dark:text-slate-400 border-b border-slate-100 dark:border-slate-850">
                    <tr>
                      <th className="p-4 font-bold">Nama</th>
                      <th className="p-4 font-bold">Email</th>
                      <th className="p-4 font-bold">Hak Akses</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/10">
                        <td className="p-4 font-semibold text-slate-950 dark:text-white">{user.name}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4 font-medium">{user.role}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            user.status === "Active" 
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400"
                              : "bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400"
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleBlockUser(user.id)}
                            className="rounded-xl border border-slate-200 px-3 py-1.5 text-[10px] font-bold hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                          >
                            {user.status === "Active" ? "Blokir" : "Aktifkan"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CMS Course Management Panel */}
          {activeView === "courses" && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Modules selection list */}
              <div className="lg:col-span-4 space-y-6">
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between bg-slate-50/40 dark:bg-slate-950/20">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Modul Kurikulum</h3>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-850">
                    {courses.map((course) => (
                      <div 
                        key={course.id} 
                        onClick={() => setSelectedCourseId(course.id)}
                        className={`p-4 cursor-pointer transition-all ${
                          selectedCourseId === course.id 
                            ? "bg-red-50/40 border-l-4 border-red-600 dark:bg-red-950/10" 
                            : "hover:bg-slate-50/50 dark:hover:bg-slate-850/10"
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">{course.category}</span>
                            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white mt-0.5 line-clamp-1">{course.title}</h4>
                            <span className="inline-block text-[9px] font-semibold text-slate-450 dark:text-slate-500 mt-1">{course.lessons.length} Materi • {course.level}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCourse(course.id);
                            }}
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Module Form */}
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-xs font-extrabold text-slate-900 mb-4 dark:text-white flex items-center gap-2">
                    <Plus className="h-4.5 w-4.5 text-red-650" />
                    Tambah Modul Baru
                  </h3>
                  <form onSubmit={handleAddCourse} className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">Judul Modul</label>
                      <input
                        type="text"
                        required
                        value={newCourseTitle}
                        onChange={(e) => setNewCourseTitle(e.target.value)}
                        placeholder="Contoh: Clustering Algorithms"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none focus:border-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">Kategori</label>
                        <select
                          value={newCourseCategory}
                          onChange={(e) => setNewCourseCategory(e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none focus:border-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-indigo-200"
                        >
                          <option value="Machine Learning">Machine Learning</option>
                          <option value="Deep Learning">Deep Learning</option>
                          <option value="Generative AI">Generative AI</option>
                          <option value="Mathematics for AI">Mathematics for AI</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">Kesulitan</label>
                        <select
                          value={newCourseLevel}
                          onChange={(e) => setNewCourseLevel(e.target.value)}
                          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none focus:border-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-indigo-200"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-2xl bg-red-650 py-2.5 text-xs font-bold text-white hover:bg-red-600 transition shadow-md shadow-red-650/10 cursor-pointer"
                    >
                      Terbitkan Modul
                    </button>
                  </form>
                </div>
              </div>

              {/* Module Content CMS Lesson Details Editor */}
              <div className="lg:col-span-8 space-y-6">
                {selectedCourse ? (
                  <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                    
                    {/* Lessons list in selected module */}
                    <div className="xl:col-span-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                      <div className="p-5 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between bg-slate-50/40 dark:bg-slate-950/20">
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Materi di Modul</h3>
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5 line-clamp-1">{selectedCourse.title}</p>
                        </div>
                        <span className="rounded-full bg-red-55 px-2.5 py-1 text-[10px] font-bold text-red-700 dark:bg-red-950/40">
                          {selectedCourse.lessons.length} Materi
                        </span>
                      </div>

                      <div className="divide-y divide-slate-100 dark:divide-slate-850">
                        {selectedCourse.lessons.length > 0 ? (
                          selectedCourse.lessons.map((lesson, idx) => (
                            <div key={lesson.id} className="flex items-center justify-between p-4 hover:bg-slate-50/20">
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 dark:bg-slate-850">
                                  {lesson.type === "video" ? (
                                    <Play className="h-4 w-4 text-indigo-500 fill-indigo-500" />
                                  ) : lesson.type === "coding" ? (
                                    <Code2 className="h-4 w-4 text-emerald-500" />
                                  ) : lesson.type === "text" ? (
                                    <FileText className="h-4 w-4 text-blue-500" />
                                  ) : (
                                    <HelpCircle className="h-4 w-4 text-amber-500" />
                                  )}
                                </span>
                                <div className="truncate">
                                  <h5 className="text-xs font-extrabold text-slate-800 dark:text-white truncate">{lesson.title}</h5>
                                  <span className="inline-block text-[9px] font-semibold text-slate-400 capitalize">Tipe: {lesson.type} • Durasi: {lesson.duration}</span>
                                </div>
                              </div>
                              <button
                                onClick={() => handleDeleteLesson(selectedCourse.id, lesson.id)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/30"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-xs font-semibold text-slate-400">
                            Modul ini belum memiliki materi. Gunakan form di sebelah kanan untuk menambahkan!
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add Lesson CMS Form */}
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 h-fit">
                      <h3 className="text-xs font-extrabold text-slate-900 mb-4 dark:text-white flex items-center gap-2">
                        <Plus className="h-4.5 w-4.5 text-red-650" />
                        Tambah Materi Pembelajaran
                      </h3>
                      <form onSubmit={handleAddLesson} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">Nama Materi</label>
                          <input
                            type="text"
                            required
                            value={newLessonTitle}
                            onChange={(e) => setNewLessonTitle(e.target.value)}
                            placeholder="Contoh: K-Means Clustering"
                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none focus:border-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">Tipe Konten</label>
                          <select
                            value={newLessonType}
                            onChange={(e) => setNewLessonType(e.target.value)}
                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none focus:border-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-indigo-200"
                          >
                            <option value="video">Video Pembelajaran</option>
                            <option value="text">Ringkasan / Text Summary</option>
                            <option value="coding">Lab Coding Notebook</option>
                            <option value="quiz">Latihan Quiz / MCQ</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider dark:text-slate-400">Estimasi Waktu Pengerjaan</label>
                          <input
                            type="text"
                            required
                            value={newLessonDuration}
                            onChange={(e) => setNewLessonDuration(e.target.value)}
                            placeholder="Contoh: 15m atau 1h"
                            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-xs outline-none focus:border-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full rounded-2xl bg-slate-950 py-2.5 text-xs font-bold text-white hover:bg-slate-900 transition dark:bg-red-650 dark:hover:bg-red-600 cursor-pointer"
                        >
                          Tambahkan Materi
                        </button>
                      </form>
                    </div>

                  </div>
                ) : (
                  <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-xs font-semibold text-slate-455 dark:border-slate-800 dark:bg-slate-900">
                    Silakan pilih modul di panel kiri terlebih dahulu.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Panel Configurations */}
          {activeView === "api" && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pemantauan & Prompt Engineering</h3>
                <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">Atur instruksi dasar tutor LLM serta pantau kuota pemakaian API token.</p>
              </div>
              <div className="my-6 h-[1px] w-full bg-slate-100 dark:bg-slate-800" />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Prompt instructions */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">System Instruction (Tutor Virtual)</label>
                  <textarea
                    rows={6}
                    defaultValue="Anda adalah AIphy Tutor, asisten pembelajaran kecerdasan artifisial adaptif. Tugas utama Anda adalah menjelaskan teori, rumus, dan konsep koding AI yang rumit menggunakan analogi sederhana dan bahasa pemula yang mudah dimengerti."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-indigo-200"
                  />
                  <button className="rounded-2xl bg-slate-950 px-5 py-3 text-xs font-bold text-white hover:bg-slate-850 dark:bg-red-650 dark:hover:bg-red-600">
                    Simpan Perubahan Prompt
                  </button>
                </div>

                {/* API Logs */}
                <div className="rounded-2xl bg-slate-900 p-6 text-xs text-slate-300 font-mono space-y-3">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Logs Request Token API:</span>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span>15:02:14 - GPT-4o Prompt Tokens: 1,240</span>
                    <span className="text-emerald-500">Success</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span>15:01:56 - Claude-3.5 Prompt Tokens: 820</span>
                    <span className="text-emerald-500">Success</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span>14:59:12 - Gemini-1.5 Output Tokens: 2,400</span>
                    <span className="text-emerald-500">Success</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
