"use client";

import { Search, ShoppingBag, Bell, ChevronDown } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  userName?: string;
  userTitle?: string;
}

export default function Header({ 
  userName = "Nadya Najelina", 
  userTitle = "Track your progress, activity, and performance." 
}: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-8">
      {/* Greetings */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-white">
          Hi, {userName}
        </h1>
        <p className="text-sm font-medium text-slate-500 mt-1 dark:text-slate-400">
          {userTitle}
        </p>
      </div>

      {/* Actions & Search */}
      <div className="flex flex-1 max-w-2xl items-center gap-4 md:justify-end">
        {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses, lessons, or topics..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-500"
          />
        </div>

        {/* Cart, Notifications & Profile */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
            <ShoppingBag className="h-5 w-5" />
          </button>

          {/* Notifications */}
          <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
              3
            </span>
          </button>

          {/* Vertical Divider */}
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />

          {/* Profile Dropdown */}
          <button className="flex items-center gap-2 rounded-2xl p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-slate-200">
              <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-sm font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                NN
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
