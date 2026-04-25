import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  FileText,
  Target,
  Users,
  PlusCircle,
  Edit,
  Trash2,
  CheckCircle,
  Upload,
  Image as ImageIcon,
  Images, // Icon baru untuk Tab Banner
  Eye,
  EyeOff,
} from "lucide-react";

// Pisahkan URL untuk masing-masing Service
const API_PROFIL_URL = `${import.meta.env.VITE_API_URL}/info/profil`;
const API_STATISTIC_URL = `${import.meta.env.VITE_API_URL}/statistic`;
// 🔥 API URL BARU UNTUK CONTENT SERVICE (BANNER)
const API_CONTENT_URL = `${import.meta.env.VITE_API_URL}/content/banner`;

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("ringkasan");

  // State untuk Data Profil
  const [sambutan, setSambutan] = useState({ id: "", kata: "" });
  const [visiMisi, setVisiMisi] = useState({ id: "", visi: "", misi: "" });
  const [perangkatList, setPerangkatList] = useState([]);

  // State khusus form Perangkat Desa
  const initialPerangkatForm = {
    id: "",
    nama: "",
    jabatan: "",
    foto: null,
    fotoPreview: null,
  };
  const [perangkatForm, setPerangkatForm] = useState(initialPerangkatForm);
  const [showPerangkatForm, setShowPerangkatForm] = useState(false);

  // 🔥 STATE BARU: Untuk Banner
  const [bannerList, setBannerList] = useState([]);
  const initialBannerForm = {
    id: "",
    nama_banner: "",
    urutan: "",
    shown: true,
    gambar_banner: null,
    fotoPreview: null,
  };
  const [bannerForm, setBannerForm] = useState(initialBannerForm);
  const [showBannerForm, setShowBannerForm] = useState(false);

  // State untuk menyimpan Ringkasan Dinamis
  const [ringkasan, setRingkasan] = useState({
    totalPenduduk: 0,
    statusIdm: "Belum Ada Data",
    tahunIdm: "-",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Config HTTP
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  const axiosConfigMultipart = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  // ==========================================
  // FETCH DATA SAAT KOMPONEN DIMUAT (DINAMIS)
  // ==========================================
  const fetchAllData = async () => {
    try {
      setLoading(true);

      // 1. Fetch Data Profil
      const resSambutan = await axios.get(
        `${API_PROFIL_URL}/kata-sambutan`,
        axiosConfig,
      );
      if (resSambutan.data.data.length > 0)
        setSambutan(resSambutan.data.data[0]);

      const resVisiMisi = await axios.get(
        `${API_PROFIL_URL}/visi-misi`,
        axiosConfig,
      );
      if (resVisiMisi.data.data.length > 0)
        setVisiMisi(resVisiMisi.data.data[0]);

      const resPerangkat = await axios.get(
        `${API_PROFIL_URL}/perangkat-desa`,
        axiosConfig,
      );
      setPerangkatList(resPerangkat.data.data);

      // 2. 🔥 Fetch Data Banner (Gunakan endpoint admin jika ada, misal /admin/banners)
      try {
        const resBanner = await axios.get(API_CONTENT_URL, axiosConfig);
        setBannerList(resBanner.data.data || []);
      } catch (err) {
        console.error("Gagal mengambil data banner", err);
      }

      // 3. Fetch Data Statistik
      const resDusun = await axios.get(
        `${API_STATISTIC_URL}/dusun`,
        axiosConfig,
      );
      const totalJiwa = resDusun.data.data.reduce(
        (sum, dusun) => sum + dusun.total_penduduk,
        0,
      );

      const resIdm = await axios.get(`${API_STATISTIC_URL}/idm`, axiosConfig);
      let idmTerbaru = "Belum Ada Data",
        tahunTerbaru = "-";
      if (resIdm.data.data && resIdm.data.data.length > 0) {
        idmTerbaru = resIdm.data.data[0].status_idm;
        tahunTerbaru = resIdm.data.data[0].tahun_idm;
      }

      setRingkasan({
        totalPenduduk: totalJiwa,
        statusIdm: idmTerbaru,
        tahunIdm: tahunTerbaru,
      });
    } catch (error) {
      console.error("Gagal mengambil data dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ==========================================
  // HANDLERS UNTUK KATA SAMBUTAN & VISI MISI
  // ==========================================
  const handleSaveSambutan = async () => {
    try {
      if (sambutan.id) {
        await axios.put(
          `${API_PROFIL_URL}/kata-sambutan/${sambutan.id}`,
          { kata: sambutan.kata },
          axiosConfig,
        );
      } else {
        await axios.post(
          `${API_PROFIL_URL}/kata-sambutan`,
          { kata: sambutan.kata },
          axiosConfig,
        );
      }
      alert("Kata Sambutan berhasil disimpan!");
      fetchAllData();
    } catch (error) {
      alert("Gagal menyimpan Kata Sambutan!");
    }
  };

  const handleSaveVisiMisi = async () => {
    try {
      if (visiMisi.id) {
        await axios.put(
          `${API_PROFIL_URL}/visi-misi/${visiMisi.id}`,
          { visi: visiMisi.visi, misi: visiMisi.misi },
          axiosConfig,
        );
      } else {
        await axios.post(
          `${API_PROFIL_URL}/visi-misi`,
          { visi: visiMisi.visi, misi: visiMisi.misi },
          axiosConfig,
        );
      }
      alert("Visi Misi berhasil disimpan!");
      fetchAllData();
    } catch (error) {
      alert("Gagal menyimpan Visi Misi!");
    }
  };

  // ==========================================
  // HANDLERS UNTUK PERANGKAT DESA
  // ==========================================
  const handlePerangkatImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPerangkatForm({
        ...perangkatForm,
        foto: file,
        fotoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSavePerangkat = async () => {
    if (!perangkatForm.nama || !perangkatForm.jabatan) {
      alert("Nama dan Jabatan wajib diisi!");
      return;
    }
    const formData = new FormData();
    formData.append("nama", perangkatForm.nama);
    formData.append("jabatan", perangkatForm.jabatan);
    if (perangkatForm.foto) formData.append("foto", perangkatForm.foto);

    try {
      if (perangkatForm.id) {
        formData.append("_method", "PUT");
        await axios.post(
          `${API_PROFIL_URL}/perangkat-desa/${perangkatForm.id}`,
          formData,
          axiosConfigMultipart,
        );
      } else {
        await axios.post(
          `${API_PROFIL_URL}/perangkat-desa`,
          formData,
          axiosConfigMultipart,
        );
      }
      alert("Perangkat Desa berhasil disimpan!");
      setPerangkatForm(initialPerangkatForm);
      setShowPerangkatForm(false);
      fetchAllData();
    } catch (error) {
      alert("Gagal menyimpan Perangkat Desa!");
    }
  };

  const handleDeletePerangkat = async (id) => {
    if (window.confirm("Yakin ingin menghapus perangkat desa ini?")) {
      try {
        await axios.delete(
          `${API_PROFIL_URL}/perangkat-desa/${id}`,
          axiosConfig,
        );
        fetchAllData();
      } catch (error) {
        alert("Gagal menghapus!");
      }
    }
  };

  // ==========================================
  // 🔥 HANDLERS UNTUK BANNER (CONTENT SERVICE)
  // ==========================================
  const handleBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerForm({
        ...bannerForm,
        gambar_banner: file,
        fotoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSaveBanner = async () => {
    // 1. Validasi Input Kosong
    if (!bannerForm.nama_banner) {
      alert("Nama Banner wajib diisi!");
      return;
    }
    if (!bannerForm.id && !bannerForm.gambar_banner) {
      alert("Gambar Banner wajib diunggah untuk banner baru!");
      return;
    }

    // 2. 🔥 Validasi Urutan Minimal 1 (Jika diisi)
    if (bannerForm.urutan !== "" && bannerForm.urutan !== null) {
      const urutanAngka = parseInt(bannerForm.urutan);

      if (urutanAngka < 1) {
        alert("Urutan tidak boleh kurang dari 1!");
        return;
      }

      // 3. 🔥 Validasi Urutan Tidak Boleh Ganda (Duplikat)
      // Mengecek apakah ada banner lain dengan urutan yang sama (kecuali banner yang sedang diedit)
      const isDuplicate = bannerList.some(
        (b) => b.urutan === urutanAngka && b.id !== bannerForm.id,
      );

      if (isDuplicate) {
        alert(
          `Urutan ke-${urutanAngka} sudah digunakan oleh banner lain! Silakan pilih angka urutan yang berbeda.`,
        );
        return;
      }
    }

    // 4. Proses Simpan jika lolos semua validasi
    const formData = new FormData();
    formData.append("nama_banner", bannerForm.nama_banner);
    formData.append("shown", bannerForm.shown ? 1 : 0);
    if (bannerForm.urutan) formData.append("urutan", bannerForm.urutan);
    if (bannerForm.gambar_banner)
      formData.append("gambar_banner", bannerForm.gambar_banner);

    try {
      if (bannerForm.id) {
        formData.append("_method", "PUT");
        await axios.post(
          `${API_CONTENT_URL}/${bannerForm.id}`,
          formData,
          axiosConfigMultipart,
        );
      } else {
        await axios.post(API_CONTENT_URL, formData, axiosConfigMultipart);
      }
      alert("Banner berhasil disimpan!");
      setBannerForm(initialBannerForm);
      setShowBannerForm(false);
      fetchAllData();
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan Banner!");
    }
  };

  const handleDeleteBanner = async (id) => {
    if (
      window.confirm(
        "Yakin ingin menghapus Banner ini? Gambar akan dihapus permanen dari server.",
      )
    ) {
      try {
        await axios.delete(`${API_CONTENT_URL}/${id}`, axiosConfig);
        fetchAllData();
      } catch (error) {
        alert("Gagal menghapus Banner!");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700 pb-10">
      <main className="p-8 max-w-7xl mx-auto">
        {/* HEADER DASHBOARD */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-teal-900 tracking-tight">
            Dashboard Admin
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Pusat kendali informasi, profil, dan media desa.
          </p>
        </div>

        {/* TABS NAVIGASI UTAMA */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-hide">
          {[
            { id: "ringkasan", icon: LayoutDashboard, label: "Ringkasan" },
            { id: "sambutan", icon: FileText, label: "Kata Sambutan" },
            { id: "visimisi", icon: Target, label: "Visi & Misi" },
            { id: "perangkat", icon: Users, label: "Perangkat Desa" },
            { id: "banner", icon: Images, label: "Banner Home" }, // 🔥 TAB BARU
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowPerangkatForm(false);
                  setShowBannerForm(false);
                }}
                className={`flex items-center gap-2 px-6 py-3 font-bold text-sm transition-all whitespace-nowrap border-b-4 ${
                  activeTab === tab.id
                    ? "border-teal-600 text-teal-700 bg-teal-50 rounded-t-lg"
                    : "border-transparent text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-t-lg"
                }`}
              >
                <Icon className="w-5 h-5" /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* KONTEN TAB 1: RINGKASAN */}
        {/* ========================================================= */}
        {activeTab === "ringkasan" && (
          <div className="animate-in fade-in duration-300 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-emerald-500">
              <h3 className="text-slate-500 font-bold text-sm mb-1">
                Total Penduduk
              </h3>
              {loading ? (
                <div className="h-8 w-24 bg-slate-200 animate-pulse rounded mt-2"></div>
              ) : (
                <p className="text-3xl font-black text-slate-800">
                  {ringkasan.totalPenduduk.toLocaleString("id-ID")}{" "}
                  <span className="text-sm font-semibold text-slate-400">
                    Jiwa
                  </span>
                </p>
              )}
            </div>
            {/* Sisanya sama... */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-blue-500">
              <h3 className="text-slate-500 font-bold text-sm mb-1">
                Status IDM ({ringkasan.tahunIdm})
              </h3>
              {loading ? (
                <div className="h-8 w-32 bg-slate-200 animate-pulse rounded mt-2"></div>
              ) : (
                <p className="text-2xl font-black text-blue-700">
                  {ringkasan.statusIdm}
                </p>
              )}
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-orange-500">
              <h3 className="text-slate-500 font-bold text-sm mb-1">
                Aparatur Desa
              </h3>
              {loading ? (
                <div className="h-8 w-20 bg-slate-200 animate-pulse rounded mt-2"></div>
              ) : (
                <p className="text-3xl font-black text-slate-800">
                  {perangkatList.length}{" "}
                  <span className="text-sm font-semibold text-slate-400">
                    Orang
                  </span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* KONTEN TAB 2 & 3: KATA SAMBUTAN & VISI MISI */}
        {/* (Sama seperti sebelumnya, saya persingkat agar fokus) */}
        {/* ========================================================= */}
        {activeTab === "sambutan" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-in slide-in-from-bottom-4 max-w-4xl">
            <h2 className="text-xl font-bold text-teal-900 mb-4 border-b pb-2">
              Edit Kata Sambutan
            </h2>
            <textarea
              rows="10"
              value={sambutan.kata}
              onChange={(e) =>
                setSambutan({ ...sambutan, kata: e.target.value })
              }
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 ring-teal-400 mb-6"
            />
            <button
              onClick={handleSaveSambutan}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-md"
            >
              <CheckCircle className="w-5 h-5" /> Simpan Kata Sambutan
            </button>
          </div>
        )}

        {activeTab === "visimisi" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-in slide-in-from-bottom-4 max-w-4xl">
            <h2 className="text-xl font-bold text-teal-900 mb-6 border-b pb-2">
              Edit Visi & Misi
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Visi Desa
              </label>
              <textarea
                rows="3"
                value={visiMisi.visi}
                onChange={(e) =>
                  setVisiMisi({ ...visiMisi, visi: e.target.value })
                }
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 ring-blue-400"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Misi Desa
              </label>
              <textarea
                rows="6"
                value={visiMisi.misi}
                onChange={(e) =>
                  setVisiMisi({ ...visiMisi, misi: e.target.value })
                }
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 ring-orange-400"
              />
            </div>
            <button
              onClick={handleSaveVisiMisi}
              className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-md"
            >
              <CheckCircle className="w-5 h-5" /> Simpan Visi & Misi
            </button>
          </div>
        )}

        {/* ========================================================= */}
        {/* KONTEN TAB 4: PERANGKAT DESA */}
        {/* ========================================================= */}
        {activeTab === "perangkat" && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            {!showPerangkatForm ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-teal-900">
                    Daftar Perangkat Desa
                  </h2>
                  <button
                    onClick={() => {
                      setPerangkatForm(initialPerangkatForm);
                      setShowPerangkatForm(true);
                    }}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-md"
                  >
                    <PlusCircle className="w-5 h-5" /> Tambah Aparatur
                  </button>
                </div>
                {/* ... Grid Card Perangkat List ... */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {perangkatList.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
                    >
                      <div className="h-48 bg-slate-200 relative">
                        {item.foto_url ? (
                          <img
                            src={item.foto_url}
                            alt={item.nama}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-slate-400">
                            <ImageIcon className="w-12 h-12 opacity-50" />
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="font-bold text-slate-800 text-lg line-clamp-1">
                          {item.nama}
                        </h3>
                        <p className="text-teal-600 font-semibold text-sm mb-4">
                          {item.jabatan}
                        </p>
                        <div className="mt-auto flex gap-2 border-t border-slate-100 pt-4">
                          <button
                            onClick={() => {
                              setPerangkatForm({
                                ...item,
                                foto: null,
                                fotoPreview: item.foto_url,
                              });
                              setShowPerangkatForm(true);
                            }}
                            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-2 rounded-lg transition text-sm flex justify-center items-center gap-1"
                          >
                            <Edit className="w-4 h-4" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeletePerangkat(item.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-2 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-3xl">
                <h2 className="text-xl font-bold text-teal-900 mb-6 border-b pb-2">
                  {perangkatForm.id
                    ? "Edit Aparatur Desa"
                    : "Tambah Aparatur Desa Baru"}
                </h2>
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-1">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Foto / Pas Foto
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl h-48 flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                      {perangkatForm.fotoPreview ? (
                        <img
                          src={perangkatForm.fotoPreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                          <span className="text-xs font-semibold text-slate-500">
                            Upload
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePerangkatImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={perangkatForm.nama}
                        onChange={(e) =>
                          setPerangkatForm({
                            ...perangkatForm,
                            nama: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Jabatan
                      </label>
                      <input
                        type="text"
                        value={perangkatForm.jabatan}
                        onChange={(e) =>
                          setPerangkatForm({
                            ...perangkatForm,
                            jabatan: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-teal-400"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={() => setShowPerangkatForm(false)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold transition"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSavePerangkat}
                        className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-md"
                      >
                        <CheckCircle className="w-5 h-5" /> Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* 🔥 KONTEN TAB 5: BANNER HOME (CONTENT SERVICE) */}
        {/* ========================================================= */}
        {activeTab === "banner" && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            {!showBannerForm ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-teal-900">
                      Kelola Slider Banner Utama
                    </h2>
                    <p className="text-sm text-slate-500">
                      Gambar yang akan tampil di halaman depan website warga.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setBannerForm(initialBannerForm);
                      setShowBannerForm(true);
                    }}
                    className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-md"
                  >
                    <PlusCircle className="w-5 h-5" /> Tambah Banner
                  </button>
                </div>

                {bannerList.length === 0 ? (
                  <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
                    <Images className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium">
                      Belum ada banner yang ditambahkan.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bannerList.map((banner) => (
                      <div
                        key={banner.id}
                        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col group"
                      >
                        {/* Gambar Banner */}
                        <div className="h-40 bg-slate-200 relative">
                          {banner.gambar_url ? (
                            <img
                              src={banner.gambar_url}
                              alt={banner.nama_banner}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-slate-400">
                              <ImageIcon className="w-12 h-12 opacity-50" />
                            </div>
                          )}
                          {/* Badge Status & Urutan */}
                          <div className="absolute top-3 right-3 flex gap-2">
                            <span className="bg-white/90 backdrop-blur text-slate-800 text-xs font-bold px-2 py-1 rounded-md shadow">
                              Urutan: {banner.urutan}
                            </span>
                            <span
                              className={`text-xs font-bold px-2 py-1 rounded-md shadow text-white ${banner.shown ? "bg-emerald-500" : "bg-slate-400"}`}
                            >
                              {banner.shown ? (
                                <>
                                  <Eye className="w-3 h-3 inline mr-1" /> Aktif
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3 h-3 inline mr-1" />{" "}
                                  Disembunyikan
                                </>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Info Banner */}
                        <div className="p-5 flex-1 flex flex-col">
                          <h3 className="font-bold text-slate-800 text-lg line-clamp-1">
                            {banner.nama_banner}
                          </h3>

                          <div className="mt-6 flex gap-2 border-t border-slate-100 pt-4">
                            <button
                              onClick={() => {
                                setBannerForm({
                                  ...banner,
                                  gambar_banner: null,
                                  fotoPreview: banner.gambar_url,
                                });
                                setShowBannerForm(true);
                              }}
                              className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-2 rounded-lg transition text-sm flex justify-center items-center gap-1"
                            >
                              <Edit className="w-4 h-4" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteBanner(banner.id)}
                              className="bg-red-50 hover:bg-red-100 text-red-600 font-bold px-3 py-2 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // FORM TAMBAH / EDIT BANNER
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-4xl">
                <h2 className="text-xl font-bold text-teal-900 mb-6 border-b pb-2">
                  {bannerForm.id ? "Edit Banner" : "Upload Banner Baru"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Area Upload Gambar */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Gambar Banner (Horizontal disarankan)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl h-64 flex flex-col items-center justify-center relative overflow-hidden bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                      {bannerForm.fotoPreview ? (
                        <img
                          src={bannerForm.fotoPreview}
                          alt="Preview Banner"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <Upload className="w-10 h-10 mx-auto text-slate-400 mb-2" />
                          <span className="text-sm font-semibold text-slate-500">
                            Klik untuk Pilih Gambar
                          </span>
                          <p className="text-xs text-slate-400 mt-1">
                            Format: JPG, PNG, WEBP. Maks: 5MB
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/jpeg, image/png, image/webp"
                        onChange={handleBannerImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Area Input Data */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Nama / Judul Banner
                      </label>
                      <input
                        type="text"
                        value={bannerForm.nama_banner}
                        onChange={(e) =>
                          setBannerForm({
                            ...bannerForm,
                            nama_banner: e.target.value,
                          })
                        }
                        placeholder="Contoh: Banner HUT RI 79"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Urutan Tampil (Opsional)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={bannerForm.urutan}
                        onChange={(e) =>
                          setBannerForm({
                            ...bannerForm,
                            urutan: e.target.value,
                          })
                        }
                        placeholder="Biarkan kosong untuk urutan terakhir otomatis"
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 ring-teal-400"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={bannerForm.shown}
                          onChange={(e) =>
                            setBannerForm({
                              ...bannerForm,
                              shown: e.target.checked,
                            })
                          }
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                        <span className="ml-3 text-sm font-bold text-slate-700">
                          Tampilkan Banner di Web
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-slate-100">
                      <button
                        onClick={() => setShowBannerForm(false)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold transition"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handleSaveBanner}
                        className="flex flex-1 justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-bold transition shadow-md"
                      >
                        <CheckCircle className="w-5 h-5" /> Simpan Banner
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
