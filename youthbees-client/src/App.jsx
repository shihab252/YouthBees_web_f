import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* --- Core Pages --- */
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Events from "./pages/Events";
import Career from "./pages/Career";
import Affiliate from "./pages/Affiliate";
import PartnerPrograms from "./pages/PartnerPrograms";
import TrainingPrograms from "./pages/TrainingPrograms";
import Team from "./pages/Team";
import BlogDetails from "./pages/BlogDetails";
import ForgotPassword from "./pages/ForgotPassword";

/* --- Auth Pages --- */
import Login from "./pages/Login";
import Register from "./pages/Register";

/* --- Dashboards --- */
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import TeacherDashboard from "./pages/dashboard/TeacherDashboard";
import PartnerDashboard from "./pages/dashboard/PartnerDashboard";
import AffiliateDashboard from "./pages/dashboard/AffiliateDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import CreateCourse from "./pages/CreateCourse";
import MyCourses from "./pages/MyCourses";

/* --- Route Guard --- */
import ProtectedRoute from "./routes/ProtectedRoute";

//pages
import CourseDetails from "./pages/CourseDetails";
import UpdateCourse from "./pages/UpdateCourse";
import Courses from "./pages/Courses";
import Services from "./pages/Services";


/* --- Services --- */
import CVWriting from "./pages/services/CVWriting";
import LinkedIn from "./pages/services/LinkedIn";
import Portfolio from "./pages/services/Portfolio";
import Counselling from "./pages/services/Counselling";
import ScholarlySuccess from "./pages/services/AcademicSupport";
import InterviewMastery from "./pages/services/InterviewMastery";
import StudyAbroad from "./pages/services/StudyAbroad";
import CorporateTraining from "./pages/services/CorporateTraining";
import MarketingSupport from "./pages/services/MarketingSupport";
import InternshipPathway from "./pages/services/InternshipPathway";
import Profile from "./pages/Profile";
import TeacherAnalytics from "./pages/TeacherAnalytics";
import TeacherStudents from "./pages/TeacherStudents";
import AdminServices from "./pages/services/AdminServices";

export default function App() {
  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen bg-[#FFF9F5]">
        <Routes>

          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/career" element={<Career />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/training-programs" element={<TrainingPrograms />} />
          <Route path="/partner-programs" element={<PartnerPrograms />} />
          <Route path="/team" element={<Team />} />
          <Route path="/services" element={<Services />} />
          {/* ================= AUTH ROUTES ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ================= DASHBOARD ROUTES ================= */}

          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/teacher"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/partner"
            element={
              <ProtectedRoute allowedRoles={["partner"]}>
                <PartnerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/affiliate"
            element={
              <ProtectedRoute allowedRoles={["affiliate"]}>
                <AffiliateDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/teacher/create-course"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/teacher/my-courses"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <MyCourses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/course/:id"
            element={<CourseDetails />}
          />

          <Route
            path="/dashboard/teacher/update-course/:id"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <UpdateCourse />
              </ProtectedRoute>
            }
          />
          {/* ================= pagess ================= */}
          <Route
  path="/service/:slug"
  element={
    <ServiceDetails />
  }
/>
          <Route
            path="/dashboard/teacher/analytics"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherAnalytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/teacher/students"
            element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <TeacherStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={<Courses />}
          />

          {/* ================= profile ================= */}
          <Route path="/profile" element={<Profile />} />
          {/* ================= SERVICES ================= */}
          <Route path="/services/cv-writing" element={<CVWriting />} />
          <Route path="/services/linkedin" element={<LinkedIn />} />
          <Route path="/services/portfolio" element={<Portfolio />} />
          <Route path="/services/counselling" element={<Counselling />} />
          <Route path="/services/academic-course" element={<ScholarlySuccess />} />
          <Route path="/services/mock-interview" element={<InterviewMastery />} />
          <Route path="/services/study-abroad" element={<StudyAbroad />} />
          <Route path="/services/corporate-training" element={<CorporateTraining />} />
          <Route path="/services/marketing-support" element={<MarketingSupport />} />
          <Route path="/services/internship-pathway" element={<InternshipPathway />} />
          <Route path="/dashboard/admin/services" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminServices />
            </ProtectedRoute>
          } />

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </main>

      <Footer />
    </>
  );
}
