import { useState, useEffect } from "react";
import { infoApi } from "../../services/api";

const formatRupiah = (angka) => "Rp " + (angka || 0).toLocaleString("id-ID");

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
  const [apbdesData, setApbdesData] = useState({});
  const [tahunList, setTahunList] = useState([]);
  const [tahun, setTahun] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await infoApi.get("/apbdes");
      if (response.data.status === "success") {
        const raw = response.data.data;
        const processed = {};
        const yearsSeen = new Set();
        const years = [];

        raw.forEach((item) => {
          // Hanya ambil versi terbaru untuk setiap tahun (karena sudah di-sort di backend)
          if (yearsSeen.has(item.tahun)) return;
          yearsSeen.add(item.tahun);
          years.push(item.tahun);

          // Hitung Rincian Belanja per Bidang
          const b1 =
            Number(item.siltap_kepala_desa) +
            Number(item.siltap_perangkat_desa) +
            Number(item.jaminan_sosial_aparatur) +
            Number(item.operasional_pemerintahan_desa) +
            Number(item.tunjangan_bpd) +
            Number(item.operasional_bpd) +
            Number(item.operasional_dana_desa) +
            Number(item.sarana_prasarana_kantor) +
            Number(item.pengisian_mutasi_perangkat);

          const b2 =
            Number(item.penyuluhan_pendidikan) +
            Number(item.sarana_prasarana_pendidikan) +
            Number(item.sarana_prasarana_perpustakaan) +
            Number(item.pengelolaan_perpustakaan) +
            Number(item.penyelenggaraan_posyandu) +
            Number(item.penyuluhan_kesehatan) +
            Number(item.pemeliharaan_jalan_lingkungan) +
            Number(item.pembangunan_jalan_desa) +
            Number(item.pembangunan_jalan_usaha_tani) +
            Number(item.dokumen_tata_ruang) +
            Number(item.talud_irigasi) +
            Number(item.sanitasi_pemukiman) +
            Number(item.fasilitas_pengelolaan_sampah) +
            Number(item.jaringan_internet_desa);

          const b3 = Number(item.pembinaan_pkk);

          const b4 =
            Number(item.pelatihan_pertanian_peternakan) +
            Number(item.pelatihan_aparatur_desa) +
            Number(item.penyusunan_rencana_program) +
            Number(item.insentif_kader_pembangunan) +
            Number(item.insentif_kader_kesehatan_paud);

          const b5 =
            Number(item.penanggulangan_bencana) + Number(item.keadaan_mendesak);

          const pembiayaanNetto =
            Number(item.silpa_tahun_sebelumnya) -
            Number(item.penyertaan_modal_desa);

          processed[item.tahun] = {
            pelaksanaan: {
              pendapatan: Number(item.total_pendapatan),
              belanja: Number(item.total_belanja),
              pembiayaan: pembiayaanNetto,
            },
            pendapatan: {
              total: Number(item.total_pendapatan),
              rincian: [
                {
                  label: "Pendapatan Asli Desa",
                  nilai: Number(item.pendapatan_asli_desa),
                },
                { label: "Dana Desa", nilai: Number(item.dana_desa) },
                {
                  label: "Alokasi Dana Desa",
                  nilai: Number(item.alokasi_dana_desa),
                },
                {
                  label: "Bagi Hasil Pajak dan Retribusi",
                  nilai: Number(item.bagi_hasil_pajak_retribusi),
                },
                {
                  label: "Lain-Lain Pendapatan Desa Yang Sah",
                  nilai: Number(item.lain_lain_pendapatan_sah),
                },
              ],
            },
            belanja: {
              total: Number(item.total_belanja),
              rincian: [
                {
                  label: "Bidang Penyelenggaraan Pemerintahan Desa",
                  nilai: b1,
                },
                { label: "Bidang Pelaksanaan Pembangunan Desa", nilai: b2 },
                { label: "Bidang Pembinaan Kemasyarakatan", nilai: b3 },
                { label: "Bidang Pemberdayaan Masyarakat", nilai: b4 },
                {
                  label:
                    "Bidang Penanggulangan Bencana, Darurat dan Keadaan Mendesak",
                  nilai: b5,
                },
              ],
            },
            pembiayaan: { total: pembiayaanNetto },
            dokumen: {
              nama: `APBDes ${item.tahun} (Versi ${item.versi})`,
              deskripsi: item.alasan_perubahan || "Dokumen APBDes Aktif",
              tanggal: new Date(item.updated_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }),
              file_url: item.file_url,
            },
          };
        });

        setApbdesData(processed);
        setTahunList(years.sort((a, b) => b - a));
        if (years.length > 0) setTahun(years[0]);
      }
    } catch (error) {
      console.error("Error fetching APBDes data:", error);
    } finally {
      setLoading(false);
    }
  };

  const data = apbdesData[tahun];

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#4EA674" }}
      >
        <div className="text-white font-bold animate-pulse">Memuat Data...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#4EA674" }}
      >
        <div className="text-white font-bold">Data APBDes Belum Tersedia.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#4EA674" }}>
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
        <div className="flex gap-0 mb-6 border-b border-white/30 overflow-x-auto no-scrollbar">
          {tahunList.map((y) => {
            const isActive = tahun === y;
            return (
              <button
                key={y}
                onClick={() => setTahun(y)}
                className={`flex items-center gap-1.5 px-6 py-2.5 text-sm font-semibold transition-all duration-200 border-b-2 whitespace-nowrap ${
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
                <span className="text-gray-700 font-medium ml-4">
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
              <a
                href={data.dokumen.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg px-3 py-1.5 transition-colors whitespace-nowrap ${!data.dokumen.file_url ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={(e) => !data.dokumen.file_url && e.preventDefault()}
              >
                <IconView />
                Lihat Berkas
              </a>
              <a
                href={data.dokumen.file_url}
                download
                className={`flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors whitespace-nowrap ${!data.dokumen.file_url ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={(e) => !data.dokumen.file_url && e.preventDefault()}
              >
                <IconDownload />
                Unduh
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 bg-white/10 border-t border-white/20">
        <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col md:flex-row items-start gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
              <span className="text-white text-xs font-bold">TOBA</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                Pemerintah Desa Sibarani Nasampulu
              </p>
              <p className="text-white/70 text-xs mt-1">Jl. Bypass Laguboti</p>
              <p className="text-white/70 text-xs">
                Desa Sibarani Nasampulu, Kecamatan Laguboti, Kabupaten Toba
              </p>
              <p className="text-white/70 text-xs">
                Provinsi Sumatra Utara, 22381
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 max-w-3xl mx-auto flex justify-between items-center">
          <p className="text-white/50 text-xs">
            © 2026 Pemerintah Desa Sibarani Nasampulu.
          </p>
          <div className="flex gap-3">
             <a href="#" className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xs transition-colors">Y</a>
             <a href="#" className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xs transition-colors">T</a>
             <a href="#" className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white text-xs transition-colors">I</a>
          </div>
          <a href="mailto:admin@sibaraninasampulu.desa.id" className="text-white/60 text-xs hover:text-white">
            Hubungi Kami
          </a>
        </div>
      </footer>
    </div>
  );
}
