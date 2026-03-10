import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Calendar,
  Newspaper,
  Wallet,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Search,
  Bell,
  Edit3,
  Trash2,
  Image as ImageIcon,
  Wand2,
} from "lucide-react";

export default function BeritaDesa() {
  // --- STATE MANAGEMENT ---
  const [view, setView] = useState("list"); // 'list', 'add', 'edit'
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsList, setNewsList] = useState([
    {
      id: 1,
      judul: "Kegiatan Posyandu Februari",
      deskripsi: "Kesehatan",
      tanggal: "12 Feb 2026",
    },
    {
      id: 2,
      judul: "Gotong Royong Bersih Desa",
      deskripsi: "Kegiatan",
      tanggal: "05 Feb 2026",
    },
    {
      id: 3,
      judul: "Pelatihan UMKM",
      deskripsi: "Ekonomi",
      tanggal: "01 Feb 2026",
    },
  ]);

  // --- HANDLERS ---
  const handleDelete = () => {
    setNewsList(newsList.filter((item) => item.id !== selectedNews.id));
    setShowDeleteModal(false);
  };

  const openEdit = (item) => {
    setSelectedNews(item);
    setView("edit");
  };

  // --- COMPONENTS ---

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-slate-700">
      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-20 bg-white flex items-center justify-between px-8 border-b">
          <h1 className="text-xl font-bold text-[#003032]">
            {view === "list"
              ? "Kelola Berita Desa"
              : view === "add"
                ? "Kelola Kegiatan Desa"
                : "Kelola Berita Desa"}
          </h1>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Judul, Filter Kategori..."
                className="bg-gray-100 border-none rounded-full py-2 px-10 text-sm w-80 focus:ring-2 focus:ring-[#5CB85C]"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={16}
              />
              <Search
                className="absolute right-3 top-2.5 text-gray-400"
                size={16}
              />
            </div>
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <img
              src="https://i.pravatar.cc/150?u=mark"
              alt="Admin"
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
          </div>
        </header>

        {/* CONTENT AREA */}
        <section className="p-8">
          {view === "list" ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-[#003032]">
                  Daftar Berita Desa
                </h2>
                <button
                  onClick={() => setView("add")}
                  className="bg-[#5CB85C] hover:bg-[#4cae4c] text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm transition"
                >
                  <Plus size={18} />
                  <span>Tambah Berita</span>
                </button>
              </div>

              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#E9F5E9] text-gray-600 text-sm">
                    <th className="p-4 rounded-l-lg font-semibold text-center w-16">
                      No
                    </th>
                    <th className="p-4 font-semibold">Nama Berita</th>
                    <th className="p-4 font-semibold">Deskripsi</th>
                    <th className="p-4 font-semibold">Tanggal Publikasi</th>
                    <th className="p-4 rounded-r-lg font-semibold text-center w-32">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {newsList.map((item, idx) => (
                    <tr
                      key={item.id}
                      className="text-sm text-gray-600 hover:bg-gray-50 transition"
                    >
                      <td className="p-4 text-center">{idx + 1}</td>
                      <td className="p-4 font-medium">{item.judul}</td>
                      <td className="p-4">{item.deskripsi}</td>
                      <td className="p-4">{item.tanggal}</td>
                      <td className="p-4">
                        <div className="flex justify-center space-x-4">
                          <Edit3
                            size={18}
                            className="text-gray-400 cursor-pointer hover:text-blue-500"
                            onClick={() => openEdit(item)}
                          />
                          <Trash2
                            size={18}
                            className="text-gray-400 cursor-pointer hover:text-red-500"
                            onClick={() => {
                              setSelectedNews(item);
                              setShowDeleteModal(true);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* FORM ADD / EDIT */
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => setView("list")}
                  className="bg-[#5CB85C] hover:bg-[#4cae4c] text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition"
                >
                  <Plus size={18} />
                  <span>
                    {view === "add"
                      ? "Simpan Kegiatan"
                      : "Simpan Perubahan Berita"}
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {/* Basic Details */}
                <div className="col-span-2 bg-white rounded-xl shadow-sm p-8">
                  <h3 className="text-lg font-bold mb-6">Basic Details</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Nama Kegiatan
                      </label>
                      <input
                        type="text"
                        defaultValue={
                          view === "edit"
                            ? selectedNews.judul
                            : "Kegiatan Posyandu"
                        }
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-green-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Deskripsi Kegiatan
                      </label>
                      <div className="relative">
                        <textarea
                          rows="6"
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-green-500 outline-none"
                          defaultValue="Kegiatan Posyandu Desa Sibarani Nasampulu dilaksanakan sebagai bagian dari upaya peningkatan pelayanan kesehatan dasar bagi masyarakat, khususnya balita, ibu hamil, dan lansia..."
                        />
                        <div className="absolute bottom-3 right-3 flex space-x-2 text-gray-400">
                          <Edit3
                            size={16}
                            className="cursor-pointer hover:text-gray-600"
                          />
                          <Wand2
                            size={16}
                            className="cursor-pointer hover:text-gray-600"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Tanggal Publikasi
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Tanggal"
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-green-500 outline-none"
                        />
                        <Calendar
                          size={18}
                          className="absolute right-3 top-3 text-gray-400"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => setView("list")}
                        className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-lg text-sm font-bold flex items-center"
                      >
                        Batal <span className="ml-2 border-l pl-2">⋮</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Upload Section */}
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h3 className="text-lg font-bold mb-6">
                    Upload Product Image
                  </h3>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-full h-48 bg-white border border-gray-100 rounded-lg flex items-center justify-center">
                      <button className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded text-xs text-gray-600">
                        <ImageIcon size={14} />
                        <span>Browse</span>
                      </button>
                    </div>
                  </div>
                  <div className="mt-6 border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center cursor-pointer hover:bg-gray-50">
                    <div className="bg-green-500 text-white p-1 rounded-full mb-2">
                      <Plus size={16} />
                    </div>
                    <span className="text-green-500 text-sm font-medium">
                      Add Image
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 w-[450px] text-center shadow-xl">
            <h2 className="text-2xl font-bold text-[#003032] mb-2">
              Yakin Menghapus Berita!!
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Dengan Judul {selectedNews?.judul}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleDelete}
                className="bg-[#66FF66] hover:bg-[#52e052] text-white font-bold py-3 rounded-xl transition"
              >
                Ya
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-[#FF3B3B] hover:bg-[#e63535] text-white font-bold py-3 rounded-xl transition"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" : "text-gray-500 hover:bg-gray-50"}`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
