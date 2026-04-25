import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Tambahkan Link di sini
import { Eye, EyeOff, User, Mail, Lock, LogIn, ArrowLeft } from "lucide-react"; // Tambahkan ArrowLeft di sini
import axios from "axios";
import logoDesa from "../../assets/logodesa.png";

// URL API mengarah ke auth-service via API Gateway
const API_URL = `${import.meta.env.VITE_API_URL}/auth/portal-pemdes`;

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // --- STATE UNTUK FITUR COOLDOWN (RATE LIMITING) ---
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [cooldown, setCooldown] = useState(0);

  // Efek Timer Hitung Mundur saat Cooldown aktif
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(""); // Hilangkan pesan error saat mulai mengetik lagi
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cegah submit jika masih dalam masa hukuman (cooldown)
    if (cooldown > 0) return;

    if (!form.username || !form.email || !form.password) {
      setError("Semua kolom (Username, Email, dan Password) wajib diisi.");
      return;
    }

    setIsLoading(true);
    try {
      // Tembak API Login
      const response = await axios.post(API_URL, {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      // BERHASIL LOGIN
      localStorage.setItem("token", response.data.token);
      setFailedAttempts(0); // Reset kesalahan
      navigate("/admin"); // Lempar ke halaman Dashboard Admin
    } catch (err) {
      // GAGAL LOGIN
      const newAttempts = failedAttempts + 1;

      if (newAttempts >= 3) {
        setCooldown(30); // Beri hukuman beku 30 detik
        setFailedAttempts(0); // Reset hitungan kegagalan setelah dihukum
        setError("Terlalu banyak percobaan salah. Silakan tunggu 30 detik.");
      } else {
        setFailedAttempts(newAttempts);
        setError(
          err.response?.data?.message ||
            "Username, email, atau password salah. Silakan coba lagi.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    borderColor: "#d1d5db",
    boxShadow: "none",
  };

  const focusStyle = {
    borderColor: "#4a9f6a",
    boxShadow: "0 0 0 3px rgba(74,159,106,0.15)",
    outline: "none",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 relative">
      {/* 🔥 TOMBOL KEMBALI 🔥 */}
      <Link
        to="/"
        className="absolute top-6 left-6 md:top-8 md:left-10 flex items-center gap-2 text-gray-500 hover:text-[#4a9f6a] transition-all font-medium bg-white/70 hover:bg-white backdrop-blur-md px-4 py-2.5 rounded-full shadow-sm hover:shadow-md z-10"
      >
        <ArrowLeft size={18} />
        <span className="text-sm">Kembali ke Beranda</span>
      </Link>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: "#4a9f6a" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10"
          style={{ backgroundColor: "#4a9f6a" }}
        />
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header hijau */}
          <div
            className="px-8 py-8 text-center"
            style={{ backgroundColor: "#4a9f6a" }}
          >
            <img
              src={logoDesa}
              alt="Logo Desa"
              className="h-20 w-20 object-contain mx-auto mb-4 bg-white rounded-full p-2 shadow-md"
            />
            <h1 className="text-xl font-bold text-white leading-tight">
              Desa Sibarani Nasampulu
            </h1>
            <p className="text-green-100 text-sm mt-1">Panel Admin</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <h2 className="text-gray-800 font-semibold text-lg mb-1">
              Masuk ke Akun Anda
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Silakan masukkan kredensial Anda untuk melanjutkan.
            </p>

            {/* Error message */}
            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    disabled={cooldown > 0}
                    placeholder="Masukkan username"
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-gray-800 placeholder-gray-400 transition disabled:bg-gray-100 disabled:text-gray-400"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                    <Mail size={18} />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={cooldown > 0}
                    placeholder="Masukkan email"
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-gray-800 placeholder-gray-400 transition disabled:bg-gray-100 disabled:text-gray-400"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                    <Lock size={18} />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={cooldown > 0}
                    placeholder="Masukkan password"
                    className="w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm text-gray-800 placeholder-gray-400 transition disabled:bg-gray-100 disabled:text-gray-400"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    disabled={cooldown > 0}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || cooldown > 0}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold text-sm transition-all duration-200 shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                style={{
                  backgroundColor:
                    isLoading || cooldown > 0 ? "#a3cba6" : "#4a9f6a",
                }}
                onMouseEnter={(e) => {
                  if (!isLoading && cooldown === 0)
                    e.currentTarget.style.backgroundColor = "#3d8a5a";
                }}
                onMouseLeave={(e) => {
                  if (!isLoading && cooldown === 0)
                    e.currentTarget.style.backgroundColor = "#4a9f6a";
                }}
              >
                {cooldown > 0 ? (
                  <>
                    <Lock size={18} />
                    Coba lagi dalam {cooldown}s
                  </>
                ) : isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Masuk
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          © {new Date().getFullYear()} Desa Sibarani Nasampulu. Hak cipta
          dilindungi.
        </p>
      </div>
    </div>
  );
}
