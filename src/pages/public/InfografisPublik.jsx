import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ── CONFIG ────────────────────────────────────────────────────────
const API_URL = `${import.meta.env.VITE_API_URL}/statistic/dusun`;

<<<<<<< HEAD
=======
// ── TEMPLATE DATA AWAL (STATIS) ───────────────────────────────────
>>>>>>> 63eec2d0b7de83c18eaceca603a9a7b5b3055764
const initialStatistikData = [
  {
    id: "usia",
    judul: "Statistik Usia",
    subjudul: "Keterangan jumlah balita, anak - anak, remaja, dewasa dan lansia",
    deskripsi: "Kami berkomitmen untuk memantau pertumbuhan penduduk secara berkala guna merencanakan program pelayanan kesehatan dan sosial yang tepat sasaran bagi seluruh kelompok usia.",
    data: [
      { name: "Balita", value: 0, color: "#6366f1" },
      { name: "Anak-anak", value: 0, color: "#ec4899" },
      { name: "Remaja", value: 0, color: "#a78bfa" },
      { name: "Dewasa", value: 0, color: "#34d399" },
      { name: "Lansia", value: 0, color: "#fbbf24" },
    ],
    total: "0",
    satuan: "Jiwa",
    posisiChart: "kanan",
  },
  {
    id: "pendidikan",
    judul: "Statistik Pendidikan",
    subjudul: "Keterangan jumlah yang bersekolah SD, SMP, SMA, Sarjana, dan non Sarjana",
    deskripsi: "Pendidikan adalah pilar utama pembangunan desa. Kami menyajikan data tingkat pendidikan penduduk sebagai acuan untuk mendukung program peningkatan SDM di Desa Sibarani Nasampulu.",
    data: [
      { name: "SD", value: 0, color: "#6366f1" },
      { name: "SMP", value: 0, color: "#ec4899" },
      { name: "SMA", value: 0, color: "#a78bfa" },
      { name: "Sarjana", value: 0, color: "#34d399" },
      { name: "Lainnya", value: 0, color: "#fbbf24" },
    ],
    total: "0",
    satuan: "Siswa",
    posisiChart: "kiri",
  },
  {
    id: "pekerjaan",
    judul: "Statistik Pekerjaan",
    subjudul: "Keterangan jumlah orang yang bekerja sebagai petani, nelayan, asn, wiraswasta",
    deskripsi: "Gambaran mata pencaharian penduduk mencerminkan potensi ekonomi desa. Data ini membantu pemerintah desa dalam merancang pemberdayaan ekonomi masyarakat.",
    data: [
      { name: "Petani", value: 0, color: "#6366f1" },
      { name: "Nelayan", value: 0, color: "#ec4899" },
      { name: "ASN", value: 0, color: "#a78bfa" },
      { name: "Wiraswasta", value: 0, color: "#34d399" },
      { name: "Lainnya", value: 0, color: "#fbbf24" },
    ],
    total: "0",
    satuan: "Orang",
    posisiChart: "kanan",
  },
  {
    id: "agama",
    judul: "Statistik Agama",
    subjudul: "Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu",
    deskripsi: "Keberagaman agama di desa kami adalah kekuatan sosial yang harmonis. Kami senantiasa menjaga toleransi dan kerukunan antarumat beragama.",
    data: [
      { name: "Kristen", value: 0, color: "#6366f1" },
      { name: "Muslim", value: 0, color: "#ec4899" },
      { name: "Katolik", value: 0, color: "#a78bfa" },
      { name: "Lainnya", value: 0, color: "#34d399" },
    ],
    total: "0",
    satuan: "Jiwa",
    posisiChart: "kiri",
  },
  {
    id: "perkawinan",
    judul: "Statistik Status Perkawinan",
    subjudul: "Keterangan jumlah orang yang kawin dan belum kawin",
    deskripsi: "Data status perkawinan membantu dalam pendataan kependudukan dan perencanaan program kesejahteraan keluarga di tingkat dusun.",
    data: [
      { name: "Sudah Kawin", value: 0, color: "#6366f1" },
      { name: "Belum Kawin", value: 0, color: "#ec4899" },
      { name: "Cerai", value: 0, color: "#a78bfa" },
    ],
    total: "0",
    satuan: "Jiwa",
    posisiChart: "kanan",
  },
  {
    id: "penduduk",
    judul: "Statistik Penduduk",
    subjudul: "Keterangan jumlah penduduk berdasarkan jenis kelamin",
    deskripsi: "Data real-time penduduk laki-laki dan perempuan untuk memastikan keseimbangan demografi dan ketepatan distribusi bantuan sosial.",
    data: [
      { name: "Laki-laki", value: 0, color: "#6366f1" },
      { name: "Perempuan", value: 0, color: "#ec4899" },
    ],
    total: "0",
    satuan: "Jiwa",
    posisiChart: "kiri",
  },
];

