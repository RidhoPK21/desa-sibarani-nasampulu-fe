import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ── DATA STATISTIK ────────────────────────────────────────────────
const statistikData = [
  {
    id: "usia",
    judul: "Statistik Usia",
    subjudul:
      "Keterangan jumlah balita, anak - anak, remaja, dewasa dan lansia",
    deskripsi:
      "We invest in building long-term, sustainable relationships and support our projects in their growth journey with our services, industry expertise and network.",
    data: [
      { name: "Balita", value: 135, color: "#6366f1" },
      { name: "Anak-anak", value: 261, color: "#ec4899" },
      { name: "Remaja", value: 220, color: "#a78bfa" },
      { name: "Dewasa", value: 905, color: "#34d399" },
      { name: "Lansia", value: 351, color: "#fbbf24" },
    ],
    total: "1.872",
    satuan: "Jiwa",
    posisiChart: "kanan",
  },
  {
    id: "pendidikan",
    judul: "Statistik Pendidikan",
    subjudul:
      "Keterangan jumlah yang bersekolah SD, SMP, SMA, Sarjana, dan non Sarjana",
    deskripsi:
      "We invest in building long-term, sustainable relationships and support our projects in their growth journey with our services, industry expertise and network.",
    data: [
      { name: "SD", value: 412, color: "#6366f1" },
      { name: "SMP", value: 318, color: "#ec4899" },
      { name: "SMA", value: 541, color: "#a78bfa" },
    ],
    total: "1.271",
    satuan: "Siswa",
    posisiChart: "kiri",
  },
  {
    id: "pekerjaan",
    judul: "Statistik Pekerjaan",
    subjudul:
      "Keterangan jumlah orang yang bekerja sebagai petani, nelayan, asn, wiraswasta",
    deskripsi:
      "We invest in building long-term, sustainable relationships and support our projects in their growth journey with our services, industry expertise and network.",
    data: [
      { name: "Petani", value: 380, color: "#6366f1" },
      { name: "Nelayan", value: 95, color: "#ec4899" },
      { name: "ASN", value: 142, color: "#a78bfa" },
      { name: "Wiraswasta", value: 263, color: "#34d399" },
    ],
    total: "880",
    satuan: "Orang",
    posisiChart: "kanan",
  },
  {
    id: "agama",
    judul: "Statistik Agama",
    subjudul:
      "Keterangan jumlah yang beragama muslim, kristen, katolik, budha, hindu, dan konghucu",
    deskripsi:
      "We invest in building long-term, sustainable relationships and support our projects in their growth journey with our services, industry expertise and network.",
    data: [
      { name: "Kristen", value: 1420, color: "#6366f1" },
      { name: "Muslim", value: 320, color: "#ec4899" },
      { name: "Katolik", value: 132, color: "#a78bfa" },
    ],
    total: "1.872",
    satuan: "Jiwa",
    posisiChart: "kiri",
  },
  {
    id: "perkawinan",
    judul: "Statistik Status Perkawinan",
    subjudul: "Keterangan jumlah orang yang kawin dan belum kawin",
    deskripsi:
      "We invest in building long-term, sustainable relationships and support our projects in their growth journey with our services, industry expertise and network.",
    data: [
      { name: "Sudah Kawin", value: 842, color: "#6366f1" },
      { name: "Belum Kawin", value: 1030, color: "#ec4899" },
    ],
    total: "1.872",
    satuan: "Jiwa",
    posisiChart: "kanan",
  },
  {
    id: "penduduk",
    judul: "Statistik Penduduk",
    subjudul:
      "Keterangan jumlah yang bersekolah SD, SMP, SMA, Sarjana, dan non Sarjana",
    deskripsi:
      "We invest in building long-term, sustainable relationships and support our projects in their growth journey with our services, industry expertise and network.",
    data: [
      { name: "Laki-laki", value: 936, color: "#6366f1" },
      { name: "Perempuan", value: 936, color: "#ec4899" },
    ],
    total: "1.872",
    satuan: "Jiwa",
    posisiChart: "kiri",
  },
];

