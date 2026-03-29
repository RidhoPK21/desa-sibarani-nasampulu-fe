import React from 'react';
import { Link } from 'react-router-dom';

export default function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
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
  );
}
