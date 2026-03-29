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
} from "lucide-react";

// Pisahkan URL untuk Info Service (Profil) dan Statistic Service (IDM & Dusun)
const API_PROFIL_URL = `${import.meta.env.VITE_API_URL}/info/profil`;
const API_STATISTIC_URL = `${import.meta.env.VITE_API_URL}/statistic`;

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

  // 🔥 STATE BARU: Untuk menyimpan Ringkasan Dinamis
  const [ringkasan, setRingkasan] = useState({
    totalPenduduk: 0,
    statusIdm: "Belum Ada Data",
    tahunIdm: "-",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Config standar untuk JSON
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  // Config khusus untuk Upload File (Perangkat Desa)
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

      // 1. Fetch Data Profil (Sambutan, Visi Misi, Perangkat)
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

      // 2. Fetch Data Statistik untuk Dashboard Ringkasan
      // a. Ambil Total Penduduk dari seluruh Dusun
      const resDusun = await axios.get(
        `${API_STATISTIC_URL}/dusun`,
        axiosConfig,
      );
      const totalJiwa = resDusun.data.data.reduce(
        (sum, dusun) => sum + dusun.total_penduduk,
        0,
      );

      // b. Ambil Status IDM Terbaru (Backend sudah order by desc)
      const resIdm = await axios.get(`${API_STATISTIC_URL}/idm`, axiosConfig);
      let idmTerbaru = "Belum Ada Data";
      let tahunTerbaru = "-";
      if (resIdm.data.data && resIdm.data.data.length > 0) {
        idmTerbaru = resIdm.data.data[0].status_idm;
        tahunTerbaru = resIdm.data.data[0].tahun_idm;
      }

      // Masukkan ke State Ringkasan
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    } catch {
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
    } catch {
      alert("Gagal menyimpan Visi Misi!");
    }
  };

  // ==========================================
  // HANDLERS UNTUK PERANGKAT DESA (UPLOAD GAMBAR)
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
    } catch (err) {
      console.error(err);
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
      } catch {
        alert("Gagal menghapus!");
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
            Pusat kendali informasi dan profil Desa Sibarani Nasampulu.
          </p>
        </div>

        {/* TABS NAVIGASI UTAMA */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 border-b border-slate-200">
          {[
            { id: "ringkasan", icon: LayoutDashboard, label: "Ringkasan" },
            { id: "sambutan", icon: FileText, label: "Kata Sambutan" },
            { id: "visimisi", icon: Target, label: "Visi & Misi" },
            { id: "perangkat", icon: Users, label: "Perangkat Desa" },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowPerangkatForm(false);
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
        {/* KONTEN TAB 1: RINGKASAN (DASHBOARD UMUM - DINAMIS) */}
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
        {/* KONTEN TAB 2: KATA SAMBUTAN */}
        {/* ========================================================= */}
        {activeTab === "sambutan" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-in slide-in-from-bottom-4 duration-300 max-w-4xl">
            <h2 className="text-xl font-bold text-teal-900 mb-4 border-b pb-2">
              Edit Kata Sambutan Kepala Desa
            </h2>
            <textarea
              rows="10"
              value={sambutan.kata}
              onChange={(e) =>
                setSambutan({ ...sambutan, kata: e.target.value })
              }
              placeholder="Tuliskan kata sambutan di sini..."
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

        {/* ========================================================= */}
        {/* KONTEN TAB 3: VISI MISI */}
        {/* ========================================================= */}
        {activeTab === "visimisi" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 animate-in slide-in-from-bottom-4 duration-300 max-w-4xl">
            <h2 className="text-xl font-bold text-teal-900 mb-6 border-b pb-2">
              Edit Visi & Misi Desa
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
                        <h3
                          className="font-bold text-slate-800 text-lg line-clamp-1"
                          title={item.nama}
                        >
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
              // FORM TAMBAH / EDIT PERANGKAT DESA
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
                            Klik untuk Upload
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
                        Nama Lengkap (Gelar)
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
                        placeholder="Contoh: Kepala Desa, Sekretaris Desa..."
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
                        <CheckCircle className="w-5 h-5" /> Simpan Data
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
