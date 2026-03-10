export default function Pemerintahan() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-sky-800 border-b-2 border-sky-800 pb-2 mb-6">Pemerintahan Desa</h1>
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <p className="text-gray-700 leading-relaxed mb-4">
          Halaman ini akan menampilkan struktur organisasi pemerintahan desa, perangkat desa, BPD, dan lembaga desa lainnya.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Contoh Card Perangkat Desa Placeholder */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-slate-200 rounded-lg p-6 text-center">
              <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4"></div>
              <h3 className="font-bold text-gray-800">Nama Aparatur</h3>
              <p className="text-sky-600 text-sm">Jabatan</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}