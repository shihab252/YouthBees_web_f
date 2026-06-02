import { useEffect, useState } from "react";

import axios from "axios";
import API_BASE_URL from "../../config/api";

import {
  BookOpen,
  GraduationCap,
  CalendarDays,
  BadgeCheck,
  Crown,
  PlayCircle,
  Clock3,
  TrendingUp,
  ShoppingBag,
  Search,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { auth } from "../../firebase";


export default function StudentDashboard() {
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token =
          await auth.currentUser.getIdToken();

        const res = await axios.get(
          `${API_BASE_URL}/api/user/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);

      } catch (err) {
        console.error(err);

      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <DashboardLayout>

        <div className="flex items-center justify-center min-h-[60vh] text-2xl font-black">
          Loading Dashboard...
        </div>

      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ================= HERO ================= */}

        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-[32px] p-8 md:p-12 text-white shadow-2xl mb-10">

          <div className="relative z-10">

            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">

              Welcome back,
              {" "}
              {user?.firstName || "Student"} 👋

            </h1>

            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl">

              Continue your learning journey and level up your skills with expert-led courses.

            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <button
                onClick={() =>
                  (window.location.href =
                    "/courses")
                }
                className="bg-white text-indigo-700 px-6 py-4 rounded-2xl font-black hover:bg-indigo-50 transition"
              >
                Browse Courses
              </button>

              <button
                onClick={() =>
                  (window.location.href =
                    "/my-learning")
                }
                className="bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-4 rounded-2xl font-black hover:bg-white/20 transition"
              >
                Continue Learning
              </button>

            </div>

          </div>

          {/* BG EFFECT */}
          <div className="absolute -right-20 -top-20 w-72 h-72 bg-white/10 rounded-full blur-2xl" />

          <div className="absolute -bottom-16 left-10 w-60 h-60 bg-pink-400/20 rounded-full blur-2xl" />

        </div>

        {/* ================= MEMBERSHIP ================= */}

        <div className="bg-white rounded-3xl border shadow-sm p-6 mb-10">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div>

              <div className="flex items-center gap-3 mb-3">

                <div className="w-14 h-14 rounded-2xl bg-yellow-100 text-yellow-600 flex items-center justify-center">

                  <Crown className="w-7 h-7" />

                </div>

                <div>

                  <h2 className="text-2xl font-black text-slate-900">

                    {user?.membership?.type ===
                    "none"
                      ? "Free Membership"
                      : `${user?.membership?.type?.toUpperCase()} Membership`}

                  </h2>

                  <p className="text-slate-500">

                    Discount:
                    {" "}
                    <span className="font-bold text-indigo-600">
                      {user?.membership?.discount ||
                        0}
                      %
                    </span>

                  </p>

                </div>

              </div>

              {user?.membership?.validUntil && (
                <p className="text-sm text-slate-400">

                  Valid until:
                  {" "}
                  {new Date(
                    user.membership.validUntil
                  ).toLocaleDateString()}

                </p>
              )}

            </div>

            <button
              onClick={() =>
                (window.location.href =
                  "/subscription")
              }
              className="bg-indigo-600 text-white px-6 py-4 rounded-2xl font-black hover:bg-indigo-700 transition"
            >
              Upgrade Membership
            </button>

          </div>

        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <StatCard
            title="My Courses"
            value={
              user?.purchasedCourses?.length || 0
            }
            icon={<BookOpen className="w-8 h-8" />}
            color="bg-indigo-100 text-indigo-600"
          />

          <StatCard
            title="Certificates"
            value="0"
            icon={
              <BadgeCheck className="w-8 h-8" />
            }
            color="bg-green-100 text-green-600"
          />

          <StatCard
            title="Live Classes"
            value="0"
            icon={
              <CalendarDays className="w-8 h-8" />
            }
            color="bg-pink-100 text-pink-600"
          />

          <StatCard
            title="Progress"
            value={
              user?.purchasedCourses?.length
                ? `${Math.round(
                    user.purchasedCourses.reduce(
                      (acc, course) =>
                        acc +
                        (course.progress || 0),
                      0
                    ) /
                      user.purchasedCourses.length
                  )}%`
                : "0%"
            }
            icon={
              <TrendingUp className="w-8 h-8" />
            }
            color="bg-orange-100 text-orange-600"
          />

        </div>

        {/* ================= MARKETPLACE ================= */}

        <div className="bg-white rounded-3xl border shadow-sm p-6 mb-10">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            <div>

              <h2 className="text-3xl font-black mb-2">
                Explore Courses
              </h2>

              <p className="text-slate-500 text-lg">
                Discover new skills from expert teachers.
              </p>

            </div>

            <div className="flex flex-wrap gap-4">

              {/* BROWSE */}
              <button
                onClick={() =>
                  (window.location.href =
                    "/courses")
                }
                className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-2xl font-black transition"
              >

                <Search className="w-5 h-5" />

                Browse Courses

              </button>

              {/* MY LEARNING */}
              <button
                onClick={() =>
                  (window.location.href =
                    "/my-learning")
                }
                className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-4 rounded-2xl font-black transition"
              >

                <ShoppingBag className="w-5 h-5" />

                My Learning

              </button>

            </div>

          </div>

        </div>

        {/* ================= MY LEARNING ================= */}

        <div className="bg-white rounded-3xl border shadow-sm p-6 mb-10">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

            <div>

              <h2 className="text-3xl font-black">
                My Learning
              </h2>

              <p className="text-slate-500 mt-1">
                Continue your purchased courses
              </p>

            </div>

            <button
              onClick={() =>
                (window.location.href =
                  "/courses")
              }
              className="bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition"
            >
              View All Courses
            </button>

          </div>

          {!user?.purchasedCourses ||
          user.purchasedCourses.length === 0 ? (

            <div className="text-center py-20">

              <BookOpen className="w-16 h-16 mx-auto text-slate-300 mb-5" />

              <h3 className="text-3xl font-black text-slate-700 mb-3">
                No Courses Yet
              </h3>

              <p className="text-slate-500 mb-8 max-w-xl mx-auto">
                Browse our course marketplace and start learning from expert instructors.
              </p>

              <button
                onClick={() =>
                  (window.location.href =
                    "/courses")
                }
                className="bg-indigo-600 text-white px-7 py-4 rounded-2xl font-black hover:bg-indigo-700 transition"
              >
                Browse Courses
              </button>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {user.purchasedCourses.map(
                (course, index) => (

                  <div
                    key={index}
                    className="group bg-white border rounded-3xl overflow-hidden hover:shadow-2xl transition-all"
                  >

                    <div className="p-6">

                      {/* TOP */}
                      <div className="flex items-start justify-between mb-4">

                        <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">

                          <PlayCircle className="w-7 h-7" />

                        </div>

                        <div className="flex items-center text-sm text-slate-400 gap-1">

                          <Clock3 className="w-4 h-4" />

                          Active

                        </div>

                      </div>

                      {/* TITLE */}
                      <h3 className="text-2xl font-black text-slate-900 mb-3 line-clamp-2">

                        {course.courseTitle}

                      </h3>

                      {/* PROGRESS */}
                      <div className="mb-5">

                        <div className="flex justify-between text-sm font-bold mb-2">

                          <span>
                            Progress
                          </span>

                          <span>
                            {course.progress || 0}%
                          </span>

                        </div>

                        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">

                          <div
                            className="h-full bg-indigo-600 rounded-full"
                            style={{
                              width: `${
                                course.progress || 0
                              }%`,
                            }}
                          />

                        </div>

                      </div>

                      {/* BUTTON */}
                      <button
                        onClick={() =>
                          (window.location.href = `/course/${course.course}`)
                        }
                        className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black hover:bg-indigo-700 transition"
                      >
                        Continue Learning
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

/* ================= STAT CARD ================= */

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="bg-white p-6 rounded-3xl border shadow-sm hover:shadow-lg transition">

      <div className="flex items-center justify-between mb-5">

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>

      </div>

      <p className="text-slate-500 font-semibold mb-2">
        {title}
      </p>

      <h3 className="text-4xl font-black text-slate-900">
        {value}
      </h3>

    </div>
  );
}