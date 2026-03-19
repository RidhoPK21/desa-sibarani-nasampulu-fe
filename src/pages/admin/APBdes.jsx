import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Bell,
  Trash2,
  PlusCircle,
  MessageSquare,
  FileWarning,
  Wallet,
  CheckCircle,
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/info/apbdes`;

// =========================================================================
// 🔥 SOLUSI: KOMPONEN INPUT KITA KELUARKAN DARI FUNGSI UTAMA (STABIL)
// =========================================================================
const InputUang = ({ label, name, formData, onChange }) => {
  const handleNumberOnlyChange = (e) => {
    // Buang SEMUA karakter selain angka 0-9
    const rawValue = e.target.value.replace(/\D/g, "");
    const finalValue = rawValue === "" ? 0 : parseInt(rawValue, 10);

    // Tembakkan ke state React
    onChange({
      target: {
        name: name,
        value: finalValue,
      },
    });
  };

  return (
    <div className="mb-3">
      <label
        className="block text-xs font-semibold text-slate-600 mb-1 line-clamp-1"
        title={label}
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-2 text-slate-400 text-sm font-bold">
          Rp
        </span>
        <input
          type="text" // Tetap text agar spinner hilang
          inputMode="numeric" // Memaksa HP menampilkan Numpad
          name={name}
          value={formData[name] === 0 ? "" : formData[name]}
          onChange={handleNumberOnlyChange}
          placeholder="0"
          className="w-full pl-9 p-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:ring-2 ring-emerald-400 transition font-medium"
        />
      </div>
    </div>
  );
};
// =========================================================================

export default function Apbdes() {
  const [view, setView] = useState("list");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [apbdesList, setApbdesList] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialFormState = {
    nama_desa: "Desa Sibarani Nasampulu",
    tahun: new Date().getFullYear(),
    alasan_perubahan: "",
    // Pendapatan
    pendapatan_asli_desa: 0,
    dana_desa: 0,
    alokasi_dana_desa: 0,
    bagi_hasil_pajak_retribusi: 0,
    lain_lain_pendapatan_sah: 0,
    // Bidang 1
    siltap_kepala_desa: 0,
    siltap_perangkat_desa: 0,
    jaminan_sosial_aparatur: 0,
    operasional_pemerintahan_desa: 0,
    tunjangan_bpd: 0,
    operasional_bpd: 0,
    operasional_dana_desa: 0,
    sarana_prasarana_kantor: 0,
    pengisian_mutasi_perangkat: 0,
    // Bidang 2
    penyuluhan_pendidikan: 0,
    sarana_prasarana_pendidikan: 0,
    sarana_prasarana_perpustakaan: 0,
    pengelolaan_perpustakaan: 0,
    penyelenggaraan_posyandu: 0,
    penyuluhan_kesehatan: 0,
    pemeliharaan_jalan_lingkungan: 0,
    pembangunan_jalan_desa: 0,
    pembangunan_jalan_usaha_tani: 0,
    dokumen_tata_ruang: 0,
    talud_irigasi: 0,
    sanitasi_pemukiman: 0,
    fasilitas_pengelolaan_sampah: 0,
    jaringan_internet_desa: 0,
    // Bidang 3
    pembinaan_pkk: 0,
    // Bidang 4
    pelatihan_pertanian_peternakan: 0,
    pelatihan_aparatur_desa: 0,
    penyusunan_rencana_program: 0,
    insentif_kader_pembangunan: 0,
    insentif_kader_kesehatan_paud: 0,
    // Bidang 5
    penanggulangan_bencana: 0,
    keadaan_mendesak: 0,
    // Pembiayaan
    silpa_tahun_sebelumnya: 0,
    penyertaan_modal_desa: 0,
  };

  const [formData, setFormData] = useState(initialFormState);
  const token = localStorage.getItem("token");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka || 0);
  };

  const fetchApbdes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, axiosConfig);
      setApbdesList(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data APBDes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApbdes();
  }, []);

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
    setFormData({ ...item, alasan_perubahan: "" });
    setView("form");
  };

  const handleSave = async () => {
    if (selectedItem && !formData.alasan_perubahan.trim()) {
      alert("Wajib mengisi ALASAN PERUBAHAN untuk menerbitkan versi baru!");
      return;
    }

    const payload = { ...formData };
    delete payload.id;
    delete payload.total_pendapatan;
    delete payload.total_belanja;
    delete payload.created_at;
    delete payload.updated_at;

    try {
      if (selectedItem) {
        payload._method = "PUT";
        await axios.post(`${API_URL}/${selectedItem.id}`, payload, axiosConfig);
      } else {
        await axios.post(API_URL, payload, axiosConfig);
      }
      fetchApbdes();
      setView("list");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan data APBDes!",
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
      fetchApbdes();
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
          <h1 className="text-xl font-bold text-teal-900">Kelola APBDes</h1>
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
                Daftar APBDes Aktif & Riwayat
              </h2>
              <button
                onClick={handleAdd}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition shadow-md font-bold"
              >
                <PlusCircle className="w-5 h-5" /> Buat APBDes Baru
              </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-emerald-50 text-emerald-900 text-sm">
                    <th className="p-4 text-center">Tahun</th>
                    <th className="p-4 text-center">Versi</th>
                    <th className="p-4">Total Pendapatan</th>
                    <th className="p-4">Total Belanja</th>
                    <th className="p-4">Pembiayaan (Netto)</th>
                    <th className="p-4">Surplus / (Defisit)</th>
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
                  ) : apbdesList.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-4 text-center">
                        Belum ada data APBDes.
                      </td>
                    </tr>
                  ) : (
                    apbdesList.map((item) => {
                      const pembiayaanNetto =
                        Number(item.silpa_tahun_sebelumnya) -
                        Number(item.penyertaan_modal_desa);
                      const surplusDefisit =
                        Number(item.total_pendapatan) -
                        Number(item.total_belanja);
                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50 text-sm transition"
                        >
                          <td className="p-4 text-center font-bold text-teal-900 text-lg">
                            {item.tahun}
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                                V.{item.versi}
                              </span>
                              {/* Label Aktif atau Riwayat */}
                              {item.is_aktif ? (
                                <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-md">
                                  AKTIF
                                </span>
                              ) : (
                                <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md">
                                  ARSIP
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-emerald-600">
                            {formatRupiah(item.total_pendapatan)}
                          </td>
                          <td className="p-4 font-semibold text-orange-600">
                            {formatRupiah(item.total_belanja)}
                          </td>
                          <td className="p-4 font-semibold text-blue-600">
                            {formatRupiah(pembiayaanNetto)}
                          </td>
                          <td className="p-4 font-bold">
                            <span
                              className={
                                surplusDefisit >= 0
                                  ? "text-emerald-600"
                                  : "text-red-500"
                              }
                            >
                              {formatRupiah(surplusDefisit)}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-center gap-3">
                              {/* Sembunyikan tombol edit jika ini adalah arsip lama agar tidak terjadi kesalahan logic */}
                              {item.is_aktif && (
                                <MessageSquare
                                  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-500"
                                  onClick={() => handleEdit(item)}
                                  title="Ubah & Buat Versi Baru"
                                />
                              )}
                              <Trash2
                                className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500"
                                onClick={() => confirmDelete(item)}
                                title="Hapus Permanen"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="animate-in fade-in duration-300">
            {/* Action Bar Atas */}
            <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 text-teal-900 font-bold">
                <Wallet className="w-6 h-6" />
                <h2>
                  {selectedItem
                    ? `Buat Perubahan APBDes Tahun ${selectedItem.tahun} (Ke Versi ${selectedItem.versi + 1})`
                    : "Input Data APBDes Awal (Versi 1)"}
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
                  <CheckCircle className="w-5 h-5" /> Simpan{" "}
                  {selectedItem ? "Sebagai Versi Baru" : "Data APBDes"}
                </button>
              </div>
            </div>

            {/* Kotak Wajib Isi Jika Update */}
            {selectedItem && (
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 rounded-r-xl shadow-sm mb-6 flex gap-4 items-start">
                <FileWarning className="w-8 h-8 text-orange-500 mt-1" />
                <div className="flex-1">
                  <label className="block text-sm font-bold text-orange-900 mb-2">
                    Kenapa Anda Merubah APBDes ini?
                  </label>
                  <p className="text-xs text-orange-700 mb-3">
                    Sistem kami menggunakan fitur "Riwayat/Versioning". Data
                    lama tidak dihapus, melainkan disimpan sebagai arsip.
                    Silakan tuliskan alasan perubahannya (Wajib).
                  </p>
                  <textarea
                    name="alasan_perubahan"
                    value={formData.alasan_perubahan}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-white border border-orange-200 rounded-lg text-sm outline-none focus:ring-2 ring-orange-400"
                    rows="2"
                    required
                  />
                </div>
              </div>
            )}

            {/* Grid Form Utama */}
            <div className="grid grid-cols-2 gap-6">
              {/* KIRI: PENDAPATAN & PEMBIAYAAN */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-gray-800">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">
                    A. Informasi Dasar
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Nama Desa
                      </label>
                      <input
                        type="text"
                        name="nama_desa"
                        value={formData.nama_desa}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Tahun Anggaran
                      </label>
                      <input
                        type="number"
                        name="tahun"
                        value={formData.tahun}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-emerald-500">
                  <h3 className="font-bold text-emerald-800 mb-4 border-b pb-2">
                    B. Pendapatan Desa
                  </h3>
                  <InputUang
                    name="pendapatan_asli_desa"
                    label="Pendapatan Asli Desa (PADes)"
                    formData={formData}
                    onChange={handleInputChange}
                  />
                  <InputUang
                    name="dana_desa"
                    label="Dana Desa (DD)"
                    formData={formData}
                    onChange={handleInputChange}
                  />
                  <InputUang
                    name="alokasi_dana_desa"
                    label="Alokasi Dana Desa (ADD)"
                    formData={formData}
                    onChange={handleInputChange}
                  />
                  <InputUang
                    name="bagi_hasil_pajak_retribusi"
                    label="Bagi Hasil Pajak & Retribusi"
                    formData={formData}
                    onChange={handleInputChange}
                  />
                  <InputUang
                    name="lain_lain_pendapatan_sah"
                    label="Lain-lain Pendapatan Sah"
                    formData={formData}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-blue-500">
                  <h3 className="font-bold text-blue-800 mb-4 border-b pb-2">
                    F. Pembiayaan Desa
                  </h3>
                  <InputUang
                    name="silpa_tahun_sebelumnya"
                    label="SILPA Tahun Sebelumnya (Penerimaan)"
                    formData={formData}
                    onChange={handleInputChange}
                  />
                  <InputUang
                    name="penyertaan_modal_desa"
                    label="Penyertaan Modal Desa (Pengeluaran)"
                    formData={formData}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* KANAN: BELANJA */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-orange-500">
                  <h3 className="font-bold text-orange-800 mb-4 border-b pb-2">
                    C. Belanja - Pemerintahan (Bid. 1)
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4">
                    <InputUang
                      name="siltap_kepala_desa"
                      label="Penghasilan Tetap Kades"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="siltap_perangkat_desa"
                      label="Penghasilan Tetap Perangkat"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="jaminan_sosial_aparatur"
                      label="Jaminan Sosial Aparatur"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="operasional_pemerintahan_desa"
                      label="Operasional Pemerintahan"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="tunjangan_bpd"
                      label="Tunjangan BPD"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="operasional_bpd"
                      label="Operasional BPD"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="operasional_dana_desa"
                      label="Operasional Dana Desa"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="sarana_prasarana_kantor"
                      label="Sarana & Prasarana Kantor"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="pengisian_mutasi_perangkat"
                      label="Pengisian/Mutasi Perangkat"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-orange-500">
                  <h3 className="font-bold text-orange-800 mb-4 border-b pb-2">
                    D. Belanja - Pembangunan (Bid. 2)
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4">
                    <InputUang
                      name="penyuluhan_pendidikan"
                      label="Penyuluhan Pendidikan"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="sarana_prasarana_pendidikan"
                      label="Sarana Prasarana Pendidikan"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="sarana_prasarana_perpustakaan"
                      label="Sarana Prasarana Perpustakaan"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="pengelolaan_perpustakaan"
                      label="Pengelolaan Perpustakaan"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="penyelenggaraan_posyandu"
                      label="Penyelenggaraan Posyandu"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="penyuluhan_kesehatan"
                      label="Penyuluhan Kesehatan"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="pemeliharaan_jalan_lingkungan"
                      label="Pemeliharaan Jalan Lingk."
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="pembangunan_jalan_desa"
                      label="Pembangunan Jalan Desa"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="pembangunan_jalan_usaha_tani"
                      label="Jalan Usaha Tani"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="dokumen_tata_ruang"
                      label="Dokumen Tata Ruang"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="talud_irigasi"
                      label="Talud & Irigasi"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="sanitasi_pemukiman"
                      label="Sanitasi Pemukiman"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="fasilitas_pengelolaan_sampah"
                      label="Fasilitas Pengelolaan Sampah"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="jaringan_internet_desa"
                      label="Jaringan Internet Desa"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-t-4 border-t-orange-500">
                  <h3 className="font-bold text-orange-800 mb-4 border-b pb-2">
                    E. Belanja - Lainnya (Bid. 3, 4, 5)
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4">
                    <InputUang
                      name="pembinaan_pkk"
                      label="Pembinaan PKK (Bid 3)"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="pelatihan_pertanian_peternakan"
                      label="Pelatihan Pertanian/Peternakan"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="pelatihan_aparatur_desa"
                      label="Pelatihan Aparatur Desa"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="penyusunan_rencana_program"
                      label="Penyusunan Rencana Program"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="insentif_kader_pembangunan"
                      label="Insentif Kader Pembangunan"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="insentif_kader_kesehatan_paud"
                      label="Insentif Kader Kes/PAUD"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="penanggulangan_bencana"
                      label="Penanggulangan Bencana"
                      formData={formData}
                      onChange={handleInputChange}
                    />
                    <InputUang
                      name="keadaan_mendesak"
                      label="Keadaan Mendesak/BLT"
                      formData={formData}
                      onChange={handleInputChange}
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
                Yakin Menghapus APBDes?
              </h2>
              <p className="text-teal-800 mb-8 font-medium">
                Data Tahun {selectedItem?.tahun} Versi {selectedItem?.versi}{" "}
                akan dihapus selamanya.
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
