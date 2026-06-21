"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { useState } from "react";
import { Settings, Save, Sparkles, Check, Database, Zap, RefreshCw } from "lucide-react";

export default function AdminSettingsPage() {
  const [systemPrompt, setSystemPrompt] = useState(
    "Anda adalah AIphy Tutor, asisten pembelajaran kecerdasan artifisial adaptif. Tugas utama Anda adalah menjelaskan teori, rumus, dan konsep koding AI yang rumit menggunakan analogi sederhana dan bahasa pemula yang mudah dimengerti."
  );
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const apiLogs = [
    { time: "15:02:14", model: "gpt-4o", prompt: 1240, completion: 520, cost: "$0.0116", status: "Success" },
    { time: "15:01:56", model: "claude-3.5", prompt: 820, completion: 310, cost: "$0.0071", status: "Success" },
    { time: "14:59:12", model: "gemini-1.5", prompt: 2400, completion: 1280, cost: "$0.0148", status: "Success" },
    { time: "14:55:03", model: "gpt-4o", prompt: 650, completion: 180, cost: "$0.0046", status: "Success" }
  ];

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pl-20 dark:bg-slate-950">
      <Sidebar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header userName="AI & System Settings" userTitle="Konfigurasi asisten virtual AIphy, API gateway, prompt engineering, dan pemantauan token." />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mt-8">
          
          {/* Left panel: Prompt & parameters */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-xs font-extrabold text-slate-900 mb-6 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Database className="h-4.5 w-4.5 text-red-650" />
              Konfigurasi Model & Prompting
            </h3>
            
            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Model Utama Tutor</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-55/30 px-3.5 py-2.5 text-xs outline-none focus:border-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white font-bold"
                >
                  <option value="gpt-4o">GPT-4o (Recommended - Best Logic)</option>
                  <option value="claude-3.5">Claude 3.5 Sonnet (Best Coding Help)</option>
                  <option value="gemini-1.5">Gemini 1.5 Pro (Multi-modal & Large Context)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Temperature ({temperature})</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-650"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Max Output Length ({maxTokens} tokens)</label>
                  <input
                    type="range"
                    min="512"
                    max="4096"
                    step="256"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-650"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Tutor System Instruction</label>
                <textarea
                  rows={6}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-55/30 p-4 text-xs font-semibold outline-none focus:border-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  {saveSuccess && (
                    <span className="text-[10px] font-bold text-emerald-650 bg-emerald-50 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                      <Check className="h-4 w-4" /> Berhasil memperbarui konfigurasi LLM!
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="rounded-2xl bg-red-650 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-600 transition flex items-center gap-1.5 shadow-md shadow-red-650/10 cursor-pointer"
                >
                  <Save className="h-4 w-4" /> Simpan Konfigurasi
                </button>
              </div>
            </form>
          </div>

          {/* Right panel: Costs & API logs usage */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live API usage logs list */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 bg-slate-50/40 p-2.5 rounded-2xl dark:bg-slate-950/20">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                  Live API Transaction logs
                </span>
                <RefreshCw className="h-3.5 w-3.5 text-slate-400 animate-spin cursor-pointer" />
              </div>

              <div className="space-y-3.5 font-mono text-[10px] text-slate-550 dark:text-slate-450">
                {apiLogs.map((log, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2.5">
                    <div>
                      <span className="text-slate-400">{log.time}</span> • <span className="font-extrabold uppercase text-slate-700 dark:text-slate-350">{log.model}</span>
                      <p className="text-[9px] text-slate-400 font-semibold mt-0.5">In: {log.prompt} / Out: {log.completion} tokens</p>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-500 font-bold block">{log.status}</span>
                      <span className="text-slate-400 font-bold block mt-0.5">{log.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Outline description card */}
            <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm space-y-3">
              <h4 className="text-xs font-extrabold tracking-wide uppercase flex items-center gap-1.5">
                <Sparkles className="h-4.5 w-4.5 text-red-400 fill-red-400" /> Prompt Engineering Tips
              </h4>
              <p className="text-[11px] leading-relaxed text-slate-400 font-medium">
                Untuk meningkatkan respon chatbot AIphy, pastikan instruksi sistem menyertakan batas materi yang dipelajari. Menggunakan parameter **temperature** yang lebih rendah (~0.2 - 0.4) disarankan saat mengedit soal koding/kuis untuk hasil jawaban yang deterministik dan minim halusinasi.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
