import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Users,
  User,
  Calendar,
  ArrowRight,
  Quote,
} from "lucide-react";

// Setup Base URL dari environment variable
const API_URL = import.meta.env.VITE_API_URL;
const API_CONTENT_BANNER = `${API_URL}/content/banner`;
const API_PROFIL = `${API_URL}/info/profil`;
const API_INFO_BERITA = `${API_URL}/info/berita`;
const API_STATISTIC_DUSUN = `${API_URL}/statistic/dusun`;

export default function Home() {
  const [loading, setLoading] = useState(true);

  // State Data
  const [banners, setBanners] = useState([]);
  const [sambutan, setSambutan] = useState("");
  const [beritaTerkini, setBeritaTerkini] = useState([]);
  const [statistik, setStatistik] = useState({
    total: 0,
    laki: 0,
    perempuan: 0,
  });

  // State untuk Slider
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);

        // Fetch Semua Data Secara Paralel
        const [resBanner, resSambutan, resBerita, resDusun] = await Promise.all(
          [
            axios.get(API_CONTENT_BANNER).catch(() => ({ data: { data: [] } })),
            axios
              .get(`${API_PROFIL}/kata-sambutan`)
              .catch(() => ({ data: { data: [] } })),
            axios.get(API_INFO_BERITA).catch(() => ({ data: { data: [] } })),
            axios
              .get(API_STATISTIC_DUSUN)
              .catch(() => ({ data: { data: [] } })),
          ],
        );

        // 1. Olah Data Banner (Hanya yang shown, urutkan berdasarkan urutan)
        const activeBanners = (resBanner.data?.data || [])
          .filter((b) => b.shown === 1 || b.shown === true)
          .sort((a, b) => a.urutan - b.urutan);
        setBanners(activeBanners);

        // 2. Olah Kata Sambutan
        if (resSambutan.data?.data?.length > 0) {
          setSambutan(resSambutan.data.data[0].kata);
        }

        // 3. Olah Berita (Hanya yang publish, ambil 3 terbaru)
        const publishedBerita = (resBerita.data?.data || [])
          .filter((b) => b.is_published === 1 || b.is_published === true)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 3);
        setBeritaTerkini(publishedBerita);

        // 4. Olah Statistik Penduduk
        const dusunData = resDusun.data?.data || [];
        const stats = dusunData.reduce(
          (acc, curr) => ({
            total: acc.total + (curr.total_penduduk || 0),
            laki: acc.laki + (curr.penduduk_laki || 0),
            perempuan: acc.perempuan + (curr.penduduk_perempuan || 0),
          }),
          { total: 0, laki: 0, perempuan: 0 },
        );
        setStatistik(stats);
      } catch (error) {
        console.error("Gagal memuat data Home:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // Efek Autoplay Slider (Ganti gambar tiap 5 detik)
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  // Format Tanggal
  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4EA674]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* ── 1. HERO / BANNER SLIDER ── */}
      <section className="relative w-full h-[60vh] md:h-[80vh] bg-slate-800 overflow-hidden group">
        {banners.length > 0 ? (
          <>
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={banner.gambar_url}
                  alt={banner.nama_banner}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://placehold.co/1920x1080?text=Banner+Desa";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Teks Banner di tengah bawah */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-center text-white">
                  <h2 className="text-3xl md:text-5xl font-black mb-4 drop-shadow-lg font-serif italic">
                    {banner.nama_banner}
                  </h2>
                </div>
              </div>
            ))}

            {/* Tombol Navigasi Slider */}
            {banners.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/50 text-white rounded-full backdrop-blur transition opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/50 text-white rounded-full backdrop-blur transition opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                {/* Indikator Titik */}
                <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
                  {banners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === currentSlide
                          ? "w-8 bg-[#4EA674]"
                          : "w-2 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          /* Fallback jika belum ada banner */
          <div className="w-full h-full bg-gradient-to-br from-[#57A677] to-[#4EA674] flex flex-col items-center justify-center text-white p-8 text-center">
            <h1 className="text-4xl md:text-6xl font-black mb-4 font-serif italic">
              Selamat Datang di
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold">
              Desa Sibarani Nasampulu
            </h2>
          </div>
        )}
      </section>

      {/* ── 2. KATA SAMBUTAN ── */}
      {sambutan && (
        <section className="py-20 px-4 bg-white relative overflow-hidden">
          {/* Ornamen Latar */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full -z-0 opacity-50"></div>

          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <Quote className="w-16 h-16 text-[#4EA674]/20 mx-auto mb-6 rotate-180" />
            <h2 className="text-3xl font-black text-slate-800 mb-8 font-serif">
              Kata Sambutan Kepala Desa
            </h2>
            <div className="text-lg text-slate-600 leading-relaxed font-medium bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-sm inline-block text-left">
              <p className="whitespace-pre-wrap">{sambutan}</p>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. BERITA TERKINI ── */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-black text-slate-800 font-serif mb-2">
                Berita Terkini
              </h2>
              <p className="text-slate-500">
                Informasi dan kabar terbaru dari Desa Sibarani Nasampulu.
              </p>
            </div>
            <Link
              to="/berita"
              className="group flex items-center gap-2 text-[#4EA674] font-bold hover:text-emerald-700 transition"
            >
              Lihat Semua Berita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {beritaTerkini.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {beritaTerkini.map((berita) => (
                <Link
                  to={`/berita/${berita.id}`}
                  key={berita.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={berita.gambar_url}
                      alt={berita.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/600x400?text=Berita+Desa";
                      }}
                    />
                    <div className="absolute top-4 left-4 bg-[#4EA674] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                      Berita Desa
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-3 font-medium">
                      <Calendar className="w-4 h-4" />
                      {formatTanggal(berita.created_at)}
                    </div>
                    <h3 className="font-bold text-xl text-slate-800 mb-3 line-clamp-2 leading-snug group-hover:text-[#4EA674] transition">
                      {berita.judul}
                    </h3>
                    {/* Hapus tag HTML dari isi berita untuk excerpt */}
                    <p className="text-slate-500 text-sm line-clamp-3 mt-auto">
                      {berita.isi_berita?.replace(/<[^>]+>/g, "") ||
                        "Baca selengkapnya..."}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500">
              Belum ada berita yang diterbitkan.
            </div>
          )}
        </div>
      </section>

      {/* ── 4. RINGKASAN ADMINISTRASI PENDUDUK ── */}
      <section
        className="py-24 px-4 relative"
        style={{
          background: "linear-gradient(135deg, #57A677 0%, #4EA674 100%)",
        }}
      >
        {/* Blobs / Pattern (Sama seperti halaman Infografis) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 rounded-full filter blur-[100px]"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-300/20 rounded-full filter blur-[100px]"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 font-serif italic drop-shadow-md">
            Ringkasan Demografi Desa
          </h2>
          <p className="text-emerald-50 max-w-2xl mx-auto mb-16 text-lg">
            Data rekapitulasi jumlah penduduk Desa Sibarani Nasampulu yang
            terdata secara langsung (Real-time).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card Total Penduduk */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <p className="text-emerald-100 font-semibold mb-2 uppercase tracking-widest text-sm">
                Total Penduduk
              </p>
              <h3 className="text-5xl font-black text-white">
                {statistik.total.toLocaleString("id-ID")}
              </h3>
              <p className="text-emerald-200 mt-2 font-medium">Jiwa</p>
            </div>

            {/* Card Laki-laki */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-blue-100" />
              </div>
              <p className="text-blue-100 font-semibold mb-2 uppercase tracking-widest text-sm">
                Laki - Laki
              </p>
              <h3 className="text-5xl font-black text-white">
                {statistik.laki.toLocaleString("id-ID")}
              </h3>
              <p className="text-blue-200 mt-2 font-medium">Jiwa</p>
            </div>

            {/* Card Perempuan */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-pink-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-pink-100" />
              </div>
              <p className="text-pink-100 font-semibold mb-2 uppercase tracking-widest text-sm">
                Perempuan
              </p>
              <h3 className="text-5xl font-black text-white">
                {statistik.perempuan.toLocaleString("id-ID")}
              </h3>
              <p className="text-pink-200 mt-2 font-medium">Jiwa</p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              to="/infografis"
              className="inline-block px-8 py-3 bg-white text-[#4EA674] font-bold rounded-full shadow-lg hover:bg-emerald-50 transition"
            >
              Lihat Detail Infografis Publik
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. FOOTER (Sama dengan halaman sebelumnya) ── */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 mt-auto z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Kolom Info */}
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
                <h3 className="text-2xl font-bold">Desa Sibarani Nasampulu</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Website Resmi Pemerintah Desa Sibarani Nasampulu, Kecamatan
                Laguboti, Kabupaten Toba Samosir, Provinsi Sumatera Utara.
              </p>
            </div>

            {/* Kolom Tautan */}
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

            {/* Kolom Kontak */}
            <div className="flex flex-col items-center md:items-start">
              <h4
                className="text-lg font-bold mb-4 border-b-2 pb-1 inline-block"
                style={{ borderColor: "#4EA674" }}
              >
                Hubungi Kami
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <span className="text-[#4EA674] mt-0.5">📍</span>
                  <span>
                    Kecamatan Laguboti, Kabupaten Toba Samosir, Sumatera Utara
                  </span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-[#4EA674]">✉️</span>
                  <span>pemdes@sibaraninasampulu.go.id</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <span className="text-[#4EA674]">📞</span>
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
