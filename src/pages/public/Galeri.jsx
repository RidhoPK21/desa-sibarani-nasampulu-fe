import React, { useState, useEffect } from "react";
import { infoApi } from "../../services/api";

export default function Galeri() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            gambar_url: item.gambar_url?.replace(
              "localhost:9000",
              "localhost:8001",
            ),
            tanggal: item.created_at,
            kategori: "Berita",
          }));
        const kegiatanItems = (kegiatanRes.data?.data || [])
          .filter((item) => item.gambar_url)
          .map((item) => ({
            id: item.id,
            judul: item.judul,
            gambar_url: item.gambar_url?.replace(
              "localhost:9000",
              "localhost:8001",
            ),
            tanggal: item.created_at,
            kategori: "Kegiatan",
          }));
        const all = [...beritaItems, ...kegiatanItems].sort(
          (a, b) => new Date(b.tanggal) - new Date(a.tanggal),
        );
        setItems(all);
        setFiltered(all);
      } catch (err) {
        setError("Gagal memuat data galeri.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (kategori) => {
    setActiveFilter(kategori);
    setFiltered(
      kategori === "Semua"
        ? items
        : items.filter((i) => i.kategori === kategori),
    );
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

  return (
    <div className="min-h-screen bg-gray-50">
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
        <div className="flex gap-2 mb-8">
          {["Semua", "Berita", "Kegiatan"].map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === f
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-green-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-500">Memuat galeri...</span>
          </div>
        )}

        {error && <div className="text-center py-24 text-red-500">{error}</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">Belum ada foto.</div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-12">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightbox(item)}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-all"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.gambar_url}
                    alt={item.judul}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/400x400?text=Foto+tidak+tersedia";
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
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
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={lightbox.gambar_url}
                alt={lightbox.judul}
                className="w-full max-h-[60vh] object-contain bg-gray-100"
              />
              <button
                onClick={() => handleLightboxNav(-1)}
                disabled={filtered.findIndex((i) => i.id === lightbox.id) === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full shadow disabled:opacity-30"
              >
                &#8249;
              </button>
              <button
                onClick={() => handleLightboxNav(1)}
                disabled={
                  filtered.findIndex((i) => i.id === lightbox.id) ===
                  filtered.length - 1
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full shadow disabled:opacity-30"
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
              <button
                onClick={() => setLightbox(null)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
