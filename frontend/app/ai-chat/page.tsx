"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { Send, Sparkles, MessageSquare, Bot } from "lucide-react";
import { useState } from "react";

export default function AiChatPage() {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Halo! Saya AIphy Tutor, asisten belajar kecerdasan artifisial Anda. Ada konsep AI yang ingin Anda tanyakan atau sederhanakan?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const currentInput = input;
    setInput("");
    
    // AI response stub
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `Ini adalah respon otomatis (stub) untuk pertanyaan Anda: "${currentInput}". Di fase berikutnya, AIphy Tutor akan terhubung langsung ke model LLM dengan instruksi penyederhanaan konsep teknis kecerdasan buatan.`
        }
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pl-20 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <Header userName="Nadya Najelina" userTitle="Tanyakan apa saja seputar AI kepada tutor virtual adaptif Anda." />

        {/* AI Chat Frame */}
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 h-[600px] overflow-hidden">
          {/* Chat Header */}
          <div className="flex items-center gap-3 border-b border-slate-100 p-4 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-400">
              <Bot className="h-5.5 w-5.5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                AIphy Assistant <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">Tutor Virtual</span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">Online • Adaptif & Penyederhana Bahasa Teknis</p>
            </div>
          </div>

          {/* Messages View */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[80%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-xl text-xs font-bold ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {msg.sender === "user" ? "U" : "AI"}
                </div>
                <div
                  className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-sm ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-slate-50 text-slate-800 dark:bg-slate-800/40 dark:text-slate-200 rounded-tl-none border border-slate-100/50 dark:border-slate-800/50"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Panel */}
          <div className="border-t border-slate-100 p-4 dark:border-slate-800">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Tanyakan tentang Machine Learning, neural networks, LLM..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-4 pr-14 text-xs text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:border-indigo-500"
              />
              <button
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-sm"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
