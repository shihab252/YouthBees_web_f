import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import logoImg from "../assets/logo/logo.jpg";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef();
  const location = useLocation(); // 🔥 detect route change

  const baseLink =
    "hover:text-[#FF8C1A] transition font-semibold text-slate-700";

  // 🔥 FIX: update when route changes
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setRole(storedRole);
    setUser(storedUser);
  }, [location]); // ✅ key fix

  // 🔥 CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="logo" className="h-14 rounded-xl" />
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={baseLink}>Home</NavLink>
          <NavLink to="/about" className={baseLink}>About</NavLink>
          <NavLink to="/events" className={baseLink}>Events</NavLink>
          <NavLink to="/blog" className={baseLink}>Blog</NavLink>
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4 relative">
          {!role ? (
            <>
              <Link to="/login" className="font-bold text-slate-700">
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 rounded-2xl bg-[#FF8C1A] text-white font-black"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* PROFILE BUTTON */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-xl font-bold"
              >
                {user?.firstName || user?.fullName || "Profile"}
                <FaChevronDown className="text-xs" />
              </button>

              {/* DROPDOWN */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg p-2 z-50">

                  <Link to="/profile" className="block px-4 py-2 hover:bg-orange-50 rounded">
                    My Profile
                  </Link>

                  <Link
                    to={`/dashboard/${role}`}
                    className="block px-4 py-2 hover:bg-orange-50 rounded"
                  >
                    Dashboard
                  </Link>

                  {role === "student" && (
                    <Link
                      to="/subscription"
                      className="block px-4 py-2 hover:bg-orange-50 rounded"
                    >
                      Subscription
                    </Link>
                  )}

                  {role === "admin" && (
                    <Link
                      to="/dashboard/admin"
                      className="block px-4 py-2 hover:bg-orange-50 rounded"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}