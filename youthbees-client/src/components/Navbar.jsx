import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import logoImg from "../assets/logo/logo.jpg";
import API_BASE_URL from "../config/api";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef();
  const location = useLocation();

  const baseLink =
    "hover:text-[#FF8C1A] transition font-semibold text-slate-700";

  // 1. AUTO-REFRESH/UPDATE ON ROUTE CHANGES
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setRole(storedRole);
    setUser(storedUser);
    setOpen(false); // Close mobile menu when navigating
  }, [location]);

  // 2. CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK
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
          <img src={logoImg} alt="YouthBees Logo" className="h-14 w-auto object-contain" />
        </Link>

        {/* ========================================== */}
        {/* DESKTOP NAVIGATION               */}
        {/* ========================================== */}
        <nav className="hidden md:flex items-center gap-8">
          {/* --- ADMIN LINKS --- */}
          {role === "admin" && (
            <>
              <NavLink to="/dashboard/admin" className={baseLink}>Dashboard</NavLink>
              <NavLink to="/admin/users" className={baseLink}>Users</NavLink>
              <NavLink to="/admin/courses" className={baseLink}>Courses</NavLink>
              <NavLink to="/admin/events" className={baseLink}>Events</NavLink>
              <NavLink to="/admin/analytics" className={baseLink}>Analytics</NavLink>
            </>
          )}

          {/* --- TEACHER LINKS --- */}
          {role === "teacher" && (
            <>
              <NavLink to="/dashboard/teacher" className={baseLink}>Dashboard</NavLink>
              <CoursesDropdown baseLink={baseLink} />
              <NavLink to="/events" className={baseLink}>Events</NavLink>
              <NavLink to="/my-courses" className={baseLink}>My Courses</NavLink>
              <NavLink to="/create-course" className={baseLink}>Create Course</NavLink>
            </>
          )}

          {/* --- STUDENT LINKS --- */}
          {role === "student" && (
            <>
              <NavLink to="/dashboard/student" className={baseLink}>Dashboard</NavLink>
              <ServicesDropdown baseLink={baseLink} />
              <CoursesDropdown baseLink={baseLink} />
              <NavLink to="/events" className={baseLink}>Events</NavLink>
              <NavLink to="/career" className={baseLink}>Career</NavLink>
            </>
          )}

          {/* --- GUEST LINKS (NOT LOGGED IN) --- */}
          {!role && (
            <>
              <NavLink to="/" className={baseLink}>Home</NavLink>
              <NavLink to="/about" className={baseLink}>About</NavLink>
              <ServicesDropdown baseLink={baseLink} />
              <CoursesDropdown baseLink={baseLink} />
              <NavLink to="/events" className={baseLink}>Events</NavLink>
              <NavLink to="/blog" className={baseLink}>Blog</NavLink>
              <NavLink to="/career" className={baseLink}>Career</NavLink>
              <NavLink to="/affiliate" className={baseLink}>Affiliate</NavLink>
            </>
          )}
        </nav>

        {/* ========================================== */}
        {/* RIGHT SIDE AUTH ACTIONS          */}
        {/* ========================================== */}
        <div className="hidden md:flex items-center gap-4 relative">
          {!role ? (
            <>
              <Link to="/login" className="font-bold text-slate-700 hover:text-[#FF8C1A] transition">
                Login
              </Link>
              <Link to="/register" className="px-6 py-3 rounded-2xl bg-[#FF8C1A] text-white font-black hover:bg-[#FF5F1F] transition shadow-lg">
                Register
              </Link>
            </>
          ) : (
            /* USER PROFILE DROPDOWN (Student, Teacher, Admin) */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-slate-800 rounded-xl font-bold hover:bg-orange-200 transition"
              >
                {user?.firstName || user?.fullName || "Profile"}
                <FaChevronDown className="text-xs" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-orange-100 rounded-xl shadow-lg p-2 z-50 animate-fadeIn">

                  {/* Student Options */}
                  {role === "student" && (
                    <>
                      <DropdownLink label="My Profile" to="/profile" />
                      <DropdownLink label="Dashboard" to="/dashboard/student" />
                      <DropdownLink label="My Learning" to="/my-learning" />
                      <DropdownLink label="Subscription" to="/subscription" />
                    </>
                  )}

                  {/* Teacher Options */}
                  {role === "teacher" && (
                    <>
                      <DropdownLink label="Dashboard" to="/dashboard/teacher" />
                      <DropdownLink label="My Courses" to="/my-courses" />
                      <DropdownLink label="Analytics" to="/teacher/analytics" />
                    </>
                  )}

                  {/* Admin Options */}
                  {role === "admin" && (
                    <DropdownLink label="Admin Panel" to="/dashboard/admin" />
                  )}

                  <div className="border-t border-orange-100 my-1 mx-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm font-semibold hover:bg-red-50 text-red-600 rounded-lg transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENUBAR BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-2xl text-slate-700" aria-label="Toggle menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ========================================== */}
      {/* MOBILE MENU                  */}
      {/* ========================================== */}
      <div
        className={`md:hidden fixed inset-x-0 top-20 bg-white border-t border-orange-100 h-[calc(100vh-80px)] overflow-y-auto transition-all duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div className="px-6 py-6 space-y-4 font-semibold text-slate-700">

          {/* --- ADMIN MOBILE LINKS --- */}
          {role === "admin" && (
            <>
              <MobileLink to="/dashboard/admin" setOpen={setOpen}>Dashboard</MobileLink>
              <MobileLink to="/admin/users" setOpen={setOpen}>Users</MobileLink>
              <MobileLink to="/admin/courses" setOpen={setOpen}>Courses</MobileLink>
              <MobileLink to="/admin/events" setOpen={setOpen}>Events</MobileLink>
              <MobileLink to="/admin/analytics" setOpen={setOpen}>Analytics</MobileLink>
            </>
          )}

          {/* --- TEACHER MOBILE LINKS --- */}
          {role === "teacher" && (
            <>
              <MobileLink to="/" setOpen={setOpen}>Home</MobileLink>
              <MobileMobileServicesAndCourses type="courses" setOpen={setOpen} />
              <MobileLink to="/events" setOpen={setOpen}>Events</MobileLink>
              <MobileLink to="/my-courses" setOpen={setOpen}>My Courses</MobileLink>
              <MobileLink to="/create-course" setOpen={setOpen}>Create Course</MobileLink>
            </>
          )}

          {/* --- STUDENT MOBILE LINKS --- */}
          {role === "student" && (
            <>
              <MobileLink to="/" setOpen={setOpen}>Home</MobileLink>
              <MobileMobileServicesAndCourses type="services" setOpen={setOpen} />
              <MobileMobileServicesAndCourses type="courses" setOpen={setOpen} />
              <MobileLink to="/events" setOpen={setOpen}>Events</MobileLink>
              <MobileLink to="/career" setOpen={setOpen}>Career</MobileLink>
            </>
          )}

          {/* --- GUEST MOBILE LINKS --- */}
          {!role && (
            <>
              <MobileLink to="/" setOpen={setOpen}>Home</MobileLink>
              <MobileLink to="/about" setOpen={setOpen}>About</MobileLink>
              <MobileMobileServicesAndCourses type="services" setOpen={setOpen} />
              <MobileMobileServicesAndCourses type="courses" setOpen={setOpen} />
              <MobileLink to="/events" setOpen={setOpen}>Events</MobileLink>
              <MobileLink to="/blog" setOpen={setOpen}>Blog</MobileLink>
              <MobileLink to="/career" setOpen={setOpen}>Career</MobileLink>
              <MobileLink to="/affiliate" setOpen={setOpen}>Affiliate</MobileLink>
            </>
          )}

          {/* --- MOBILE USER PROFILE / PROFILE ACTIONS --- */}
          <div className="pt-4 border-t border-orange-100 space-y-3">
            {role ? (
              <>
                <div className="text-orange-500 text-xs uppercase tracking-widest font-black">
                  Account ({role})
                </div>
                {role === "student" && (
                  <>
                    <MobileLink to="/profile" setOpen={setOpen}>My Profile</MobileLink>
                    <MobileLink to="/dashboard/student" setOpen={setOpen}>Dashboard</MobileLink>
                    <MobileLink to="/my-learning" setOpen={setOpen}>My Learning</MobileLink>
                    <MobileLink to="/subscription" setOpen={setOpen}>Subscription</MobileLink>
                  </>
                )}
                {role === "teacher" && (
                  <>
                    <MobileLink to="/dashboard/teacher" setOpen={setOpen}>Dashboard</MobileLink>
                    <MobileLink to="/my-courses" setOpen={setOpen}>My Courses</MobileLink>
                    <MobileLink to="/teacher/analytics" setOpen={setOpen}>Analytics</MobileLink>
                  </>
                )}
                {role === "admin" && (
                  <MobileLink to="/dashboard/admin" setOpen={setOpen}>Admin Panel</MobileLink>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full py-3 mt-2 text-center bg-red-50 text-red-600 rounded-xl font-black transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="block w-full py-3 text-center border-2 border-[#FF8C1A] text-[#FF8C1A] rounded-xl font-black">
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)} className="block w-full py-3 text-center bg-[#FF8C1A] text-white rounded-xl font-black">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ========================================== */
/* ISOLATED SUB-COMPONENTS           */
/* ========================================== */

// Desktop Services Dropdown Menu
function ServicesDropdown({ baseLink }) {
  const [services, setServices] =
    useState([]);

  useEffect(() => {
    const fetchServices =
      async () => {
        try {
          const res =
            await axios.get(
              `${API_BASE_URL}/api/service`
            );

          setServices(
            res.data
          );

        } catch (err) {
          console.error(
            err
          );
        }
      };

    fetchServices();
  }, []);

  return (
    <div className="relative group">

      <button
        className={`${baseLink} flex items-center gap-1 py-4`}
      >
        Services
        <FaChevronDown className="text-xs" />
      </button>

      <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-orange-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-50">

        <DropdownLink
          label="All Services"
          to="/services"
        />

        <div className="border-t border-orange-50 my-1 mx-4"></div>

        {services.map(
          (service) => (
            <DropdownLink
              key={
                service._id
              }
              label={
                service.title
              }
              to={`/service/${service.slug}`}
            />
          )
        )}

      </div>

    </div>
  );
}

// Desktop Courses Dropdown Menu
function CoursesDropdown({ baseLink }) {
  return (
    <div className="relative group">
      <button className={`${baseLink} flex items-center gap-1 py-4`}>
        Courses <FaChevronDown className="text-xs" />
      </button>
      <div className="absolute top-full left-0 w-60 bg-white rounded-2xl shadow-xl border border-orange-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-50">
        <DropdownLink label="Training Programs" to="/training-programs" />
        <DropdownLink label="Partner Programs" to="/partner-programs" />
      </div>
    </div>
  );
}

// Mobile Submenu Accordions for Cleaner Mobile Rendering
function MobileMobileServicesAndCourses({ type, setOpen }) {
  if (type === "services") {
    return (
      <>
        <div className="text-orange-500 text-xs uppercase tracking-widest font-black pt-2">Our Services</div>
        <div className="pl-4 space-y-3 border-l-2 border-orange-100">
          <MobileLink to="/services/cv-writing" setOpen={setOpen}>CV Writing Services</MobileLink>
          <MobileLink to="/services/linkedin" setOpen={setOpen}>LinkedIn Services</MobileLink>
          <MobileLink to="/services/portfolio" setOpen={setOpen}>Website & Portfolio</MobileLink>
          <MobileLink to="/services/counselling" setOpen={setOpen}>Counselling</MobileLink>
          <MobileLink to="/services/academic-course" setOpen={setOpen}>Academic Course</MobileLink>
          <MobileLink to="/services/mock-interview" setOpen={setOpen}>Mock Interview Support</MobileLink>
          <MobileLink to="/services/study-abroad" setOpen={setOpen}>Study Abroad Support</MobileLink>
          <MobileLink to="/services/corporate-training" setOpen={setOpen}>Corporate Training</MobileLink>
          <MobileLink to="/services/marketing-support" setOpen={setOpen}>Marketing Support</MobileLink>
          <MobileLink to="/services/internship-pathway" setOpen={setOpen}>Internship Pathway</MobileLink>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="text-orange-500 text-xs uppercase tracking-widest font-black pt-2">Courses</div>
      <div className="pl-4 space-y-3 border-l-2 border-orange-100">
        <MobileLink to="/training-programs" setOpen={setOpen}>Training Programs</MobileLink>
        <MobileLink to="/partner-programs" setOpen={setOpen}>Partner Programs</MobileLink>
      </div>
    </>
  );
}

function DropdownLink({ label, to }) {
  return (
    <Link
      to={to}
      className="block px-6 py-2.5 text-sm font-medium hover:bg-[#FFF3E6] hover:text-[#FF8C1A] text-slate-700 transition rounded-lg mx-1"
    >
      {label}
    </Link>
  );
}

function MobileLink({ to, children, setOpen }) {
  return (
    <Link to={to} onClick={() => setOpen(false)} className="block py-1 text-slate-700 hover:text-[#FF8C1A]">
      {children}
    </Link>
  );
}