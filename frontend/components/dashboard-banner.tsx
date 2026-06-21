"use client";

import { Target, Flame } from "lucide-react";
import Image from "next/image";

export default function DashboardBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl">
      {/* Background Gradient & Patterns */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 via-slate-900/95 to-slate-900" />
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-10 top-0 hidden w-72 md:block">
        {/* Placeholder for the illustration/avatar overlay */}
        <div className="relative h-full w-full opacity-85 hover:opacity-100 transition-opacity">
          <div className="absolute inset-y-8 right-0 left-8 rounded-2xl bg-gradient-to-b from-indigo-500/20 to-indigo-600/10 border border-indigo-500/20 shadow-inner flex flex-col items-center justify-center text-center p-4">
            <span className="text-xs font-semibold tracking-widest text-indigo-300 uppercase">Interactive Lab</span>
            <p className="text-[10px] text-slate-400 mt-1 max-w-[180px]">Practice machine learning theories directly in browser sandbox environments.</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col p-6 sm:p-8 md:max-w-2xl">
        {/* Course Header */}
        <div className="mb-4">
          <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300">
            Active Study
          </span>
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl mt-3">
            Basic Machine Learning Algorithm
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Module 2: User Research <span className="mx-1.5 text-slate-500">•</span> Lessons 2.3: Interview Basics
          </p>
        </div>

        {/* Progress Bar & Description */}
        <div className="mb-6 w-full max-w-md">
          <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
            <span>Progress: 1/3 lessons</span>
            <span>2h 10min remaining</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full w-1/3 rounded-full bg-indigo-500" />
          </div>
        </div>

        {/* Banner Footer Actions */}
        <div className="flex flex-wrap items-center max-w-md gap-4 border-t border-slate-800 pt-5">
          {/* Next Goal */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 text-indigo-400">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Next Goal</span>
              <span className="text-xs font-medium text-slate-200">Complete Lessons 2.2</span>
            </div>
          </div>

          {/* Action button */}
          <button className="sm:ml-auto flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/20 active:scale-95">
            <Flame className="h-4 w-4 fill-white" />
            Learn Again!
          </button>
        </div>
      </div>
    </div>
  );
}