<<<<<<< HEAD
// ── DONUT CHART CARD ─────────────────────────────────────────────
const DonutChartCard = ({ item, theme = "dark", dusunList, selectedDusun, setSelectedDusun }) => {
=======
// ── THEME HELPER ─────────────────────────────────────────────────
const getSectionTheme = (index) => {
  if (index === 3) return "white";
  if (index === 4) return "lightgreen";
  if (index === 5) return "midgreen";
  return "dark";
};

// ── DONUT CHART MINI ─────────────────────────────────────────────
const DonutChartCard = ({ item, theme = "dark" }) => {
>>>>>>> 63eec2d0b7de83c18eaceca603a9a7b5b3055764
  const totalValue = item.data.reduce((sum, d) => sum + d.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: "rgba(255,255,255,0.95)", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 12px", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <p style={{ fontWeight: 700, color: "#1e293b" }}>{payload[0].name}</p>
<<<<<<< HEAD
          <p style={{ color: payload[0].payload.color }}>{payload[0].value.toLocaleString("id-ID")} {item.satuan}</p>
          <p style={{ color: "#64748b" }}>{totalValue > 0 ? ((payload[0].value / totalValue) * 100).toFixed(1) : 0}%</p>
=======
          <p style={{ color: payload[0].payload.color }}>
            {payload[0].value.toLocaleString("id-ID")} {item.satuan === "Siswa" ? "Siswa" : item.satuan === "Orang" ? "Orang" : "Jiwa"}
          </p>
          <p style={{ color: "#64748b" }}>
            {totalValue > 0 ? ((payload[0].value / totalValue) * 100).toFixed(1) : 0}%
          </p>
>>>>>>> 63eec2d0b7de83c18eaceca603a9a7b5b3055764
        </div>
      );
    }
    return null;
  };

  const isLight = theme === "white";
