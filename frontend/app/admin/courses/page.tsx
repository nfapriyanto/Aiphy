"use client";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { useState } from "react";
import { 
  BookOpen, Plus, Trash2, Edit3, Play, FileText, Code2, HelpCircle,
  Bold, Italic, Underline, AlignLeft, List, Code, Link2, Eye, Save, Sparkles, Check
} from "lucide-react";

interface Lesson {
  id: number;
  title: string;
  type: string;
  duration: string;
  content?: string;
}

interface Course {
  id: number;
  title: string;
  category: string;
  level: string;
  lessons: Lesson[];
}

export default function AdminCoursesCMSPage() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Basic Machine Learning Algorithm",
      category: "Machine Learning",
      level: "Beginner",
      lessons: [
        { id: 1, title: "Logistic Regression: Sigmoid", type: "video", duration: "12m", content: "Belajar matematika dasar fungsi sigmoid untuk regresi logistik." },
        { id: 2, title: "K-Nearest Neighbors (KNN)", type: "video", duration: "15m", content: "Algoritma KNN didasarkan pada jarak terdekat tetangga." },
        { id: 3, title: "Naive Bayes: Probabilistic Classifier", type: "video", duration: "18m", content: "Klasifikasi probabilistik berdasarkan teorema Bayes." },
        { id: 4, title: "Diabetes Disease Classification", type: "coding", duration: "30m", content: "import pandas as pd\nimport numpy as np" },
        { id: 5, title: "Lesson Summary", type: "text", duration: "5m", content: "# Ringkasan Pembelajaran\nKlasifikasi membagi data ke kategori diskrit." },
        { id: 6, title: "Quiz Practice", type: "quiz", duration: "15m", content: "Q1: Apa fungsi sigmoid?\nA: Mereturn nilai 0 s/d 1." }
      ]
    },
    {
      id: 2,
      title: "Neural Networks & Deep Learning Fundamental",
      category: "Deep Learning",
      level: "Intermediate",
      lessons: [
        { id: 1, title: "Introduction to Neural Networks", type: "video", duration: "20m", content: "Dasar arsitektur jaringan saraf tiruan (perseptron)." }
      ]
    }
  ]);

  const [selectedCourseId, setSelectedCourseId] = useState<number>(1);
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(1);

  // WYSIWYG State
  const [wysiwygContent, setWysiwygContent] = useState("Belajar matematika dasar fungsi sigmoid untuk regresi logistik.");
  const [wysiwygTitle, setWysiwygTitle] = useState("Logistic Regression: Sigmoid");
  const [editorMode, setEditorMode] = useState<"edit" | "preview">("edit");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states (Module)
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("Machine Learning");
  const [newCourseLevel, setNewCourseLevel] = useState("Beginner");

  // Form states (Lesson)
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonType, setNewLessonType] = useState("video");
  const [newLessonDuration, setNewLessonDuration] = useState("15m");

  const selectedCourse = courses.find(c => c.id === selectedCourseId);
  const selectedLesson = selectedCourse?.lessons.find(l => l.id === selectedLessonId);

  // CRUD Modules
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    const newCourseObj: Course = {
      id: newId,
      title: newCourseTitle,
      category: newCourseCategory,
      level: newCourseLevel,
      lessons: []
    };
    setCourses([...courses, newCourseObj]);
    setSelectedCourseId(newId);
    setSelectedLessonId(null);
    setNewCourseTitle("");
  };

  const handleDeleteCourse = (id: number) => {
    const remaining = courses.filter(c => c.id !== id);
    setCourses(remaining);
    if (selectedCourseId === id && remaining.length > 0) {
      setSelectedCourseId(remaining[0].id);
      setSelectedLessonId(remaining[0].lessons[0]?.id || null);
    }
  };

  // CRUD Lessons
  const handleAddLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;
    setCourses(courses.map(c => {
      if (c.id === selectedCourseId) {
        const nextId = c.lessons.length > 0 ? Math.max(...c.lessons.map(l => l.id)) + 1 : 1;
        const newL: Lesson = {
          id: nextId,
          title: newLessonTitle,
          type: newLessonType,
          duration: newLessonDuration,
          content: `Konten awal untuk materi ${newLessonTitle}`
        };
        return {
          ...c,
          lessons: [...c.lessons, newL]
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
    if (selectedLessonId === lessonId) {
      setSelectedLessonId(null);
    }
  };

  // Handle lesson selection -> sync WYSIWYG
  const selectLesson = (lesson: Lesson) => {
    setSelectedLessonId(lesson.id);
    setWysiwygTitle(lesson.title);
    setWysiwygContent(lesson.content || "");
    setSaveSuccess(false);
  };

  // Save WYSIWYG contents
  const handleSaveLessonContent = () => {
    if (!selectedLessonId) return;
    setCourses(courses.map(c => {
      if (c.id === selectedCourseId) {
        return {
          ...c,
          lessons: c.lessons.map(l => {
            if (l.id === selectedLessonId) {
              return {
                ...l,
                title: wysiwygTitle,
                content: wysiwygContent
              };
            }
            return l;
          })
        };
      }
      return c;
    }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pl-20 dark:bg-slate-950">
      <Sidebar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header userName="Kurikulum CMS" userTitle="Kelola struktur modul pembelajaran, tambah materi, kuis, koding lab, dan video." />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 mt-8">
          
          {/* Col 1: Modules List & Add Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="p-5 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between bg-slate-50/40 dark:bg-slate-950/20">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Modul Kurikulum</h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-850">
                {courses.map((course) => (
                  <div 
                    key={course.id} 
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      setSelectedLessonId(course.lessons[0]?.id || null);
                      if (course.lessons[0]) {
                        setWysiwygTitle(course.lessons[0].title);
                        setWysiwygContent(course.lessons[0].content || "");
                      }
                    }}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedCourseId === course.id 
                        ? "bg-red-50/45 border-l-4 border-red-650 dark:bg-red-950/10" 
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
                <Plus className="h-4 w-4 text-red-650" />
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
                    placeholder="Contoh: Supervised Learning Techniques"
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
                  Buat Modul Baru
                </button>
              </form>
            </div>
          </div>

          {/* Col 2 & 3: Selected Module Content, Lessons List & WYSIWYG Content Editor */}
          <div className="lg:col-span-8 space-y-6">
            {selectedCourse ? (
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                
                {/* Left inside: Lessons List inside Module */}
                <div className="xl:col-span-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="p-4 border-b border-slate-100 dark:border-slate-850 bg-slate-50/40 dark:bg-slate-950/20">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Materi Modul</h4>
                  </div>
                  
                  <div className="divide-y divide-slate-100 dark:divide-slate-850 max-h-[300px] overflow-y-auto">
                    {selectedCourse.lessons.map((lesson) => (
                      <div 
                        key={lesson.id} 
                        onClick={() => selectLesson(lesson)}
                        className={`flex items-center justify-between p-3.5 cursor-pointer transition-all ${
                          selectedLessonId === lesson.id 
                            ? "bg-slate-100 dark:bg-slate-850" 
                            : "hover:bg-slate-50/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs shrink-0">
                            {lesson.type === "video" ? "📹" : lesson.type === "coding" ? "💻" : lesson.type === "text" ? "📄" : "📝"}
                          </span>
                          <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-350 truncate">{lesson.title}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLesson(selectedCourse.id, lesson.id);
                          }}
                          className="flex h-5 w-5 items-center justify-center text-slate-400 hover:text-rose-600 rounded"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Lesson Form */}
                  <div className="p-4 border-t border-slate-100 dark:border-slate-850 bg-slate-50/20">
                    <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Tambah Materi</h5>
                    <form onSubmit={handleAddLesson} className="space-y-2.5">
                      <input
                        type="text"
                        required
                        value={newLessonTitle}
                        onChange={(e) => setNewLessonTitle(e.target.value)}
                        placeholder="Judul Materi..."
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                      />
                      <div className="grid grid-cols-2 gap-1.5">
                        <select
                          value={newLessonType}
                          onChange={(e) => setNewLessonType(e.target.value)}
                          className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] font-bold outline-none focus:border-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-indigo-200"
                        >
                          <option value="video">Video</option>
                          <option value="text">Ringkasan</option>
                          <option value="coding">Lab Code</option>
                          <option value="quiz">Kuis</option>
                        </select>
                        <input
                          type="text"
                          required
                          value={newLessonDuration}
                          onChange={(e) => setNewLessonDuration(e.target.value)}
                          placeholder="Durasi (e.g. 15m)"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] outline-none focus:border-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full rounded-lg bg-red-650 py-1.5 text-[10px] font-bold text-white hover:bg-red-600 transition"
                      >
                        + Tambah Materi
                      </button>
                    </form>
                  </div>
                </div>

                {/* Right inside: WYSIWYG Content Editor */}
                <div className="xl:col-span-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between">
                  {selectedLesson ? (
                    <div className="space-y-4">
                      
                      {/* Editor Header Title */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex-1 min-w-0">
                          <input 
                            type="text"
                            value={wysiwygTitle}
                            onChange={(e) => setWysiwygTitle(e.target.value)}
                            className="text-sm font-extrabold text-slate-900 bg-transparent border-b border-transparent focus:border-slate-300 outline-none w-full dark:text-white"
                          />
                          <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-wide">Tipe: {selectedLesson.type} • Edit Mode</p>
                        </div>
                        
                        {/* Editor / Preview Selector */}
                        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl dark:bg-slate-850 shrink-0">
                          <button 
                            onClick={() => setEditorMode("edit")}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              editorMode === "edit" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white" : "text-slate-500"
                            }`}
                          >
                            Editor
                          </button>
                          <button 
                            onClick={() => setEditorMode("preview")}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              editorMode === "preview" ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white" : "text-slate-500"
                            }`}
                          >
                            <Eye className="h-3 w-3 inline mr-1" /> Preview
                          </button>
                        </div>
                      </div>

                      {/* WYSIWYG Toolbar Panel */}
                      {editorMode === "edit" && (
                        <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 rounded-2xl border border-slate-200/60 dark:bg-slate-950 dark:border-slate-800">
                          {[
                            { icon: Bold, act: "bold" },
                            { icon: Italic, act: "italic" },
                            { icon: Underline, act: "underline" },
                            { icon: AlignLeft, act: "align" },
                            { icon: List, act: "list" },
                            { icon: Code, act: "code" },
                            { icon: Link2, act: "link" }
                          ].map((tool, idx) => {
                            const Icon = tool.icon;
                            return (
                              <button 
                                key={idx}
                                type="button"
                                className="p-1.5 rounded-lg text-slate-655 hover:bg-slate-200 dark:hover:bg-slate-800 dark:text-slate-400"
                                title={tool.act}
                              >
                                <Icon className="h-4 w-4" />
                              </button>
                            );
                          })}
                          <span className="h-4 w-[1px] bg-slate-300 dark:bg-slate-800 mx-1" />
                          <button type="button" className="text-[10px] font-bold text-red-650 bg-red-50/50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <Sparkles className="h-3 w-3 fill-red-500" /> AI Outline Generate
                          </button>
                        </div>
                      )}

                      {/* Content Workspace Area */}
                      {editorMode === "edit" ? (
                        <textarea
                          value={wysiwygContent}
                          onChange={(e) => setWysiwygContent(e.target.value)}
                          placeholder="Mulai ketik deskripsi, kode program, kuis, atau instruksi materi Anda disini..."
                          rows={12}
                          className="w-full rounded-2xl border border-slate-200 bg-slate-50/30 p-4 text-xs font-semibold outline-none focus:border-red-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-350"
                        />
                      ) : (
                        <div className="w-full min-h-[260px] p-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/10 text-xs dark:border-slate-850 dark:bg-slate-950">
                          {selectedLesson.type === "video" && (
                            <div className="mb-4 aspect-video w-full rounded-xl bg-slate-950 flex items-center justify-center text-slate-500 text-[10px] font-bold border border-slate-800">
                              📹 Simulasi Pemutaran Video Pembelajaran
                            </div>
                          )}
                          <div className="prose prose-sm dark:prose-invert">
                            <h4 className="text-sm font-extrabold mb-2">{wysiwygTitle}</h4>
                            <p className="whitespace-pre-wrap leading-relaxed text-slate-655 dark:text-slate-400">{wysiwygContent}</p>
                          </div>
                        </div>
                      )}

                      {/* Save Footer Bar */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          {saveSuccess && (
                            <span className="text-[10px] font-bold text-emerald-650 bg-emerald-50 px-3 py-1 rounded-lg flex items-center gap-1">
                              <Check className="h-3.5 w-3.5" /> Berhasil disimpan ke draf!
                            </span>
                          )}
                        </div>
                        <button
                          onClick={handleSaveLessonContent}
                          className="rounded-2xl bg-red-650 px-5 py-2.5 text-xs font-bold text-white hover:bg-red-600 transition flex items-center gap-2"
                        >
                          <Save className="h-4 w-4" /> Simpan Perubahan Materi
                        </button>
                      </div>

                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center text-xs font-bold text-slate-450 dark:text-slate-500">
                      <span>📄 Pilih materi di playlist sebelah kiri untuk mengedit konten menggunakan WYSIWYG editor</span>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-xs font-semibold text-slate-455 dark:border-slate-800 dark:bg-slate-900">
                Silakan pilih modul di panel kiri terlebih dahulu.
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
