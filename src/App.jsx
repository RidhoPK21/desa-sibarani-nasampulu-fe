import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import Home from "./pages/public/Home";
import ProfilDesa from "./pages/public/ProfilDesa";
import Pemerintahan from "./pages/public/Pemerintahan";
import InformasiPublik from "./pages/public/InformasiPublik";
import Kegiatan from "./pages/public/Kegiatan";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Publik (dibungkus dengan Navbar) */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="profil-desa" element={<ProfilDesa />} />
          <Route path="pemerintahan" element={<Pemerintahan />} />
          <Route path="informasi-publik" element={<InformasiPublik />} />
          <Route path="kegiatan" element={<Kegiatan />} />
        </Route>

        {/* Rute Admin (Terpisah dari Navbar publik) */}
        <Route path="/admin" element={<Dashboard />} />

        {/* Fallback 404 */}
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