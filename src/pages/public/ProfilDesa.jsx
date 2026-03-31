import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User, MapPin, Building } from "lucide-react";

// Import Asset Gambar Statis
import logoToba from "../../assets/logo-toba.jpg";
import strukturOrganisasi from "../../assets/strukturOrganisasi.jpg";
import peta from "../../assets/peta.jpg";

const API_PROFIL_URL = `${import.meta.env.VITE_API_URL}/info/profil`;

// ============================================================
// DATA KONTEN SEJARAH (bisa dipindah ke file terpisah/CMS)
// ============================================================
const SEJARAH_SECTIONS = [
  {
    id: "asal",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 2L15 9H22L16.5 13.5L18.5 21L12 17L5.5 21L7.5 13.5L2 9H9Z" />
      </svg>
    ),
    iconBg: "bg-amber-400/20",
    iconColor: "text-amber-300",
    heading: "Titik Nol Peradaban Marga Sibarani",
    body: (
      <>
        Berdasarkan <em>tarombo</em> (silsilah) Batak Toba, marga Sibarani adalah keturunan pertama dari Sipartano Naiborngin, garis keturunan Raja Sipaettua. Dari tanah subur Laguboti inilah, leluhur marga Sibarani bermula, berkembang biak, dan kemudian merantau (<em>mangaranto</em>) melintasi zaman — membawa nilai-nilai kearifan lokal ke berbagai daerah hingga ke mancanegara.
      </>
    ),
  },
  {
    id: "tugu",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    iconBg: "bg-emerald-400/20",
    iconColor: "text-emerald-300",
    heading: "Simbol Pemersatu Lintas Generasi",
    body: (
      <>
        Nilai persaudaraan diabadikan melalui berdirinya{" "}
        <span className="font-semibold text-white">Tugu Raja Sibarani</span> di
        kawasan Landbow — cita-cita yang digagas sejak tahun 1935, akhirnya
        diresmikan pada Juli 2024. Tugu ini menjadi{" "}
        <em>tohang ni harbangan</em> (pintu gerbang utama) sekaligus simbol{" "}
        <em>marsirimpa</em> (gotong royong) yang mengikat persatuan seluruh
        keturunan marga Sibarani: anak, boru, bere, dan ibebere.
      </>
    ),
  },
  {
    id: "mual",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    iconBg: "bg-red-400/20",
    iconColor: "text-red-300",
    heading: "Saksi Bisu Perjuangan Pahlawan Nasional",
    body: (
      <>
        Di desa ini terdapat situs bersejarah{" "}
        <span className="font-semibold text-white">
          Mual Sisingamangaraja
        </span>{" "}
        (Mata Air Sisingamangaraja) — yang diyakini pernah disinggahi dan
        menjadi sumber kehidupan bagi Pahlawan Nasional Raja Sisingamangaraja
        pada masa perjuangannya. Mata air ini terus dijaga kelestariannya
        hingga kini.
      </>
    ),
  },
];

