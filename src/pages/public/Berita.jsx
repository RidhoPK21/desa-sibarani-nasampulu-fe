import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // 🔥 TAMBAHKAN IMPORT INI
import { X, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

// Sesuaikan dengan endpoint API Anda
const API_URL = `${import.meta.env.VITE_API_URL}/info/berita`;

export default function Berita() {
  const [beritaList, setBeritaList] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State untuk Pop-up Modal
  const [selectedBerita, setSelectedBerita] = useState(null);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.status === "success") {
          const publishedBerita = response.data.data.filter(
            (item) => item.is_published === 1 || item.is_published === true,
          );
          setBeritaList(publishedBerita);
        }
      } catch (error) {
        console.error("Gagal mengambil data berita:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = beritaList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(beritaList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // 🔥 UBAH CLASS INI JADI flex flex-col AGAR FOOTER SELALU DI BAWAH
    <div className="min-h-screen flex flex-col bg-[#529d71] font-sans">
      {/* HEADER HERO SECTION */}
      <div className="text-white text-center pt-20 pb-12 px-4 mb-4">
        <h1 className="text-4xl md:text-5xl font-black mb-4 font-serif">
          Berita Desa
        </h1>
        <p className="text-white/90 max-w-2xl mx-auto text-lg">
          Kumpulan informasi, pengumuman, dan kabar terbaru dari Pemerintah Desa
          Sibarani Nasampulu.
        </p>
      </div>

      {/* KONTEN UTAMA (flex-grow agar mengisi sisa ruang kosong sebelum footer) */}
      <div className="max-w-5xl mx-auto px-6 flex-grow mb-20 w-full">
        {loading ? (
          <div className="text-center text-white py-20 text-xl font-bold animate-pulse">
            Memuat berita terbaru...
          </div>
        ) : beritaList.length === 0 ? (
          <div className="text-center text-white py-20 text-xl font-bold">
            Belum ada berita yang dipublikasikan.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Mapping Card Berita */}
            {currentItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedBerita(item)}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-4 gap-6"
              >
                <div className="md:w-1/3 flex-shrink-0">
                  <div className="w-full h-48 md:h-56 bg-gray-100 rounded-lg overflow-hidden relative group">
                    {item.gambar_url ? (
                      <img
                        src={item.gambar_url}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                        Tidak ada gambar
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-2/3 flex flex-col justify-center py-2 pr-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-[#529d71] transition-colors line-clamp-2">
                    {item.judul}
                  </h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6">
                    {item.konten}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#529d71] mt-auto">
                    <Calendar className="w-4 h-4" />
                    {item.created_at
                      ? new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "Baru saja"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 text-white hover:text-white/70 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-sm font-semibold transition"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
                  currentPage === page
                    ? "bg-white text-[#529d71] shadow-md"
                    : "text-white hover:bg-white/20 border border-transparent"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 text-white hover:text-white/70 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 text-sm font-semibold transition"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* MODAL POP-UP (PRATINJAU BACA BERITA) */}
      {/* ========================================================= */}
      {selectedBerita && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedBerita(null)}
          ></div>

          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedBerita(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-red-500 text-white rounded-full p-2 backdrop-blur transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="overflow-y-auto">
              {selectedBerita.gambar_url && (
                <div className="w-full h-64 sm:h-96 bg-gray-100">
                  <img
                    src={selectedBerita.gambar_url}
                    alt={selectedBerita.judul}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-8 sm:p-12">
                <div className="flex items-center gap-2 text-sm font-bold text-[#529d71] mb-4">
                  <Calendar className="w-4 h-4" />
                  {selectedBerita.created_at
                    ? new Date(selectedBerita.created_at).toLocaleDateString(
                        "id-ID",
                        { day: "numeric", month: "long", year: "numeric" },
                      )
                    : "Baru saja"}
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 leading-tight">
                  {selectedBerita.judul}
                </h1>

                <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                  {selectedBerita.konten}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border-t border-gray-100 p-4 sm:p-6 flex justify-end">
              <button
                onClick={() => setSelectedBerita(null)}
                className="bg-[#529d71] hover:bg-[#42805c] text-white px-8 py-3 rounded-xl font-bold transition shadow-md"
              >
                Tutup Berita
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* FOOTER DESA */}
      {/* ========================================================= */}
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
                  <Link to="/ppid" className="hover:text-white transition">
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
