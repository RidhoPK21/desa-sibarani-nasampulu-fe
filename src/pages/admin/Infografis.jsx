import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Bell,
  Trash2,
  PlusCircle,
  Edit,
  Map,
  CheckCircle,
  Users,
} from "lucide-react";

// Sesuaikan API URL dengan backend Anda (misalnya /statistic/dusun)
const API_URL = `${import.meta.env.VITE_API_URL}/statistic/dusun`;

export default function Infografis() {
  const [view, setView] = useState("list");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("dasar"); // State untuk Tab Form

  const [dusunList, setDusunList] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================================================================
  // 🔥 TEMPLATE STATIS (OPSI A): Admin tinggal isi angkanya saja!
  // =========================================================================
  const initialFormState = {
    id: "", // Contoh: D01
    nama_dusun: "",
    penduduk_laki: 0,
    penduduk_perempuan: 0,
    agamas: [
      { agama: "Islam", jumlah_jiwa: 0 },
      { agama: "Kristen", jumlah_jiwa: 0 },
      { agama: "Katolik", jumlah_jiwa: 0 },
      { agama: "Hindu", jumlah_jiwa: 0 },
      { agama: "Buddha", jumlah_jiwa: 0 },
    ],
    perkawinans: [
      { status_perkawinan: "Belum Kawin", jumlah_jiwa: 0 },
      { status_perkawinan: "Kawin", jumlah_jiwa: 0 },
      { status_perkawinan: "Cerai Hidup", jumlah_jiwa: 0 },
      { status_perkawinan: "Cerai Mati", jumlah_jiwa: 0 },
    ],
    usias: [
      { kelompok_usia: "0 - 4 Tahun (Balita)", jumlah_jiwa: 0 },
      { kelompok_usia: "5 - 14 Tahun (Anak)", jumlah_jiwa: 0 },
      { kelompok_usia: "15 - 39 Tahun (Pemuda)", jumlah_jiwa: 0 },
      { kelompok_usia: "40 - 64 Tahun (Dewasa)", jumlah_jiwa: 0 },
      { kelompok_usia: "65 Tahun Keatas (Lansia)", jumlah_jiwa: 0 },
    ],
    pendidikans: [
      { tingkat_pendidikan: "Tidak/Belum Sekolah", jumlah_jiwa: 0 },
      { tingkat_pendidikan: "Tamat SD/Sederajat", jumlah_jiwa: 0 },
      { tingkat_pendidikan: "Tamat SMP/Sederajat", jumlah_jiwa: 0 },
      { tingkat_pendidikan: "Tamat SMA/Sederajat", jumlah_jiwa: 0 },
      { tingkat_pendidikan: "Diploma / Sarjana (S1/S2/S3)", jumlah_jiwa: 0 },
    ],
    pekerjaans: [
      { jenis_pekerjaan: "Belum/Tidak Bekerja", jumlah_jiwa: 0 },
      { jenis_pekerjaan: "Mengurus Rumah Tangga", jumlah_jiwa: 0 },
      { jenis_pekerjaan: "Pelajar/Mahasiswa", jumlah_jiwa: 0 },
      { jenis_pekerjaan: "PNS/TNI/Polri", jumlah_jiwa: 0 },
      { jenis_pekerjaan: "Wiraswasta / Pengusaha", jumlah_jiwa: 0 },
      { jenis_pekerjaan: "Karyawan Swasta", jumlah_jiwa: 0 },
      { jenis_pekerjaan: "Petani/Pekebun", jumlah_jiwa: 0 },
      { jenis_pekerjaan: "Buruh Harian Lepas", jumlah_jiwa: 0 },
      { jenis_pekerjaan: "Pekerjaan Lainnya", jumlah_jiwa: 0 },
    ],
  };

  const [formData, setFormData] = useState(initialFormState);
  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const fetchDusun = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, axiosConfig);
      setDusunList(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data Dusun:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDusun();
  }, []);

  // 1. Handle Input untuk Kolom Biasa (Nama Dusun, Penduduk L/P)
  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    // Jika input adalah penduduk laki/perempuan, pastikan integer
    if (name === "penduduk_laki" || name === "penduduk_perempuan") {
      const numValue = value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: numValue === "" ? 0 : parseInt(numValue, 10),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // 2. Handle Input untuk Kolom Array (Agama, Usia, dll)
  const handleArrayChange = (
    kategoriArray,
    indexTarget,
    keyValue,
    newValue,
  ) => {
    // Buang huruf/minus, pastikan hanya integer
    const rawValue = newValue.replace(/\D/g, "");
    const finalValue = rawValue === "" ? 0 : parseInt(rawValue, 10);

    setFormData((prev) => {
      const arrayBaru = [...prev[kategoriArray]];
      arrayBaru[indexTarget][keyValue] = finalValue;
      return { ...prev, [kategoriArray]: arrayBaru };
    });
  };

  const handleAdd = () => {
    setSelectedItem(null);
    setFormData(initialFormState);
    setActiveTab("dasar");
    setView("form");
  };

  const handleEdit = (item) => {
    setSelectedItem(item);

    // Proses merging: Jika ada struktur baru di template, kita gabungkan agar aman
    // Ini berguna jika backend mereturn data yang kurang lengkap
    const mergedData = { ...initialFormState, ...item, id: item.id };

    // Memastikan array yang kosong diganti dengan template agar UI tidak rusak
    if (!item.agamas || item.agamas.length === 0)
      mergedData.agamas = initialFormState.agamas;
    if (!item.usias || item.usias.length === 0)
      mergedData.usias = initialFormState.usias;
    if (!item.pendidikans || item.pendidikans.length === 0)
      mergedData.pendidikans = initialFormState.pendidikans;
    if (!item.pekerjaans || item.pekerjaans.length === 0)
      mergedData.pekerjaans = initialFormState.pekerjaans;
    if (!item.perkawinans || item.perkawinans.length === 0)
      mergedData.perkawinans = initialFormState.perkawinans;

    setFormData(mergedData);
    setActiveTab("dasar");
    setView("form");
  };

  const handleSave = async () => {
    if (!formData.id || !formData.nama_dusun) {
      alert("Kode Dusun / Nama Dusun wajib diisi (Pilih pada Tab Info Dasar)!");
      return;
    }

    try {
      if (selectedItem) {
        const payload = { ...formData, _method: "PUT" };
        await axios.post(`${API_URL}/${selectedItem.id}`, payload, axiosConfig);
      } else {
        await axios.post(API_URL, formData, axiosConfig);
      }
      fetchDusun();
      setView("list");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan data Dusun!",
      );
    }
  };

  const confirmDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedItem.id}`, axiosConfig);
      fetchDusun();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-700 pb-10">
      <main className="flex flex-col p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-teal-900">
            Infografis & Demografi Dusun
          </h1>
          <div className="flex items-center gap-4">
            {/* Header Profile Icon dll */}
          </div>
        </div>

        {view === "list" ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-teal-900">
                Daftar Dusun & Total Penduduk
              </h2>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition shadow-md font-bold"
              >
                <PlusCircle className="w-5 h-5" /> Tambah Dusun
              </button>
            </div>

            {/* TABEL LIST */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-emerald-50 text-emerald-900 text-sm">
                    <th className="p-4 text-center">Kode</th>
                    <th className="p-4">Nama Dusun</th>
                    <th className="p-4 text-center">Laki-Laki</th>
                    <th className="p-4 text-center">Perempuan</th>
                    <th className="p-4 text-center">Total Penduduk</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center">
                        Loading data...
                      </td>
                    </tr>
                  ) : dusunList.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center">
                        Belum ada data Dusun.
                      </td>
                    </tr>
                  ) : (
                    dusunList.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 text-sm transition"
                      >
                        <td className="p-4 text-center font-black text-teal-900">
                          {item.id}
                        </td>
                        <td className="p-4 font-bold text-base">
                          {item.nama_dusun}
                        </td>
                        <td className="p-4 text-center text-blue-600 font-semibold">
                          {item.penduduk_laki} Jiwa
                        </td>
                        <td className="p-4 text-center text-pink-600 font-semibold">
                          {item.penduduk_perempuan} Jiwa
                        </td>
                        <td className="p-4 text-center font-bold text-emerald-600 text-lg">
                          {item.total_penduduk}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-3">
                            <Edit
                              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500"
                              onClick={() => handleEdit(item)}
                              title="Ubah Data Demografi"
                            />
                            <Trash2
                              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500"
                              onClick={() => confirmDelete(item)}
                              title="Hapus Dusun"
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
          /* FORM TAMBAH / EDIT DENGAN SISTEM TABS     */
          /* ========================================= */
          <div className="animate-in fade-in duration-300 max-w-5xl mx-auto w-full">
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 text-teal-900 font-bold">
                <Map className="w-6 h-6" />
                <h2>
                  {selectedItem
                    ? `Ubah Demografi: ${selectedItem.nama_dusun}`
                    : "Input Data Dusun & Demografi Baru"}
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

            {/* NAVIGASI TABS */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {[
                { id: "dasar", label: "Info Dasar" },
                { id: "agama", label: "Agama & Perkawinan" },
                { id: "usia", label: "Usia" },
                { id: "pendidikan", label: "Pendidikan" },
                { id: "pekerjaan", label: "Pekerjaan" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full font-bold text-sm transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-teal-900 text-white shadow-md"
                      : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* AREA FORM BERDASARKAN TAB AKTIF */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              {/* TAB 1: DASAR */}
              {activeTab === "dasar" && (
                <div className="grid grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-300">
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 border-b pb-2 mb-4">
                      Profil Dusun
                    </h3>

                    {/* 🔥 DI SINI PERUBAHANNYA: Menggunakan Select Dropdown */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Pilih Dusun
                      </label>
                      <select
                        name="id"
                        value={formData.id}
                        disabled={!!selectedItem} // Tidak bisa ganti dusun kalau sedang mode Edit
                        onChange={(e) => {
                          const selectedId = e.target.value;
                          const namaDusun =
                            e.target.options[e.target.selectedIndex].text;
                          setFormData((prev) => ({
                            ...prev,
                            id: selectedId,
                            nama_dusun: namaDusun,
                          }));
                        }}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-emerald-400 font-bold cursor-pointer disabled:opacity-50"
                      >
                        <option value="" disabled>
                          -- Pilih Dusun --
                        </option>
                        <option value="D01">Dusun 1</option>
                        <option value="D02">Dusun 2</option>
                        <option value="D03">Dusun 3</option>
                        <option value="D04">Dusun 4</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 border-b pb-2 mb-4">
                      Total Penduduk (Master)
                    </h3>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 text-blue-600">
                        Penduduk Laki-Laki (Jiwa)
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        name="penduduk_laki"
                        value={
                          formData.penduduk_laki === 0
                            ? ""
                            : formData.penduduk_laki
                        }
                        onChange={handleBasicChange}
                        placeholder="0"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-blue-400 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 text-pink-600">
                        Penduduk Perempuan (Jiwa)
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        name="penduduk_perempuan"
                        value={
                          formData.penduduk_perempuan === 0
                            ? ""
                            : formData.penduduk_perempuan
                        }
                        onChange={handleBasicChange}
                        placeholder="0"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-pink-400 font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: AGAMA & PERKAWINAN */}
              {activeTab === "agama" && (
                <div className="grid grid-cols-2 gap-10 animate-in slide-in-from-right-4 duration-300">
                  <div>
                    <h3 className="font-bold text-emerald-800 border-b-2 border-emerald-500 pb-2 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" /> Demografi Agama
                    </h3>
                    {formData.agamas.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100"
                      >
                        <span className="font-semibold text-sm text-slate-700 w-1/2">
                          {item.agama}
                        </span>
                        <div className="flex items-center gap-2 w-1/2">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={
                              item.jumlah_jiwa === 0 ? "" : item.jumlah_jiwa
                            }
                            placeholder="0"
                            onChange={(e) =>
                              handleArrayChange(
                                "agamas",
                                index,
                                "jumlah_jiwa",
                                e.target.value,
                              )
                            }
                            className="w-full p-2 border border-slate-200 rounded-md text-center outline-none focus:ring-2 ring-emerald-400"
                          />
                          <span className="text-xs text-slate-400 font-bold">
                            Jiwa
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 border-b-2 border-blue-500 pb-2 mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5" /> Status Perkawinan
                    </h3>
                    {formData.perkawinans.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mb-3 bg-slate-50 p-2 rounded-lg border border-slate-100"
                      >
                        <span className="font-semibold text-sm text-slate-700 w-1/2">
                          {item.status_perkawinan}
                        </span>
                        <div className="flex items-center gap-2 w-1/2">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={
                              item.jumlah_jiwa === 0 ? "" : item.jumlah_jiwa
                            }
                            placeholder="0"
                            onChange={(e) =>
                              handleArrayChange(
                                "perkawinans",
                                index,
                                "jumlah_jiwa",
                                e.target.value,
                              )
                            }
                            className="w-full p-2 border border-slate-200 rounded-md text-center outline-none focus:ring-2 ring-blue-400"
                          />
                          <span className="text-xs text-slate-400 font-bold">
                            Jiwa
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: USIA */}
              {activeTab === "usia" && (
                <div className="max-w-xl mx-auto animate-in slide-in-from-right-4 duration-300">
                  <h3 className="font-bold text-orange-800 border-b-2 border-orange-500 pb-2 mb-4">
                    Demografi Berdasarkan Rentang Usia
                  </h3>
                  {formData.usias.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100"
                    >
                      <span className="font-semibold text-sm text-slate-700 w-2/3">
                        {item.kelompok_usia}
                      </span>
                      <div className="flex items-center gap-2 w-1/3">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={item.jumlah_jiwa === 0 ? "" : item.jumlah_jiwa}
                          placeholder="0"
                          onChange={(e) =>
                            handleArrayChange(
                              "usias",
                              index,
                              "jumlah_jiwa",
                              e.target.value,
                            )
                          }
                          className="w-full p-2 border border-slate-200 rounded-md text-center outline-none focus:ring-2 ring-orange-400 font-bold"
                        />
                        <span className="text-xs text-slate-400 font-bold">
                          Jiwa
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: PENDIDIKAN */}
              {activeTab === "pendidikan" && (
                <div className="max-w-xl mx-auto animate-in slide-in-from-right-4 duration-300">
                  <h3 className="font-bold text-purple-800 border-b-2 border-purple-500 pb-2 mb-4">
                    Tingkat Pendidikan Terakhir
                  </h3>
                  {formData.pendidikans.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100"
                    >
                      <span className="font-semibold text-sm text-slate-700 w-2/3">
                        {item.tingkat_pendidikan}
                      </span>
                      <div className="flex items-center gap-2 w-1/3">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={item.jumlah_jiwa === 0 ? "" : item.jumlah_jiwa}
                          placeholder="0"
                          onChange={(e) =>
                            handleArrayChange(
                              "pendidikans",
                              index,
                              "jumlah_jiwa",
                              e.target.value,
                            )
                          }
                          className="w-full p-2 border border-slate-200 rounded-md text-center outline-none focus:ring-2 ring-purple-400 font-bold"
                        />
                        <span className="text-xs text-slate-400 font-bold">
                          Jiwa
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 5: PEKERJAAN */}
              {activeTab === "pekerjaan" && (
                <div className="max-w-xl mx-auto animate-in slide-in-from-right-4 duration-300">
                  <h3 className="font-bold text-rose-800 border-b-2 border-rose-500 pb-2 mb-4">
                    Mata Pencaharian Pokok
                  </h3>
                  {formData.pekerjaans.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-2 bg-slate-50 p-2 rounded-lg border border-slate-100"
                    >
                      <span className="font-semibold text-sm text-slate-700 w-2/3">
                        {item.jenis_pekerjaan}
                      </span>
                      <div className="flex items-center gap-2 w-1/3">
                        <input
                          type="text"
                          inputMode="numeric"
                          value={item.jumlah_jiwa === 0 ? "" : item.jumlah_jiwa}
                          placeholder="0"
                          onChange={(e) =>
                            handleArrayChange(
                              "pekerjaans",
                              index,
                              "jumlah_jiwa",
                              e.target.value,
                            )
                          }
                          className="w-full p-2 border border-slate-200 rounded-md text-center outline-none focus:ring-2 ring-rose-400 font-bold"
                        />
                        <span className="text-xs text-slate-400 font-bold">
                          Jiwa
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODAL HAPUS */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl max-w-lg w-full text-center">
              <h2 className="text-3xl font-black text-teal-900 mb-2">
                Hapus Dusun?
              </h2>
              <p className="text-teal-800 mb-8 font-medium">
                Dusun <b>{selectedItem?.nama_dusun}</b> beserta seluruh data
                statistik demografinya akan dihapus selamanya.
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
