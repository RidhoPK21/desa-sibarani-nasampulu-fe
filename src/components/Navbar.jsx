import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoToba from '../assets/logo-toba.jpg';

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // State untuk buka/tutup menu mobile

  // Gaya untuk menu Desktop
  const activeStyle = { color: '#ffffff', borderBottom: '2px solid #ffffff', paddingBottom: '4px' };
  const inactiveStyle = { color: '#e8f5e9', fontWeight: '500' };
  const getStyle = (path) => (location.pathname === path ? activeStyle : inactiveStyle);

  // Gaya untuk menu Mobile (menggunakan latar belakang agar lebih rapi di HP)
  const activeMobileStyle = { color: '#ffffff', fontWeight: 'bold', backgroundColor: '#3b865d' };
  const inactiveMobileStyle = { color: '#e8f5e9', fontWeight: '500' };
  const getMobileStyle = (path) => (location.pathname === path ? activeMobileStyle : inactiveMobileStyle);

  // Fungsi untuk menutup menu mobile saat link diklik
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="shadow-md sticky top-0 z-50" style={{ background: '#4EA674' }}>
      <div className="px-6 py-4 max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo & Nama Desa */}
        <Link to="/" className="flex items-center gap-3 shrink-0" onClick={closeMenu}>
          <img src={logoToba} alt="Logo" className="w-10 h-10 object-contain" onError={(e) => e.target.style.display = 'none'} />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white leading-tight">Desa Sibarani Nasampulu</span>
            <span className="text-xs font-medium" style={{ color: '#e8f5e9' }}>Kab. Toba Samosir</span>
          </div>
        </Link>
        
        {/* Menu Navigasi Desktop */}
        <ul className="hidden lg:flex space-x-5 text-sm items-center">
          <li><Link to="/" style={getStyle("/")} className="whitespace-nowrap transition-colors hover:text-white">Beranda</Link></li>
          <li><Link to="/profil" style={getStyle("/profil")} className="whitespace-nowrap transition-colors hover:text-white">Profil</Link></li>
          <li><Link to="/infografis" style={getStyle("/infografis")} className="whitespace-nowrap transition-colors hover:text-white">Infografis</Link></li>
          <li><Link to="/kegiatan" style={getStyle("/kegiatan")} className="whitespace-nowrap transition-colors hover:text-white">Kegiatan</Link></li>
          <li><Link to="/idm" style={getStyle("/idm")} className="whitespace-nowrap transition-colors hover:text-white">Idm</Link></li>
          <li><Link to="/dokumentasi" style={getStyle("/dokumentasi")} className="whitespace-nowrap transition-colors hover:text-white">Dokumentasi</Link></li>
          <li><Link to="/berita" style={getStyle("/berita")} className="whitespace-nowrap transition-colors hover:text-white">Berita</Link></li>
          <li><Link to="/apb-desa" style={getStyle("/apb-desa")} className="whitespace-nowrap transition-colors hover:text-white">APB Desa</Link></li>
          <li><Link to="/galeri" style={getStyle("/galeri")} className="whitespace-nowrap transition-colors hover:text-white">Galeri</Link></li>
          <li><Link to="/login" className="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap">Login</Link></li>
        </ul>

        {/* Tombol Hamburger untuk Mobile */}
        <div className="lg:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded p-1"
            aria-label="Toggle Menu"
          >
            {/* Menggunakan SVG langsung agar tidak perlu install icon library */}
            {isOpen ? (
              // Ikon Silang (Close)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Ikon Garis Tiga (Hamburger)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Dropdown Menu Mobile */}
      {isOpen && (
        <div className="lg:hidden bg-[#4EA674] px-4 pt-2 pb-4 space-y-1 border-t border-[#3b865d]">
          <Link to="/" style={getMobileStyle("/")} onClick={closeMenu} className="block px-3 py-2 rounded-md text-base">Beranda</Link>
          <Link to="/profil" style={getMobileStyle("/profil")} onClick={closeMenu} className="block px-3 py-2 rounded-md text-base">Profil</Link>
          <Link to="/infografis" style={getMobileStyle("/infografis")} onClick={closeMenu} className="block px-3 py-2 rounded-md text-base">Infografis</Link>
          <Link to="/kegiatan" style={getMobileStyle("/kegiatan")} onClick={closeMenu} className="block px-3 py-2 rounded-md text-base">Kegiatan</Link>
          <Link to="/idm" style={getMobileStyle("/idm")} onClick={closeMenu} className="block px-3 py-2 rounded-md text-base">Idm</Link>
          <Link to="/dokumentasi" style={getMobileStyle("/dokumentasi")} onClick={closeMenu} className="block px-3 py-2 rounded-md text-base">Dokumentasi</Link>
          <Link to="/berita" style={getMobileStyle("/berita")} onClick={closeMenu} className="block px-3 py-2 rounded-md text-base">Berita</Link>
          <Link to="/apb-desa" style={getMobileStyle("/apb-desa")} onClick={closeMenu} className="block px-3 py-2 rounded-md text-base">APB Desa</Link>
          <Link to="/galeri" style={getMobileStyle("/galeri")} onClick={closeMenu} className="block px-3 py-2 rounded-md text-base">Galeri</Link>
          <Link to="/login" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base bg-gray-900 hover:bg-gray-800 text-white font-bold mt-2 shadow-md transition-colors">Login</Link>
        </div>
      )}
    </nav>
  );
}