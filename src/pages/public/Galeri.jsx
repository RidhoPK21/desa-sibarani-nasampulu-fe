import React, { useState, useEffect } from "react";
import { infoApi } from "../../services/api";

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
    const fetchData = async () => {
      try {
        setLoading(true);
        const [beritaRes, kegiatanRes] = await Promise.all([
          infoApi.get("/berita"),
          infoApi.get("/kegiatan"),
        ]);
        const beritaItems = (beritaRes.data?.data || [])
          .filter((item) => item.gambar_url)
          .map((item) => ({
            id: item.id,
            judul: item.judul,
            gambar_url: item.gambar_url,
            tanggal: item.created_at,
            kategori: "Berita",
          }));
        const kegiatanItems = (kegiatanRes.data?.data || [])
          .filter((item) => item.gambar_url)
          .map((item) => ({
            id: item.id,
            judul: item.judul,
            gambar_url: item.gambar_url,
            tanggal: item.created_at,
            kategori: "Kegiatan",
          }));
        const all = [...beritaItems, ...kegiatanItems].sort(
          (a, b) => new Date(b.tanggal) - new Date(a.tanggal),
        );
        setItems(all);
        setFiltered(all);
        setDisplayed(all.slice(0, ITEMS_PER_PAGE));
      } catch (err) {
        setError("Gagal memuat data galeri. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  const formatTanggal = (dateStr) =>
    new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const handleLightboxNav = (direction) => {
    const idx = filtered.findIndex((item) => item.id === lightbox.id);
    const newIdx = idx + direction;
    if (newIdx >= 0 && newIdx < filtered.length) setLightbox(filtered[newIdx]);
  };

  const hasMore = displayed.length < filtered.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-10 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Galeri Desa Sibarani Nasampulu
          </h1>
          <p className="text-gray-500 text-sm">
            Dokumentasi kegiatan dan berita desa
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8">
        {/* Filter */}
        <div className="flex gap-2 mb-8">
          {["Semua", "Berita", "Kegiatan"].map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === f
                  ? "bg-green-600 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-green-400 hover:text-green-600"
              }`}
            >
              {f}
              <span className="ml-1 text-xs opacity-70">
                (
                {f === "Semua"
                  ? items.length
                  : items.filter((i) => i.kategori === f).length}
                )
              </span>
            </button>
          ))}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {error && <div className="text-center py-24 text-red-500">{error}</div>}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            Belum ada foto untuk kategori ini.
          </div>
        )}

        {/* Grid Foto */}
        {!loading && !error && displayed.length > 0 && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayed.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setLightbox(item)}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={item.gambar_url}
                      alt={item.judul}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/400x400?text=Foto+tidak+tersedia";
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <div>
                      <p className="text-white text-xs font-medium line-clamp-2">
                        {item.judul}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          item.kategori === "Berita"
                            ? "bg-blue-500 text-white"
                            : "bg-green-500 text-white"
                        }`}
                      >
                        {item.kategori}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tombol Load More */}
            {hasMore && (
              <div className="flex justify-center mt-8 mb-12">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-white border border-green-600 text-green-600 rounded-full text-sm font-medium hover:bg-green-600 hover:text-white transition-all shadow-sm"
                >
                  Lihat Lebih Banyak ({filtered.length - displayed.length} foto
                  lagi)
                </button>
              </div>
            )}

            {!hasMore && displayed.length > 0 && (
              <p className="text-center text-gray-400 text-sm mt-8 mb-12">
                Semua foto sudah ditampilkan ({filtered.length} foto)
              </p>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={lightbox.gambar_url}
                alt={lightbox.judul}
                className="w-full max-h-[60vh] object-contain bg-gray-100"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/800x600?text=Foto+tidak+tersedia";
                }}
              />
              <button
                onClick={() => handleLightboxNav(-1)}
                disabled={filtered.findIndex((i) => i.id === lightbox.id) === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white disabled:opacity-30 transition text-lg"
              >
                &#8249;
              </button>
              <button
                onClick={() => handleLightboxNav(1)}
                disabled={
                  filtered.findIndex((i) => i.id === lightbox.id) ===
                  filtered.length - 1
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white disabled:opacity-30 transition text-lg"
              >
                &#8250;
              </button>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">
                  {lightbox.judul}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatTanggal(lightbox.tanggal)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    lightbox.kategori === "Berita"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {lightbox.kategori}
                </span>
                <button
                  onClick={() => setLightbox(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
