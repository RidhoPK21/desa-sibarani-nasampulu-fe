import React from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Calendar,
  Newspaper,
  Wallet,
  FileText,
  Settings,
  MessageSquare,
  Search,
  Bell,
  LogOut,
  MoreVertical,
  Filter,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="font-sans text-slate-700">
      <main className="flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-bold text-teal-900">Dashboard</h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search data, users, or reports"
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-80 focus:outline-none"
              />
            </div>
            <div className="relative">
              <Bell size={20} className="text-gray-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <img
              src="/api/placeholder/32/32"
              alt="User"
              className="w-8 h-8 rounded-full border border-gray-200"
            />
          </div>
        </header>

        {/* Content Area */}
        <div className="space-y-6">
          {/* Top Cards */}
          <div className="grid grid-cols-3 gap-6">
            <StatCard
              title="Total Penduduk"
              value="1.872 Jiwa"
              subtitle="Last 12 Month"
            />
            <StatCard
              title="Realisasi APBDes 2025"
              value="78%"
              subtitle="Last 12 Month"
              trend="+ Rp 2,3 Miliar"
              trendColor="text-green-500"
            />
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-600">Rumah Huni</h3>
                <MoreVertical size={18} className="text-gray-400" />
              </div>
              <p className="text-[10px] text-gray-400 -mt-3 mb-4">
                Last 12 Month
              </p>
              <div className="flex gap-12">
                <div>
                  <p className="text-[10px] font-bold text-gray-700">Layak:</p>
                  <p className="text-2xl font-bold text-teal-700">310</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-700">
                    Tidak Layak:
                  </p>
                  <p className="text-2xl font-bold text-red-500">40</p>
                </div>
              </div>
              <button className="absolute bottom-5 right-5 text-[10px] border border-blue-400 text-blue-500 px-4 py-1 rounded-full hover:bg-blue-50">
                Details
              </button>
            </div>
          </div>

          {/* Chart Section Placeholder */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Grafik Distribusi Usia Penduduk</h3>
              <div className="flex bg-gray-100 p-1 rounded-lg text-[10px]">
                <button className="bg-white px-4 py-1 rounded shadow-sm font-semibold">
                  This week
                </button>
                <button className="px-4 py-1 text-gray-500">Last week</button>
              </div>
            </div>

            <div className="flex gap-8 mb-8 border-b border-gray-100 pb-2">
              <span className="font-bold border-b-2 border-teal-500 pb-2 text-sm">
                0-5 Tahun
              </span>
              <span className="text-gray-400 font-bold text-sm">
                6-12 Tahun
              </span>
              <span className="text-gray-400 font-bold text-sm">
                13-16 Tahun
              </span>
              <span className="text-gray-400 font-bold text-sm">17+ Tahun</span>
            </div>

            {/* Mock Chart Visualization */}
            <div className="h-48 w-full bg-gradient-to-t from-teal-50 to-transparent relative rounded-b-lg border-b border-l border-gray-200">
              <div className="absolute inset-0 flex items-end px-4">
                <svg
                  className="w-full h-32"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 15 Q 15 15, 25 10 T 50 12 T 75 8 T 100 10"
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="1"
                  />
                </svg>
              </div>
              {/* Tooltip marker */}
              <div className="absolute left-[45%] top-1/2 -translate-y-full flex flex-col items-center">
                <div className="bg-green-100 text-[10px] px-2 py-1 rounded border border-green-200 font-bold">
                  April
                  <br />
                  241
                </div>
                <div className="w-0.5 h-12 bg-green-200 border-dotted border-l"></div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Tabel Aktivitas Terbaru</h3>
              <button className="flex items-center gap-2 bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs">
                <Filter size={14} /> Filter
              </button>
            </div>
            <table className="w-full text-left text-xs">
              <thead className="text-gray-400 border-b border-gray-100">
                <tr>
                  <th className="py-3 font-medium">No</th>
                  <th className="py-3 font-medium">Nomor Surat</th>
                  <th className="py-3 font-medium">Nama</th>
                  <th className="py-3 font-medium">Jenis Surat</th>
                  <th className="py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <TableRow
                  no="1."
                  id="48/2004/SK/I/2026"
                  name="Aida Maria Siregar"
                  type="Surat Keterangan"
                  status="Selesai"
                />
                <TableRow
                  no="2."
                  id="49/2004/SK/I/2026"
                  name="Adrian Siregar"
                  type="Surat Domisili"
                  status="Diproses"
                  statusColor="text-orange-500"
                />
                <TableRow
                  no="3."
                  id="50/2004/SP/I/2026"
                  name="Maria Panjaitan"
                  type="Surat Usaha"
                  status="Selesai"
                />
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button className="text-[10px] border border-blue-400 text-blue-500 px-4 py-1 rounded-full">
                Details
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function NavItem({ icon, label, active = false }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? "bg-emerald-500 text-white shadow-md shadow-emerald-200" : "text-gray-500 hover:bg-gray-50"}`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function StatCard({ title, value, subtitle, trend, trendColor }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-600">{title}</h3>
        <MoreVertical size={18} className="text-gray-400" />
      </div>
      <p className="text-[10px] text-gray-400 -mt-3 mb-2">{subtitle}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        {trend && (
          <span className={`text-[10px] font-bold ${trendColor}`}>{trend}</span>
        )}
      </div>
      <button className="absolute bottom-5 right-5 text-[10px] border border-blue-400 text-blue-500 px-4 py-1 rounded-full hover:bg-blue-50">
        Details
      </button>
    </div>
  );
}

function TableRow({
  no,
  id,
  name,
  type,
  status,
  statusColor = "text-slate-800",
}) {
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
      <td className="py-4 font-bold">{no}</td>
      <td className="py-4 text-gray-500">{id}</td>
      <td className="py-4 font-bold">{name}</td>
      <td className="py-4 font-bold">{type}</td>
      <td className={`py-4 font-bold ${statusColor}`}>{status}</td>
    </tr>
  );
}
