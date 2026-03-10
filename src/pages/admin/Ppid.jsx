import React, { useState } from "react";
import {
  Search,
  Bell,
  Plus,
  MessageSquare,
  Trash2,
  Calendar,
  Edit3,
  Wand2,
  ChevronDown,
} from "lucide-react";

export default function PpidDesa() {
  const [view, setView] = useState("list"); // list, add, edit
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Data Dummy
  const [data] = useState([
    {
      id: 1,
      nama: "Kegiatan Posyandu Februari",
      deskripsi: "Kesehatan",
      tanggal: "01 Feb 2026",
    },
    {
      id: 2,
      nama: "Gotong Royong Bersih Desa",
      deskripsi: "Kegiatan",
      tanggal: "01 Feb 2026",
    },
    {
      id: 3,
      nama: "Pelatihan UMKM",
      deskripsi: "Ekonomi",
      tanggal: "01 Feb 2026",
    },
  ]);

  // --- KOMPONEN HEADER ---
  const Header = () => (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-xl font-bold text-slate-800">Kelola PPID Desa</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Judul, Filter Kategori..."
            className="pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm w-64 focus:outline-none"
          />
          <Search className="absolute right-3 top-2.5 text-slate-400 w-4 h-4" />
        </div>
        <Bell className="text-slate-500 w-5 h-5 cursor-pointer" />
        <div className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden border">
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="profile"
          />
        </div>
      </div>
    </div>
  );

  // --- HALAMAN LIST ---
  if (view === "list") {
    return (
      <div className="font-sans">
        <Header />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-700">Daftar PPID Desa</h2>
          <button
            onClick={() => setView("add")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm transition-all"
          >
            <Plus size={18} /> Tambah PPID
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-emerald-50 text-emerald-800 text-sm">
                <th className="p-4 font-semibold text-center w-16">No</th>
                <th className="p-4 font-semibold">Nama PPID</th>
                <th className="p-4 font-semibold">Deskripsi</th>
                <th className="p-4 font-semibold">Tanggal Upload</th>
                <th className="p-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-600">
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="p-4 text-center">{index + 1}</td>
                  <td className="p-4 font-medium">{item.nama}</td>
                  <td className="p-4">{item.deskripsi}</td>
                  <td className="p-4">{item.tanggal}</td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setView("edit")}
                        className="text-slate-400 hover:text-blue-500"
                      >
                        <MessageSquare size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedItem(item);
                          setShowDeleteModal(true);
                        }}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL HAPUS */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full text-center">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                Yakin Menghapus PPID!!
              </h3>
              <p className="text-slate-500 text-sm mb-8">
                Dengan Judul {selectedItem?.nama}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-green-400 hover:bg-green-500 text-white py-3 rounded-xl font-bold transition-all"
                >
                  Ya
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition-all"
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

  // --- HALAMAN FORM (ADD & EDIT) ---
  return (
    <div className="font-sans">
      <Header />

      <div className="flex justify-end mb-6">
        <button
          onClick={() => setView("list")}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all"
        >
          <Plus size={18} />{" "}
          {view === "add" ? "Simpan PPID" : "Simpan Perubahan PPID"}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Kolom Kiri - Basic Details */}
        <div className="col-span-7 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">
            Basic Details
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Nama PPID
              </label>
              <input
                type="text"
                defaultValue={
                  view === "edit" ? "PPID Posyandu" : "Kegiatan Posyandu"
                }
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                {view === "edit" ? "Deskripsi Kegiatan" : "Deskripsi PPID"}
              </label>
              <div className="relative">
                <textarea
                  rows="6"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 leading-relaxed outline-none"
                  defaultValue="Kegiatan Posyandu Desa Sibarani Nasampulu dilaksanakan sebagai bagian dari upaya peningkatan pelayanan kesehatan dasar bagi masyarakat, khususnya balita, ibu hamil, dan lansia..."
                />
                <div className="absolute bottom-3 right-3 flex gap-2 text-slate-400">
                  <Edit3
                    size={16}
                    className="cursor-pointer hover:text-emerald-500"
                  />
                  <Wand2
                    size={16}
                    className="cursor-pointer hover:text-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Tanggal Publikasi
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tanggal"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none"
                />
                <Calendar className="absolute right-3 top-3 text-slate-400 w-5 h-5" />
              </div>
            </div>

            <button
              onClick={() => setView("list")}
              className="w-32 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-1 transition-all"
            >
              Batal <span className="text-xs">⋮</span>
            </button>
          </div>
        </div>

        {/* Kolom Kanan - Upload & Kategori */}
        <div className="col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-6">
              Upload Product Image
            </h2>
            <div className="w-full h-16 bg-slate-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-400 transition-colors">
              <span className="text-slate-700 font-bold text-sm">
                Pilih File
              </span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold text-slate-800 mb-6">
              Jenis PPID
            </h2>
            <div className="relative">
              <select className="w-full p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-400 appearance-none outline-none focus:ring-2 focus:ring-emerald-500">
                <option>Informasi Berkala</option>
                <option>Informasi Serta Merta</option>
                <option>Informasi Setiap Saat</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
