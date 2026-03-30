import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const API_URL = `${import.meta.env.VITE_API_URL}/statistic/idm`;

const statusStyle = {
  Mandiri: "bg-green-100 text-green-700 border-green-200",
  Maju: "bg-blue-100 text-blue-700 border-blue-200",
  Berkembang: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Tertinggal: "bg-orange-100 text-orange-700 border-orange-200",
  "Sangat Tertinggal": "bg-red-100 text-red-700 border-red-200",
};

function getStatusBadge(status) {
  return statusStyle[status] || "bg-gray-100 text-gray-700 border-gray-200";
}

const formatNumber = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value)))
    return "-";
  return Number(value).toFixed(4);
};

export default function Idm() {
  const [idmData, setIdmData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(API_URL);
        if (response?.data?.data) {
          setIdmData(response.data.data);
        } else {
          setIdmData([]);
        }
      } catch (err) {
        console.error("Gagal mengambil data IDM publik:", err);
        setError("Tidak dapat memuat data IDM. Coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalData = idmData.length;

  const summaryByStatus = idmData.reduce((acc, item) => {
    const status = item.status_idm || "Tidak Diketahui";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div
      className="flex flex-col min-h-screen font-sans"
      style={{ backgroundColor: "#4EA674" }}
    >
      <section className="relative w-full h-72 overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541282698864-73a5a2f6f4ec?auto=format&fit=crop&w=1500&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative text-center text-white px-4 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
            Statistik IDM Desa Sibarani Nasampulu
          </h1>
          <p className="text-sm md:text-base text-white/90">
            Lihat perkembangan status desa berdasarkan Indeks Desa Membangun.
          </p>
        </div>
      </section>

      <section className="px-4 py-8 md:py-14 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200">
            <h3 className="text-lg font-bold text-teal-800">Total Rekaman</h3>
            <p className="text-4xl font-extrabold text-teal-700 mt-4">
              {totalData}
            </p>
            <p className="text-sm text-slate-500 mt-1">Data IDM terkini</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200">
            <h3 className="text-lg font-bold text-teal-800">Kategori Status</h3>
            <p className="text-xl font-bold text-slate-700 mt-4">
              {Object.keys(summaryByStatus).length || "-"}
            </p>
            <p className="text-sm text-slate-500 mt-1">Jumlah status berbeda</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-slate-200">
            <h3 className="text-lg font-bold text-teal-800">Refresh Data</h3>
            <p className="text-sm text-slate-600 mt-3">
              Data diambil dari API statistika IDM secara real-time setiap buka
              halaman.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ringkasan Status IDM
          </h2>
          <p className="text-sm text-white/90">
            Berikut distribusi status IDM Desa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {Object.entries(summaryByStatus).length > 0 ? (
            Object.entries(summaryByStatus).map(([status, count]) => (
              <div
                key={status}
                className="bg-white rounded-lg p-3 border border-slate-200 flex justify-between items-center gap-3"
              >
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    {status}
                  </p>
                  <p className="text-2xl font-bold text-teal-700">{count}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(status)}`}
                >
                  {status}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-slate-500 py-6 bg-white border rounded-lg">
              Belum ada data status IDM.
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
          <table className="w-full min-w-[740px] text-left">
            <thead className="bg-emerald-50 text-emerald-900 text-sm">
              <tr>
                <th className="p-4">Tahun</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Skor</th>
                <th className="p-4 text-center">IKS</th>
                <th className="p-4 text-center">IKE</th>
                <th className="p-4 text-center">IKL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-5 text-center text-slate-600">
                    Memuat data ...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="p-5 text-center text-red-600">
                    {error}
                  </td>
                </tr>
              ) : idmData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-5 text-center text-slate-500">
                    Data IDM belum tersedia.
                  </td>
                </tr>
              ) : (
                idmData.map((row) => (
                  <tr
                    key={row.id || `${row.tahun_idm}-${Math.random()}`}
                    className="hover:bg-slate-50"
                  >
                    <td className="p-4 font-bold text-teal-800">
                      {row.tahun_idm || "-"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(row.status_idm)}`}
                      >
                        {row.status_idm || "-"}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {formatNumber(row.score_idm)}
                    </td>
                    <td className="p-4 text-center">
                      {formatNumber(row.sosial_idm)}
                    </td>
                    <td className="p-4 text-center">
                      {formatNumber(row.ekonomi_idm)}
                    </td>
                    <td className="p-4 text-center">
                      {formatNumber(row.lingkungan_idm)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

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