// ── THEME HELPER ─────────────────────────────────────────────────
// index 0=usia,1=pendidikan,2=pekerjaan → dark/green bg
// index 3=agama → white bg
// index 4=perkawinan → light green bg
// index 5=penduduk → medium green bg
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
            {payload[0].value.toLocaleString("id-ID")} jiwa
          </p>
          <p style={{ color: "#64748b" }}>
            {((payload[0].value / totalValue) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const isLight = theme === "white";
  const isLightGreen = theme === "lightgreen";
  const cardBg = isLight
    ? "#ffffff"
    : isLightGreen
      ? "#ffffff"
      : "rgba(255,255,255,0.12)";
  const cardBorder = isLight
    ? "1px solid #e2e8f0"
    : isLightGreen
      ? "1px solid #d1e8d8"
      : "1px solid rgba(255,255,255,0.25)";
  const cardShadow =
    isLight || isLightGreen
      ? "0 4px 24px rgba(0,0,0,0.08)"
      : "0 8px 32px rgba(0,0,0,0.12)";
  const labelColor =
    isLight || isLightGreen ? "#94a3b8" : "rgba(255,255,255,0.7)";
  const totalColor = isLight || isLightGreen ? "#3b82f6" : "#fff";
  const subColor =
    isLight || isLightGreen ? "#64748b" : "rgba(255,255,255,0.65)";
  const legendColor =
    isLight || isLightGreen ? "#374151" : "rgba(255,255,255,0.85)";

  return (
    <div
      style={{
        background: cardBg,
        backdropFilter: isLight || isLightGreen ? "none" : "blur(16px)",
        borderRadius: 16,
        padding: "24px 28px",
        border: cardBorder,
        boxShadow: cardShadow,
        minWidth: 280,
        maxWidth: 340,
        width: "100%",
      }}
    >
      {/* Card Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: labelColor,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          CHART TITLE
        </span>
        <span style={{ fontSize: 11, color: labelColor }}>This Week ▾</span>
      </div>
      <div style={{ marginBottom: 2 }}>
        <span style={{ fontSize: 26, fontWeight: 800, color: totalColor }}>
          {item.total}
        </span>
      </div>
      <div style={{ fontSize: 11, color: subColor, marginBottom: 12 }}>
        {item.data.reduce((s, d) => s + d.value, 0).toLocaleString("id-ID")}{" "}
        {item.satuan === "Jiwa" ? "Orders" : item.satuan}
      </div>

      {/* Chart + Legend Row */}
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

        {/* Legend */}
        <div style={{ flex: 1 }}>
          {item.data.slice(0, 4).map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 5,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: d.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{ fontSize: 10, color: legendColor, fontWeight: 500 }}
              >
                {d.name}
              </span>
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isLeft = item.posisiChart === "kiri";

  // Section background transparent — let main gradient show
  const sectionBg = "transparent";

  const titleColor =
    theme === "white" ? "#1e293b" : theme === "lightgreen" ? "#1e293b" : "#fff";

  const subjudulColor =
    theme === "white"
      ? "#1e293b"
      : theme === "lightgreen"
        ? "#1e293b"
        : "rgba(255,255,255,0.95)";

  const deskripsiColor =
    theme === "white"
      ? "#475569"
      : theme === "lightgreen"
        ? "#374151"
        : "rgba(255,255,255,0.75)";

  return (
    <section
      ref={ref}
      style={{
        padding: "64px 0",
        background: sectionBg,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        transitionDelay: `${index * 0.05}s`,
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          gap: 64,
          flexDirection: isLeft ? "row" : "row-reverse",
        }}
      >
        {/* TEKS SIDE */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: titleColor,
              marginBottom: 16,
              lineHeight: 1.2,
              fontFamily: "'Georgia', serif",
            }}
          >
            {item.judul}
          </h2>
          <p
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: subjudulColor,
              marginBottom: 12,
              lineHeight: 1.6,
            }}
          >
            {item.subjudul}
          </p>
          <p
            style={{
              fontSize: 13,
              color: deskripsiColor,
              lineHeight: 1.8,
            }}
          >
            {item.deskripsi}
          </p>
        </div>

        {/* CHART SIDE */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DonutChartCard item={item} theme={theme} />
        </div>
      </div>
    </section>
  );
};

