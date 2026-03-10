import React from "react";
import { Search, Bell, Plus } from "lucide-react";

export default function Infografis() {
  const data = [
    {
      dusun: "Sibarani Toruan",
      u05: 41,
      u612: 61,
      u1316: 63,
      u17plus: 375,
      total: 540,
    },
    {
      dusun: "Sibarani Dolok",
      u05: 24,
      u612: 103,
      u1316: 60,
      u17plus: 331,
      total: 518,
    },
    {
      dusun: "Sibarani Namungkup",
      u05: 26,
      u612: 26,
      u1316: 29,
      u17plus: 151,
      total: 232,
    },
    {
      dusun: "Perumahan Korpri",
      u05: 44,
      u612: 71,
      u1316: 68,
      u17plus: 399,
      total: 582,
    },
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen p-8 font-sans text-slate-800">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-[#064e3b]">
          Infografis Desa Sibarani Nasampulu
        </h1>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 bg-[#52a77b] hover:bg-[#438a65] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            <Plus size={18} />
            Import Data Statistik
          </button>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Donut Chart Card */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 h-80">
          <h2 className="text-sm font-semibold mb-1">
            Distribusi Penduduk Berdasarkan Usia
          </h2>
          <div className="mb-6">
            <span className="text-4xl font-bold text-[#1e40af]">1.872</span>
            <span className="text-slate-500 ml-2">Jiwa</span>
            <p className="text-xs text-slate-400 font-medium">Total Penduduk</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Simplified SVG Ring representation */}
              <svg
                viewBox="0 0 36 36"
                className="w-full h-full transform -rotate-90"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="transparent"
                  stroke="#7c89f8"
                  strokeWidth="4"
                  strokeDasharray="50 100"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="transparent"
                  stroke="#f472b6"
                  strokeWidth="4"
                  strokeDasharray="15 100"
                  strokeDashoffset="-50"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="transparent"
                  stroke="#a78bfa"
                  strokeWidth="4"
                  strokeDasharray="35 100"
                  strokeDashoffset="-65"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7c89f8]"></div>{" "}
                0-5 Tahun{" "}
                <span className="text-slate-400 font-normal">50%</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f472b6]"></div>{" "}
                6-12 Tahun{" "}
                <span className="text-slate-400 font-normal">15%</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <div className="w-2.5 h-2.5 rounded-full bg-[#a78bfa]"></div>{" "}
                13-16 Tahun{" "}
                <span className="text-slate-400 font-normal">35%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bar Chart Card */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
          <h2 className="text-sm font-semibold mb-8">
            Jumlah penduduk per dusun
          </h2>
          <div className="relative h-48 flex items-end justify-between px-4 border-b border-dashed border-slate-200">
            {/* Simple Bar Chart Mockup */}
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <span className="text-[10px] text-slate-500 mb-1">
                  {item.total}
                </span>
                <div
                  className="bg-[#52a77b] w-8 rounded-t-sm transition-all hover:opacity-80"
                  style={{ height: `${(item.total / 600) * 100}%` }}
                ></div>
                <span className="text-[9px] text-slate-400 mt-2 absolute -bottom-8 text-center">
                  {item.dusun}
                </span>
              </div>
            ))}
            {/* Grid Lines */}
            <div className="absolute left-0 right-0 top-0 border-t border-dashed border-slate-100"></div>
            <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-slate-100"></div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-100">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#ecfdf5] text-[#065f46] font-medium">
            <tr>
              <th className="px-6 py-4">Dusun</th>
              <th className="px-6 py-4 text-center font-bold">0-5</th>
              <th className="px-6 py-4 text-center font-bold">6-12</th>
              <th className="px-6 py-4 text-center font-bold">13-16</th>
              <th className="px-6 py-4 text-center font-bold">17+</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-600">
                  {row.dusun}
                </td>
                <td className="px-6 py-4 text-center text-slate-600">
                  {row.u05}
                </td>
                <td className="px-6 py-4 text-center text-slate-600">
                  {row.u612}
                </td>
                <td className="px-6 py-4 text-center text-slate-600">
                  {row.u1316}
                </td>
                <td className="px-6 py-4 text-center text-slate-600">
                  {row.u17plus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
