import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Bell,
  Trash2,
  PlusCircle,
  Edit,
  BarChart,
  CheckCircle,
} from "lucide-react";

// Pastikan ini mengarah ke statistic-service Anda
const API_URL = `${import.meta.env.VITE_API_URL}/statistic/idm`;

export default function Idm() {
  const [view, setView] = useState("list");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [idmList, setIdmList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Status IDM Resmi dari Kemendesa
  const statusOptions = [
    "Sangat Tertinggal",
    "Tertinggal",
    "Berkembang",
    "Maju",
    "Mandiri",
  ];

  const initialFormState = {
    tahun_idm: new Date().getFullYear(),
    status_idm: "Berkembang", // Default value
    score_idm: 0.0,
    sosial_idm: 0.0,
    ekonomi_idm: 0.0,
    lingkungan_idm: 0.0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  // 1. FETCH DATA
  const fetchIdm = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, axiosConfig);
      setIdmList(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data IDM:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdm();
  }, []);

  // 2. HANDLE INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setFormData(initialFormState);
    setView("form");
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({ ...item });
    setView("form");
  };

  // 3. SIMPAN DATA
  const handleSave = async () => {
    const payload = { ...formData };

    // Pastikan nilai diubah menjadi float/desimal sebelum dikirim
    payload.score_idm = parseFloat(payload.score_idm);
    payload.sosial_idm = parseFloat(payload.sosial_idm);
    payload.ekonomi_idm = parseFloat(payload.ekonomi_idm);
    payload.lingkungan_idm = parseFloat(payload.lingkungan_idm);

    try {
      if (selectedItem) {
        // Mode Update dengan trik _method PUT anti-error 405
        payload._method = "PUT";
        await axios.post(`${API_URL}/${selectedItem.id}`, payload, axiosConfig);
      } else {
        // Mode Create
        await axios.post(API_URL, payload, axiosConfig);
      }
      fetchIdm();
      setView("list");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan data IDM!",
      );
    }
  };

  // 4. HAPUS DATA
  const confirmDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedItem.id}`, axiosConfig);
      fetchIdm();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  // UI WARNA STATUS IDM
  const getStatusColor = (status) => {
    switch (status) {
      case "Mandiri":
        return "bg-green-100 text-green-700 border-green-200";
      case "Maju":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Berkembang":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Tertinggal":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "Sangat Tertinggal":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-700 pb-10">
      <main className="flex flex-col p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-teal-900">
            Kelola Indeks Desa Membangun (IDM)
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Tahun..."
                className="pl-4 pr-10 py-2 w-80 rounded-full border border-gray-200 bg-white focus:outline-none shadow-sm focus:ring-2 ring-emerald-100"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            
          </div>
        </div>

        {view === "list" ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-teal-900">
                Daftar Skor IDM Desa
              </h2>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition shadow-md font-bold"
              >
                <PlusCircle className="w-5 h-5" /> Input IDM Baru
              </button>
            </div>

            {/* TABEL */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-emerald-50 text-emerald-900 text-sm">
                    <th className="p-4 text-center">Tahun</th>
                    <th className="p-4">Status IDM</th>
                    <th className="p-4 text-center">Skor Akhir</th>
                    <th className="p-4 text-center">IKS (Sosial)</th>
                    <th className="p-4 text-center">IKE (Ekonomi)</th>
                    <th className="p-4 text-center">IKL (Lingkungan)</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="p-4 text-center">
                        Loading data...
                      </td>
                    </tr>
                  ) : idmList.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-4 text-center">
                        Belum ada data IDM.
                      </td>
                    </tr>
                  ) : (
                    idmList.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 text-sm transition"
                      >
                        <td className="p-4 text-center font-black text-teal-900 text-lg">
                          {item.tahun_idm}
                        </td>
                        <td className="p-4 font-bold">
                          <span
                            className={`px-3 py-1 border rounded-full text-xs shadow-sm ${getStatusColor(item.status_idm)}`}
                          >
                            {item.status_idm}
                          </span>
                        </td>
                        <td className="p-4 text-center font-bold text-emerald-600 text-base">
                          {Number(item.score_idm).toFixed(4)}
                        </td>
                        <td className="p-4 text-center text-slate-600">
                          {Number(item.sosial_idm).toFixed(4)}
                        </td>
                        <td className="p-4 text-center text-slate-600">
                          {Number(item.ekonomi_idm).toFixed(4)}
                        </td>
                        <td className="p-4 text-center text-slate-600">
                          {Number(item.lingkungan_idm).toFixed(4)}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-3">
                            <Edit
                              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500"
                              onClick={() => handleEdit(item)}
                              title="Ubah Data"
                            />
                            <Trash2
                              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500"
                              onClick={() => confirmDelete(item)}
                              title="Hapus Data"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          /* ========================================= */
          /* FORM TAMBAH / EDIT IDM                    */
          /* ========================================= */
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 text-teal-900 font-bold">
                <BarChart className="w-6 h-6" />
                <h2>
                  {selectedItem
                    ? `Ubah Data IDM Tahun ${selectedItem.tahun_idm}`
                    : "Input Data IDM Baru"}
                </h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setView("list")}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-2 rounded-lg font-bold transition"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg shadow-md transition font-bold"
                >
                  <CheckCircle className="w-5 h-5" /> Simpan Data
                </button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-emerald-500 max-w-4xl mx-auto">
              <div className="grid grid-cols-2 gap-8">
                {/* INFO DASAR */}
                <div className="space-y-6">
                  <h3 className="font-bold text-gray-800 border-b pb-2">
                    A. Informasi Dasar
                  </h3>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Tahun IDM
                    </label>
                    <input
                      type="number"
                      name="tahun_idm"
                      value={formData.tahun_idm}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-emerald-400 font-bold text-lg"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      *Pastikan tahun belum pernah diinput sebelumnya.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Status Desa
                    </label>
                    <select
                      name="status_idm"
                      value={formData.status_idm}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-emerald-400 font-bold cursor-pointer"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Skor Akhir IDM
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      min="0"
                      max="1"
                      name="score_idm"
                      value={formData.score_idm}
                      onChange={handleInputChange}
                      placeholder="0.xxxx"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-emerald-400 font-bold text-emerald-600 text-lg"
                    />
                  </div>
                </div>

                {/* INDEKS KOMPOSIT */}
                <div className="space-y-6">
                  <h3 className="font-bold text-gray-800 border-b pb-2">
                    B. Indeks Komposit Pembentuk
                  </h3>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Indeks Ketahanan Sosial (IKS)
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      min="0"
                      max="1"
                      name="sosial_idm"
                      value={formData.sosial_idm}
                      onChange={handleInputChange}
                      placeholder="0.xxxx"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Indeks Ketahanan Ekonomi (IKE)
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      min="0"
                      max="1"
                      name="ekonomi_idm"
                      value={formData.ekonomi_idm}
                      onChange={handleInputChange}
                      placeholder="0.xxxx"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Indeks Ketahanan Lingkungan (IKL)
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      min="0"
                      max="1"
                      name="lingkungan_idm"
                      value={formData.lingkungan_idm}
                      onChange={handleInputChange}
                      placeholder="0.xxxx"
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-blue-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL HAPUS */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl max-w-lg w-full text-center">
              <h2 className="text-3xl font-black text-teal-900 mb-2">
                Yakin Menghapus IDM?
              </h2>
              <p className="text-teal-800 mb-8 font-medium">
                Data IDM Tahun {selectedItem?.tahun_idm} akan dihapus selamanya.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleDelete}
                  className="bg-green-400 hover:bg-green-500 text-white font-bold px-10 py-3 rounded-xl transition"
                >
                  Ya, Hapus
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-10 py-3 rounded-xl transition"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