<<<<<<< HEAD
  const cardBg = isLight ? "#ffffff" : "rgba(255,255,255,0.12)";
  const labelColor = isLight ? "#64748b" : "rgba(255,255,255,0.7)";
  const totalColor = isLight ? "#4EA674" : "#fff";

  return (
    <div style={{ background: cardBg, backdropFilter: isLight ? "none" : "blur(16px)", borderRadius: 16, padding: "24px 28px", border: isLight ? "1px solid #e2e8f0" : "1px solid rgba(255,255,255,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", minWidth: 280, maxWidth: 340, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: labelColor, letterSpacing: 1 }}>CHART TITLE</span>

        <select
          value={selectedDusun}
          onChange={(e) => setSelectedDusun(e.target.value)}
          style={{
            fontSize: 11,
            background: "transparent",
            border: "none",
            color: labelColor,
            cursor: "pointer",
            outline: "none",
            fontWeight: 600
          }}
        >
          <option value="all" style={{color: "#000"}}>Semua Dusun ▾</option>
          {dusunList.map(d => (
            <option key={d.id} value={d.id} style={{color: "#000"}}>{d.nama_dusun}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 2 }}>
        <span style={{ fontSize: 26, fontWeight: 800, color: totalColor }}>{item.total}</span>
      </div>
      <div style={{ fontSize: 11, color: labelColor, marginBottom: 12 }}>
        {totalValue.toLocaleString("id-ID")} {item.satuan}
=======
  const isLightGreen = theme === "lightgreen";
  const cardBg = isLight ? "#ffffff" : isLightGreen ? "#ffffff" : "rgba(255,255,255,0.12)";
  const cardBorder = isLight ? "1px solid #e2e8f0" : isLightGreen ? "1px solid #d1e8d8" : "1px solid rgba(255,255,255,0.25)";
  const cardShadow = isLight || isLightGreen ? "0 4px 24px rgba(0,0,0,0.08)" : "0 8px 32px rgba(0,0,0,0.12)";
  const labelColor = isLight || isLightGreen ? "#94a3b8" : "rgba(255,255,255,0.7)";
  const totalColor = isLight || isLightGreen ? "#3b82f6" : "#fff";
  const subColor = isLight || isLightGreen ? "#64748b" : "rgba(255,255,255,0.65)";
  const legendColor = isLight || isLightGreen ? "#374151" : "rgba(255,255,255,0.85)";

  return (
    <div style={{
      background: cardBg,
      backdropFilter: isLight || isLightGreen ? "none" : "blur(16px)",
      borderRadius: 16,
      padding: "24px 28px",
      border: cardBorder,
      boxShadow: cardShadow,
      minWidth: 280,
      maxWidth: 340,
      width: "100%",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: labelColor, letterSpacing: 1, textTransform: "uppercase" }}>CHART TITLE</span>
        <span style={{ fontSize: 11, color: labelColor }}>Realtime Data ▾</span>
      </div>
      <div style={{ marginBottom: 2 }}>
        <span style={{ fontSize: 26, fontWeight: 800, color: totalColor }}>{item.total}</span>
      </div>
      <div style={{ fontSize: 11, color: subColor, marginBottom: 12 }}>
        {totalValue.toLocaleString("id-ID")} {item.satuan === "Jiwa" ? "Jiwa" : item.satuan}
>>>>>>> 63eec2d0b7de83c18eaceca603a9a7b5b3055764
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 120, height: 120 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={item.data} cx="50%" cy="50%" innerRadius={35} outerRadius={56} paddingAngle={2} dataKey="value" strokeWidth={0}>
                {item.data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
<<<<<<< HEAD
        <div style={{ flex: 1 }}>
          {item.data.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color }} />
              <span style={{ fontSize: 10, color: isLight ? "#334155" : "rgba(255,255,255,0.8)", fontWeight: 500 }}>{d.name}</span>
=======

        <div style={{ flex: 1 }}>
          {item.data.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: legendColor, fontWeight: 500 }}>{d.name}</span>
>>>>>>> 63eec2d0b7de83c18eaceca603a9a7b5b3055764
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatSection = ({ item, index, dusunList, selectedDusun, setSelectedDusun, isCombined }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
<<<<<<< HEAD
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
=======
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
>>>>>>> 63eec2d0b7de83c18eaceca603a9a7b5b3055764
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

<<<<<<< HEAD
  const isWhite = index === 1 || index === 3;

  // Jika isCombined true, background diatur oleh wrapper luar
  const sectionBg = isCombined
    ? "transparent"
    : isWhite
      ? "#ffffff"
      : "linear-gradient(135deg, #57A677 0%, #4EA674 100%)";

  const textColor = isWhite ? "#334155" : "#ffffff";
  const theme = isWhite ? "white" : "dark";

  return (
    <section ref={ref} style={{
      padding: isCombined && index === 0 ? "0px 0 90px" : "90px 0",
      background: sectionBg,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: "all 0.8s ease",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* --- EFEK BLOBS (Hanya jika tidak digabung atau di bagian hijau) --- */}
      {!isWhite && !isCombined && (
        <>
          <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "400px", height: "400px", background: "rgba(59, 130, 246, 0.25)", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none" }}></div>
          <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "450px", height: "450px", background: "rgba(29, 78, 216, 0.2)", borderRadius: "50%", filter: "blur(120px)", pointerEvents: "none" }}></div>
        </>
      )}

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", gap: 64, flexDirection: item.posisiChart === "kiri" ? "row" : "row-reverse", position: "relative", zIndex: 10 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 34, fontWeight: 900, color: textColor, marginBottom: 16, fontFamily: "'Georgia', serif", fontStyle: "italic", textShadow: isWhite ? "none" : "0 2px 4px rgba(0,0,0,0.15)" }}>{item.judul}</h2>
          <p style={{ fontSize: 16, fontWeight: 700, color: textColor, marginBottom: 12, opacity: 0.95 }}>{item.subjudul}</p>
          <p style={{ fontSize: 14, color: textColor, opacity: 0.85, lineHeight: 1.8 }}>{item.deskripsi}</p>
=======
  const isLeft = item.posisiChart === "kiri";
  const titleColor = theme === "white" || theme === "lightgreen" ? "#1e293b" : "#fff";
  const subjudulColor = theme === "white" || theme === "lightgreen" ? "#1e293b" : "rgba(255,255,255,0.95)";
  const deskripsiColor = theme === "white" || theme === "lightgreen" ? "#475569" : "rgba(255,255,255,0.75)";

  return (
    <section ref={ref} style={{
      padding: "64px 0",
      background: "transparent",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
      transitionDelay: `${index * 0.05}s`,
    }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", gap: 64, flexDirection: isLeft ? "row" : "row-reverse" }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: titleColor, marginBottom: 16, lineHeight: 1.2, fontFamily: "'Georgia', serif" }}>{item.judul}</h2>
          <p style={{ fontSize: 14, fontWeight: 700, color: subjudulColor, marginBottom: 12, lineHeight: 1.6 }}>{item.subjudul}</p>
          <p style={{ fontSize: 13, color: deskripsiColor, lineHeight: 1.8 }}>{item.deskripsi}</p>
        </div>
        <div style={{ flexShrink: 0, display: "flex", justifyContent: "center" }}>
          <DonutChartCard item={item} theme={theme} />
>>>>>>> 63eec2d0b7de83c18eaceca603a9a7b5b3055764
        </div>
        <DonutChartCard item={item} theme={theme} dusunList={dusunList} selectedDusun={selectedDusun} setSelectedDusun={setSelectedDusun} />
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default function InfografisPublik() {
  const [rawData, setRawData] = useState([]);
  const [selectedDusun, setSelectedDusun] = useState("all");
  const [displayData, setDisplayData] = useState(initialStatistikData);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(API_URL);
        if (res.data.status === "success") setRawData(res.data.data);
      } catch (err) { console.error(err); }
    };
    fetchAll();
  }, []);

  useEffect(() => {
    const newStat = JSON.parse(JSON.stringify(initialStatistikData));
    const filtered = selectedDusun === "all" ? rawData : rawData.filter(d => d.id === selectedDusun);

    filtered.forEach(dusun => {
      newStat[5].data[0].value += dusun.penduduk_laki || 0;
      newStat[5].data[1].value += dusun.penduduk_perempuan || 0;
      dusun.usias?.forEach(u => {
        if (u.kelompok_usia.includes("Balita")) newStat[0].data[0].value += u.jumlah_jiwa;
        else if (u.kelompok_usia.includes("Anak")) newStat[0].data[1].value += u.jumlah_jiwa;
        else if (u.kelompok_usia.includes("Pemuda")) newStat[0].data[2].value += u.jumlah_jiwa;
        else if (u.kelompok_usia.includes("Dewasa")) newStat[0].data[3].value += u.jumlah_jiwa;
        else if (u.kelompok_usia.includes("Lansia")) newStat[0].data[4].value += u.jumlah_jiwa;
      });
      dusun.pendidikans?.forEach(p => {
        if (p.tingkat_pendidikan.includes("SD")) newStat[1].data[0].value += p.jumlah_jiwa;
        else if (p.tingkat_pendidikan.includes("SMP")) newStat[1].data[1].value += p.jumlah_jiwa;
        else if (p.tingkat_pendidikan.includes("SMA")) newStat[1].data[2].value += p.jumlah_jiwa;
        else if (p.tingkat_pendidikan.includes("Sarjana")) newStat[1].data[3].value += p.jumlah_jiwa;
        else newStat[1].data[4].value += p.jumlah_jiwa;
      });
      dusun.pekerjaans?.forEach(pk => {
        if (pk.jenis_pekerjaan.includes("Petani")) newStat[2].data[0].value += pk.jumlah_jiwa;
        else if (pk.jenis_pekerjaan.includes("Nelayan")) newStat[2].data[1].value += pk.jumlah_jiwa;
        else if (pk.jenis_pekerjaan.includes("PNS") || pk.jenis_pekerjaan.includes("TNI")) newStat[2].data[2].value += pk.jumlah_jiwa;
        else if (pk.jenis_pekerjaan.includes("Wiraswasta")) newStat[2].data[3].value += pk.jumlah_jiwa;
        else newStat[2].data[4].value += pk.jumlah_jiwa;
      });
      dusun.agamas?.forEach(a => {
        if (a.agama === "Kristen") newStat[3].data[0].value += a.jumlah_jiwa;
        else if (a.agama === "Islam") newStat[3].data[1].value += a.jumlah_jiwa;
        else if (a.agama === "Katolik") newStat[3].data[2].value += a.jumlah_jiwa;
        else newStat[3].data[3].value += a.jumlah_jiwa;
      });
      dusun.perkawinans?.forEach(w => {
        if (w.status_perkawinan === "Kawin") newStat[4].data[0].value += w.jumlah_jiwa;
        else if (w.status_perkawinan === "Belum Kawin") newStat[4].data[1].value += w.jumlah_jiwa;
        else newStat[4].data[2].value += w.jumlah_jiwa;
      });
    });

    newStat.forEach(item => {
      const sum = item.data.reduce((s, d) => s + d.value, 0);
      item.total = sum.toLocaleString("id-ID");
    });
    setDisplayData(newStat);
  }, [rawData, selectedDusun]);

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ── HEADER & SECTION USIA (GABUNG DALAM SATU GRADASI) ── */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #57A677 0%, #4EA674 100%)",
      }}>
        {/* BLOBS (Efek Bola Warna Utama) */}
        <div style={{ position: "absolute", top: "10%", left: "-100px", width: "600px", height: "600px", background: "rgba(59, 130, 246, 0.4)", borderRadius: "50%", filter: "blur(130px)", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", bottom: "10%", right: "-100px", width: "700px", height: "700px", background: "rgba(29, 78, 216, 0.35)", borderRadius: "50%", filter: "blur(150px)", pointerEvents: "none" }}></div>
        <div style={{ position: "absolute", top: "5%", right: "20%", width: "500px", height: "500px", background: "rgba(110, 231, 183, 0.25)", borderRadius: "50%", filter: "blur(110px)", pointerEvents: "none" }}></div>

        {/* 1. HERO TITLE */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "110px 32px 60px" }}>
          <h1 style={{ fontSize: 58, fontWeight: 900, color: "#fff", marginBottom: 16, fontFamily: "'Georgia', serif", fontStyle: "italic", textShadow: "0 3px 15px rgba(0,0,0,0.25)" }}>Infografis</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.95)", fontWeight: 600, maxWidth: "700px", margin: "0 auto", letterSpacing: "0.5px" }}>Data Statistik Kependudukan Desa Sibarani Nasampulu Secara Terpadu & Realtime</p>
