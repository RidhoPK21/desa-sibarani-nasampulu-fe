export default function InformasiPublik() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-sky-800 border-b-2 border-sky-800 pb-2 mb-6">Informasi & Layanan Publik</h1>
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <p className="text-gray-700 leading-relaxed mb-6">
          Di sini warga dapat mengakses berbagai informasi, pengumuman, dan panduan layanan administrasi desa.
        </p>
        <ul className="space-y-3">
          <li className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 cursor-pointer">Panduan Pembuatan Surat Pengantar RT/RW</li>
          <li className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 cursor-pointer">Informasi APBDes Tahun Berjalan</li>
          <li className="p-4 bg-slate-50 rounded-lg border border-slate-100 hover:bg-slate-100 cursor-pointer">Jadwal Posyandu & Layanan Kesehatan</li>
        </ul>
      </div>
    </div>
  );
}