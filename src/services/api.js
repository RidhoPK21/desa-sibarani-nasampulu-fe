import axios from "axios";

// Ambil 1 alamat utama API Gateway dari file .env (http://localhost:9000/api)
const GATEWAY_URL = import.meta.env.VITE_API_URL;

// 1. Kurir untuk Auth Service (Diarahkan ke /auth)
export const authApi = axios.create({
  baseURL: `${GATEWAY_URL}/auth`,
  headers: { "Content-Type": "application/json" },
});

// 2. Kurir untuk Info Service (Diarahkan ke /info)
export const infoApi = axios.create({
  baseURL: `${GATEWAY_URL}/info`,
  headers: { "Content-Type": "application/json" },
});

// 3. Kurir untuk Statistic Service (Diarahkan ke /statistic)
export const statisticApi = axios.create({
  baseURL: `${GATEWAY_URL}/statistic`,
  headers: { "Content-Type": "application/json" },
});

// 4. Kurir untuk Content Service (Diarahkan ke /content)
export const contentApi = axios.create({
  baseURL: `${GATEWAY_URL}/content`,
  headers: { "Content-Type": "application/json" },
});

// ==========================================
// KEKUATAN SUPER: Inject Token ke SEMUA Kurir
// ==========================================
// Karena Admin butuh token untuk menambah berita (infoApi) atau gambar (contentApi),
// kita pasang token-nya ke semua kurir, bukan cuma authApi!

const injectToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
};

authApi.interceptors.request.use(injectToken);
infoApi.interceptors.request.use(injectToken);
statisticApi.interceptors.request.use(injectToken);
contentApi.interceptors.request.use(injectToken);
