import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Calendar,
  Image as ImageIcon,
  Clock,
  Info,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


const API_KEGIATAN_URL = `${import.meta.env.VITE_API_URL}/info/kegiatan`;

export default function Kegiatan() {
  const [kegiatanList, setKegiatanList] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk Tab Kategori
  const [activeTab, setActiveTab] = useState("kegiatan kerja");

  // State untuk Modal Pop-up
  const [selectedItem, setSelectedItem] = useState(null);

  // State untuk Paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Jumlah kartu per halaman

  // Daftar Tab (ID disesuaikan dengan enum database)
  const tabs = [
    { id: "kegiatan kerja", label: "Daftar Kegiatan Desa" },
    { id: "program kerja", label: "Daftar Program Kerja" },
    { id: "bantuan sosial", label: "Daftar Bantuan Sosial" },
  ];

  // Fetch data dari Backend (Tanpa Token untuk Publik)
  useEffect(() => {
    const fetchKegiatan = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_KEGIATAN_URL);
        setKegiatanList(response.data.data || []);
      } catch (error) {
        console.error("Gagal mengambil data kegiatan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchKegiatan();
  }, []);

  // Reset halaman ke 1 setiap kali tab berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Filter data berdasarkan Tab yang aktif
  const filteredData = kegiatanList.filter(
    (item) => item.jenis_kegiatan === activeTab,
  );

  // Logika Paginasi
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Format Tanggal ke format Indonesia (Contoh: 15 Agustus 2026)
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  // Warna Badge Status
  const getStatusColor = (status) => {
    if (status === "Selesai") return "bg-green-100 text-green-700";
    if (status === "Berlangsung") return "bg-blue-100 text-blue-700";
    if (status === "Batal") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700"; // Akan Datang
  };

  return (
    <div className="font-sans text-slate-700 bg-[#57A677] min-h-screen flex flex-col">
      {/* ========================================== */}
      {/* 1. HERO SECTION */}
      {/* ========================================== */}
      <section className="pt-24 pb-12 px-6 text-center text-white relative">
        <div className="relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h1 className="text-5xl md:text-6xl font-serif italic font-bold tracking-wide drop-shadow-md">
            Kegiatan Desa
          </h1>
        </div>
      </section>

      {/* ========================================== */}
      {/* 2. TABS KATEGORI */}
      {/* ========================================== */}
      <section className="px-6 max-w-5xl mx-auto w-full mb-6">
        <div className="flex flex-wrap gap-6 border-b border-white/30 text-white pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-2 text-sm md:text-base transition-all ${
                activeTab === tab.id
                  ? "border-b-4 border-white font-bold opacity-100"
                  : "border-b-4 border-transparent font-medium opacity-70 hover:opacity-100"
              }`}
            >
              {tab.id === "kegiatan kerja" && <Info size={18} />}
              {tab.id === "program kerja" && <Clock size={18} />}
              {tab.id === "bantuan sosial" && <Calendar size={18} />}
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* 3. DAFTAR KEGIATAN (HORIZONTAL CARDS) */}
      {/* ========================================== */}
      <section className="px-6 pb-12 flex-grow max-w-5xl mx-auto w-full">
        {loading ? (
          // Skeleton Loader
          <div className="space-y-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-xl shadow-md h-48 flex animate-pulse"
              >
                <div className="w-1/3 bg-slate-200 rounded-l-xl"></div>
                <div className="w-2/3 p-6 flex flex-col justify-center">
                  <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredData.length === 0 ? (
          // Jika Data Kosong
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-12 text-center shadow-md">
            <ImageIcon className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-600 mb-2">
              Belum Ada Data
            </h3>
            <p className="text-slate-500">
              Kategori ini belum memiliki data kegiatan.
            </p>
          </div>
        ) : (
          // List Data Kegiatan Asli
          <div className="space-y-6">
            {currentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row overflow-hidden cursor-pointer group"
              >
                {/* Gambar Kiri */}
                <div className="w-full md:w-1/3 h-48 md:h-auto bg-slate-100 relative overflow-hidden shrink-0">
                  {item.gambar_url ? (
                    <img
                      src={item.gambar_url}
                      alt={item.judul_kegiatan}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300">
                      <ImageIcon size={48} />
                    </div>
                  )}
                </div>

                {/* Konten Kanan */}
                <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 group-hover:text-[#4EA674] transition-colors">
                    {item.judul_kegiatan}
                  </h3>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed line-clamp-3">
                    {item.deskripsi_kegiatan}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================== */}
        {/* 4. PAGINASI */}
        {/* ========================================== */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10 text-white">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-white/20 rounded-lg transition disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-sm font-medium px-4">
              Halaman {currentPage} dari {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 hover:bg-white/20 rounded-lg transition disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </section>

      {/* ========================================== */}
      {/* 5. MODAL POP-UP DETAIL KEGIATAN */}
      {/* ========================================== */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-slate-800">
                Detail Kegiatan
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Gambar Full */}
              <div className="w-full h-64 md:h-80 bg-slate-100 rounded-xl mb-6 overflow-hidden">
                {selectedItem.gambar_url ? (
                  <img
                    src={selectedItem.gambar_url}
                    alt={selectedItem.judul_kegiatan}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300">
                    <ImageIcon size={64} />
                  </div>
                )}
              </div>

              {/* Judul & Status */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h3 className="text-2xl md:text-3xl font-black text-slate-800">
                  {selectedItem.judul_kegiatan}
                </h3>
                <span
                  className={`px-3 py-1.5 rounded-lg text-sm font-bold shrink-0 ${getStatusColor(
                    selectedItem.status_kegiatan,
                  )}`}
                >
                  {selectedItem.status_kegiatan || "Akan Datang"}
                </span>
              </div>

              {/* Info Tanggal */}
              <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar size={18} className="text-[#4EA674]" />
                  <div>
                    <p className="text-xs text-slate-400 font-semibold uppercase">
                      Mulai
                    </p>
                    <p className="font-medium">
                      {formatDate(selectedItem.tanggal_pelaksana)}
                    </p>
                  </div>
                </div>
                {selectedItem.tanggal_berakhir && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock size={18} className="text-orange-500" />
                    <div>
                      <p className="text-xs text-slate-400 font-semibold uppercase">
                        Selesai
                      </p>
                      <p className="font-medium">
                        {formatDate(selectedItem.tanggal_berakhir)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Deskripsi Full */}
              <div>
                <h4 className="font-bold text-slate-800 mb-3">
                  Deskripsi Lengkap
                </h4>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedItem.deskripsi_kegiatan ||
                    "Tidak ada deskripsi untuk kegiatan ini."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white pt-16 pb-8 mt-auto">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                  {/* Kolom 1: Info Desa */}
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src="/logo-toba.jpg"
                        alt="Logo Toba"
                        className="w-12 h-12 object-contain bg-white rounded-full p-1 shadow-lg"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <h3 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
                        Desa Sibarani Nasampulu
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      Website Resmi Pemerintah Desa Sibarani Nasampulu, Kecamatan
                      Laguboti, Kabupaten Toba Samosir, Provinsi Sumatera Utara.
                    </p>
                  </div>
      
                  {/* Kolom 2: Tautan Cepat */}
                  <div className="flex flex-col items-center md:items-start">
                    <h4
                      className="text-lg font-bold mb-4 border-b-2 pb-1 inline-block"
                      style={{ borderColor: "#4EA674" }}
                    >
                      Tautan Cepat
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>
                        <Link to="/profil" className="hover:text-white transition">
                          Profil Desa
                        </Link>
                      </li>
                      <li>
                        <Link to="/kegiatan" className="hover:text-white transition">
                          Galeri Kegiatan
                        </Link>
                      </li>
                      <li>
                        <Link to="/idm" className="hover:text-white transition">
                          Data IDM
                        </Link>
                      </li>
                      <li>
                        <Link to="/berita" className="hover:text-white transition">
                          Berita Terkini
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dokumentasi"
                          className="hover:text-white transition"
                        >
                          PPID & Dokumentasi
                        </Link>
                      </li>
                    </ul>
                  </div>
      
                  {/* Kolom 3: Kontak */}
                  <div className="flex flex-col items-center md:items-start">
                    <h4
                      className="text-lg font-bold mb-4 border-b-2 pb-1 inline-block"
                      style={{ borderColor: "#4EA674" }}
                    >
                      Hubungi Kami
                    </h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                      <li className="flex items-start gap-3 justify-center md:justify-start">
                        {/* Icon Lokasi */}
                        <svg
                          className="w-5 h-5 shrink-0 mt-0.5"
                          style={{ color: "#4EA674" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        <span>
                          Kecamatan Laguboti, Kabupaten Toba Samosir, Sumatera Utara
                        </span>
                      </li>
                      <li className="flex items-center gap-3 justify-center md:justify-start">
                        {/* Icon Email */}
                        <svg
                          className="w-5 h-5 shrink-0"
                          style={{ color: "#4EA674" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                        <span>pemdes@sibaraninasampulu.go.id</span>
                      </li>
                      <li className="flex items-center gap-3 justify-center md:justify-start">
                        {/* Icon Telepon */}
                        <svg
                          className="w-5 h-5 shrink-0"
                          style={{ color: "#4EA674" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                        <span>(0632) 123456</span>
                      </li>
                    </ul>
                  </div>
                </div>
      
                {/* Copyright Bottom */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 text-center md:text-left">
                  <p>
                    &copy; {new Date().getFullYear()} Pemerintah Desa Sibarani
                    Nasampulu. Hak Cipta Dilindungi.
                  </p>
                  <div className="mt-4 md:mt-0 flex space-x-6">
                    <a href="#" className="hover:text-white transition">
                      Facebook
                    </a>
                    <a href="#" className="hover:text-white transition">
                      Instagram
                    </a>
                    <a href="#" className="hover:text-white transition">
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
            </footer>
    </div>
  );
}
