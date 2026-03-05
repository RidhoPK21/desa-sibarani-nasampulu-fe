import { useEffect, useState } from "react";
import { infoApi } from "../../services/api";

export default function Home() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fungsi untuk menembak API Laravel Info Service
    const fetchBerita = async () => {
      try {
        // Anggap saja di Laravel Anda punya route GET /api/berita
        const response = await infoApi.get("/berita");
        console.log("Data dari Laravel:", response.data);
        // Kita beritahu React: "Cari properti 'data' di dalam response.data,
        // kalau tidak ada, jadikan array kosong biar tidak error."

        const actualData = response.data.data || response.data;
        setBerita(Array.isArray(actualData) ? actualData : []);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBerita();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-600 text-center mb-6">
        Portal Desa Sibarani
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Memuat data dari Docker...</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Berita Terbaru</h2>
          {berita.length === 0 ? (
            <p className="text-gray-500 italic">
              Belum ada berita di database.
            </p>
          ) : (
            <ul>
              {berita.map((item, index) => (
                <li key={index} className="border-b py-2">
                  {item.judul}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
