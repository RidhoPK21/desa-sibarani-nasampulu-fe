import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Bell,
  Trash2,
  FileText,
  PlusCircle,
  MessageSquare,
  Download,
} from "lucide-react";

// Pastikan endpoint ini sesuai dengan route api.php Anda (misal: /info/dokumen atau /info/ppid)
const API_URL = `${import.meta.env.VITE_API_URL}/info/dokumen`;

export default function PpidDesa() {
  const [view, setView] = useState("list");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [dokumen, setDokumen] = useState([]);
  const [loading, setLoading] = useState(false);

  // STATE DISESUAIKAN DENGAN NAMA KOLOM DOKUMEN (PPID)
  const [formData, setFormData] = useState({
    nama_ppid: "",
    jenis_ppid: "Regulasi",
    deskripsi_ppid: "",
    file: null,
  });
  // State untuk menampilkan nama file yang dipilih
  const [fileName, setFileName] = useState("");

  const token = localStorage.getItem("token");
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // 1. READ
  const fetchDokumen = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, axiosConfig);
      setDokumen(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data dokumen:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDokumen();
  }, []);

  // 2. HANDLE INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file: file }));
      setFileName(file.name); // Tampilkan nama file di UI
    }
  };

  // 3. BUKA FORM TAMBAH
  const handleAdd = () => {
    setSelectedItem(null);
    setFormData({
      nama_ppid: "",
      jenis_ppid: "Regulasi",
      deskripsi_ppid: "",
      file: null,
    });
    setFileName("");
    setView("form");
  };

  // 4. BUKA FORM EDIT
  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      nama_ppid: item.nama_ppid,
      jenis_ppid: item.jenis_ppid,
      deskripsi_ppid: item.deskripsi_ppid || "",
      file: null, // Biarkan null jika tidak ingin ganti dokumen
    });
    // Jika ada file lama, tampilkan peringatan bahwa file sudah ada
    setFileName(
      item.file ? "Dokumen sudah terunggah (Pilih baru untuk mengganti)" : "",
    );
    setView("form");
  };

  // 5. SIMPAN DATA (CREATE / UPDATE)
  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("nama_ppid", formData.nama_ppid);
      data.append("jenis_ppid", formData.jenis_ppid);

      if (formData.deskripsi_ppid) {
        data.append("deskripsi_ppid", formData.deskripsi_ppid);
      }

      if (formData.file) {
        data.append("file", formData.file);
      }

      if (selectedItem) {
        data.append("_method", "PUT");
        await axios.post(`${API_URL}/${selectedItem.id}`, data, axiosConfig);
      } else {
        await axios.post(API_URL, data, axiosConfig);
      }

      fetchDokumen();
      setView("list");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan dokumen!",
      );
    }
  };

  // 6. DELETE
  const confirmDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${selectedItem.id}`, axiosConfig);
      fetchDokumen();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-700">
      <main className="flex flex-col p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-teal-900">Kelola PPID Desa</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Judul Dokumen..."
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
                Daftar PPID (Dokumen Desa)
              </h2>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition shadow-md"
              >
                <PlusCircle className="w-5 h-5" /> Tambah Dokumen
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-emerald-50 text-gray-600 text-sm">
                    <th className="p-4 text-center">No</th>
                    <th className="p-4">Nama Dokumen</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4 w-1/4">Deskripsi</th>
                    <th className="p-4">Tgl Upload</th>
                    <th className="p-4 text-center">File</th>
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
                  ) : dokumen.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-4 text-center">
                        Belum ada dokumen PPID.
                      </td>
                    </tr>
                  ) : (
                    dokumen.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 text-sm transition"
                      >
                        <td className="p-4 text-center">{index + 1}</td>
                        <td className="p-4 font-semibold text-teal-900">
                          {item.nama_ppid}
                        </td>
                        <td className="p-4 text-emerald-600 font-medium">
                          {item.jenis_ppid}
                        </td>
                        <td className="p-4 truncate max-w-xs">
                          {item.deskripsi_ppid}
                        </td>
                        {/* Memotong waktu jika ada */}
                        <td className="p-4">
                          {item.tanggal_upload
                            ? item.tanggal_upload.split(" ")[0]
                            : "-"}
                        </td>
                        <td className="p-4 text-center">
                          {item.file_url ? (
                            <a
                              href={item.file_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition"
                            >
                              <Download className="w-4 h-4" /> Unduh
                            </a>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center gap-3">
                            <MessageSquare
                              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500"
                              onClick={() => handleEdit(item)}
                            />
                            <Trash2
                              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500"
                              onClick={() => confirmDelete(item)}
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
          /* Form Tambah/Edit */
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg shadow-md transition"
              >
                <PlusCircle className="w-5 h-5" /> Simpan{" "}
                {selectedItem ? "Perubahan" : ""}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Form Kiri */}
              <div className="col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6 text-teal-900">
                  Detail Dokumen PPID
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Nama / Judul Dokumen
                    </label>
                    <input
                      type="text"
                      name="nama_ppid"
                      value={formData.nama_ppid}
                      onChange={handleInputChange}
                      placeholder="Contoh: Laporan APBDes 2026"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Deskripsi Dokumen (Opsional)
                    </label>
                    <textarea
                      name="deskripsi_ppid"
                      value={formData.deskripsi_ppid}
                      onChange={handleInputChange}
                      placeholder="Tuliskan keterangan singkat tentang dokumen ini..."
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg h-32 outline-none focus:ring-2 ring-emerald-100"
                    />
                  </div>

                  <div className="flex justify-between items-end pt-4">
                    <button
                      onClick={() => setView("list")}
                      className="bg-red-500 hover:bg-red-600 transition text-white px-8 py-3 rounded-lg font-bold"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Kanan (Upload & Kategori) */}
              <div className="space-y-6">
                {/* Kategori */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-4 text-teal-900">
                    Jenis PPID
                  </h3>
                  <select
                    name="jenis_ppid"
                    value={formData.jenis_ppid}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 ring-emerald-100"
                  >
                    {/* Value harus sama persis dengan Enum di Database */}
                    <option value="Regulasi">Regulasi</option>
                    <option value="Laporan Keuangan">Laporan Keuangan</option>
                    <option value="SK Kades">SK Kades</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                {/* Upload Dokumen */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-4 text-teal-900">
                    Upload File Dokumen
                  </h3>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center bg-gray-50 relative group hover:bg-emerald-50 transition">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3 group-hover:text-emerald-500 transition" />
                    <p className="text-sm font-bold text-gray-600 mb-1">
                      {fileName ? fileName : "Klik atau Drop File"}
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, DOCX, XLSX (Max 5MB)
                    </p>

                    {/* Input File Transparan (Hanya terima ekstensi dokumen) */}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Hapus */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl max-w-lg w-full text-center">
              <h2 className="text-3xl font-black text-teal-900 mb-2">
                Yakin Menghapus Dokumen?
              </h2>
              <p className="text-teal-800 mb-8 font-medium italic">
                {selectedItem?.nama_ppid}
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
