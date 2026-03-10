import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const daftarKegiatan = [
    { id: 1, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
    { id: 2, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
    { id: 3, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
    { id: 4, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
    { id: 5, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
    { id: 6, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
    { id: 7, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
    { id: 8, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
    { id: 9, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
    { id: 10, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' }
  ];

const daftarProgramKerja = [
  { id: 1, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 2, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 3, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 4, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 5, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 6, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 7, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 8, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 9, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 10, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' }
];

const daftarBantuan = [
  { id: 1, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 2, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 3, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 4, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 5, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 6, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 7, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 8, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 9, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' },
  { id: 10, judul: 'Judul Kegiatan', deskripsi: 'Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu' }
];

export default function Kegiatan() {
  const [activeTab, setActiveTab] = useState('kegiatan');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageProgram, setCurrentPageProgram] = useState(1);
  const [currentPageBantuan, setCurrentPageBantuan] = useState(1);
  const itemsPerPage = 3;

  // Hitung pagination untuk Kegiatan Desa
  const totalPages = Math.ceil(daftarKegiatan.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return daftarKegiatan.slice(startIdx, startIdx + itemsPerPage);
  }, [currentPage]);

  // Hitung pagination untuk Program Kerja
  const totalPagesProgram = Math.ceil(daftarProgramKerja.length / itemsPerPage);
  const paginatedProgramData = useMemo(() => {
    const startIdx = (currentPageProgram - 1) * itemsPerPage;
    return daftarProgramKerja.slice(startIdx, startIdx + itemsPerPage);
  }, [currentPageProgram]);

  // Hitung pagination untuk Bantuan Sosial
  const totalPagesBantuan = Math.ceil(daftarBantuan.length / itemsPerPage);
  const paginatedBantuanData = useMemo(() => {
    const startIdx = (currentPageBantuan - 1) * itemsPerPage;
    return daftarBantuan.slice(startIdx, startIdx + itemsPerPage);
  }, [currentPageBantuan]);

  // Generate page numbers untuk display
  const getPageNumbers = (totalPg, currentPg) => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPg - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPg, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPg) {
      if (endPage < totalPg - 1) pages.push('...');
      pages.push(totalPg);
    }

    return pages;
  };

  return (
    <div className="flex flex-col min-h-screen font-sans" style={{ backgroundColor: '#4EA674' }}>
      {/* --- HEADER SECTION --- */}
      <section className="py-12 px-4 bg-gradient-to-b from-blue-100 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#4EA674' }}>
            Kegiatan Desa
          </h1>
          <Link to="#" className="text-sm font-semibold" style={{ color: '#4EA674' }}>
            Daftar Kegiatan Desa
          </Link>
        </div>
      </section>

      {/* --- TAB NAVIGATION --- */}
      <section className="px-4 py-0" style={{ background: '#4EA674' }}>
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2 md:gap-4">
          <button
            onClick={() => setActiveTab('kegiatan')}
            className="px-4 py-3 font-semibold text-white flex items-center gap-2 transition-all border-b-2"
            style={{
              borderBottomColor: activeTab === 'kegiatan' ? '#ffffff' : 'transparent',
              backgroundColor: activeTab === 'kegiatan' ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            <span></span> Daftar Kegiatan Desa
          </button>
          
          <button
            onClick={() => setActiveTab('program')}
            className="px-4 py-3 font-semibold text-white flex items-center gap-2 transition-all border-b-2"
            style={{
              borderBottomColor: activeTab === 'program' ? '#ffffff' : 'transparent',
              backgroundColor: activeTab === 'program' ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            <span></span> Daftar Program Kerja
          </button>
          
          <button
            onClick={() => setActiveTab('bantuan')}
            className="px-4 py-3 font-semibold text-white flex items-center gap-2 transition-all border-b-2"
            style={{
              borderBottomColor: activeTab === 'bantuan' ? '#ffffff' : 'transparent',
              backgroundColor: activeTab === 'bantuan' ? 'rgba(255,255,255,0.1)' : 'transparent'
            }}
          >
            <span></span> Daftar Bantuan Sosial
          </button>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-12 px-4 flex-grow">
        <div className="max-w-5xl mx-auto">
          {/* Daftar Kegiatan Desa Tab */}
          {activeTab === 'kegiatan' && (
            <>
              <div className="space-y-6">
                {paginatedData.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-6">
                    {/* Gambar Placeholder */}
                    <div className="flex-shrink-0">
                      <div 
                        className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center"
                        style={{ minWidth: '128px' }}
                      >
                        <img 
                          src="/kegiatan-image.jpg" 
                          alt={item.judul}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<span className="text-gray-400 text-sm">Gambar</span>';
                          }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold mb-2" style={{ color: '#666' }}>
                        {item.judul}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              </div>
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded text-white font-semibold transition-all"
                    style={{
                      background: currentPage === 1 ? '#ccc' : '#4EA674',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    &larr; Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers(totalPages, currentPage).map((page, idx) => (
                      <button
                        key={idx}
                        onClick={() => typeof page === 'number' && setCurrentPage(page)}
                        disabled={page === '...'}
                        className="px-3 py-2 rounded font-semibold transition-all"
                        style={{
                          background: page === currentPage ? '#4EA674' : page === '...' ? 'transparent' : 'transparent',
                          color: page === currentPage ? 'white' : '#4EA674',
                          border: page === currentPage ? 'none' : `1px solid #4EA674`,
                          cursor: page === '...' ? 'default' : 'pointer',
                          opacity: page === '...' ? 0.5 : 1
                        }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded text-white font-semibold transition-all"
                    style={{
                      background: currentPage === totalPages ? '#ccc' : '#4EA674',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Daftar Program Kerja Tab */}
          {activeTab === 'program' && (
            <>
              <div className="space-y-6">
                {paginatedProgramData.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-6">
                    {/* Gambar Placeholder */}
                    <div className="flex-shrink-0">
                      <div 
                        className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center"
                        style={{ minWidth: '128px' }}
                      >
                        <img 
                          src="/kegiatan-image.jpg" 
                          alt={item.judul}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<span className="text-gray-400 text-sm">Gambar</span>';
                          }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold mb-2" style={{ color: '#666' }}>
                        {item.judul}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                </div>
              ))}  
              </div>
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPageProgram(prev => Math.max(prev - 1, 1))}
                    disabled={currentPageProgram === 1}
                    className="px-4 py-2 rounded text-white font-semibold transition-all"
                    style={{
                      background: currentPageProgram === 1 ? '#ccc' : '#4EA674',
                      cursor: currentPageProgram === 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    &larr; Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers(totalPagesProgram, currentPageProgram).map((page, idx) => (
                      <button
                        key={idx}
                        onClick={() => typeof page === 'number' && setCurrentPageProgram(page)}
                        disabled={page === '...'}
                        className="px-3 py-2 rounded font-semibold transition-all"
                        style={{
                          background: page === currentPageProgram ? '#4EA674' : page === '...' ? 'transparent' : 'transparent',
                          color: page === currentPageProgram ? 'white' : '#4EA674',
                          border: page === currentPageProgram ? 'none' : `1px solid #4EA674`,
                          cursor: page === '...' ? 'default' : 'pointer',
                          opacity: page === '...' ? 0.5 : 1
                        }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPageProgram(prev => Math.min(prev + 1, totalPagesProgram))}
                    disabled={currentPageProgram === totalPagesProgram}
                    className="px-4 py-2 rounded text-white font-semibold transition-all"
                    style={{
                      background: currentPageProgram === totalPagesProgram ? '#ccc' : '#4EA674',
                      cursor: currentPageProgram === totalPagesProgram ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Daftar Bantuan Sosial Tab */}
          {activeTab === 'bantuan' && (
            <>
              <div className="space-y-6">
                {paginatedBantuanData.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex gap-6">
                    {/* Gambar Placeholder */}
                    <div className="flex-shrink-0">
                      <div 
                        className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center"
                        style={{ minWidth: '128px' }}
                      >
                        <img 
                          src="/kegiatan-image.jpg" 
                          alt={item.judul}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.innerHTML = '<span className="text-gray-400 text-sm">Gambar</span>';
                          }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold mb-2" style={{ color: '#666' }}>
                        {item.judul}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {item.deskripsi}
                      </p>
                    </div>
                  </div>
                </div>
              ))}  
              </div>
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPageBantuan(prev => Math.max(prev - 1, 1))}
                    disabled={currentPageBantuan === 1}
                    className="px-4 py-2 rounded text-white font-semibold transition-all"
                    style={{
                      background: currentPageBantuan === 1 ? '#ccc' : '#4EA674',
                      cursor: currentPageBantuan === 1 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    &larr; Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers(totalPagesBantuan, currentPageBantuan).map((page, idx) => (
                      <button
                        key={idx}
                        onClick={() => typeof page === 'number' && setCurrentPageBantuan(page)}
                        disabled={page === '...'}
                        className="px-3 py-2 rounded font-semibold transition-all"
                        style={{
                          background: page === currentPageBantuan ? '#4EA674' : page === '...' ? 'transparent' : 'transparent',
                          color: page === currentPageBantuan ? 'white' : '#4EA674',
                          border: page === currentPageBantuan ? 'none' : `1px solid #4EA674`,
                          cursor: page === '...' ? 'default' : 'pointer',
                          opacity: page === '...' ? 0.5 : 1
                        }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPageBantuan(prev => Math.min(prev + 1, totalPagesBantuan))}
                    disabled={currentPageBantuan === totalPagesBantuan}
                    className="px-4 py-2 rounded text-white font-semibold transition-all"
                    style={{
                      background: currentPageBantuan === totalPagesBantuan ? '#ccc' : '#4EA674',
                      cursor: currentPageBantuan === totalPagesBantuan ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Next &rarr;
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* --- FOOTER SECTION dengan EMBLEM --- */}
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
