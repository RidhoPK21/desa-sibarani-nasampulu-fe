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

// ── TEMPLATE DATA AWAL (STATIS) ───────────────────────────────────
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

// ── THEME HELPER ─────────────────────────────────────────────────
const getSectionTheme = (index) => {
  if (index === 3) return "white";
  if (index === 4) return "lightgreen";
  if (index === 5) return "midgreen";
  return "dark";
};

// ── DONUT CHART MINI ─────────────────────────────────────────────
const DonutChartCard = ({ item, theme = "dark" }) => {
  const totalValue = item.data.reduce((sum, d) => sum + d.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ fontWeight: 700, color: "#1e293b" }}>{payload[0].name}</p>
          <p style={{ color: payload[0].payload.color }}>
            {payload[0].value.toLocaleString("id-ID")} {item.satuan === "Siswa" ? "Siswa" : item.satuan === "Orang" ? "Orang" : "Jiwa"}
          </p>
          <p style={{ color: "#64748b" }}>
            {totalValue > 0 ? ((payload[0].value / totalValue) * 100).toFixed(1) : 0}%
          </p>
        </div>
      );
    }
    return null;
  };

  const isLight = theme === "white";
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
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 120, height: 120, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={item.data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={56}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {item.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 1 }}>
          {item.data.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: legendColor, fontWeight: 500 }}>{d.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── ANIMATED SECTION ──────────────────────────────────────────────
const StatSection = ({ item, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const theme = getSectionTheme(index);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

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
        </div>
      </div>
    </section>
  );
};

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
        </div>
      </div>

      {statistikData.map((item, index) => (
        <React.Fragment key={item.id}>
          <StatSection item={item} index={index} />
          {index < statistikData.length - 1 && <Divider index={index} />}
        </React.Fragment>
      ))}

      <footer style={{ background: "#0f1f17", color: "rgba(255,255,255,0.5)", padding: "40px", textAlign: "center", fontSize: "12px" }}>
        © 2026 Pemerintah Desa Sibarani Nasampulu. Seluruh data diperbarui secara otomatis dari sistem kependudukan desa.
      </footer>
    </div>
  );
}
