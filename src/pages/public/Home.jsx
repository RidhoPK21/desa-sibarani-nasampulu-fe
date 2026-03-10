import React from 'react';
import { Link } from 'react-router-dom';
import monument from '../../assets/monument.png';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans" style={{ backgroundColor: '#4EA674' }}>
      
      {/* --- 1. HERO SECTION (Gambar Latar Penuh) --- */}
      {/* h-screen membuat tingginya pas 1 layar penuh karena navbar sudah diberi padding-top di PublicLayout.
        Ini memastikan konten tidak tertutup oleh navbar yang sticky.
      */}
      <section className="relative w-full h-screen overflow-hidden bg-gray-900 flex items-center justify-center">
        <img 
          src={monument} 
          alt="Monument Desa" 
          /* absolute inset-0 dan object-cover membuat gambar menutupi wadah dengan sempurna */
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        {/* Lapisan Overlay (Efek Gelap Transparan agar teks terbaca) */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
          <div className="px-4 max-w-4xl flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg tracking-wide">
              Selamat Datang
            </h1>
          </div>
        </div>
      </section>

      {/* --- 2. SAMBUTAN KEPALA DESA --- */}
      <section className="py-16 px-4" style={{ background: '#4EA674' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4">Sambutan Kepala Desa Sibarani Nasampulu</h2>
              <p className="text-white text-sm leading-relaxed mb-6">
                Kata Sambutan
              </p>
              <div className="space-y-2 text-sm" style={{ color: '#e0f2fe' }}>
                <p>Isi sambutan kepala desa dapat diubah di sini...</p>
                <p>Selamat datang di website resmi Desa Sibarani Nasampulu.</p>
              </div>
            </div>
            
            {/* Logo/Emblem Placeholder */}
            <div className="flex justify-center">
              <div className="w-56 h-56 bg-white rounded-lg flex items-center justify-center shadow-lg p-4">
                <img 
                  src="/emblem-placeholder.png" 
                  alt="Emblem" 
                  className="w-full h-full object-contain"
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div className="text-center font-bold text-2xl" style="color: #4EA674">EMBLEM</div>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. PROFIL DESA --- */}
      <section className="py-16 px-4" style={{ backgroundColor: '#4EA674' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>Profil Desa</h2>
            <p className="text-sm" style={{ color: '#e8f5f0' }}>
              Desa Sibarani Nasampulu merupakan salah satu desa di Kecamatan Laguboti, Kabupaten Toba Samosir, Provinsi Sumatera Utara.
            </p>
          </div>

          {/* Berita Terkini Heading */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-1" style={{ color: '#ffffff' }}>Berita Terkini</h3>
            <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}></span>
          </div>

          {/* News Cards dengan Emblem Placeholder */}
          <div className="flex gap-6 overflow-x-auto pb-4">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-52">
              <div className="aspect-square flex justify-center items-center bg-gray-100 p-4">
                <img 
                  src="/emblem-news-1.png" 
                  alt="Berita 1" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span className="text-gray-400 font-bold">BERITA 1</span>';
                  }}
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-700 text-sm font-medium">Berita Pertama</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-52">
              <div className="aspect-square flex justify-center items-center bg-gray-100 p-4">
                <img 
                  src="/emblem-news-2.png" 
                  alt="Berita 2" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span className="text-gray-400 font-bold">BERITA 2</span>';
                  }}
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-700 text-sm font-medium">Berita Kedua</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex-shrink-0 w-52">
              <div className="aspect-square flex justify-center items-center bg-gray-100 p-4">
                <img 
                  src="/emblem-news-3.png" 
                  alt="Berita 3" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span className="text-gray-400 font-bold">BERITA 3</span>';
                  }}
                />
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-700 text-sm font-medium">Berita Ketiga</p>
              </div>
            </div>
          </div>

          {/* Baca Selengkapnya Link */}
          <div className="text-center mt-8">
            <Link to="/profil-desa" className="font-semibold text-sm" style={{ color: '#ffffff' }}>
              Baca Selengkapnya
            </Link>
          </div>
        </div>
      </section>

      {/* --- 4. ADMINISTRASI PENDUDUK --- */}
      <section className="py-16 px-4" style={{ background: '#4EA674' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Logo/Emblem */}
            <div className="flex justify-center md:justify-start">
              <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center shadow-lg p-4">
                <img 
                  src="/emblem-admin.png" 
                  alt="Administrasi" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span className="text-gray-400 font-bold text-center">ADMINISTRASI</span>';
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6">Administrasi Penduduk</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold mb-1">XXX</p>
                  <p style={{ color: '#dcfce7' }}>Placeholder untuk deskripsi layanan</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">XXX</p>
                  <p style={{ color: '#dcfce7' }}>Placeholder untuk deskripsi layanan</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- 5. FOOTER --- */}
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
                <li><Link to="/profil" className="hover:text-white transition">Profil Desa</Link></li>
                <li><Link to="/kegiatan" className="hover:text-white transition">Galeri Kegiatan</Link></li>
                <li><Link to="/idm" className="hover:text-white transition">Data IDM</Link></li>
                <li><Link to="/berita" className="hover:text-white transition">Berita Terkini</Link></li>
                <li><Link to="/dokumentasi" className="hover:text-white transition">PPID & Dokumentasi</Link></li>
              </ul>
            </div>

            {/* Kolom 3: Kontak */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-bold mb-4 border-b-2 pb-1 inline-block" style={{ borderColor: '#4EA674' }}>
                Hubungi Kami
              </h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3 justify-center md:justify-start">
                  {/* Icon Lokasi */}
                  <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#4EA674' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  <span>Kecamatan Laguboti, Kabupaten Toba Samosir, Sumatera Utara</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  {/* Icon Email */}
                  <svg className="w-5 h-5 shrink-0" style={{ color: '#4EA674' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  <span>pemdes@sibaraninasampulu.go.id</span>
                </li>
                <li className="flex items-center gap-3 justify-center md:justify-start">
                  {/* Icon Telepon */}
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