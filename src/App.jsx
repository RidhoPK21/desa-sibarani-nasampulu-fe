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
    // Jika tidak ada token, paksa kembali ke halaman login rahasia kita
    return <Navigate to="/admin/portal-pemdes" replace />;
  }

  // Jika ada token, silakan masuk ke komponen yang dituju
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ======================================= */}
        {/* Rute untuk Warga (Area Publik)          */}
        {/* ======================================= */}
        {/* Menggunakan PublicLayout dari kode Anda */}
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

        {/* Rute Login Admin (tanpa sidebar)        */}
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
        {/* Rute jika halaman tidak ditemukan (404) */}
        {/* ======================================= */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <h1 className="text-3xl font-bold text-slate-400">
                404 - Halaman Tidak Ditemukan
              </h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
