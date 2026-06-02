import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserAlt,
  FaLock,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import API_BASE_URL from "../config/api";
// Logo
import logoImg from "../assets/logo/logo.jpg";


export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState(""); // email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  /* ================= LOGIN HANDLER ================= */
const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    // 🔐 Firebase login
    const userCredential = await signInWithEmailAndPassword(
      auth,
      identifier,
      password
    );

    const token = await userCredential.user.getIdToken();

    // 🔥 Backend login
    const res = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // ✅ Save
    localStorage.setItem("role", res.data.role);
localStorage.setItem("user", JSON.stringify(res.data.user));

    // 🔥 Redirect
    navigate(`/dashboard/${res.data.role}`);
    window.location.reload();

  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex flex-col lg:flex-row overflow-x-hidden selection:bg-orange-300">
      {/* ================= LEFT SIDE ================= */}
      <div className="w-full lg:w-1/3 bg-slate-900 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />

        <Link to="/" className="relative z-10 flex items-center gap-3 mb-10">
          <img
            src={logoImg}
            alt="Logo"
            className="h-10 md:h-12 w-auto rounded-xl"
          />
          <span className="text-white font-black text-xl md:text-2xl uppercase italic">
            YouthBees
          </span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-6">
            Welcome <br />{" "}
            <span className="text-orange-500 italic">Back.</span>
          </h2>
          <p className="text-slate-400 text-lg border-l-2 border-orange-500 pl-6">
            Continue your journey toward bridging the gap between classroom and
            career.
          </p>
        </div>

        <div className="hidden md:block">
          <div className="flex gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <FaCheckCircle key={i} className="text-orange-500 text-xs" />
            ))}
          </div>
          <p className="text-[10px] text-slate-500 font-black tracking-[0.3em] uppercase">
            Innovation Hub Est. 2021
          </p>
        </div>
      </div>

      {/* ================= LOGIN FORM ================= */}
      <div className="w-full lg:w-2/3 flex justify-center p-6 md:p-12 lg:p-16 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md pt-20"
        >
          <h1 className="text-4xl font-black uppercase mb-2">Login</h1>
          <p className="text-slate-500 mb-10">
            Access your personalized learning ecosystem.
          </p>

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* EMAIL */}
            <div>
              <label className="text-[10px] font-black uppercase text-slate-500">
                Email
              </label>
              <div className="relative">
                <FaUserAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full pl-12 py-4 border-2 rounded-xl font-bold"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase text-slate-500">
                  Password
                </label>

                {/* 🔑 FORGOT PASSWORD LINK */}
                <Link
                  to="/forgot-password"
                  className="text-[10px] font-black uppercase text-orange-500 hover:underline"
                >
                  Forgot?
                </Link>
              </div>

              <div className="relative mt-2">
                <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 border-2 rounded-xl font-bold"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 font-bold text-center">
                {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 transition flex justify-center gap-3"
            >
              Secure Login <FaArrowRight />
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-xs uppercase font-black text-slate-400">
              New to the hive?
            </span>
            <Link
              to="/register"
              className="block mt-3 text-orange-600 font-black uppercase text-xs"
            >
              Register Now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