export default function ProfilDesa() {
  const [visiMisi, setVisiMisi] = useState({
    visi: "Memuat...",
    misi: "Memuat...",
  });
  const [perangkatList, setPerangkatList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfilData = async () => {
      try {
        setLoading(true);
        const resVisiMisi = await axios.get(`${API_PROFIL_URL}/visi-misi`);
        if (resVisiMisi.data.data.length > 0) {
          setVisiMisi(resVisiMisi.data.data[0]);
        }
        const resPerangkat = await axios.get(`${API_PROFIL_URL}/perangkat-desa`);
        setPerangkatList(resPerangkat.data.data);
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
        setVisiMisi({
          visi: "Data visi belum tersedia.",
          misi: "Data misi belum tersedia.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfilData();
  }, []);

  return (
    <div className="font-sans text-slate-700 bg-slate-50 min-h-screen">

      {/* ========================================== */}
      {/* WRAPPER SEJARAH & VISI MISI                */}
      {/* ========================================== */}
      <div className="relative overflow-hidden bg-[#57A677]">

        {/* --- BLOB BACKGROUNDS --- */}
        <div className="absolute top-32 -left-20 w-[500px] h-[500px] bg-blue-500/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 -right-20 w-[600px] h-[600px] bg-blue-700/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-emerald-300/20 rounded-full blur-[100px] pointer-events-none" />

        {/* ======================================== */}
        {/* 1. SEJARAH DESA — TAMPILAN BARU          */}
        {/* ======================================== */}
        <section className="relative z-10 pt-28 pb-20 px-6">
          <div className="max-w-4xl mx-auto">

            {/* Badge lokasi */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
                Kec. Laguboti · Kab. Toba · Sumatera Utara
              </span>
            </div>

            {/* Judul */}
            <h1 className="text-center text-4xl md:text-5xl font-black italic tracking-wide font-serif text-white drop-shadow-md mb-4">
              Sejarah Desa
            </h1>
            <p className="text-center text-white/60 text-sm tracking-wide mb-10">
              Desa Sibarani Nasampulu — Namungkup
            </p>

            {/* Garis pemisah */}
            <div className="flex justify-center mb-10">
              <div className="w-12 h-0.5 rounded-full bg-white/30" />
            </div>

            {/* Paragraf intro */}
            <p className="text-center text-white/75 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-14 pb-10 border-b border-white/15">
              Selamat datang di Desa Sibarani Nasampulu. Desa ini bukanlah
              sekadar wilayah administratif biasa — bersama kawasan Namungkup,
              wilayah ini merupakan <em>bona pasogit</em> (tanah leluhur) dan
              jantung peradaban bagi seluruh keturunan marga Sibarani di
              seluruh penjuru dunia.
            </p>

            {/* Tiga kartu sub-sejarah */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SEJARAH_SECTIONS.map((sec) => (
                <div
                  key={sec.id}
                  className="flex flex-col gap-4 bg-white/8 hover:bg-white/12 transition-colors duration-200 backdrop-blur-sm border border-white/12 rounded-2xl p-6"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  {/* Ikon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${sec.iconBg} ${sec.iconColor}`}
                  >
                    {sec.icon}
                  </div>

                  {/* Judul kartu */}
                  <h3 className="text-white font-semibold text-[15px] leading-snug">
                    {sec.heading}
                  </h3>

                  {/* Isi */}
                  <p className="text-white/65 text-[13.5px] leading-relaxed">
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <p className="text-center text-white/40 text-xs mt-10 tracking-wide">
              Melangkah maju tanpa melepaskan akar budaya dan sejarah luhur
            </p>
          </div>
        </section>

        {/* ======================================== */}
        {/* 2. VISI & MISI                           */}
        {/* ======================================== */}
        <section className="relative z-10 py-16 px-6 max-w-5xl mx-auto text-white">
          {/* Baris Visi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
              <h2 className="text-3xl font-bold tracking-wider mb-6">VISI</h2>
              <div className="font-bold text-lg mb-4 leading-snug">
                <p>Sebagai berikut:</p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
                {visiMisi.visi}
              </p>
            </div>
            <div className="flex justify-center md:justify-end animate-in fade-in slide-in-from-right-8 duration-700">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <img
                  src={logoToba}
                  alt="Logo Toba"
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Baris Misi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center pb-20">
            <div className="flex justify-center md:justify-start order-last md:order-first animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                <img
                  src={logoToba}
                  alt="Logo Toba"
                  className="w-64 h-64 object-contain"
                />
              </div>
            </div>
            <div className="animate-in fade-in slide-in-from-right-8 duration-700">
              <h2 className="text-3xl font-bold tracking-wider mb-6">Misi</h2>
              <div className="font-bold text-lg mb-4 leading-snug">
                <p>Sebagai berikut:</p>
              </div>
              <p className="text-sm text-white/80 leading-relaxed whitespace-pre-line">
                {visiMisi.misi}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================== */}
      {/* 3. STRUKTUR ORGANISASI                     */}
      {/* ========================================== */}
      <section className="py-20 bg-white px-6 border-y border-slate-100">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-10 text-[#4EA674]">
            <Building size={32} />
            <h2 className="text-3xl font-black tracking-tight">
              Struktur Organisasi Pemerintahan
            </h2>
          </div>
          <div className="bg-slate-50 p-4 rounded-3xl shadow-sm border border-slate-100 inline-block w-full max-w-5xl">
            <img
              src={strukturOrganisasi}
              alt="Struktur Organisasi Desa"
              className="w-full h-auto object-contain rounded-2xl"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* 4. DATA PERANGKAT DESA                     */}
      {/* ========================================== */}
      <section className="py-20 bg-gradient-to-b from-white to-[#4EA674]/10 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-[#4EA674] mb-10 px-4">
            Data Perangkat Desa
          </h2>

          {loading ? (
            <div className="flex gap-6 overflow-x-hidden px-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="w-64 h-80 bg-slate-200 animate-pulse rounded-3xl shrink-0"
                />
              ))}
            </div>
          ) : perangkatList.length === 0 ? (
            <p className="px-4 text-slate-500 italic">
              Data perangkat desa belum tersedia.
            </p>
          ) : (
            <div
              className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {perangkatList.map((item) => (
                <div
                  key={item.id}
                  className="snap-center shrink-0 w-[260px] bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="h-64 bg-slate-100 relative overflow-hidden">
                    {item.foto_url ? (
                      <img
                        src={item.foto_url}
                        alt={item.nama}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-slate-300">
                        <User size={64} />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 relative bg-white flex flex-col items-center text-center -mt-6 rounded-t-3xl">
                    <h3 className="font-bold text-slate-800 text-[15px] leading-snug mb-1">
                      {item.nama}
                    </h3>
                    <p className="text-sm font-semibold text-[#4EA674]">
                      {item.jabatan}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================== */}
      {/* 5. PETA LOKASI DESA                        */}
      {/* ========================================== */}
      <section className="py-20 bg-[#4EA674] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8 text-white">
            <MapPin size={32} />
            <h2 className="text-3xl font-black tracking-tight">
              Peta Lokasi Desa
            </h2>
          </div>
          <div className="bg-white rounded-[2rem] p-3 md:p-6 shadow-2xl shadow-green-900/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-[#4EA674]/20 rounded-tr-[2rem] m-4 pointer-events-none" />
            <img
              src={peta}
              alt="Peta Desa Sibarani Nasampulu"
              className="w-full h-auto md:h-[500px] object-cover rounded-2xl"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* FOOTER                                     */}
      {/* ========================================== */}
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
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <h3 className="text-2xl font-bold text-white">
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
                {[
                  { to: "/profil", label: "Profil Desa" },
                  { to: "/kegiatan", label: "Galeri Kegiatan" },
                  { to: "/idm", label: "Data IDM" },
                  { to: "/berita", label: "Berita Terkini" },
                  { to: "/dokumentasi", label: "PPID & Dokumentasi" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="hover:text-white transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
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
                  <svg className="w-5 h-5 shrink-0 mt-0.5 text-[#4EA674]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Kecamatan Laguboti, Kabupaten Toba Samosir, Sumatera Utara</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <svg className="w-5 h-5 shrink-0 text-[#4EA674]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>pemdes@sibaraninasampulu.go.id</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <svg className="w-5 h-5 shrink-0 text-[#4EA674]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(0632) 123456</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 text-center md:text-left">
            <p>
              &copy; {new Date().getFullYear()} Pemerintah Desa Sibarani Nasampulu. Hak Cipta Dilindungi.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="hover:text-white transition">Facebook</a>
              <a href="#" className="hover:text-white transition">Instagram</a>
              <a href="#" className="hover:text-white transition">YouTube</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}