import axios from "axios";

// 1. Kurir untuk Auth Service (Login/Register)
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  headers: { "Content-Type": "application/json" },
});

// 2. Kurir untuk Info Service (Berita/Pengumuman)
export const infoApi = axios.create({
  baseURL: import.meta.env.VITE_INFO_API_URL,
  headers: { "Content-Type": "application/json" },
});

// 3. Kurir untuk Statistic Service (Data Penduduk)
export const statisticApi = axios.create({
  baseURL: import.meta.env.VITE_STATISTIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// 4. Kurir untuk Content Service (Banner/Galeri)
export const contentApi = axios.create({
  baseURL: import.meta.env.VITE_CONTENT_API_URL,
  headers: { "Content-Type": "application/json" },
});

// (Opsional) Menambahkan Token otomatis jika user sudah login
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
