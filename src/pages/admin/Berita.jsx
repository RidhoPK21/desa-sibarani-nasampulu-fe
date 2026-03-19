import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Bell,
  Trash2,
  Image as ImageIcon,
  PlusCircle,
  MessageSquare,
} from "lucide-react";

// API Gateway Port 9000
const API_URL = `${import.meta.env.VITE_API_URL}/info/berita`;

export default function BeritaDesa() {
  const [view, setView] = useState("list");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(false);

  // STATE DISESUAIKAN DENGAN NAMA KOLOM BERITA
  const [formData, setFormData] = useState({
    judul: "",
    konten: "",
    is_published: 1,
    gambar_url: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const token = localStorage.getItem("token");
  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // 1. READ
  const fetchBerita = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, axiosConfig);
      setBerita(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data berita:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, []);

  // 2. HANDLE INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, gambar_url: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 3. BUKA FORM TAMBAH
  const handleAdd = () => {
    setSelectedItem(null);
    setFormData({
      judul: "",
      konten: "",
      is_published: 1,
      gambar_url: null,
    });
    setImagePreview(null);
    setView("form");
  };

  // 4. BUKA FORM EDIT
  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      judul: item.judul,
      konten: item.konten || "",
      is_published: item.is_published ? 1 : 0,
      gambar_url: null,
    });
    setImagePreview(item.gambar_url || null);
    setView("form");
  };

  // 5. SIMPAN DATA (CREATE / UPDATE)
  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("judul", formData.judul);
      data.append("konten", formData.konten);
      data.append("is_published", formData.is_published);

      if (formData.gambar_url) {
        data.append("gambar_url", formData.gambar_url);
      }

      if (selectedItem) {
        data.append("_method", "PUT");
        await axios.post(`${API_URL}/${selectedItem.id}`, data, axiosConfig);
      } else {
        await axios.post(API_URL, data, axiosConfig);
      }

      fetchBerita();
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
      fetchBerita();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-700">
      <main className="flex flex-col p-8">
        {/* HEADER (Desain sama persis dengan Kegiatan) */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold text-teal-900">
            Kelola Berita Desa
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Judul Berita..."
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
                Daftar Berita Desa
              </h2>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition shadow-md"
              >
                <PlusCircle className="w-5 h-5" /> Tambah Berita
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-emerald-50 text-gray-600 text-sm">
                    <th className="p-4 text-center">No</th>
                    <th className="p-4">Judul Berita</th>
                    <th className="p-4 w-1/3">Konten Singkat</th>
                    <th className="p-4">Tanggal Publikasi</th>
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
                  ) : berita.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center">
                        Belum ada data berita.
                      </td>
                    </tr>
                  ) : (
                    berita.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 text-sm transition"
                      >
                        <td className="p-4 text-center">{index + 1}</td>
                        <td className="p-4 font-semibold text-teal-900">
                          {item.judul}
                        </td>
                        <td className="p-4 truncate max-w-xs">{item.konten}</td>
                        <td className="p-4">
                          {item.created_at
                            ? item.created_at.split("T")[0]
                            : "-"}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              item.is_published
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {item.is_published ? "Publish" : "Draft"}
                          </span>
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
                  Detail Berita
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Judul Berita
                    </label>
                    <input
                      type="text"
                      name="judul"
                      value={formData.judul}
                      onChange={handleInputChange}
                      placeholder="Masukkan judul berita..."
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Isi Berita
                    </label>
                    <textarea
                      name="konten"
                      value={formData.konten}
                      onChange={handleInputChange}
                      placeholder="Tuliskan detail berita di sini..."
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg h-40 outline-none focus:ring-2 ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Status Publikasi
                    </label>
                    <select
                      name="is_published"
                      value={formData.is_published}
                      onChange={handleInputChange}
                      className="w-1/2 p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 ring-emerald-100"
                    >
                      <option value={1}>Publish</option>
                      <option value={0}>Draft</option>
                    </select>
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

              {/* Form Kanan (Upload Poster) */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-4 text-teal-900">
                    Upload Gambar Berita
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
                      Klik area kotak untuk memilih gambar utama berita
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Hapus (Desain sama persis dengan Kegiatan) */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl max-w-lg w-full text-center">
              <h2 className="text-3xl font-black text-teal-900 mb-2">
                Yakin Menghapus Berita?
              </h2>
              <p className="text-teal-800 mb-8 font-medium italic">
                {selectedItem?.judul}
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
