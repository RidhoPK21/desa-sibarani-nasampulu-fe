import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logoDesa from "../assets/logodesa.png";
import me from "../assets/me.jpg";
import {
  Home,
  PieChart,
  Ticket,
  FileText,
  Wallet,
  Star,
  PlusCircle,
  LogOut,
  AlertTriangle,
} from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();

  // State untuk mengontrol kemunculan Modal Logout
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Fungsi untuk Logout (Dieksekusi setelah konfirmasi)
  const handleConfirmLogout = () => {
    // 1. Hapus token dari memori (Kunci pintu)
    localStorage.removeItem("token");

    // 2. Tutup modal
    setShowLogoutModal(false);

    // 3. Lempar (Redirect) ke halaman Beranda Public
    navigate("/");
  };

  // Daftar Menu Utama (Profil Desa sudah dihapus)
  const mainMenus = [
    { name: "Dashboard", path: "/admin", icon: <Home size={20} /> },
    {
      name: "Infografis",
      path: "/admin/infografis",
      icon: <PieChart size={20} />,
    },
    {
      name: "Kegiatan Desa",
      path: "/admin/kegiatan",
      icon: <Ticket size={20} />,
    },
    { name: "Berita", path: "/admin/berita", icon: <FileText size={20} /> },
    { name: "APBDes", path: "/admin/apbdes", icon: <Wallet size={20} /> },
    { name: "PPID", path: "/admin/ppid", icon: <Star size={20} /> },
    { name: "IDM", path: "/admin/idm", icon: <PlusCircle size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* ================= SIDEBAR KIRI ================= */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full flex-shrink-0 z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        {/* AREA LOGO */}
        <div className="p-6 flex justify-center items-center border-b border-gray-100">
          <img
            src={logoDesa}
            alt="Logo Desa"
            className="h-24 object-contain transition-transform hover:scale-105"
          />
        </div>

        {/* AREA MENU */}
        <div className="flex-1 overflow-y-auto py-6 scrollbar-hide">
          <nav className="space-y-1.5 px-4">
            {mainMenus.map((menu) => (
              <NavLink
                key={menu.name}
                to={menu.path}
                end={menu.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#4a9f6a] text-white shadow-md shadow-green-900/10"
                      : "text-gray-500 hover:bg-gray-50 hover:text-[#4a9f6a]"
                  }`
                }
              >
                {menu.icon}
                <span>{menu.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* AREA PROFIL USER (Paling Bawah) */}
        <div className="border-t border-gray-100 p-5 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={me} // Gambar avatar dummy
                alt="Admin Profil"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <div>
                <p className="text-sm font-bold text-gray-800 line-clamp-1">
                  Admin Desa
                </p>
                <p className="text-[11px] font-medium text-gray-500 line-clamp-1">
                  admin@sibarani.desa.id
                </p>
              </div>
            </div>

            {/* Tombol yang memicu kemunculan Modal */}
            <button
              onClick={() => setShowLogoutModal(true)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
              title="Keluar dari Panel Admin"
            >
              <LogOut
                size={20}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= KONTEN UTAMA KANAN ================= */}
      <main className="flex-1 overflow-y-auto bg-gray-50/50 relative">
        <Outlet />
      </main>

      {/* ================= MODAL KONFIRMASI LOGOUT ================= */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Yakin Ingin Keluar?
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Anda akan mengakhiri sesi admin ini dan kembali ke halaman utama
                publik.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors shadow-sm shadow-red-500/30"
                >
                  Ya, Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
