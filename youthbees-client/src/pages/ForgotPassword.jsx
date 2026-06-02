import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";



export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");

  try {
    setLoading(true);

    await sendPasswordResetEmail(auth, email);

    setMessage("Password reset email sent! Check your inbox.");

  } catch (err) {
    setMessage(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-2xl font-black uppercase mb-4">
          Forgot Password
        </h1>

        <p className="text-sm text-slate-500 mb-6">
          Enter your registered email.  
          We’ll send you a verification code.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 rounded-xl border-2 border-slate-300 focus:border-orange-500 outline-none font-bold"
          />

          {message && (
            <p className="text-sm font-bold text-orange-600 text-center">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase hover:bg-orange-500 transition"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
