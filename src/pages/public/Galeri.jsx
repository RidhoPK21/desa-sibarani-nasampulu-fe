import React from "react";

export default function Galeri() {
  const galleryItems = [
    { id: 1, title: "Foto Kegiatan 1" },
    { id: 2, title: "Foto Kegiatan 2" },
    { id: 3, title: "Foto Kegiatan 3" },
    { id: 4, title: "Foto Kegiatan 4" },
    { id: 5, title: "Foto Kegiatan 5" },
    { id: 6, title: "Foto Kegiatan 6" },
    { id: 7, title: "Foto Kegiatan 7" },
    { id: 8, title: "Foto Kegiatan 8" },
  ];

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Galeri Desa</h1>
        <p className="text-gray-600 text-lg">
          Kumpulan dokumentasi kegiatan dan momen penting di Desa Sibarani
          Nasampulu
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <div className="w-full h-48 bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center relative">
                <svg
                  className="w-16 h-16 text-green-600 opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Tentang Galeri Ini
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Galeri ini menampilkan berbagai dokumentasi kegiatan dan momen penting
          yang terjadi di Desa Sibarani Nasampulu. Setiap foto merepresentasikan
          cerita dan dedikasi masyarakat desa dalam membangun komunitas yang
          lebih baik. Foto-foto ini akan terus diperbarui seiring dengan adanya
          kegiatan dan acara baru di desa kami.
        </p>
      </div>
    </div>
  );
}