// ── DIVIDER ───────────────────────────────────────────────────────
const Divider = ({ index }) => {
  // index 2→3 (pekerjaan→agama): transition to white zone
  // index 3→4 (agama→perkawinan): back to green
  const isNearWhite = index === 2 || index === 3;
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
      <div
        style={{
          height: 1,
          background: isNearWhite
            ? "linear-gradient(to right, transparent, rgba(100,100,100,0.15), transparent)"
            : "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)",
        }}
      />
    </div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────
export default function InfografisPublik() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #2d6e49 0%, #3a9e6a 18%, #4EA674 32%, #ffffff 55%, #c8e6d4 72%, #8fcfaa 85%, #4EA674 100%)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* ── HERO HEADER ──────────────────────────────────────────── */}
      <div
        style={{
          textAlign: "center",
          padding: "72px 32px 48px",
          position: "relative",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: "10%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40,
            right: "12%",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            filter: "blur(30px)",
            pointerEvents: "none",
          }}
        />

        <h1
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#fff",
            marginBottom: 12,
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontStyle: "italic",
            textShadow: "0 2px 20px rgba(0,0,0,0.15)",
            position: "relative",
          }}
        >
          Infografis
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.75)",
            fontWeight: 400,
            position: "relative",
          }}
        >
          Pengantar tentang infografis
        </p>
      </div>

      {/* ── DECORATIVE IMAGE STRIP (top area background blur effect) ── */}
      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto 16px",
          padding: "0 32px",
        }}
      >
        <div
          style={{
            height: 160,
            borderRadius: 16,
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Decorative pattern */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 80 + i * 20,
                height: 80 + i * 20,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.06)",
                top: "50%",
                left: `${10 + i * 12}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
          <span
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 13,
              fontStyle: "italic",
              zIndex: 1,
            }}
          >
            Desa Sibarani Nasampulu — Data Kependudukan
          </span>
        </div>
      </div>

      {/* ── STATISTIK SECTIONS ───────────────────────────────────── */}
      {statistikData.map((item, index) => (
        <React.Fragment key={item.id}>
          <StatSection item={item} index={index} />
          {index < statistikData.length - 1 && <Divider index={index} />}
        </React.Fragment>
      ))}

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer
        style={{ background: "#0f1f17", fontFamily: "'Segoe UI', sans-serif" }}
      >
        {/* Main footer content */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "56px 40px 40px",
            display: "flex",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          {/* Kolom 1 — Nama Desa */}
          <div style={{ flex: "1 1 260px", minWidth: 220 }}>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#fff",
                marginBottom: 16,
                lineHeight: 1.3,
              }}
            >
              Desa Sibarani Nasampulu
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
              }}
            >
              Website Resmi Pemerintah Desa Sibarani Nasampulu,
              <br />
              Kecamatan Laguboti, Kabupaten Toba Samosir, Provinsi
              <br />
              Sumatera Utara.
            </p>
          </div>

          {/* Kolom 2 — Tautan Cepat */}
          <div style={{ flex: "1 1 200px", minWidth: 160 }}>
            <h4
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              Tautan Cepat
            </h4>
            <div
              style={{
                width: 40,
                height: 3,
                background: "#4EA674",
                borderRadius: 2,
                marginBottom: 20,
              }}
            />
            {[
              "Profil Desa",
              "Galeri Kegiatan",
              "Data IDM",
              "Berita Terkini",
              "PPID & Dokumentasi",
            ].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: "block",
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  marginBottom: 12,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#4EA674")}
                onMouseLeave={(e) =>
                  (e.target.style.color = "rgba(255,255,255,0.55)")
                }
              >
                {link}
              </a>
            ))}
          </div>

          {/* Kolom 3 — Hubungi Kami */}
          <div style={{ flex: "1 1 260px", minWidth: 220 }}>
            <h4
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              Hubungi Kami
            </h4>
            <div
              style={{
                width: 40,
                height: 3,
                background: "#4EA674",
                borderRadius: 2,
                marginBottom: 20,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div
                style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
              >
                <span style={{ color: "#4EA674", fontSize: 16, marginTop: 2 }}>
                  📍
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.6,
                  }}
                >
                  Kecamatan Laguboti, Kabupaten Toba Samosir,
                  <br />
                  Sumatera Utara
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "#4EA674", fontSize: 16 }}>✉</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
                  pemdes@sibaraninasampulu.go.id
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "#4EA674", fontSize: 16 }}>📞</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
                  (0632) 123456
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              padding: "20px 40px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
              © 2026 Pemerintah Desa Sibarani Nasampulu. Hak Cipta Dilindungi.
            </span>
            <div style={{ display: "flex", gap: 24 }}>
              {["Facebook", "Instagram", "YouTube"].map((s) => (
                <a
                  key={s}
                  href="#"
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#4EA674")}
                  onMouseLeave={(e) =>
                    (e.target.style.color = "rgba(255,255,255,0.45)")
                  }
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
