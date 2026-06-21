# Product Requirements Document (PRD)

* **Nama Produk:** AIphy - Platform Pembelajaran Kecerdasan Artifisial Berbasis Generative AI
* **Dokumen Versi:** 1.1
* **Pemilik Proyek:** Lembaga Penelitian Universitas Gunadarma (Kelompok 9)
* **Vendor Pengembang:** PT TechSolusi Nusantara
* **Tanggal:** 21 Juni 2026

---

## 1. Pendahuluan

### 1.1 Latar Belakang
Banyak generasi muda Indonesia mengalami kesulitan dalam mempelajari Kecerdasan Artifisial (AI) secara mandiri. Berdasarkan survei awal, 60,7% responden menganggap sumber pembelajaran AI saat ini terlalu kompleks, dan 85,7% gagal menyelesaikan proses belajar mandiri mereka. Untuk menjawab tantangan tersebut serta mendukung 'Strategi Nasional Kecerdasan Artifisial Indonesia 2020-2045', Universitas Gunadarma menginisiasi AIphy.

### 1.2 Visi Produk
Menjadi platform edukasi AI terdepan di Indonesia yang menghadirkan pengalaman belajar terstruktur, personal, adaptif, dan efektif bagi generasi muda melalui integrasi Tutor Virtual berbasis Generative AI.

### 1.3 Tujuan Utama
* Membangun platform web-based yang responsif dan berkinerja tinggi.
* Menyediakan kurikulum AI terstruktur (dasar hingga mahir).
* Mengintegrasikan AI Assistant (LLM) sebagai tutor virtual adaptif yang mampu menyederhanakan bahasa teknis.
* Menyediakan sistem pelacakan (tracking) progres belajar yang divisualisasikan dengan baik.

---

## 2. Target Pengguna (User Personas)

Sistem dirancang untuk mendukung berbagai tipe pengguna dengan estimasi kapasitas sebagai berikut:

| No | Segmen Pengguna | Estimasi Pengguna | Level Akses |
|---|---|---|---|
| 1 | Mahasiswa & Pelajar (Pemula AI) | 500+ pengguna | Standard Learner |
| 2 | Profesional / Umum (Mandiri) | 200+ pengguna | Standard Learner |
| 3 | Instruktur / Mentor | 20 pengguna | Instructor Access |
| 4 | Admin Konten & Kurikulum | 5 pengguna | Content Admin |
| 5 | Administrator Sistem (IT) | 3 pengguna | Super Admin |

---

## 3. Persyaratan Fungsional (Functional Requirements)

### 3.1 Modul Autentikasi dan Manajemen Pengguna
* **Registrasi & Login:** Mendukung registrasi email standar dan integrasi Single Sign-On (SSO) / OAuth 2.0 (Google/GitHub).
* **Profil Pengguna:** Manajemen profil personal, pengaturan preferensi belajar, dan riwayat.
* **Keamanan:** Menggunakan autentikasi berbasis JWT (JSON Web Token).

### 3.2 Modul Pembelajaran & Kurikulum Adaptif
* **Materi Berjenjang:** Menyajikan materi AI terstruktur dari tingkat dasar hingga mahir.
* **Format Konten Multimedia:** Teks interaktif, video, simulasi, dan contoh kasus industri nyata.
* **Evaluasi Pembelajaran:** Sistem latihan praktis dan kuis dengan penilaian otomatis berbasis AI di akhir setiap modul.
* **Jalur Belajar (Learning Path):** Sistem rekomendasi kurikulum yang disesuaikan dengan tujuan (goals) pengguna.

### 3.3 AI Assistant (Tutor Virtual Adaptif)
* **Q&A Kontekstual:** Pengguna dapat bertanya terkait materi secara real-time dengan akurasi tinggi.
* **Penyederhanaan Bahasa:** AI mampu menjelaskan konsep teknis kompleks menggunakan bahasa yang mudah dipahami pemula.
* **Umpan Balik Instan (Instant Feedback):** Memberikan koreksi dan saran atas latihan atau tugas yang dikerjakan pengguna.
* **Personalisasi Rekomendasi:** Merekomendasikan materi ulasan atau lanjutan berdasarkan pola kelemahan/kelebihan belajar individu.

### 3.4 Dashboard Pengguna (Learner)
* **Visualisasi Progres:** Menampilkan persentase penyelesaian modul dan skor kuis/latihan.
* **Gamifikasi Dasar:** Menampilkan streak belajar harian dan pencapaian (badges).
* **Notifikasi:** Pengingat belajar (in-app dan email).

### 3.5 Dashboard Administrasi
* **Manajemen Pengguna:** Fitur untuk melihat, mengedit, memblokir pengguna, serta mengatur hak akses.
* **Manajemen Konten (CMS):** Create, Read, Update, Delete (CRUD) untuk modul kurikulum, latihan, dan kuis.
* **Analitik & Laporan:** Dasbor untuk melihat performa platform, metrik perilaku belajar, dan tingkat retensi pengguna.
* **Konfigurasi AI:** Panel untuk mengelola prompt engineering dasar dan memantau pemakaian API token LLM.

