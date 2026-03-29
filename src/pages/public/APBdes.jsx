import { useState } from "react";

// --- DATA ---
const apbdesData = {
  2024: {
    pelaksanaan: {
      pendapatan: 1488196197,
      belanja: 1266720597,
      pembiayaan: 221475600,
    },
    pendapatan: {
      total: 1488196197,
      rincian: [
        { label: "Pendapatan Asli Desa", nilai: 1488196197 },
        { label: "Dana Desa", nilai: 1266720597 },
        { label: "Alokasi Dana Desa", nilai: 221475600 },
        { label: "Bagi Hasil Pajak dan Retribusi", nilai: 221475600 },
        { label: "Lain-Lain Pendapatan Desa Yang Sah", nilai: 221475600 },
      ],
    },
    belanja: {
      total: 1266720597,
      rincian: [
        {
          label: "Bidang Penyelenggaraan Pemerintahan Desa",
          nilai: 1488196197,
        },
        { label: "Bidang Pelaksanaan Pembangunan Desa", nilai: 1266720597 },
        { label: "Bidang Pembinaan Kemasyarakatan", nilai: 221475600 },
        { label: "Bidang Pemberdayaan Masyarakat", nilai: 221475600 },
        {
          label: "Bidang Penanggulangan Bencana, Darurat dan Keadaan Mendesak",
          nilai: 221475600,
        },
      ],
    },
    pembiayaan: { total: 221475600 },
    dokumen: {
      nama: "APBDes 2024",
      deskripsi: "Deskripsi/Rangkuman Dokumen",
      tanggal: "Tanggal Dokumen diupload",
    },
  },
  2025: {
    pelaksanaan: {
      pendapatan: 1550000000,
      belanja: 1320000000,
      pembiayaan: 230000000,
    },
    pendapatan: {
      total: 1550000000,
      rincian: [
        { label: "Pendapatan Asli Desa", nilai: 1550000000 },
        { label: "Dana Desa", nilai: 1320000000 },
        { label: "Alokasi Dana Desa", nilai: 230000000 },
        { label: "Bagi Hasil Pajak dan Retribusi", nilai: 230000000 },
        { label: "Lain-Lain Pendapatan Desa Yang Sah", nilai: 230000000 },
      ],
    },
    belanja: {
      total: 1320000000,
      rincian: [
        {
          label: "Bidang Penyelenggaraan Pemerintahan Desa",
          nilai: 1550000000,
        },
        { label: "Bidang Pelaksanaan Pembangunan Desa", nilai: 1320000000 },
        { label: "Bidang Pembinaan Kemasyarakatan", nilai: 230000000 },
        { label: "Bidang Pemberdayaan Masyarakat", nilai: 230000000 },
        {
          label: "Bidang Penanggulangan Bencana, Darurat dan Keadaan Mendesak",
          nilai: 230000000,
        },
      ],
    },
    pembiayaan: { total: 230000000 },
    dokumen: {
      nama: "APBDes 2025",
      deskripsi: "Deskripsi/Rangkuman Dokumen",
      tanggal: "Tanggal Dokumen diupload",
    },
  },
  2026: {
    pelaksanaan: {
      pendapatan: 1620000000,
      belanja: 1390000000,
      pembiayaan: 245000000,
    },
    pendapatan: {
      total: 1620000000,
      rincian: [
        { label: "Pendapatan Asli Desa", nilai: 1620000000 },
        { label: "Dana Desa", nilai: 1390000000 },
        { label: "Alokasi Dana Desa", nilai: 245000000 },
        { label: "Bagi Hasil Pajak dan Retribusi", nilai: 245000000 },
        { label: "Lain-Lain Pendapatan Desa Yang Sah", nilai: 245000000 },
      ],
    },
    belanja: {
      total: 1390000000,
      rincian: [
        {
          label: "Bidang Penyelenggaraan Pemerintahan Desa",
          nilai: 1620000000,
        },
        { label: "Bidang Pelaksanaan Pembangunan Desa", nilai: 1390000000 },
        { label: "Bidang Pembinaan Kemasyarakatan", nilai: 245000000 },
        { label: "Bidang Pemberdayaan Masyarakat", nilai: 245000000 },
        {
          label: "Bidang Penanggulangan Bencana, Darurat dan Keadaan Mendesak",
          nilai: 245000000,
        },
      ],
    },
    pembiayaan: { total: 245000000 },
    dokumen: {
      nama: "APBDes 2026",
      deskripsi: "Deskripsi/Rangkuman Dokumen",
      tanggal: "Tanggal Dokumen diupload",
    },
  },
};

