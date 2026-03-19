import React from 'react';

export default function Galeri() {
  // Data placeholder untuk galeri
  const galleryItems = [
    { id: 1, title: 'Foto Kegiatan 1' },
    { id: 2, title: 'Foto Kegiatan 2' },
    { id: 3, title: 'Foto Kegiatan 3' },
    { id: 4, title: 'Foto Kegiatan 4' },
    { id: 5, title: 'Foto Kegiatan 5' },
    { id: 6, title: 'Foto Kegiatan 6' },
    { id: 7, title: 'Foto Kegiatan 7' },
    { id: 8, title: 'Foto Kegiatan 8' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Galeri Desa</h1>
        <p className="text-gray-600 text-lg">Kumpulan dokumentasi kegiatan dan momen penting di Desa Sibarani Nasampulu</p>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div 
              key={item.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              {/* Placeholder Image */}
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

              {/* Overlay & Title */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white opac­ity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Text */}
      <div className="max-w-7xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tentang Galeri Ini</h2>
        <p className="text-gray-600 leading-relaxed">
          Galeri ini menampilkan berbagai dokumentasi kegiatan dan momen penting yang terjadi di Desa Sibarani Nasampulu. 
          Setiap foto merepresentasikan cerita dan dedikasi masyarakat desa dalam membangun komunitas yang lebih baik. 
          Foto-foto ini akan terus diperbarui seiring dengan adanya kegiatan dan acara baru di desa kami.
        </p>
      </div>

      {/* FOOTER */}
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
                    e.target.style.display = 'none';
                  }}
                />
                <h3 className="text-2xl font-bold" style={{ color: '#FFFFFF' }}>Desa Sibarani Nasampulu</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Website Resmi Pemerintah Desa Sibarani Nasampulu, Kecamatan Laguboti, Kabupaten Toba Samosir, Provinsi Sumatera Utara.
              </p>
            </div>

            {/* Kolom 2: Tautan Cepat */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold mb-4 border-b-2 pb-1 inline-block" style={{ borderColor: '#4EA674' }}>
                Tautan Cepat
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Profil Desa</a></li>
                <li><a href="#" className="hover:text-white transition">Galeri Kegiatan</a></li>
                <li><a href="#" className="hover:text-white transition">Data IDM</a></li>
                <li><a href="#" className="hover:text-white transition">Berita Terkini</a></li>
                <li><a href="#" className="hover:text-white transition">PPID & Dokumentasi</a></li>
              </ul>
            </div>

            {/* Kolom 3: Kontak */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold mb-4 border-b-2 pb-1 inline-block" style={{ borderColor: '#4EA674' }}>
                Hubungi Kami
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#4EA674' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>Kecamatan Laguboti, Kabupaten Toba Samosir, Sumatera Utara</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <svg className="w-5 h-5 shrink-0" style={{ color: '#4EA674' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span>pemdes@sibaraninasampulu.go.id</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  <svg className="w-5 h-5 shrink-0" style={{ color: '#4EA674' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  <span>(0632) 123456</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright Bottom */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Pemerintah Desa Sibarani Nasampulu. Hak Cipta Dilindungi.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="hover:text-white transition">Facebook</a>
              <a href="#" className="hover:text-white transition">Instagram</a>
              <a href="#" className="hover:text-white transition">YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
