"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  MessageSquare, 
  HelpCircle, 
  Settings,
  Sparkles,
  Shield,
  Users
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const menuItems = isAdmin
    ? [
        { name: "Admin Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Curriculum CMS", href: "/admin/courses", icon: BookOpen },
        { name: "User Management", href: "/admin/users", icon: Users },
        { name: "AI Settings", href: "/admin/settings", icon: Settings },
      ]
    : [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "My Course", href: "/my-course", icon: GraduationCap },
        { name: "All Courses", href: "/all-courses", icon: BookOpen },
        { name: "AI Chat", href: "/ai-chat", icon: MessageSquare },
      ];

  const bottomItems = isAdmin
    ? [
        { name: "View as Learner", href: "/dashboard", icon: GraduationCap },
      ]
    : [
        { name: "Help", href: "/help", icon: HelpCircle },
        { name: "Settings", href: "/settings", icon: Settings },
      ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-20 flex w-20 flex-col items-center justify-between border-r py-6 text-white shadow-xl transition-all duration-300 ${
      isAdmin 
        ? "border-red-950/20 bg-slate-900" 
        : "border-indigo-900/10 bg-[#1E216B]"
    }`}>
      {/* Brand Logo */}
      <div className="flex flex-col items-center gap-2">
        <Link 
          href={isAdmin ? "/admin" : "/"} 
          className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-200 ${
            isAdmin 
              ? "bg-red-500/20 text-red-300 hover:bg-red-500/30" 
              : "bg-indigo-500/20 text-white hover:bg-indigo-500/30"
          }`}
        >
          {isAdmin ? (
            <Shield className="h-6 w-6 text-red-400 animate-pulse" />
          ) : (
            <Sparkles className="h-6 w-6 text-indigo-300 animate-pulse" />
          )}
        </Link>
      </div>

      {/* Menu Navigation */}
      <nav className="flex flex-col gap-6 w-full px-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={item.name}
              className={`relative flex h-12 w-12 mx-auto items-center justify-center rounded-xl transition-all duration-300 ${
                isActive
                  ? isAdmin
                    ? "bg-red-600/90 text-white shadow-md shadow-red-600/30 scale-105"
                    : "bg-indigo-600/90 text-white shadow-md shadow-indigo-600/30 scale-105"
                  : "text-indigo-200/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5.5 w-5.5" />
              {isActive && (
                <span className={`absolute left-0 top-3 h-6 w-1 rounded-r ${
                  isAdmin ? "bg-red-400" : "bg-indigo-300"
                }`} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Navigation */}
      <div className="flex flex-col gap-6 w-full px-2">
        <div className="h-[1px] w-8 mx-auto bg-indigo-200/20" />
        {bottomItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              title={item.name}
              className={`flex h-12 w-12 mx-auto items-center justify-center rounded-xl transition-all duration-300 ${
                isActive
                  ? isAdmin
                    ? "bg-red-600/90 text-white"
                    : "bg-indigo-600/90 text-white"
                  : "text-indigo-200/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5.5 w-5.5" />
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