const formatRupiah = (angka) => "Rp " + angka.toLocaleString("id-ID");

// Icons
const IconCalendar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const IconDesc = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 10h16M4 14h10"
    />
  </svg>
);
const IconView = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);
const IconDownload = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3.5 h-3.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </svg>
);
const IconClock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function APBdes() {
  const [tahun, setTahun] = useState(2024);
  const data = apbdesData[tahun];

  return (
    <div style={{ backgroundColor: "#4EA674" }}>
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-5xl font-black italic text-white tracking-tight drop-shadow-md mb-2"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            APBDes
          </h1>
          <p className="text-white/80 text-sm">
            Anggaran Pendapatan dan Belanja Desa
          </p>
        </div>

        {/* Year Tabs */}
        <div className="flex gap-0 mb-6 border-b border-white/30">
          {[2024, 2025, 2026].map((y) => {
            const isActive = tahun === y;
            return (
              <button
                key={y}
                onClick={() => setTahun(y)}
                className={`flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold transition-all duration-200 border-b-2 ${
                  isActive
                    ? "text-white border-white"
                    : "text-white/60 border-transparent hover:text-white hover:border-white/40"
                }`}
              >
                <IconClock />
                {y}
              </button>
            );
          })}
        </div>

        {/* Pelaksanaan Card */}
        <div className="bg-white/95 rounded-xl shadow-sm p-5 mb-4">
          <h2 className="text-base font-bold text-gray-800 mb-3">
            Pelaksanaan
          </h2>
          <div className="space-y-2">
            {[
              { label: "PENDAPATAN :", nilai: data.pelaksanaan.pendapatan },
              { label: "BELANJA :", nilai: data.pelaksanaan.belanja },
              { label: "PEMBIAYAAN :", nilai: data.pelaksanaan.pembiayaan },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-600 font-medium">{row.label}</span>
                <span className="text-gray-800 font-semibold">
                  {formatRupiah(row.nilai)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pendapatan Card */}
        <div className="bg-white/95 rounded-xl shadow-sm p-5 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-bold text-gray-800">Pendapatan</h2>
            <span className="text-base font-bold text-gray-800">
              {formatRupiah(data.pendapatan.total)}
            </span>
          </div>
          <div className="space-y-2">
            {data.pendapatan.rincian.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-500">{item.label} :</span>
                <span className="text-gray-700 font-medium">
                  {formatRupiah(item.nilai)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Belanja Card */}
        <div className="bg-white/95 rounded-xl shadow-sm p-5 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-base font-bold text-gray-800">Belanja</h2>
            <span className="text-base font-bold text-gray-800">
              {formatRupiah(data.belanja.total)}
            </span>
          </div>
          <div className="space-y-2">
            {data.belanja.rincian.map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-500 uppercase text-xs">
                  {item.label} :
                </span>
                <span className="text-gray-700 font-medium whitespace-nowrap ml-4">
                  {formatRupiah(item.nilai)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pembiayaan Card */}
        <div className="bg-white/95 rounded-xl shadow-sm p-5 mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-800">Pembiayaan</h2>
            <span className="text-base font-bold text-gray-800">
              {formatRupiah(data.pembiayaan.total)}
            </span>
          </div>
        </div>

        {/* Dokumen Card */}
        <div className="bg-white/95 rounded-xl shadow-sm p-5">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-800 mb-2">
                {data.dokumen.nama}
              </h3>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                <IconDesc />
                <span>{data.dokumen.deskripsi}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <IconCalendar />
                <span>{data.dokumen.tanggal}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg px-3 py-1.5 transition-colors whitespace-nowrap">
                <IconView />
                Lihat Berkas
              </button>
              <button className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors whitespace-nowrap">
                <IconDownload />
                Unduh
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
