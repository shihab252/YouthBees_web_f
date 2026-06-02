import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEye,
  FaEyeSlash,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaHandshake,
  FaRocket,
  FaCheckCircle,
  FaChevronDown
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";

// Logo
import logoImg from "../assets/logo/logo.jpg";
import API_BASE_URL from "../config/api";
export default function Register() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [eduLevel, setEduLevel] = useState("university");
  const [message, setMessage] = useState("");

  // --- BACKEND INTEGRATION STATE ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    businessName: "",
    address: "",
    industry: "",
    experience: "",
    institution: ""
  });

  const handleChange = (name) => (e) =>
    setFormData({ ...formData, [name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      let userCredential;

      try {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        await sendEmailVerification(userCredential.user);

        // ✅ Show success message
        setMessage("Account created! Please check your spam too,sometime it's there.");

      } catch (firebaseError) {
        if (firebaseError.code !== "auth/email-already-in-use") {
          throw firebaseError;
        }
      }

      // ✅ Store in backend
      const payload = {
        email: formData.email,
        role,
      };

      // ✅ student
      if (role === "student") {
        Object.assign(payload, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          phone: formData.phone,
          educationLevel: eduLevel,
        });
      }

      // ✅ teacher (FIXED institutionName)
      if (role === "teacher") {
        Object.assign(payload, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          institutionName: formData.institution, // 🔥 FIX HERE
        });
      }

      // ✅ partner
      if (role === "partner") {
        Object.assign(payload, {
          businessName: formData.businessName,
          phone: formData.phone,
          address: formData.address,
          industry: formData.industry,
        });
      }

      // ✅ affiliate (FIXED fullName)
      if (role === "affiliate") {
        Object.assign(payload, {
          fullName: formData.firstName, // 🔥 FIX HERE
          phone: formData.phone,
        });
      }

      // 🚀 send clean data
      await axios.post(`${API_BASE_URL}/api/auth/register`, payload);

      // ⏳ Let user see message
      setTimeout(() => {
        navigate("/login");
      }, 2500);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    }
  };

  const roles = [
    { id: "student", label: "Student", icon: <FaUserGraduate /> },
    { id: "teacher", label: "Teacher", icon: <FaChalkboardTeacher /> },
    { id: "partner", label: "Partner", icon: <FaHandshake /> },
    { id: "affiliate", label: "Affiliate", icon: <FaRocket /> },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F5] flex flex-col lg:flex-row overflow-x-hidden selection:bg-orange-300">

      {/* ================= LEFT SIDE: VISUAL IDENTITY ================= */}
      <div className="w-full lg:w-1/3 bg-slate-900 p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden shrink-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

        <Link to="/" className="relative z-10 flex items-center gap-3 mb-10 lg:mb-0">
          <img src={logoImg} alt="Logo" className="h-10 md:h-12 w-auto object-contain rounded-xl" />
          <span className="text-white font-black text-xl md:text-2xl tracking-tighter uppercase italic">YouthBees</span>
        </Link>

        <div className="relative z-10 mb-10 lg:mb-0">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase mb-6 lg:mb-8">
            Start Your <br /> <span className="text-orange-500 italic uppercase">Journey.</span>
          </h2>
          <p className="text-slate-400 font-medium text-base md:text-lg leading-relaxed max-w-xs border-l-2 border-orange-500 pl-6">
            Join 1,000+ members bridging the gap between classroom and career.
          </p>
        </div>

        <div className="relative z-10 hidden md:block">
          <div className="flex gap-2 mb-4">
            {[...Array(5)].map((_, i) => <FaCheckCircle key={i} className="text-orange-500 text-xs" />)}
          </div>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Innovation Hub Est. 2021</p>
        </div>
      </div>

      {/* ================= RIGHT SIDE: REGISTRATION FORM ================= */}
      <div className="w-full lg:w-2/3 flex items-start justify-center p-6 md:p-12 lg:p-16 overflow-y-auto bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <div className="text-left mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">Create Account</h1>
            <p className="text-slate-500 font-medium text-sm md:text-base">Select your role and provide your professional details.</p>
          </div>

          {/* DYNAMIC ROLE SELECTOR */}
          <div className="mb-10">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">I am a...</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex flex-col items-center gap-2 md:gap-3 p-4 md:p-5 rounded-2xl md:rounded-3xl border-2 transition-all duration-300 group
                    ${role === r.id
                      ? "bg-white border-orange-500 shadow-lg shadow-orange-900/5 ring-4 ring-orange-50"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:border-orange-200 hover:bg-white"}`}
                >
                  <div className={`text-lg md:text-xl transition-colors ${role === r.id ? "text-orange-500" : "text-slate-300 group-hover:text-orange-300"}`}>
                    {r.icon}
                  </div>
                  <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${role === r.id ? "text-slate-900" : ""}`}>
                    {r.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={role}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {/* ROLE-SPECIFIC FIELDS */}
                {role === "student" && (
                  <div className="space-y-6">
                    <TwoCol>
                      <Input label="First Name" placeholder="John" onChange={handleChange("firstName")} />
                      <Input label="Last Name" placeholder="Doe" onChange={handleChange("lastName")} />
                    </TwoCol>
                    <Input label="Username" placeholder="johndoe24" onChange={handleChange("username")} />
                    <Input label="Email Address" type="email" placeholder="john@university.edu" onChange={handleChange("email")} />

                    <TwoCol>
                      <Select
                        label="Education Level"
                        value={eduLevel}
                        onChange={(e) => setEduLevel(e.target.value)}
                        options={["school", "college", "university", "job"]}
                      />
                      {eduLevel === "job" && (
                        <Select
                          label="Professional Experience"
                          onChange={handleChange("experience")}
                          options={["active_job_holder", "job_seeker", "internship_experience", "0_1_year_experience", "2_plus_year_experience", "freelancer"]}
                        />
                      )}
                    </TwoCol>
                  </div>
                )}

                {role === "teacher" && (
                  <div className="space-y-6">
                    <TwoCol>
                      <Input label="Legal First Name" placeholder="Jane" onChange={handleChange("firstName")} />
                      <Input label="Legal Last Name" placeholder="Smith" onChange={handleChange("lastName")} />
                    </TwoCol>
                    <Input label="Professional Email" type="email" placeholder="jane.smith@institution.com" onChange={handleChange("email")} />
                    <Select label="Primary Institution" onChange={handleChange("institution")} options={["school", "college", "university", "platform_mentor"]} />
                    <div className="flex gap-3 p-4 bg-orange-50 border border-orange-200 rounded-2xl">
                      <FaCheckCircle className="text-orange-500 mt-1 shrink-0 text-sm" />
                      <p className="text-[11px] text-orange-800 font-bold leading-relaxed uppercase tracking-tight">
                        Teacher Verification: Accounts require admin approval following email confirmation.
                      </p>
                    </div>
                  </div>
                )}

                {role === "partner" && (
                  <div className="space-y-6">
                    <Input label="Legal Entity / Business Name" placeholder="Tech Solutions Ltd." onChange={handleChange("businessName")} />
                    <TwoCol>
                      <Input label="Business Email" type="email" placeholder="partners@company.com" onChange={handleChange("email")} />
                      <Input label="Official Phone" placeholder="+880 1XXX XXXXXX" onChange={handleChange("phone")} />
                    </TwoCol>
                    <Input label="Registered Address" placeholder="Street, City, Country" onChange={handleChange("address")} />
                    <Select label="Industry Sector" onChange={handleChange("industry")} options={["apptech", "it", "educational_consultant", "travel_consultant", "other"]} />
                  </div>
                )}

                {role === "affiliate" && (
                  <div className="space-y-6 text-left">
                    <Input label="Full Legal Name" placeholder="Mahib Sadman" onChange={handleChange("firstName")} />
                    <Input label="Primary Email" type="email" placeholder="affiliate@gmail.com" onChange={handleChange("email")} />
                    <Input label="Contact Number" placeholder="+880 1XXX XXXXXX" onChange={handleChange("phone")} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* PASSWORD FIELD (Universal) */}
            <div className="text-left pt-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Secure Password</label>
              <div className="relative group">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange("password")}
                  className="w-full px-5 py-4 rounded-xl border-2 border-slate-300 bg-white outline-none focus:border-orange-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>
            {message && (
              <p
                className={`text-center text-sm font-bold ${message.toLowerCase().includes("wrong") ||
                  message.toLowerCase().includes("failed") ||
                  message.toLowerCase().includes("exist") ||
                  message.toLowerCase().includes("error")
                  ? "text-red-600"
                  : "text-green-600"
                  }`}
              >
                {message}
              </p>
            )}
            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-orange-500 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] mt-4"
            >
              Finalize Registration
            </button>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8 border-t border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Member already?</span>
              <Link to="/login" className="w-full sm:w-auto text-center px-8 py-2.5 bg-orange-50 text-orange-600 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-orange-100 transition-colors border border-orange-100">
                Login Here
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

/* ================== REUSABLE UI ================== */

function Input({ label, type = "text", placeholder, onChange }) {
  return (
    <div className="text-left">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full px-5 py-4 rounded-xl border-2 border-slate-300 bg-white outline-none focus:border-orange-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 shadow-sm"
      />
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div className="text-left">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">{label}</label>
      <div className="relative">
        <select
          required
          value={value}
          onChange={onChange}
          className="w-full px-5 py-4 rounded-xl border-2 border-slate-300 bg-white outline-none focus:border-orange-500 transition-all font-bold text-slate-900 appearance-none uppercase text-[10px] tracking-widest shadow-sm cursor-pointer"
        >
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt.replaceAll("_", " ")}
            </option>
          ))}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <FaChevronDown className="text-[10px]" />
        </div>
      </div>
    </div>
  );
}

function TwoCol({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">{children}</div>;
}