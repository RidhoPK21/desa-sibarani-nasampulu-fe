import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Setup Base URL dari environment variable
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/info`;
const ITEMS_PER_PAGE = 8;

export default function Galeri() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [displayed, setDisplayed] = useState([]);

  const [activeFilter, setActiveFilter] = useState("Semua");
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchGaleriData = async () => {
      try {
        setLoading(true);
        const [beritaRes, kegiatanRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/berita`),
          axios.get(`${API_BASE_URL}/kegiatan`),
        ]);

        const beritaItems = (beritaRes.data?.data || [])
          .filter(
            (item) =>
              item.gambar_url &&
              (item.is_published === 1 || item.is_published === true),
          )
          .map((item) => ({
            id: `berita-${item.id}`,
            judul: item.judul,
            gambar_url: item.gambar_url,
            tanggal: item.created_at,
            kategori: "Berita",
          }));

        const kegiatanItems = (kegiatanRes.data?.data || [])
          .filter((item) => item.gambar_url)
          .map((item) => ({
            id: `kegiatan-${item.id}`,
            judul: item.judul || item.nama_kegiatan,
            gambar_url: item.gambar_url,
            tanggal: item.created_at || item.tanggal_kegiatan,
            kategori: "Kegiatan",
          }));

        const gabunganData = [...beritaItems, ...kegiatanItems].sort(
          (a, b) => new Date(b.tanggal) - new Date(a.tanggal),
        );

        setItems(gabunganData);
        setFiltered(gabunganData);
        setDisplayed(gabunganData.slice(0, ITEMS_PER_PAGE));
      } catch (err) {
        console.error("Gagal memuat galeri:", err);
        setError("Gagal memuat data galeri. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchGaleriData();
  }, []);

  const handleFilter = (kategori) => {
    setActiveFilter(kategori);
    setPage(1);
    const result =
      kategori === "Semua"
        ? items
        : items.filter((i) => i.kategori === kategori);
    setFiltered(result);
    setDisplayed(result.slice(0, ITEMS_PER_PAGE));
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setDisplayed(filtered.slice(0, nextPage * ITEMS_PER_PAGE));
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleLightboxNav = (direction) => {
    const idx = filtered.findIndex((item) => item.id === lightbox.id);
    const newIdx = idx + direction;
    if (newIdx >= 0 && newIdx < filtered.length) {
      setLightbox(filtered[newIdx]);
    }
  };

  const hasMore = displayed.length < filtered.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* ── WRAPPER UTAMA (Menggabungkan Header & Konten dengan Background Gradasi Hijau) ── */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #57A677 0%, #4EA674 100%)",
          flexGrow: 1, // Memastikan background memenuhi ruang sisa sebelum footer
          paddingBottom: "100px", // Memberi jarak lega di bagian bawah sebelum footer
        }}
      >
        {/* BLOBS (Efek Bola Warna Utama) */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "-100px",
            width: "600px",
            height: "600px",
            background: "rgba(59, 130, 246, 0.4)",
            borderRadius: "50%",
            filter: "blur(130px)",
            pointerEvents: "none",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-100px",
            width: "700px",
            height: "700px",
            background: "rgba(29, 78, 216, 0.35)",
            borderRadius: "50%",
            filter: "blur(150px)",
            pointerEvents: "none",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: "5%",
            right: "20%",
            width: "500px",
            height: "500px",
            background: "rgba(110, 231, 183, 0.25)",
            borderRadius: "50%",
            filter: "blur(110px)",
            pointerEvents: "none",
          }}
        ></div>

        {/* ── BAGIAN HEADER TEXT ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "110px 32px 60px",
          }}
        >
          <h1
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#fff",
              marginBottom: 16,
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
              textShadow: "0 3px 15px rgba(0,0,0,0.25)",
            }}
          >
            Galeri Desa Sibarani Nasampulu
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.95)",
              fontWeight: 600,
              maxWidth: "700px",
              margin: "0 auto",
              letterSpacing: "0.5px",
            }}
          >
            Dokumentasi visual dari berbagai aktivitas, program kerja, dan
            berita terkini di desa kami.
          </p>
        </div>

        {/* ── BAGIAN KONTEN GALERI (Berada dalam background yang sama) ── */}
        <div className="max-w-6xl mx-auto px-4 relative z-10 w-full">
          {/* Tombol Filter - Disesuaikan agar cocok dengan background gelap */}
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-10">
            {["Semua", "Berita", "Kegiatan"].map((f) => (
              <button
                key={f}
                onClick={() => handleFilter(f)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                  activeFilter === f
                    ? "bg-white text-[#4EA674] shadow-md"
                    : "bg-transparent text-white border border-white/50 hover:bg-white/20 hover:border-white"
                }`}
              >
                {f}
                <span
                  className={`ml-2 text-xs opacity-90 px-2 py-0.5 rounded-full ${
                    activeFilter === f ? "bg-[#4EA674]/10" : "bg-black/20"
                  }`}
                >
                  {f === "Semua"
                    ? items.length
                    : items.filter((i) => i.kategori === f).length}
                </span>
              </button>
            ))}
          </div>

          {/* State Loading */}
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-12">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-white/20 rounded-2xl animate-pulse backdrop-blur-sm"
                />
              ))}
            </div>
          )}

          {/* State Error */}
          {error && (
            <div className="text-center py-24 text-red-200 font-bold bg-black/20 rounded-2xl backdrop-blur-sm">
              {error}
            </div>
          )}

          {/* State Kosong */}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-24 text-white/80 font-medium bg-black/10 rounded-2xl backdrop-blur-sm">
              Belum ada foto untuk kategori ini.
            </div>
          )}

          {/* Grid Foto */}
          {!loading && !error && displayed.length > 0 && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {displayed.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setLightbox(item)}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/20"
                  >
                    <div className="aspect-square overflow-hidden bg-gray-100">
                      <img
                        src={item.gambar_url}
                        alt={item.judul}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/400x400?text=Foto+Tidak+Tersedia";
                        }}
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <span
                        className={`inline-block mb-2 w-max px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          item.kategori === "Berita"
                            ? "bg-blue-500 text-white"
                            : "bg-emerald-500 text-white"
                        }`}
                        style={
                          item.kategori !== "Berita"
                            ? { backgroundColor: "#4EA674" }
                            : {}
                        }
                      >
                        {item.kategori}
                      </span>
                      <p className="text-white text-sm font-bold line-clamp-2 leading-snug">
                        {item.judul}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tombol Load More - Disesuaikan untuk background hijau */}
              {hasMore && (
                <div className="flex justify-center mt-12 mb-4">
                  <button
                    onClick={handleLoadMore}
                    className="px-8 py-3 bg-white text-[#4EA674] rounded-full text-sm font-bold hover:bg-transparent hover:border hover:border-white hover:text-white transition-all shadow-lg"
                  >
                    Lihat Lebih Banyak ({filtered.length - displayed.length}{" "}
                    foto lagi)
                  </button>
                </div>
              )}

              {!hasMore && displayed.length > 0 && (
                <p className="text-center text-white/80 text-sm mt-12 mb-4 font-medium">
                  Semua foto sudah ditampilkan ({filtered.length} foto)
                </p>
              )}
            </>
          )}
        </div>
      </div>
      {/* ── AKHIR WRAPPER UTAMA ── */}

      {/* ── LIGHTBOX POP-UP ── */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setLightbox(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-gray-100 flex items-center justify-center min-h-[50vh] max-h-[70vh]">
              <img
                src={lightbox.gambar_url}
                alt={lightbox.judul}
                className="w-full max-h-[70vh] object-contain"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/800x600?text=Foto+Tidak+Tersedia";
                }}
              />
              <button
                onClick={() => handleLightboxNav(-1)}
                disabled={filtered.findIndex((i) => i.id === lightbox.id) === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition text-2xl font-bold text-gray-800 backdrop-blur-md"
              >
                &#8249;
              </button>
              <button
                onClick={() => handleLightboxNav(1)}
                disabled={
                  filtered.findIndex((i) => i.id === lightbox.id) ===
                  filtered.length - 1
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-lg hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition text-2xl font-bold text-gray-800 backdrop-blur-md"
              >
                &#8250;
              </button>
            </div>

            <div className="p-6 md:p-8 flex items-start justify-between gap-6 bg-white">
              <div className="flex-grow">
                <span
                  className={`inline-block mb-3 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    lightbox.kategori === "Berita"
                      ? "bg-blue-100 text-blue-700"
                      : "text-white"
                  }`}
                  style={
                    lightbox.kategori !== "Berita"
                      ? { backgroundColor: "#4EA674" }
                      : {}
                  }
                >
                  {lightbox.kategori}
                </span>
                <h3 className="font-black text-gray-900 text-xl md:text-2xl leading-tight mb-2">
                  {lightbox.judul}
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  Dipublikasikan pada: {formatTanggal(lightbox.tanggal)}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-600 rounded-full w-10 h-10 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <span className="text-xl font-bold leading-none mt-[-2px]">
                  ✕
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 mt-auto z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
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
