import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute untuk Warga */}
        <Route path="/" element={<Home />} />

        {/* Rute untuk Admin */}
        <Route path="/admin" element={<Dashboard />} />

        {/* Rute jika halaman tidak ditemukan (404) */}
        <Route
          path="*"
          element={
            <h1 className="p-10 text-center text-red-500 text-2xl">
              404 - Halaman Tidak Ditemukan
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
