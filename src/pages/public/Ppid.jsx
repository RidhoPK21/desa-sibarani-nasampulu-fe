import { useState } from "react";

// --- DATA DUMMY ---
const dokumenData = {
  berkala: [
    {
      id: 1,
      nama: "Laporan Keuangan Desa 2024",
      deskripsi:
        "Ringkasan laporan keuangan tahunan Desa Sibarani Nasampulu tahun anggaran 2024",
      tanggal: "15 Januari 2025",
    },
    {
      id: 2,
      nama: "Rencana Kerja Pemerintah Desa",
      deskripsi:
        "Dokumen RKPD yang memuat rencana pembangunan dan kegiatan desa tahun berjalan",
      tanggal: "20 Februari 2025",
    },
    {
      id: 3,
      nama: "Profil Desa Sibarani Nasampulu",
      deskripsi:
        "Data profil lengkap desa meliputi kependudukan, geografis, dan potensi desa",
      tanggal: "01 Maret 2025",
    },
    {
      id: 4,
      nama: "Laporan Realisasi APBDes",
      deskripsi:
        "Realisasi anggaran pendapatan dan belanja desa semester pertama tahun 2024",
      tanggal: "10 Maret 2025",
    },
  ],
  sertaMerta: [
    {
      id: 1,
      nama: "Pengumuman Musyawarah Desa",
      deskripsi:
        "Informasi jadwal dan agenda musyawarah desa dalam rangka perencanaan pembangunan",
      tanggal: "05 April 2025",
    },
    {
      id: 2,
      nama: "Hasil Keputusan BPD",
      deskripsi:
        "Dokumen hasil keputusan Badan Permusyawaratan Desa mengenai peraturan desa baru",
      tanggal: "12 April 2025",
    },
    {
      id: 3,
      nama: "Pengumuman Penerimaan Bantuan",
      deskripsi:
        "Informasi mengenai daftar penerima bantuan sosial tahap kedua tahun 2025",
      tanggal: "18 April 2025",
    },
    {
      id: 4,
      nama: "Informasi Bencana dan Mitigasi",
      deskripsi:
        "Panduan dan informasi terkait mitigasi bencana bagi warga desa",
      tanggal: "22 April 2025",
    },
  ],
  setiapSaat: [
    {
      id: 1,
      nama: "Daftar Aset Desa",
      deskripsi:
        "Inventarisasi seluruh aset milik Desa Sibarani Nasampulu beserta nilainya",
      tanggal: "01 Januari 2025",
    },
    {
      id: 2,
      nama: "Peraturan Desa (Perdes)",
      deskripsi:
        "Kumpulan peraturan desa yang berlaku dan mengikat seluruh warga desa",
      tanggal: "01 Januari 2025",
    },
    {
      id: 3,
      nama: "Struktur Organisasi Pemerintah Desa",
      deskripsi: "Bagan dan uraian tugas struktur organisasi pemerintahan desa",
      tanggal: "01 Januari 2025",
    },
    {
      id: 4,
      nama: "Standar Pelayanan Desa",
      deskripsi:
        "Standar operasional prosedur pelayanan administrasi kepada warga",
      tanggal: "01 Januari 2025",
    },
  ],
  dokumentasiPublik: [
    {
      id: 1,
      nama: "Foto Kegiatan Gotong Royong",
      deskripsi:
        "Dokumentasi kegiatan gotong royong pembersihan lingkungan desa bulan Maret 2025",
      tanggal: "25 Maret 2025",
    },
    {
      id: 2,
      nama: "Video Musrenbang Desa 2025",
      deskripsi:
        "Rekaman video pelaksanaan musyawarah rencana pembangunan desa tahun 2025",
      tanggal: "10 Februari 2025",
    },
    {
      id: 3,
      nama: "Foto Peresmian Jalan Desa",
      deskripsi:
        "Dokumentasi peresmian jalan desa yang baru diperbaiki dengan dana desa 2024",
      tanggal: "15 Desember 2024",
    },
    {
      id: 4,
      nama: "Laporan Foto Kegiatan PKK",
      deskripsi:
        "Dokumentasi berbagai kegiatan PKK dalam rangka pemberdayaan perempuan desa",
      tanggal: "20 Januari 2025",
    },
  ],
};

