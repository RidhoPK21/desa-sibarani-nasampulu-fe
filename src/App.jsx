import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./layouts/AdminLayout"; // Pastikan path folder-nya sesuai

// Pages: Public (Warga)
import Home from "./pages/public/Home";
import ProfilDesa from "./pages/public/ProfilDesa";
import Kegiatan from "./pages/public/Kegiatan";
import Galeri from "./pages/public/Galeri";
import APBdes from "./pages/public/APBdes";
import Ppid from "./pages/public/Ppid";
import Infografis from "./pages/public/InfografisPublik";
import Berita from "./pages/public/Berita";
import Idm from "./pages/public/Idm";

import Login from "./pages/admin/Login";

// Pages: Admin (Dashboard & Fitur)
import Dashboard from "./pages/admin/Dashboard";
import AdminInfografis from "./pages/admin/Infografis";
import AdminKegiatanDesa from "./pages/admin/KegiatanDesa";
import AdminBerita from "./pages/admin/Berita";
import AdminAPBdes from "./pages/admin/APBdes";
import AdminPpid from "./pages/admin/Ppid";
import AdminIdm from "./pages/admin/Idm";

// ========================================================
// 🔥 KOMPONEN SATPAM (PROTECTED ROUTE)
// Mengecek apakah ada token login di LocalStorage
// ========================================================
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Alihkan ke rute khusus 404 agar penyerang mengira halaman ini tidak ada
    // (Penerapan Cloaking / Mencegah Information Leakage)
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ======================================= */}
        {/* Rute untuk Warga (Area Publik)          */}
        {/* ======================================= */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="profil" element={<ProfilDesa />} />
          <Route path="kegiatan" element={<Kegiatan />} />
          <Route path="galeri" element={<Galeri />} />
          <Route path="apb-desa" element={<APBdes />} />
          <Route path="dokumentasi" element={<Ppid />} />
          <Route path="infografis" element={<Infografis />} />
          <Route path="berita" element={<Berita />} />
          <Route path="idm" element={<Idm />} />
        </Route>

        {/* ======================================= */}
        {/* Rute Login Admin Rahasia (tanpa sidebar)*/}
        {/* ======================================= */}
        <Route path="/admin/portal-pemdes" element={<Login />} />

        {/* ======================================= */}
        {/* Rute untuk Admin (Area Privat / TERKUNCI)*/}
        {/* ======================================= */}
        {/* Menggunakan AdminLayout dan dibungkus ProtectedRoute */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="infografis" element={<AdminInfografis />} />
          <Route path="kegiatan" element={<AdminKegiatanDesa />} />
          <Route path="berita" element={<AdminBerita />} />
          <Route path="apbdes" element={<AdminAPBdes />} />
          <Route path="ppid" element={<AdminPpid />} />
          <Route path="idm" element={<AdminIdm />} />
        </Route>

        {/* ======================================= */}
        {/* Rute Catch-All (404 Not Found)          */}
        {/* ======================================= */}
        <Route
          path="/404"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
              <h1 className="text-5xl font-bold text-slate-700 mb-4">404</h1>
              <p className="text-xl text-slate-500 mb-8">
                Halaman Tidak Ditemukan
              </p>
              <a
                href="/"
                className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
              >
                Kembali ke Beranda
              </a>
            </div>
          }
        />
        {/* Menangkap semua rute salah lainnya dan melempar ke /404 */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
