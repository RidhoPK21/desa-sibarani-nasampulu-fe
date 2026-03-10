export default function ProfilDesa() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-sky-800 border-b-2 border-sky-800 pb-2 mb-6">Profil Desa Sibarani Nasampulu</h1>
      <div className="bg-white p-8 rounded-xl shadow-sm">
        <p className="text-gray-700 leading-relaxed mb-4">
          Halaman ini nantinya akan berisi sejarah desa, visi misi, letak geografis, demografi penduduk, dan potensi desa.
        </p>
        <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center border border-dashed border-slate-300">
          <span className="text-slate-400">Ruang untuk gambar/peta desa</span>
        </div>
      </div>
    </div>
  );
}