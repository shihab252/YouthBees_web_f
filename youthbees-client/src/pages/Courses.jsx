import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import {
  BookOpen,
  PlayCircle,
  User,
} from "lucide-react";

import API_BASE_URL from "../config/api";

export default function Courses() {
  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/course`
        );

        setCourses(res.data);

      } catch (err) {
        console.error(err);

      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-black bg-gray-50">
        Loading Courses...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= HERO ================= */}

      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl md:text-6xl font-black mb-5">
            Explore Courses
          </h1>

          <p className="text-xl text-indigo-100 max-w-2xl">
            Learn from expert teachers and build real-world skills with structured learning.
          </p>

        </div>

      </div>

      {/* ================= COURSES ================= */}

      <div className="max-w-7xl mx-auto p-6 md:p-10">

        {courses.length === 0 ? (

          <div className="bg-white rounded-3xl border shadow-sm text-center py-20">

            <h2 className="text-3xl font-black mb-4">
              No courses available
            </h2>

            <p className="text-slate-500">
              Teachers have not published courses yet.
            </p>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {courses.map((course) => {

              const totalLectures =
                course.sections?.reduce(
                  (acc, section) =>
                    acc +
                    (section.lectures?.length ||
                      0),
                  0
                ) || 0;

              return (
                <div
                  key={course._id}
                  className="group bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-2xl transition-all duration-300"
                >

                  {/* ================= BANNER ================= */}

                  <div className="relative overflow-hidden">

                    <img
                      src={course.banner}
                      alt={course.title}
                      className="h-60 w-full object-cover group-hover:scale-105 transition duration-500"
                    />

                    {/* CATEGORY */}
                    <div className="absolute top-4 left-4">

                      <span className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-black text-indigo-700">

                        {course.category}

                      </span>

                    </div>

                  </div>

                  {/* ================= CONTENT ================= */}

                  <div className="p-6">

                    {/* TITLE */}
                    <h2 className="text-2xl font-black text-slate-900 mb-3 line-clamp-2">

                      {course.title}

                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-slate-500 line-clamp-3 mb-5 leading-relaxed">

                      {course.description}

                    </p>

                    {/* TEACHER */}
                    <div className="flex items-center gap-3 mb-5">

                      <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">

                        <User className="w-5 h-5" />

                      </div>

                      <div>

                        <p className="text-sm text-slate-400">
                          Instructor
                        </p>

                        <p className="font-black text-slate-700">
                          {course.teacherName ||
                            "Teacher"}
                        </p>

                      </div>

                    </div>

                    {/* COURSE INFO */}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-6">

                      <div className="flex items-center gap-2">

                        <BookOpen className="w-4 h-4" />

                        <span>
                          {course.sections?.length ||
                            0}{" "}
                          Sections
                        </span>

                      </div>

                      <div className="flex items-center gap-2">

                        <PlayCircle className="w-4 h-4" />

                        <span>
                          {totalLectures} Lectures
                        </span>

                      </div>

                    </div>

                    {/* PRICE */}
                    <div className="flex items-center gap-3 mb-6">

                      {course.discountPrice >
                        0 && (
                        <span className="line-through text-slate-400 text-lg">

                          ৳{course.price}

                        </span>
                      )}

                      <span className="text-4xl font-black text-indigo-600">

                        ৳
                        {course.discountPrice ||
                          course.price}

                      </span>

                    </div>

                    {/* BUTTON */}
                    <Link
                      to={`/course/${course._id}`}
                      className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black transition"
                    >
                      View Course
                    </Link>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>

    </div>
  );
}