=======
const Divider = ({ index }) => {
  const isNearWhite = index === 2 || index === 3;
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
      <div style={{
        height: 1,
        background: isNearWhite ? "linear-gradient(to right, transparent, rgba(100,100,100,0.15), transparent)" : "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)",
      }} />
    </div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function InfografisPublik() {
  const [statistikData, setStatistikData] = useState(initialStatistikData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        if (response.data.status === "success") {
          const dusunList = response.data.data;
          const newStat = JSON.parse(JSON.stringify(initialStatistikData));

          dusunList.forEach(dusun => {
            // 1. Penduduk
            newStat[5].data[0].value += dusun.penduduk_laki || 0;
            newStat[5].data[1].value += dusun.penduduk_perempuan || 0;

            // 2. Usia
            dusun.usias?.forEach(u => {
              if (u.kelompok_usia.includes("Balita")) newStat[0].data[0].value += u.jumlah_jiwa;
              else if (u.kelompok_usia.includes("Anak")) newStat[0].data[1].value += u.jumlah_jiwa;
              else if (u.kelompok_usia.includes("Pemuda")) newStat[0].data[2].value += u.jumlah_jiwa;
              else if (u.kelompok_usia.includes("Dewasa")) newStat[0].data[3].value += u.jumlah_jiwa;
              else if (u.kelompok_usia.includes("Lansia")) newStat[0].data[4].value += u.jumlah_jiwa;
            });

            // 3. Pendidikan
            dusun.pendidikans?.forEach(p => {
              if (p.tingkat_pendidikan.includes("SD")) newStat[1].data[0].value += p.jumlah_jiwa;
              else if (p.tingkat_pendidikan.includes("SMP")) newStat[1].data[1].value += p.jumlah_jiwa;
              else if (p.tingkat_pendidikan.includes("SMA")) newStat[1].data[2].value += p.jumlah_jiwa;
              else if (p.tingkat_pendidikan.includes("Sarjana")) newStat[1].data[3].value += p.jumlah_jiwa;
              else newStat[1].data[4].value += p.jumlah_jiwa;
            });

            // 4. Pekerjaan
            dusun.pekerjaans?.forEach(pk => {
              if (pk.jenis_pekerjaan.includes("Petani")) newStat[2].data[0].value += pk.jumlah_jiwa;
              else if (pk.jenis_pekerjaan.includes("Nelayan")) newStat[2].data[1].value += pk.jumlah_jiwa;
              else if (pk.jenis_pekerjaan.includes("PNS") || pk.jenis_pekerjaan.includes("TNI")) newStat[2].data[2].value += pk.jumlah_jiwa;
              else if (pk.jenis_pekerjaan.includes("Wiraswasta")) newStat[2].data[3].value += pk.jumlah_jiwa;
              else newStat[2].data[4].value += pk.jumlah_jiwa;
            });

            // 5. Agama
            dusun.agamas?.forEach(a => {
              if (a.agama === "Kristen") newStat[3].data[0].value += a.jumlah_jiwa;
              else if (a.agama === "Islam") newStat[3].data[1].value += a.jumlah_jiwa;
              else if (a.agama === "Katolik") newStat[3].data[2].value += a.jumlah_jiwa;
              else newStat[3].data[3].value += a.jumlah_jiwa;
            });

            // 6. Perkawinan
            dusun.perkawinans?.forEach(w => {
              if (w.status_perkawinan === "Kawin") newStat[4].data[0].value += w.jumlah_jiwa;
              else if (w.status_perkawinan === "Belum Kawin") newStat[4].data[1].value += w.jumlah_jiwa;
              else newStat[4].data[2].value += w.jumlah_jiwa;
            });
          });

          // Update total string
          newStat.forEach(item => {
            const sum = item.data.reduce((s, d) => s + d.value, 0);
            item.total = sum.toLocaleString("id-ID");
          });

          setStatistikData(newStat);
        }
      } catch (err) {
        console.error("Gagal memuat data infografis:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom, #2d6e49 0%, #3a9e6a 18%, #4EA674 32%, #ffffff 55%, #c8e6d4 72%, #8fcfaa 85%, #4EA674 100%)",
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      <div style={{ textAlign: "center", padding: "72px 32px 48px", position: "relative" }}>
        <h1 style={{ fontSize: 52, fontWeight: 800, color: "#fff", marginBottom: 12, fontFamily: "'Georgia', serif", fontStyle: "italic", textShadow: "0 2px 20px rgba(0,0,0,0.15)" }}>Infografis</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", fontWeight: 400 }}>Data Statistik Kependudukan Desa Sibarani Nasampulu</p>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto 16px", padding: "0 32px" }}>
        <div style={{ height: 160, borderRadius: 16, background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", position: "relative" }}>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, fontStyle: "italic", zIndex: 1 }}>Desa Sibarani Nasampulu — Data Terpadu & Terpercaya</span>
>>>>>>> 63eec2d0b7de83c18eaceca603a9a7b5b3055764
        </div>

        {/* 2. STATISTIK USIA (Ditempatkan langsung di sini agar tidak terpotong) */}
        {displayData.length > 0 && (
          <StatSection
            item={displayData[0]}
            index={0}
            dusunList={rawData}
            selectedDusun={selectedDusun}
            setSelectedDusun={setSelectedDusun}
            isCombined={true}
          />
        )}
      </div>

<<<<<<< HEAD
      {/* ── SECTIONS SISANYA (Individu) ── */}
      {displayData.slice(1).map((item, index) => (
        <StatSection
          key={item.id}
          item={item}
          index={index + 1}
          dusunList={rawData}
          selectedDusun={selectedDusun}
          setSelectedDusun={setSelectedDusun}
          isCombined={false}
        />
      ))}

      {/* ── FOOTER ── */}
      <footer style={{ background: "#111827", color: "rgba(255,255,255,0.5)", padding: "70px 40px", textAlign: "center", fontSize: "14px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "35px", marginBottom: "35px" }}>
             <h3 style={{ color: "#fff", fontSize: "22px", fontWeight: "bold", marginBottom: "12px" }}>Desa Sibarani Nasampulu</h3>
             <p style={{ opacity: 0.8 }}>Kecamatan Laguboti, Kabupaten Toba Samosir, Sumatera Utara</p>
          </div>
          <p>© {new Date().getFullYear()} Pemerintah Desa Sibarani Nasampulu. Seluruh data kependudukan diperbarui secara dinamis oleh sistem desa.</p>
        </div>
=======
      {statistikData.map((item, index) => (
        <React.Fragment key={item.id}>
          <StatSection item={item} index={index} />
          {index < statistikData.length - 1 && <Divider index={index} />}
        </React.Fragment>
      ))}

      <footer style={{ background: "#0f1f17", color: "rgba(255,255,255,0.5)", padding: "40px", textAlign: "center", fontSize: "12px" }}>
        © 2026 Pemerintah Desa Sibarani Nasampulu. Seluruh data diperbarui secara otomatis dari sistem kependudukan desa.
>>>>>>> 63eec2d0b7de83c18eaceca603a9a7b5b3055764
      </footer>
    </div>
  );
}
