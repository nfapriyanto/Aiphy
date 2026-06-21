"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { useState } from "react";
import { Users, BookOpen, Coins, ShieldAlert, Plus, Trash2, Edit2, Check, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  const [activeView, setActiveView] = useState("users"); // "users" | "courses" | "api"
  const [users, setUsers] = useState([
    { id: 1, name: "Nadya Najelina", email: "nadya@ug.ac.id", role: "Standard Learner", status: "Active" },
    { id: 2, name: "Budi Santoso", email: "budi@gmail.com", role: "Standard Learner", status: "Active" },
    { id: 3, name: "Prof. Hermawan", email: "hermawan@ug.ac.id", role: "Instructor Access", status: "Active" },
    { id: 4, name: "Dewi Lestari", email: "dewi.l@techsolusi.id", role: "Content Admin", status: "Active" }
  ]);

  const [courses, setCourses] = useState([
    { id: 1, title: "Basic Machine Learning Algorithm", category: "Machine Learning", level: "Beginner" },
    { id: 2, title: "Neural Networks & Deep Learning Fundamental", category: "Deep Learning", level: "Intermediate" }
  ]);

  // Form states
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("Machine Learning");
  const [newCourseLevel, setNewCourseLevel] = useState("Beginner");

  // Mock handlers
  const handleBlockUser = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Blocked" : "Active" } : u));
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    setCourses([...courses, {
      id: courses.length + 1,
      title: newCourseTitle,
      category: newCourseCategory,
      level: newCourseLevel
    }]);
    setNewCourseTitle("");
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pl-20 dark:bg-slate-950">
      <Sidebar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header userName="Administrator" userTitle="Manajemen data pengguna, konten kurikulum, dan pemakaian token API LLM." />

        {/* Core Stats Overview */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          {[
            { name: "Total Pengguna", val: "728", icon: Users, diff: "+12.5% minggu ini", color: "text-blue-500" },
            { name: "Modul Aktif", val: "18", icon: BookOpen, diff: "2 Draf tersimpan", color: "text-indigo-500" },
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
                  <span className="block mt-1 text-[10px] font-semibold text-slate-400">{stat.diff}</span>
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
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-350 dark:border-slate-800 dark:hover:bg-slate-800"
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
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                  {users.length} Total
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs text-slate-600 dark:text-slate-300">
                  <thead className="bg-slate-550/20 text-slate-700 dark:bg-slate-950/20 dark:text-slate-400">
                    <tr className="border-b border-slate-100 dark:border-slate-850">
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
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Courses list */}
              <div className="lg:col-span-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="p-6 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Daftar Modul Kurikulum</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-850">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-5 hover:bg-slate-50/50 dark:hover:bg-slate-850/10">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{course.category}</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">{course.title}</h4>
                        <span className="inline-block mt-2 text-[10px] font-semibold text-slate-450 dark:text-slate-500">Level: {course.level}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition dark:bg-rose-950/20 dark:text-rose-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Course Form */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-sm font-bold text-slate-900 mb-6 dark:text-white flex items-center gap-2">
                  <Plus className="h-5 w-5 text-indigo-600" />
                  Tambah Modul Baru
                </h3>
                <form onSubmit={handleAddCourse} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Judul Modul</label>
                    <input
                      type="text"
                      required
                      value={newCourseTitle}
                      onChange={(e) => setNewCourseTitle(e.target.value)}
                      placeholder="Contoh: Pengenalan Neural Networks"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Kategori</label>
                    <select
                      value={newCourseCategory}
                      onChange={(e) => setNewCourseCategory(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-indigo-200"
                    >
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Deep Learning">Deep Learning</option>
                      <option value="Generative AI">Generative AI</option>
                      <option value="Mathematics for AI">Mathematics for AI</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">Tingkat Kesulitan</label>
                    <select
                      value={newCourseLevel}
                      onChange={(e) => setNewCourseLevel(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-indigo-200"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-indigo-600 py-3 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/10"
                  >
                    Terbitkan Modul
                  </button>
                </form>
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
                  <button className="rounded-2xl bg-slate-950 px-5 py-3 text-xs font-bold text-white hover:bg-slate-850 dark:bg-indigo-600 dark:hover:bg-indigo-500">
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
