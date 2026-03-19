import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, LogIn } from "lucide-react";
import logoDesa from "../../assets/logodesa.png";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      setError("Semua kolom wajib diisi.");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Ganti dengan pemanggilan API login yang sesungguhnya
      // Contoh: const res = await api.post("/auth/login", form);
      await new Promise((r) => setTimeout(r, 1000)); // simulasi loading
      localStorage.setItem("token", "dummy-token");
      navigate("/admin");
    } catch (err) {
      setError("Username, email, atau password salah. Silakan coba lagi.");
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ backgroundColor: "#4a9f6a" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10"
          style={{ backgroundColor: "#4a9f6a" }}
        />
      </div>

      <div className="relative w-full max-w-md">
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
                    placeholder="Masukkan username"
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-gray-800 placeholder-gray-400 transition"
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
                    placeholder="Masukkan email"
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm text-gray-800 placeholder-gray-400 transition"
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
                    placeholder="Masukkan password"
                    className="w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm text-gray-800 placeholder-gray-400 transition"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, inputStyle)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold text-sm transition-all duration-200 shadow-md active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                style={{ backgroundColor: "#4a9f6a" }}
                onMouseEnter={(e) => {
                  if (!isLoading) e.currentTarget.style.backgroundColor = "#3d8a5a";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#4a9f6a";
                }}
              >
                {isLoading ? (
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
          © {new Date().getFullYear()} Desa Sibarani Nasampulu. Hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
}