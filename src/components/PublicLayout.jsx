import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import PublicFooter from "./PublicFooter";

export default function PublicLayout() {
  const location = useLocation();

  // Scroll ke atas setiap kali halaman berganti
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen font-sans" style={{ backgroundColor: '#4EA674' }}>
      <Navbar />
      {/* Konten halaman akan dirender di dalam Outlet ini */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
