import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logoDesa from "../assets/logodesa.png";
import me from "../assets/me.jpg";
import {
  Home,
  Users,
  PieChart,
  Ticket,
  FileText,
  Wallet,
  Star,
  PlusCircle,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();

  // Fungsi untuk Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Daftar Menu Utama
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
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full flex-shrink-0">
        {/* AREA LOGO */}
        <div className="p-6 flex justify-center items-center border-b border-gray-100">
          {/* Ganti src dengan path logo Toba Anda yang disimpan di folder public/ */}
          <img src={logoDesa} alt="Logo Toba" className="h-24 object-contain" />
        </div>

        {/* AREA MENU (Bisa di-scroll jika layar kecil) */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          <nav className="space-y-1 px-3">
            {mainMenus.map((menu) => (
              <NavLink
                key={menu.name}
                to={menu.path}
                // end properti ini penting agar rute induk ("/admin") tidak selalu hijau saat berada di sub-rute
                end={menu.path === "/admin"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-[#4a9f6a] text-white" // Warna hijau jika aktif
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900" // Warna abu-abu jika tidak aktif
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
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={me} // Gambar avatar dummy
                alt="Admin Profil"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Admin Desa
                </p>
                <p className="text-xs text-gray-500">admin@sibarani.desa.id</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </aside>

      {/* ================= KONTEN UTAMA KANAN ================= */}
      {/* Di sinilah kode teman-teman Anda akan muncul otomatis */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  );
}