### 3.6 Halaman Publik (Landing Page / Etalase Platform)
Untuk menarik calon pengguna dan membangun kredibilitas (dengan standar UX ala platform EduTech terkemuka seperti Dicoding), sistem harus memiliki halaman depan yang informatif:
* **Beranda (Home):** Hero section dengan Call to Action (CTA) pendaftaran, Unique Value Proposition (UVP) terkait integrasi Generative AI, sorotan fitur utama, statistik pengguna, serta testimoni.
* **Katalog Modul (Programs/Courses):** Halaman yang memamerkan daftar modul pembelajaran AI (dari fundamental hingga advanced), dilengkapi dengan cuplikan silabus, prasyarat, dan estimasi waktu penyelesaian.
* **Harga & Paket (Pricing):** Penjelasan transparan mengenai skema berlangganan yang tersedia (Misalnya: Paket Free/Basic Learner dan Paket Pro dengan akses tak terbatas ke AI Assistant).
* **Tentang Kami (About Us):** Penjelasan mengenai latar belakang inisiatif AIphy, kolaborasi antara Tim Peneliti Universitas Gunadarma dan pengembang, serta visi-misi platform.
* **FAQ & Pusat Bantuan:** Kumpulan Pertanyaan yang Sering Diajukan mengenai metode belajar, dukungan sistem, teknis, dan pembayaran.
* **Kontak & Kemitraan:** Formulir bagi perusahaan atau institusi pendidikan yang ingin menjalin kerja sama (B2B).

---

## 4. Persyaratan Non-Fungsional (Non-Functional Requirements)

### 4.1 Performa & Skalabilitas
* **Response Time:** Waktu respons sistem maksimal < 2 detik untuk interaksi standar.
* **Skalabilitas:** Menggunakan arsitektur micro-services, load balancing, dan Redis caching untuk menangani lonjakan pengguna.
* **Optimasi Frontend:** Penerapan Server-Side Rendering (SSR) dan lazy loading untuk optimasi Core Web Vitals.

### 4.2 Ketersediaan (Availability)
* **Uptime:** Minimum 99% Service Level Agreement (SLA).
* **Disaster Recovery:** Backup data otomatis secara harian. Recovery Time Objective (RTO) maksimal < 4 jam.

### 4.3 Keamanan (Security)
* **Enkripsi:** Menggunakan enkripsi end-to-end, protokol HTTPS/TLS.
* **Data Privasi:** Kepatuhan terhadap regulasi pelindungan data pribadi (lokasi server berada di Indonesia/Asia Tenggara).

### 4.4 Kompatibilitas
* **Mobile Responsive:** Antarmuka harus berfungsi dan terlihat optimal di desktop, tablet, maupun smartphone (Responsive UI).

### 4.5 SEO & Pemasaran (Marketing)
* **Optimasi Mesin Pencari (SEO):** Implementasi meta tags, sitemap, dan struktur URL yang ramah pencarian (SEO-friendly) khusus untuk seluruh halaman Landing Page.
* **Tracking & Analytics:** Integrasi dengan tools analisis pemasaran (seperti Google Analytics / Meta Pixel) untuk melacak tingkat konversi (conversion rate) dari pengunjung menjadi pendaftar.

---

## 5. Arsitektur & Teknologi
* **Frontend Framework:** Next.js (dengan Server-Side Rendering).
* **UI Components:** Shadcn UI dan Aceternity UI.
* **Backend Framework:** Elysia JS (berjalan di Bun runtime) dengan TypeScript.
* **Database Utama:** PostgreSQL.
* **Database Caching / Session:** Redis.
* **AI Engine / LLM:** Generative AI API (OpenAI GPT / Google Gemini / Anthropic Claude).
* **Infrastruktur & DevOps:** Docker, CI/CD Pipeline, Cloud Hosting.
* **Storage Aset:** Layanan Cloud Storage untuk aset gambar/video.

---

## 6. Metodologi & Jadwal Pengerjaan (Timeline)

Metodologi yang digunakan adalah Waterfall dengan durasi pengerjaan pengembangan ±15 Minggu (±4 Bulan).

### 6.1 Fase Proyek Induk (Makro)
* **Fase 1 (Agustus 2026):** Analisis Kebutuhan, Perancangan UI/UX, Arsitektur Sistem.
* **Fase 2 (Sep-Okt 2026):** Pengembangan platform inti (Frontend, Backend, Database).
* **Fase 3 (Nov-Des 2026):** Integrasi Generative AI, pengembangan modul kurikulum.
* **Fase 4 (Jan 2027):** Pengujian (UAT), performance testing, pelatihan, Go-Live.
* **Post Go-Live (Feb-Apr 2027):** Monitoring, maintenance, pembaruan konten.

### 6.2 Milestone Pengembangan Teknis (Mikro - 15 Minggu)
* **Minggu 1-2:** Analisis kebutuhan & validasi bersama tim peneliti.
* **Minggu 3-5:** Perancangan arsitektur, desain UI/UX (Figma), skema database. Termasuk desain Landing Page.
* **Minggu 6-9:** Implementasi Frontend (Next.js, Shadcn UI).
* **Minggu 8-11:** Implementasi Backend (Elysia JS, API, DB PostgreSQL, Redis).
* **Minggu 10-11:** Integrasi AI Assistant (Konfigurasi API, prompt engineering).
* **Minggu 12-14:** Quality Assurance (Unit Testing, Black box, UAT).
* **Minggu 15:** Deployment ke Production, dokumentasi, pelatihan admin, dan Serah Terima.

