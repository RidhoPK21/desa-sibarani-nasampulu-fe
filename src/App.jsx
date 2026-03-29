import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./layouts/AdminLayout"; // Pastikan path folder-nya sesuai

// Pages: Public (Warga)
import Home from "./pages/public/Home";
import ProfilDesa from "./pages/public/ProfilDesa";
import Pemerintahan from "./pages/public/Pemerintahan";
import InformasiPublik from "./pages/public/InformasiPublik";
import Kegiatan from "./pages/public/Kegiatan";
import Galeri from "./pages/public/Galeri";
import Ppid from "./pages/public/Ppid"; 
import Login from "./pages/public/Login";

// Pages: Admin (Dashboard & Fitur)
import Dashboard from "./pages/admin/Dashboard";
import Infografis from "./pages/admin/Infografis"; 
import KegiatanDesa from "./pages/admin/KegiatanDesa"; 
import Berita from "./pages/admin/Berita"; 
import APBdes from "./pages/admin/APBdes"; 
import AdminPpid from "./pages/admin/Ppid"; 
import Idm from "./pages/admin/Idm"; 

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
          <Route path="profil-desa" element={<ProfilDesa />} />
          <Route path="pemerintahan" element={<Pemerintahan />} />
          <Route path="informasi-publik" element={<InformasiPublik />} />
          <Route path="kegiatan" element={<Kegiatan />} />
          <Route path="galeri" element={<Galeri />} />
          <Route path="dokumentasi" element={<Ppid />} />
        </Route>

        {/* LOGIN Route */}
        <Route path="/login" element={<Login />} />

        {/* ======================================= */}
        {/* Rute untuk Admin (Area Privat)          */}
        {/* ======================================= */}
        {/* Menggunakan AdminLayout dari kode teman Anda */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="infografis" element={<Infografis />} />
          <Route path="kegiatan" element={<KegiatanDesa />} />
          <Route path="berita" element={<Berita />} />
          <Route path="apbdes" element={<APBdes />} />
          <Route path="ppid" element={<AdminPpid />} />
          <Route path="idm" element={<Idm />} />
        </Route>

        {/* ======================================= */}
        {/* Rute jika halaman tidak ditemukan (404) */}
        {/* ======================================= */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <h1 className="text-3xl font-bold text-slate-400">404 - Halaman Tidak Ditemukan</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}