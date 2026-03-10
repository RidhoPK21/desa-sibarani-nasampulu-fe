import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Data simulasi untuk grafik sesuai gambar
const data = [
  { name: "Jan", value: 25 },
  { name: "Feb", value: 18 },
  { name: "Mar", value: 22 },
  { name: "Apr", value: 38 },
  { name: "Mai", value: 55 },
  { name: "Jun", value: 35 },
];

export default function Idm() {
  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Kelola IDM Desa Sibarani Nasampulu
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Judul, Filter Kategori..."
              className="pl-4 pr-10 py-2 border rounded-full bg-white w-80 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <div className="p-2 bg-white rounded-full shadow-sm">🔔</div>
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img src="https://via.placeholder.com/40" alt="profile" />
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Skor IDM", value: "0.742", sub: "Tahun 2024" },
          { label: "Indeks Ketahanan Sosial", value: "0.78" },
          { label: "Indeks Ketahanan Ekonomi", value: "0.70" },
          { label: "Indeks Ketahanan Lingkungan", value: "0.75" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative"
          >
            <button className="absolute top-4 right-4 text-gray-400">⋮</button>
            <p className="text-sm font-semibold text-gray-600 mb-2">
              {item.label}
            </p>
            <h2 className="text-4xl font-bold text-slate-800">{item.value}</h2>
            {item.sub && (
              <p className="text-xs text-gray-400 mt-2">{item.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* Main Content: Chart & Form */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Chart Section */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-700 uppercase text-sm tracking-wider">
              Grafik Perkembangan IDM
            </h3>
            <select className="text-sm border-none bg-transparent font-medium text-gray-500">
              <option>This Week</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={true}
                  horizontal={true}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  domain={[-60, 60]}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#818cf8"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#818cf8" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center mt-4 text-xs text-gray-500">
            <span className="w-3 h-3 bg-indigo-400 rounded-full mr-2"></span>{" "}
            Content
          </div>
        </div>

        {/* Detail Form Section */}
        <div className="w-full lg:w-80 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-6">Detail IDM</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Tahun"
              className="w-full p-3 border rounded-lg bg-gray-50 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Skor IDM"
              className="w-full p-3 border rounded-lg bg-gray-50 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Indeks Ketahanan Sosial"
              className="w-full p-3 border rounded-lg bg-gray-50 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Indeks Ketahanan Ekonomi"
              className="w-full p-3 border rounded-lg bg-gray-50 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Indeks Ketahanan Lingkungan"
              className="w-full p-3 border rounded-lg bg-gray-50 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
            />
            <select className="w-full p-3 border rounded-lg bg-gray-50 text-sm text-gray-500 focus:ring-1 focus:ring-blue-400 outline-none">
              <option>Status</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
