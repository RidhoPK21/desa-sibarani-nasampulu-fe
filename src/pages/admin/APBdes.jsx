import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Search, Bell, Plus, Download, MoreVertical } from "lucide-react";

// Data simulasi untuk grafik sesuai gambar
const data = [
  { name: "Sun", value: 22000 },
  { name: "Mon", value: 35000 },
  { name: "Tue", value: 35000 },
  { name: "Wed", value: 25409 }, // Highlighted in image
  { name: "Thu", value: 48000 },
  { name: "Fri", value: 32000 },
  { name: "Sat", value: 45000 },
];

const StatCard = ({ title, amount, subtitle }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm relative">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <MoreVertical className="text-gray-400 w-4 h-4 cursor-pointer" />
    </div>
    <p className="text-2xl font-bold text-slate-800">Rp {amount}</p>
    <p className="text-gray-400 text-xs mt-1">{subtitle}</p>
  </div>
);

export default function APBdes() {
  return (
    <div className="font-sans">
      {/* --- Header Section --- */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-slate-800">APBDes Tahun 2025</h1>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search Judul, Filter Kategori..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm w-80 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="User"
            className="w-10 h-10 rounded-full border border-gray-200"
          />
        </div>
      </header>

      {/* --- Action Buttons --- */}
      <div className="flex justify-end gap-3 mb-6">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition">
          <Plus className="w-4 h-4" /> Data APBDes
        </button>
        <button className="bg-white border border-gray-200 text-slate-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-50 transition">
          Export Data <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      {/* --- Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="Total Pendapatan"
          amount="1.488.196.197"
          subtitle="Last 7 days"
        />
        <StatCard
          title="Pembiayaan"
          amount="221.475.600"
          subtitle="Last 7 days"
        />
        <StatCard
          title="Total Belanja"
          amount="1.266.720.597"
          subtitle="Last 7 days"
        />
        <StatCard
          title="Surplus Anggaran"
          amount="221.475.600"
          subtitle="Last 7 days"
        />
      </div>

      {/* --- Chart Section --- */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="font-bold text-slate-800">
              Persentase Realisasi Anggaran
            </h3>
            <div className="flex gap-8 mt-4 border-b border-gray-100">
              <button className="pb-2 border-b-2 border-emerald-500 text-emerald-600 font-medium text-sm">
                Pendapatan
              </button>
              <button className="pb-2 text-gray-400 text-sm">Belanja</button>
              <button className="pb-2 text-gray-400 text-sm">Pembiayaan</button>
            </div>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button className="px-4 py-1.5 bg-white text-emerald-600 shadow-sm rounded-md text-xs font-bold">
              This week
            </button>
            <button className="px-4 py-1.5 text-gray-500 text-xs font-medium">
              Last week
            </button>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                cursor={{
                  stroke: "#10b981",
                  strokeWidth: 1,
                  strokeDasharray: "5 5",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorValue)"
                activeDot={{
                  r: 6,
                  stroke: "#fff",
                  strokeWidth: 2,
                  fill: "#10b981",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
