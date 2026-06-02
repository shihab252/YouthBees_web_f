import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import {
  PlusCircle,
  BookOpen,
  BarChart3,
  Users,
  Star,
  Wallet,
  AlertCircle,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { auth } from "../../firebase";

import API_BASE_URL from "../../config/api";

export default function TeacherDashboard() {
  const [approved, setApproved] =
    useState(false);

  const [analytics, setAnalytics] =
    useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(
          localStorage.getItem("user")
        );

        // 🔥 approval
        if (user?.status === "active") {
          setApproved(true);
        }

        // 🔥 analytics
        const token =
          await auth.currentUser.getIdToken();

        const res = await axios.get(
          `${API_BASE_URL}/api/teacher/analytics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAnalytics(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">

          <div>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Teacher Dashboard
            </h1>

            <p className="text-slate-500 mt-1">
              Welcome back! Here’s what’s happening with your courses today.
            </p>

          </div>

          {/* QUICK BUTTON */}
          {approved && (
            <button
              onClick={() =>
                navigate(
                  "/dashboard/teacher/create-course"
                )
              }
              className="inline-flex items-center justify-center px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-sm"
            >

              <PlusCircle className="w-5 h-5 mr-2" />

              New Course

            </button>
          )}

        </div>

        {/* ================= APPROVAL BANNER ================= */}

        {!approved && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-10 flex items-start">

            <AlertCircle className="w-6 h-6 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />

            <div>

              <h3 className="text-amber-800 font-bold">
                Account Pending Approval
              </h3>

              <p className="text-amber-700 text-sm mt-1">
                Our team is reviewing your profile. Course publishing will be enabled after approval.
              </p>

            </div>
          </div>
        )}

        {/* ================= REAL STATS ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <StatCard
            label="Total Students"
            value={analytics?.totalStudents || 0}
          />

          <StatCard
            label="Total Courses"
            value={analytics?.totalCourses || 0}
          />

          <StatCard
            label="Enrollments"
            value={
              analytics?.totalEnrollments || 0
            }
          />

          <StatCard
            label="Earnings"
            value={`৳${
              analytics?.totalEarnings || 0
            }`}
          />

        </div>

        {/* ================= ACTIONS ================= */}

        <h2 className="text-lg font-bold text-slate-800 mb-5">
          Quick Management
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {/* CREATE COURSE */}
          <Action
            title="Create Course"
            description="Build new curriculum and upload videos"
            icon={
              <PlusCircle className="w-7 h-7" />
            }
            color="text-indigo-600"
            bgColor="bg-indigo-50"
            disabled={!approved}
            onClick={() =>
              navigate(
                "/dashboard/teacher/create-course"
              )
            }
          />

          {/* MY COURSES */}
          <Action
            title="My Courses"
            description="Edit lessons, pricing and visibility"
            icon={
              <BookOpen className="w-7 h-7" />
            }
            color="text-orange-600"
            bgColor="bg-orange-50"
            onClick={() =>
              navigate(
                "/dashboard/teacher/my-courses"
              )
            }
          />

          {/* ANALYTICS */}
          <Action
            title="Analytics"
            description="Deep dive into sales and performance"
            icon={
              <BarChart3 className="w-7 h-7" />
            }
            color="text-emerald-600"
            bgColor="bg-emerald-50"
            onClick={() =>
              navigate(
                "/dashboard/teacher/analytics"
              )
            }
          />

          {/* STUDENTS */}
          <Action
            title="My Students"
            description="Manage enrollments and progress"
            icon={
              <Users className="w-7 h-7" />
            }
            color="text-pink-600"
            bgColor="bg-pink-50"
            onClick={() =>
              navigate(
                "/dashboard/teacher/students"
              )
            }
          />

          {/* REVIEWS */}
          <Action
            title="Reviews"
            description="Read ratings and student feedback"
            icon={
              <Star className="w-7 h-7" />
            }
            color="text-sky-600"
            bgColor="bg-sky-50"
            onClick={() =>
              navigate(
                "/dashboard/teacher/reviews"
              )
            }
          />

          {/* WITHDRAW */}
          <Action
            title="Withdraw"
            description="Withdraw earnings using bKash"
            icon={
              <Wallet className="w-7 h-7" />
            }
            color="text-slate-700"
            bgColor="bg-slate-100"
            onClick={() =>
              navigate(
                "/dashboard/teacher/withdraw"
              )
            }
          />

        </div>
      </div>
    </DashboardLayout>
  );
}

/* ================= ACTION CARD ================= */

function Action({
  title,
  description,
  disabled,
  onClick,
  icon,
  color,
  bgColor,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative p-6 rounded-2xl text-left transition-all duration-200 border border-transparent ${
        disabled
          ? "bg-slate-50 cursor-not-allowed opacity-60"
          : "bg-white hover:border-slate-200 hover:shadow-md active:scale-[0.98]"
      }`}
    >

      <div
        className={`w-14 h-14 rounded-xl ${
          disabled
            ? "bg-slate-200"
            : bgColor
        } ${color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}
      >

        {icon}

      </div>

      <h3
        className={`text-xl font-bold mb-1 ${
          disabled
            ? "text-slate-400"
            : "text-slate-900"
        }`}
      >
        {title}
      </h3>

      <p
        className={`text-sm leading-relaxed ${
          disabled
            ? "text-slate-400"
            : "text-slate-500"
        }`}
      >
        {description}
      </p>

      {!disabled && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">

          <div
            className={`w-2 h-2 rounded-full ${
              color.replace("text", "bg")
            }`}
          />

        </div>
      )}

    </button>
  );
}

/* ================= STATS CARD ================= */

function StatCard({ label, value }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">

      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {label}
      </p>

      <div className="flex items-end justify-between mt-2">

        <h4 className="text-2xl font-black text-slate-800">
          {value}
        </h4>

      </div>

    </div>
  );
}