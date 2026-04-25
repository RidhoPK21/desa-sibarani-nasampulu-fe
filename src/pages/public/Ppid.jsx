import { useEffect, useMemo, useState } from "react";
import { infoApi } from "../../services/api";
import { Link } from "react-router-dom";


const ITEMS_PER_PAGE = 4;
const normalizeCategory = (value) => value?.trim().toLowerCase() || "";
const EMPTY_TAB = {
  key: "semua-dokumen",
  label: "Semua Dokumen",
  category: null,
};
const buildTabKey = (value) =>
  normalizeCategory(value).replace(/\s+/g, "-") || EMPTY_TAB.key;

const formatTanggal = (value) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value).split(" ")[0];
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const normalizeDokumen = (item) => ({
  id: item.id,
  nama: item.nama_ppid || "Dokumen Tanpa Judul",
  deskripsi: item.deskripsi_ppid || "Tidak ada deskripsi dokumen.",
  tanggal: formatTanggal(
    item.tanggal_upload || item.created_at || item.updated_at,
  ),
  fileUrl: item.file_url || item.file || "",
});

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

function TabIcon({ label }) {
  const category = normalizeCategory(label);

  if (category.includes("berkala")) {
    return (
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
  }

  if (category.includes("serta merta")) {
    return (
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
  }

  if (category.includes("setiap saat")) {
    return (
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
  }

  return <IconFile />;
}

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
        {doc.fileUrl ? (
          <>
            <a
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg px-3 py-1.5 transition-colors whitespace-nowrap"
            >
              <IconView />
              Lihat Berkas
            </a>
            <a
              href={doc.fileUrl}
              download
              className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors whitespace-nowrap"
            >
              <IconDownload />
              Unduh
            </a>
          </>
        ) : (
          <span className="text-xs text-gray-400 font-medium">
            File belum tersedia
          </span>
        )}
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  const showEllipsis = totalPages > 6;

  if (!showEllipsis) {
    for (let i = 1; i <= totalPages; i += 1) pages.push(i);
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
  const navBtn =
    "flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium text-white hover:bg-white/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

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
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="text-white/70 px-1">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? activeBtn : inactiveBtn}
          >
            {page}
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

export default function Ppid() {
  const [activeTab, setActiveTab] = useState(EMPTY_TAB.key);
  const [currentPage, setCurrentPage] = useState(1);
  const [dokumen, setDokumen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchDokumen = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await infoApi.get("/dokumen");
        const data = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        if (isMounted) {
          setDokumen(data);
        }
      } catch (err) {
        console.error("Gagal mengambil data PPID publik:", err);
        if (isMounted) {
          setDokumen([]);
          setError("Dokumen PPID belum dapat dimuat saat ini.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDokumen();

    return () => {
      isMounted = false;
    };
  }, []);

  const tabs = useMemo(() => {
    const mappedTabs = [];
    const seenCategories = new Set();

    dokumen.forEach((item) => {
      const categoryLabel = item?.jenis_ppid?.trim();
      const normalized = normalizeCategory(categoryLabel);

      if (!categoryLabel || seenCategories.has(normalized)) {
        return;
      }

      seenCategories.add(normalized);
      mappedTabs.push({
        key: buildTabKey(categoryLabel),
        label: categoryLabel,
        category: categoryLabel,
      });
    });

    return mappedTabs.length > 0 ? mappedTabs : [EMPTY_TAB];
  }, [dokumen]);

  useEffect(() => {
    if (!tabs.some((tab) => tab.key === activeTab)) {
      setActiveTab(tabs[0]?.key || EMPTY_TAB.key);
      setCurrentPage(1);
    }
  }, [activeTab, tabs]);

  const categorizedDokumen = useMemo(() => {
    const grouped = Object.fromEntries(tabs.map((tab) => [tab.key, []]));

    if (tabs.length === 1 && tabs[0].category === null) {
      grouped[tabs[0].key] = dokumen.map(normalizeDokumen);
      return grouped;
    }

    dokumen.forEach((item) => {
      const matchedTab = tabs.find(
        (tab) =>
          normalizeCategory(tab.category) ===
          normalizeCategory(item.jenis_ppid),
      );

      if (matchedTab) {
        grouped[matchedTab.key].push(normalizeDokumen(item));
      }
    });

    return grouped;
  }, [dokumen, tabs]);

  const currentData = categorizedDokumen[activeTab] || [];
  const totalPages = Math.max(
    1,
    Math.ceil(currentData.length / ITEMS_PER_PAGE),
  );
  const paginatedData = currentData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
  };


  return (
    // 🔥 PERBAIKAN 1: Tambahkan flex flex-col min-h-screen di div paling luar
    <div
      style={{ backgroundColor: "#4EA674" }}
      className="flex flex-col min-h-screen"
    >
      {/* 🔥 PERBAIKAN 2: Bungkus konten utama dengan flex-grow agar footer terdorong ke bawah */}
      <div className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-10">
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
                  <TabIcon label={tab.label} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 mb-6">
            {loading ? (
              <div className="text-center text-white/80 py-12">
                <p className="text-sm">Memuat dokumen PPID...</p>
              </div>
            ) : error ? (
              <div className="text-center text-white/90 py-12">
                <IconFile />
                <p className="mt-2 text-sm">{error}</p>
              </div>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((doc) => <DokumenCard key={doc.id} doc={doc} />)
            ) : (
              <div className="text-center text-white/70 py-12">
                <p className="text-sm">Belum ada dokumen tersedia.</p>
              </div>
            )}
          </div>

          {!loading && !error && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>{" "}
      {/* <-- Penutup div flex-grow */}
      {/* FOOTER TETAP SAMA */}
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