const ITEMS_PER_PAGE = 4;

// --- ICONS ---
const IconFile = () => (
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
      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);
const IconCalendar = () => (
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
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const IconDesc = () => (
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
      d="M4 6h16M4 10h16M4 14h10"
    />
  </svg>
);
const IconView = () => (
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
    className="w-4 h-4"
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
const IconInfo = () => (
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
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const IconFolder = () => (
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
      d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
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
const IconPhoto = () => (
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
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

// --- TAB CONFIG ---
const tabs = [
  {
    key: "berkala",
    label: "Informasi Berkala",
    icon: <IconInfo />,
    dataKey: "berkala",
  },
  {
    key: "sertaMerta",
    label: "Informasi Serta Merta",
    icon: <IconFolder />,
    dataKey: "sertaMerta",
  },
  {
    key: "setiapSaat",
    label: "Informasi Setiap Saat",
    icon: <IconClock />,
    dataKey: "setiapSaat",
  },
  {
    key: "dokumentasiPublik",
    label: "Dokumentasi Publik",
    icon: <IconPhoto />,
    dataKey: "dokumentasiPublik",
  },
];

// --- DOCUMENT CARD ---
function DokumenCard({ doc }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-green-100 p-5 flex justify-between items-start gap-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-semibold text-gray-800 mb-2 leading-snug">
          {doc.nama}
        </h3>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
          <IconDesc />
          <span className="truncate">{doc.deskripsi}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-xs mt-1">
          <IconCalendar />
          <span>{doc.tanggal}</span>
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
  );
}

// --- PAGINATION ---
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  const showEllipsis = totalPages > 6;

  if (!showEllipsis) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3, 4);
    if (currentPage > 4 && currentPage < totalPages - 1) {
      pages.push("...", currentPage);
    } else {
      pages.push("...");
    }
    pages.push(totalPages);
  }

  const btnBase =
    "w-8 h-8 rounded-lg text-sm font-medium flex items-center justify-center transition-colors";
  const activeBtn = `${btnBase} bg-white text-green-700 shadow-sm border border-green-200 font-bold`;
  const inactiveBtn = `${btnBase} text-white hover:bg-white/20`;
  const navBtn = `flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-white/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed`;

  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={navBtn}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Previous
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`e${i}`} className="text-white/70 px-1">
            ···
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={p === currentPage ? activeBtn : inactiveBtn}
          >
            {p}
          </button>
        ),
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={navBtn}
      >
        Next
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function Ppid() {
  const [activeTab, setActiveTab] = useState("berkala");
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = dokumenData[activeTab] || [];
  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);
  const paginatedData = currentData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  return (
    <div style={{ backgroundColor: "#4EA674" }}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className="text-5xl font-black text-white italic tracking-tight drop-shadow-md mb-4"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            PPID
          </h1>
          <p className="text-white/90 text-sm max-w-xl mx-auto leading-relaxed">
            Pejabat Pengelola Informasi dan Dokumentasi (PPID) adalah pejabat
            yang bertanggung jawab di bidang penyimpanan, pendokumentasian,
            penyediaan, dan/atau pelayanan informasi di badan publik.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-0 mb-6 border-b border-white/30">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                  isActive
                    ? "text-white border-white"
                    : "text-white/70 border-transparent hover:text-white hover:border-white/40"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Document List */}
        <div className="flex flex-col gap-3 mb-6">
          {paginatedData.length > 0 ? (
            paginatedData.map((doc) => <DokumenCard key={doc.id} doc={doc} />)
          ) : (
            <div className="text-center text-white/70 py-12">
              <IconFile />
              <p className="mt-2 text-sm">Belum ada dokumen tersedia.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}