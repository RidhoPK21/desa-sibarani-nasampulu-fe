import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Search,
  Bell,
  Trash2,
  Image as ImageIcon,
  Edit2,
  PlusCircle,
  MessageSquare,
} from "lucide-react";

// Menggunakan API Gateway (Port 9000)
const API_URL = `${import.meta.env.VITE_API_URL}/info/kegiatan`;

export default function KegiatanDesa() {
  const [view, setView] = useState("list");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(false);

  // STATE DISESUAIKAN DENGAN NAMA KOLOM LARAVEL ($fillable)
  const [formData, setFormData] = useState({
    jenis_kegiatan: "kegiatan kerja",
    judul_kegiatan: "",
    deskripsi_kegiatan: "",
    tanggal_pelaksana: "",
    tanggal_berakhir: "",
    status_kegiatan: "Akan Datang",
    gambar: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const token = localStorage.getItem("token");
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // 1. READ
  const fetchKegiatan = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, axiosConfig);
      setKegiatan(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data kegiatan:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKegiatan();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 2. HANDLE INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, gambar: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 3. BUKA FORM TAMBAH
  const handleAdd = () => {
    setSelectedItem(null);
    setFormData({
      jenis_kegiatan: "kegiatan kerja",
      judul_kegiatan: "",
      deskripsi_kegiatan: "",
      tanggal_pelaksana: "",
      tanggal_berakhir: "",
      status_kegiatan: "Akan Datang",
      gambar: null,
    });
    setImagePreview(null);
    setView("form");
  };

  // 4. BUKA FORM EDIT
  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      jenis_kegiatan: item.jenis_kegiatan,
      judul_kegiatan: item.judul_kegiatan,
      deskripsi_kegiatan: item.deskripsi_kegiatan || "",
      // Potong jam jika dari database formatnya datetime (hanya ambil YYYY-MM-DD)
      tanggal_pelaksana: item.tanggal_pelaksana
        ? item.tanggal_pelaksana.split(" ")[0]
        : "",
      tanggal_berakhir: item.tanggal_berakhir
        ? item.tanggal_berakhir.split(" ")[0]
        : "",
      status_kegiatan: item.status_kegiatan || "Akan Datang",
      gambar: null, // Kosongkan, biarkan null jika tidak ingin ganti foto
    });
    setImagePreview(item.gambar_url || null);
    setView("form");
  };

  // 5. SIMPAN DATA (CREATE / UPDATE)
  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("jenis_kegiatan", formData.jenis_kegiatan);
      data.append("judul_kegiatan", formData.judul_kegiatan);
      data.append("deskripsi_kegiatan", formData.deskripsi_kegiatan);
      data.append("tanggal_pelaksana", formData.tanggal_pelaksana);

      // Kirim tanggal_berakhir jika diisi
      if (formData.tanggal_berakhir) {
        data.append("tanggal_berakhir", formData.tanggal_berakhir);
      }
      data.append("status_kegiatan", formData.status_kegiatan);

      if (formData.gambar) {
        data.append("gambar", formData.gambar);
      }

      if (selectedItem) {
        // Trik khusus Laravel: Jika update pakai FormData, kita kirim POST tapi dikasih tahu kalau ini aslinya PUT
        data.append("_method", "PUT");
        await axios.post(`${API_URL}/${selectedItem.id}`, data, axiosConfig);
      } else {
        await axios.post(API_URL, data, axiosConfig);
      }

      fetchKegiatan();
      setView("list");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan data!",
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
      fetchKegiatan();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-700">
      <main className="flex flex-col p-8">
        {/* Header (Sama seperti sebelumnya) */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-teal-900">
            Kelola Kegiatan Desa
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Judul Kegiatan..."
              className="pl-4 pr-10 py-2 w-80 rounded-full border border-gray-200"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {view === "list" ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-teal-900">
                Daftar Kegiatan
              </h2>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition"
              >
                <PlusCircle className="w-5 h-5" /> Tambah Kegiatan
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-emerald-50 text-gray-600 text-sm">
                    <th className="p-4 text-center">No</th>
                    <th className="p-4">Jenis</th>
                    <th className="p-4">Judul Kegiatan</th>
                    <th className="p-4">Tgl Pelaksana</th>
                    <th className="p-4">Status</th>
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
                  ) : kegiatan.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center">
                        Belum ada data kegiatan.
                      </td>
                    </tr>
                  ) : (
                    kegiatan.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50 text-sm">
                        <td className="p-4 text-center">{index + 1}</td>
                        <td className="p-4 font-medium text-emerald-600">
                          {item.jenis_kegiatan}
                        </td>
                        <td className="p-4 font-semibold">
                          {item.judul_kegiatan}
                        </td>
                        <td className="p-4">{item.tanggal_pelaksana}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              item.status_kegiatan === "Selesai"
                                ? "bg-green-100 text-green-700"
                                : item.status_kegiatan === "Batal"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.status_kegiatan}
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
                className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-emerald-600 transition"
              >
                <PlusCircle className="w-5 h-5" /> Simpan{" "}
                {selectedItem ? "Perubahan" : ""}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8">
              {/* Form Kiri */}
              <div className="col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6 text-teal-900">
                  Detail Kegiatan
                </h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Jenis Kegiatan
                      </label>
                      <select
                        name="jenis_kegiatan"
                        value={formData.jenis_kegiatan}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                      >
                        <option value="kegiatan kerja">Kegiatan Kerja</option>
                        <option value="program kerja">Program Kerja</option>
                        <option value="bantuan sosial">Bantuan Sosial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Status Kegiatan
                      </label>
                      <select
                        name="status_kegiatan"
                        value={formData.status_kegiatan}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                      >
                        <option value="Akan Datang">Akan Datang</option>
                        <option value="Berlangsung">Berlangsung</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Batal">Batal</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Judul Kegiatan
                    </label>
                    <input
                      type="text"
                      name="judul_kegiatan"
                      value={formData.judul_kegiatan}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Deskripsi Kegiatan
                    </label>
                    <textarea
                      name="deskripsi_kegiatan"
                      value={formData.deskripsi_kegiatan}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg h-32 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Tanggal Pelaksana
                      </label>
                      <input
                        type="date"
                        name="tanggal_pelaksana"
                        value={formData.tanggal_pelaksana}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Tanggal Berakhir (Opsional)
                      </label>
                      <input
                        type="date"
                        name="tanggal_berakhir"
                        value={formData.tanggal_berakhir}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-4">
                    <button
                      onClick={() => setView("list")}
                      className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Kanan (Upload Poster) */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-4 text-teal-900">
                    Upload Poster / Gambar
                  </h3>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                    <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative group">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-12 h-12 text-gray-300" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      Klik area kotak untuk memilih gambar
                    </p>
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
                Yakin Menghapus Kegiatan?
              </h2>
              <p className="text-teal-800 mb-8 font-medium italic">
                {selectedItem?.judul_kegiatan}
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
