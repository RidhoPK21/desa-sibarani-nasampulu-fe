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
  PlusCircle,
  Search,
  Bell,
  Trash2,
  Image as ImageIcon,
  Edit2,
  Wand2,
} from "lucide-react";

export default function KegiatanDesa() {
  const [view, setView] = useState("list"); // 'list' atau 'form'
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Mock Data
  const [kegiatan, setKegiatan] = useState([
    {
      id: 1,
      nama: "Kegiatan Posyandu Februari",
      deskripsi: "Kesehatan",
      tglMulai: "12 Feb 2026",
      tglSelesai: "Admin Desa",
      status: "Publish",
    },
    {
      id: 2,
      nama: "Gotong Royong Bersih Desa",
      deskripsi: "Kegiatan",
      tglMulai: "05 Feb 2026",
      tglSelesai: "Admin Desa",
      status: "Publish",
    },
    {
      id: 3,
      nama: "Pelatihan UMKM",
      deskripsi: "Ekonomi",
      tglMulai: "01 Feb 2026",
      tglSelesai: "Admin Desa",
      status: "Publish",
    },
  ]);

  const handleAdd = () => {
    setSelectedItem(null);
    setView("form");
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setView("form");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-700">
      <main className="flex flex-col">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-bold text-teal-900">
              Kelola Kegiatan Desa
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Judul, Filter Kategori..."
                  className="pl-4 pr-10 py-2 w-80 rounded-full border border-gray-200 bg-white focus:outline-none shadow-sm"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
              <Bell className="text-teal-900 w-6 h-6 cursor-pointer" />
              <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                <img src="https://via.placeholder.com/40" alt="profile" />
              </div>
            </div>
          </div>

          {view === "list" ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-teal-900">
                  Daftar Kegiatan Desa
                </h2>
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition shadow-md"
                >
                  <PlusCircle className="w-5 h-5" /> Tambah kegiatan
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-emerald-50 text-gray-600 text-sm">
                      <th className="p-4 text-center">No</th>
                      <th className="p-4">Nama Kegiatan</th>
                      <th className="p-4">Deskripsi</th>
                      <th className="p-4">Tanggal Mulai</th>
                      <th className="p-4 text-center">Tanggal Selesai</th>
                      <th className="p-4">Status kegiatan</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {kegiatan.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition text-sm text-gray-700"
                      >
                        <td className="p-4 text-center">{index + 1}</td>
                        <td className="p-4 font-medium">{item.nama}</td>
                        <td className="p-4">{item.deskripsi}</td>
                        <td className="p-4">{item.tglMulai}</td>
                        <td className="p-4 text-center text-xs text-gray-500">
                          {item.tglSelesai}
                        </td>
                        <td className="p-4">
                          <span className="flex items-center gap-2 text-emerald-500 font-medium">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                            Publish
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-3">
                            <MessageSquare
                              className="w-5 h-5 text-gray-400 cursor-pointer"
                              onClick={() => handleEdit(item)}
                            />
                            <Trash2
                              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500"
                              onClick={() => setShowDeleteModal(true)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            /* Form Tambah/Edit */
            <div className="animate-in fade-in duration-300">
              <div className="flex justify-end mb-4">
                <button
                  className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2 rounded-lg shadow-md"
                  onClick={() => setView("list")}
                >
                  <PlusCircle className="w-5 h-5" /> Simpan{" "}
                  {selectedItem ? "Perubahan" : ""} Kegiatan
                </button>
              </div>

              <div className="grid grid-cols-3 gap-8">
                {/* Form Kiri */}
                <div className="col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold mb-6 text-teal-900">
                    Basic Details
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Nama Kegiatan
                      </label>
                      <input
                        type="text"
                        defaultValue={selectedItem?.nama || "Kegiatan Posyandu"}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 ring-emerald-100 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Deskripsi Kegiatan
                      </label>
                      <div className="relative">
                        <textarea
                          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg h-40 focus:ring-2 ring-emerald-100 outline-none text-sm leading-relaxed"
                          defaultValue="Kegiatan Posyandu Desa Sibarani Nasampulu dilaksanakan sebagai bagian dari upaya peningkatan pelayanan kesehatan dasar..."
                        />
                        <div className="absolute bottom-3 right-3 flex gap-2">
                          <Edit2 className="w-4 h-4 text-gray-400" />
                          <Wand2 className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Tanggal Pelaksanaan
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Tanggal Mulai"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg pr-10"
                          />
                          <Calendar className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                        </div>
                      </div>
                      <div className="mt-7 relative">
                        <input
                          type="text"
                          placeholder="Tanggal Selesai"
                          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg pr-10"
                        />
                        <Calendar className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
                      </div>
                    </div>

                    <div className="flex justify-between items-end">
                      <div className="w-1/2">
                        <label className="block text-sm font-semibold mb-2">
                          Status Kegiatan
                        </label>
                        <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none">
                          <option>Direncanakan</option>
                        </select>
                      </div>
                      <button
                        onClick={() => setView("list")}
                        className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2"
                      >
                        Batal <span className="text-xs">⋮</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Form Kanan */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4 text-teal-900">
                      Upload Product Image
                    </h3>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        {selectedItem ? (
                          <img
                            src="https://via.placeholder.com/300x200"
                            alt="preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon className="w-12 h-12 text-gray-300" />
                        )}
                      </div>
                      <button className="flex items-center gap-2 mx-auto px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600">
                        <ImageIcon className="w-4 h-4" /> Browse
                      </button>
                    </div>
                    <div className="mt-4 border-2 border-dashed border-gray-200 rounded-xl py-8 flex flex-col items-center justify-center gap-2 cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                        <PlusCircle className="w-5 h-5" />
                      </div>
                      <span className="text-xs text-emerald-500 font-bold uppercase tracking-wider">
                        Add Image
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold mb-4 text-teal-900">
                      Jenis Kegiatan
                    </h3>
                    <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none text-sm">
                      <option>Kegiatan Desa</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal Hapus */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white p-10 rounded-[40px] shadow-2xl max-w-lg w-full text-center">
                <h2 className="text-4xl font-black text-teal-900 mb-2">
                  Yakin Menghapus Kegiatan!!
                </h2>
                <p className="text-teal-800 mb-8 font-medium italic">
                  Dengan Judul Kegiatan Posyandu Februari
                </p>
                <div className="flex gap-6 justify-center">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-green-400 hover:bg-green-500 text-white font-black px-12 py-3 rounded-xl transition text-xl w-36"
                  >
                    Ya
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="bg-red-500 hover:bg-red-600 text-white font-black px-12 py-3 rounded-xl transition text-xl w-36"
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
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
