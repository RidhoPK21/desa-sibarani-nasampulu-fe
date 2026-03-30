import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, Info } from "lucide-react";
import { Link } from "react-router-dom";


// Sesuaikan endpoint API Anda
const API_URL = `${import.meta.env.VITE_API_URL}/info/apbdes`;

export default function APBdes() {
  const [apbdesData, setApbdesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk navigasi Tahun & Versi
  const [availableYears, setAvailableYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState(null);

  useEffect(() => {
    const fetchApbdes = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.status === "success") {
          const data = response.data.data;
          setApbdesData(data);

          // Ekstrak tahun unik & urutkan dari yang terbaru
          const years = [...new Set(data.map((item) => item.tahun))].sort(
            (a, b) => b - a,
          );
          setAvailableYears(years);

          if (years.length > 0) {
            setSelectedYear(years[0]);
          }
        }
      } catch (error) {
        console.error("Gagal memuat data APBDes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApbdes();
  }, []);

  // Saat tahun berubah, otomatis pilih versi tertinggi (terbaru) di tahun tersebut
  useEffect(() => {
    if (selectedYear) {
      const dataForYear = apbdesData.filter(
        (item) => item.tahun === selectedYear,
      );
      if (dataForYear.length > 0) {
        // Cari versi tertinggi
        const latestVersion = dataForYear.reduce((max, item) =>
          item.versi > max.versi ? item : max,
        );
        setSelectedVersion(latestVersion);
      }
    }
  }, [selectedYear, apbdesData]);

  // Helper Format Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka || 0);
  };

  // Jika tidak ada data atau sedang loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#529d71] flex items-center justify-center">
        <p className="text-white text-xl font-bold animate-pulse">
          Memuat Data APBDes...
        </p>
      </div>
    );
  }

  if (apbdesData.length === 0) {
    return (
      <div className="min-h-screen bg-[#529d71] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black text-white font-serif mb-4">
          APBDes
        </h1>
        <p className="text-white/80">
          Belum ada data Anggaran Pendapatan dan Belanja Desa yang
          dipublikasikan.
        </p>
      </div>
    );
  }

  // --- LOGIKA PERHITUNGAN TOTAL ---
  const d = selectedVersion || {};

  // 1. Total Pendapatan
  const totalPendapatan =
    Number(d.pendapatan_asli_desa) +
    Number(d.dana_desa) +
    Number(d.alokasi_dana_desa) +
    Number(d.bagi_hasil_pajak_retribusi) +
    Number(d.lain_lain_pendapatan_sah);

  // 2. Total Belanja (Dijumlahkan per Bidang)
  const bidang1 =
    Number(d.siltap_kepala_desa) +
    Number(d.siltap_perangkat_desa) +
    Number(d.jaminan_sosial_aparatur) +
    Number(d.operasional_pemerintahan_desa) +
    Number(d.tunjangan_bpd) +
    Number(d.operasional_bpd) +
    Number(d.operasional_dana_desa) +
    Number(d.sarana_prasarana_kantor) +
    Number(d.pengisian_mutasi_perangkat);

  const bidang2 =
    Number(d.penyuluhan_pendidikan) +
    Number(d.sarana_prasarana_pendidikan) +
    Number(d.sarana_prasarana_perpustakaan) +
    Number(d.pengelolaan_perpustakaan) +
    Number(d.penyelenggaraan_posyandu) +
    Number(d.penyuluhan_kesehatan) +
    Number(d.pemeliharaan_jalan_lingkungan) +
    Number(d.pembangunan_jalan_desa) +
    Number(d.pembangunan_jalan_usaha_tani) +
    Number(d.dokumen_tata_ruang) +
    Number(d.talud_irigasi) +
    Number(d.sanitasi_pemukiman) +
    Number(d.fasilitas_pengelolaan_sampah) +
    Number(d.jaringan_internet_desa);

  const bidang3 = Number(d.pembinaan_pkk);

  const bidang4 =
    Number(d.pelatihan_pertanian_peternakan) +
    Number(d.pelatihan_aparatur_desa) +
    Number(d.penyusunan_rencana_program) +
    Number(d.insentif_kader_pembangunan) +
    Number(d.insentif_kader_kesehatan_paud);

  const bidang5 = Number(d.penanggulangan_bencana) + Number(d.keadaan_mendesak);

  const totalBelanja = bidang1 + bidang2 + bidang3 + bidang4 + bidang5;

  // 3. Total Pembiayaan
  const totalPembiayaan =
    Number(d.silpa_tahun_sebelumnya) + Number(d.penyertaan_modal_desa);

  // Data Versi untuk Tahun Terpilih
  const versionsForSelectedYear = apbdesData
    .filter((item) => item.tahun === selectedYear)
    .sort((a, b) => a.versi - b.versi); // Urut dari versi 1 ke atas


  return (
    <div className="min-h-screen flex flex-col bg-[#529d71] font-sans">
      {/* KONTEN UTAMA (Diberi flex-grow agar mengisi sisa ruang kosong) */}
      <div className="flex-grow pb-20">
        {/* HEADER */}
        <div className="text-white text-center pt-20 pb-10 px-4">
          <h1 className="text-5xl md:text-6xl font-black mb-2 font-serif tracking-wide">
            APBDes
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium">
            Anggaran Pendapatan dan Belanja Desa
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6">
          {/* NAVIGASI TAHUN */}
          <div className="flex justify-center border-b border-white/30 mb-6">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-8 py-3 font-bold text-lg transition flex items-center gap-2 relative ${
                  selectedYear === year
                    ? "text-white"
                    : "text-white/60 hover:text-white/80"
                }`}
              >
                <Clock className="w-5 h-5" /> {year}
                {selectedYear === year && (
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-white rounded-t-md"></span>
                )}
              </button>
            ))}
          </div>

          {/* NAVIGASI VERSI & ALASAN PERUBAHAN */}
          {versionsForSelectedYear.length > 1 && (
            <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm border border-white/20">
              <p className="text-white text-sm font-bold mb-3 uppercase tracking-wider">
                Pilih Versi Anggaran:
              </p>
              <div className="flex flex-wrap gap-2">
                {versionsForSelectedYear.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVersion(v)}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition ${
                      selectedVersion?.id === v.id
                        ? "bg-white text-[#529d71] shadow-md"
                        : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  >
                    Versi {v.versi} {v.versi > 1 && "(Perubahan)"}
                  </button>
                ))}
              </div>

              {/* Tampilkan Alasan Perubahan Jika Ada */}
              {selectedVersion?.versi > 1 &&
                selectedVersion?.alasan_perubahan && (
                  <div className="mt-4 flex gap-3 items-start bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm">
                    <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-600" />
                    <div>
                      <span className="font-bold block mb-1">
                        Catatan Perubahan (Versi {selectedVersion.versi}):
                      </span>
                      <p>{selectedVersion.alasan_perubahan}</p>
                    </div>
                  </div>
                )}
            </div>
          )}

          {/* KONTEN KARTU APBDES */}
          <div className="space-y-4">
            {/* CARD 1: PELAKSANAAN (Ringkasan Warna Abu-abu) */}
            <div className="bg-[#cbd1d8] rounded-xl p-6 shadow-md border-b-4 border-gray-400">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Pelaksanaan
              </h2>
              <div className="space-y-3 font-semibold text-gray-800">
                <div className="flex justify-between items-center border-b border-gray-400 pb-2">
                  <span className="uppercase text-sm">Pendapatan :</span>
                  <span>{formatRupiah(totalPendapatan)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-400 pb-2">
                  <span className="uppercase text-sm">Belanja :</span>
                  <span>{formatRupiah(totalBelanja)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="uppercase text-sm">Pembiayaan :</span>
                  <span>{formatRupiah(totalPembiayaan)}</span>
                </div>
              </div>
            </div>

            {/* CARD 2: PENDAPATAN */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex justify-between items-end border-b-2 border-gray-200 pb-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Pendapatan</h2>
                <div className="text-right">
                  <p className="text-gray-500 font-bold text-sm uppercase">
                    Total
                  </p>
                  <p className="text-xl font-bold text-[#529d71]">
                    {formatRupiah(totalPendapatan)}
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm font-semibold text-gray-700">
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <span>Pendapatan Asli Desa :</span>
                  <span className="text-gray-900">
                    {formatRupiah(d.pendapatan_asli_desa)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <span>Dana Desa :</span>
                  <span className="text-gray-900">
                    {formatRupiah(d.dana_desa)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <span>Alokasi Dana Desa :</span>
                  <span className="text-gray-900">
                    {formatRupiah(d.alokasi_dana_desa)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <span>Bagi Hasil Pajak dan Retribusi :</span>
                  <span className="text-gray-900">
                    {formatRupiah(d.bagi_hasil_pajak_retribusi)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <span>Lain-Lain Pendapatan Desa Yang Sah :</span>
                  <span className="text-gray-900">
                    {formatRupiah(d.lain_lain_pendapatan_sah)}
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 3: BELANJA (Dikelompokkan per Bidang) */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex justify-between items-end border-b-2 border-gray-200 pb-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Belanja</h2>
                <div className="text-right">
                  <p className="text-gray-500 font-bold text-sm uppercase">
                    Total
                  </p>
                  <p className="text-xl font-bold text-red-600">
                    {formatRupiah(totalBelanja)}
                  </p>
                </div>
              </div>
              <div className="space-y-4 text-sm font-bold text-gray-700">
                <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-dashed border-gray-200 pb-2">
                  <span className="uppercase text-gray-600">
                    1. Bidang Penyelenggaraan Pemerintahan Desa :
                  </span>
                  <span className="text-gray-900">{formatRupiah(bidang1)}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-dashed border-gray-200 pb-2">
                  <span className="uppercase text-gray-600">
                    2. Bidang Pelaksanaan Pembangunan Desa :
                  </span>
                  <span className="text-gray-900">{formatRupiah(bidang2)}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-dashed border-gray-200 pb-2">
                  <span className="uppercase text-gray-600">
                    3. Bidang Pembinaan Kemasyarakatan :
                  </span>
                  <span className="text-gray-900">{formatRupiah(bidang3)}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2 border-b border-dashed border-gray-200 pb-2">
                  <span className="uppercase text-gray-600">
                    4. Bidang Pemberdayaan Masyarakat :
                  </span>
                  <span className="text-gray-900">{formatRupiah(bidang4)}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <span className="uppercase text-gray-600">
                    5. Bidang Penanggulangan Bencana & Darurat :
                  </span>
                  <span className="text-gray-900">{formatRupiah(bidang5)}</span>
                </div>
              </div>
            </div>

            {/* CARD 4: PEMBIAYAAN */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex justify-between items-end border-b-2 border-gray-200 pb-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Pembiayaan</h2>
                <div className="text-right">
                  <p className="text-gray-500 font-bold text-sm uppercase">
                    Total
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatRupiah(totalPembiayaan)}
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm font-semibold text-gray-700">
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <span>Silpa Tahun Sebelumnya :</span>
                  <span className="text-gray-900">
                    {formatRupiah(d.silpa_tahun_sebelumnya)}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-1">
                  <span>Penyertaan Modal Desa :</span>
                  <span className="text-gray-900">
                    {formatRupiah(d.penyertaan_modal_desa)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* <-- Akhir dari div konten utama dengan flex-grow */}
      {/* FOOTER DESA TETAP SAMA */}
      <footer className="bg-gray-900 text-white pt-16 pb-8 mt-auto">
        {/* ... (Isi Footer Anda Tetap Persis Sama Di Sini) ... */}
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
