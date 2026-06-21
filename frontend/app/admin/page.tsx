"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Link from "next/link";
import { 
  Users, BookOpen, Coins, ShieldAlert, TrendingUp, Sparkles, Activity,
  ArrowRight, ShieldCheck, Zap
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { name: "Total Pengguna", val: "728", icon: Users, diff: "+12.5% minggu ini", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20" },
    { name: "Modul Aktif", val: "18", icon: BookOpen, diff: "6 modul Machine Learning", color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20" },
    { name: "Token API Terpakai", val: "4.2M", icon: Coins, diff: "$56.24 Estimasi Biaya", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20" },
    { name: "Isu Keamanan", val: "0", icon: ShieldAlert, diff: "Sistem Terlindungi", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/20" }
  ];

  const recentActivity = [
    { id: 1, user: "Nadya Najelina", action: "Menyelesaikan kuis Naive Bayes", time: "10 menit yang lalu", type: "success" },
    { id: 2, user: "Budi Santoso", action: "Mengakses notebook Diabetes Classification", time: "45 menit yang lalu", type: "info" },
    { id: 3, user: "Dewi Lestari (Admin)", action: "Menambahkan modul Clustering Baru", time: "2 jam yang lalu", type: "admin" },
    { id: 4, user: "Sistem AIphy", action: "Membersihkan log lama (Cron job)", time: "5 jam yang lalu", type: "system" }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pl-20 dark:bg-slate-950">
      <Sidebar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header userName="Administrator" userTitle="Manajemen data pengguna, konten kurikulum, dan pemantauan AIphy." />

        {/* stats grid */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 transition hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{stat.name}</span>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{stat.val}</span>
                  <span className="block mt-1 text-[10px] font-bold text-slate-450 dark:text-slate-500">{stat.diff}</span>
                </div>
              </div>
            );
          })}
        </section>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          
          {/* Recent Activity Feed */}
          <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="h-4.5 w-4.5 text-red-500" />
                Aktivitas Pengguna & Sistem
              </h3>
            </div>
            
            <div className="mt-4 space-y-4">
              {recentActivity.map((act) => (
                <div key={act.id} className="flex items-start justify-between text-xs p-3 hover:bg-slate-50 rounded-2xl dark:hover:bg-slate-850/30">
                  <div className="flex items-center gap-3">
                    <span className="text-base">
                      {act.type === "success" ? "✅" : act.type === "info" ? "💻" : act.type === "admin" ? "🔑" : "⚙️"}
                    </span>
                    <div>
                      <p className="font-extrabold text-slate-950 dark:text-white">{act.user}</p>
                      <p className="text-slate-550 dark:text-slate-400 mt-0.5">{act.action}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CMS & Access Links */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Akses Cepat Admin</h3>
              <div className="space-y-3">
                <Link href="/admin/courses" className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-150 hover:bg-red-50/10 hover:border-red-500/30 transition text-xs font-bold text-slate-700 dark:border-slate-800 dark:text-slate-300">
                  <span>CMS Kelola Kurikulum</span>
                  <ArrowRight className="h-4 w-4 text-red-550" />
                </Link>
                <Link href="/admin/users" className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-150 hover:bg-red-50/10 hover:border-red-500/30 transition text-xs font-bold text-slate-700 dark:border-slate-800 dark:text-slate-300">
                  <span>Manajemen Pengguna</span>
                  <ArrowRight className="h-4 w-4 text-red-550" />
                </Link>
                <Link href="/admin/settings" className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-150 hover:bg-red-50/10 hover:border-red-500/30 transition text-xs font-bold text-slate-700 dark:border-slate-800 dark:text-slate-300">
                  <span>Konfigurasi LLM Prompt</span>
                  <ArrowRight className="h-4 w-4 text-red-550" />
                </Link>
              </div>
            </div>

            {/* AI System status widget */}
            <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span className="text-xs font-extrabold tracking-wide uppercase">AIphy Agent Status</span>
              </div>
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400 font-medium">Model Utama</span>
                  <span className="font-mono text-[10px] bg-white/10 px-2 py-0.5 rounded">GPT-4o / Claude-3.5</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400 font-medium">API Endpoint</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Zap className="h-3 w-3 fill-emerald-400" /> Online
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Latensi Rata-rata</span>
                  <span className="font-mono text-slate-300">1.2s</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
