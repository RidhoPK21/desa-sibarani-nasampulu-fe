import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen font-sans" style={{ backgroundColor: '#4EA674' }}>
      <Navbar />
      {/* Konten halaman akan dirender di dalam Outlet ini */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
    </div>
  );
}