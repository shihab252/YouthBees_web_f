import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import API_BASE_URL from "../config/api";
import { auth } from "../firebase";

export default function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  // 🔥 logged in user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/course/${id}`
        );

        setCourse(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchCourse();
  }, [id]);

  // 🔥 YouTube embed helper
  const getYoutubeEmbed = (url) => {
    if (!url) return "";

    let videoId = "";

    // youtu.be/xxxx
    if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
    }

    // youtube.com/watch?v=xxxx
    else if (url.includes("watch?v=")) {
      videoId = url
        .split("watch?v=")[1]
        .split("&")[0];
    }

    return `https://www.youtube.com/embed/${videoId}`;
  };

  // 🔥 purchase course
  const handlePurchase = async () => {
    try {
      const token =
        await auth.currentUser.getIdToken();

      const res = await axios.post(
        `${API_BASE_URL}/api/course/purchase`,
        {
          courseId: course._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      // 🔥 refresh user
      const updatedUser = await axios.get(
        `${API_BASE_URL}/api/user/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser.data)
      );

      window.location.reload();

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Purchase failed"
      );
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  // 🔥 course owner teacher
  const isTeacher =
    user?.email === course?.teacherEmail;

  // 🔥 admin access
  const isAdmin =
    user?.role === "admin";

  // 🔥 purchased student
  const isPurchased =
    user?.purchasedCourses?.some(
      (item) =>
        item.course === course?._id
    );

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= HERO ================= */}

      <div className="relative h-[420px]">

        <img
          src={course.banner}
          alt={course.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70">

          <div className="max-w-6xl mx-auto h-full flex items-end p-6 md:p-10">

            <div className="text-white max-w-3xl">

              <span className="bg-indigo-600 px-4 py-2 rounded-full text-sm font-bold">
                {course.category}
              </span>

              <h1 className="text-4xl md:text-5xl font-black mt-5 mb-4">
                {course.title}
              </h1>

              <p className="text-lg text-gray-200 leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center gap-4 mt-6 flex-wrap">

                {course.discountPrice >
                  0 && (
                  <span className="line-through text-2xl text-gray-400">
                    ৳{course.price}
                  </span>
                )}

                <span className="text-4xl font-black text-white">
                  ৳
                  {course.discountPrice ||
                    course.price}
                </span>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}

      <div className="max-w-6xl mx-auto p-6 md:p-10 grid lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2">

          {/* CURRICULUM */}
          <div className="bg-white rounded-3xl border shadow-sm overflow-hidden mb-8">

            <div className="p-6 border-b">
              <h2 className="text-3xl font-black">
                Course Curriculum
              </h2>
            </div>

            <div className="divide-y">

              {course.sections?.map(
                (section, sIndex) => (

                  <div key={sIndex}>

                    {/* SECTION TITLE */}
                    <div className="bg-gray-100 px-6 py-5 text-xl font-black">
                      {section.title}
                    </div>

                    {/* LECTURES */}
                    <div>

                      {section.lectures?.map(
                        (
                          lecture,
                          lIndex
                        ) => {

                          // 🔥 first video free
                          const isFreePreview =
                            sIndex === 0 &&
                            lIndex === 0;

                          // 🔥 unlocked condition
                          const unlocked =
                            isFreePreview ||
                            isTeacher ||
                            isAdmin ||
                            isPurchased;

                          return (
                            <div
                              key={lIndex}
                              className="p-6 border-b"
                            >

                              {/* TITLE */}
                              <div className="flex items-center justify-between mb-5 flex-wrap gap-3">

                                <h3 className="text-xl font-bold">
                                  {lecture.title}
                                </h3>

                                <div className="flex gap-2">

                                  {!unlocked && (
                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                                      🔒 Locked
                                    </span>
                                  )}

                                  {isFreePreview && (
                                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                                      Free Preview
                                    </span>
                                  )}

                                </div>

                              </div>

                              {/* VIDEO */}
                              {unlocked ? (

                                <div className="aspect-video rounded-2xl overflow-hidden border">

                                  <iframe
                                    width="100%"
                                    height="100%"
                                    src={getYoutubeEmbed(
                                      lecture.videoUrl
                                    )}
                                    title={
                                      lecture.title
                                    }
                                    allowFullScreen
                                  />

                                </div>

                              ) : (

                                <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center">

                                  <div className="text-center p-6">

                                    <div className="text-6xl mb-4">
                                      🔒
                                    </div>

                                    <h3 className="text-2xl font-black mb-3">
                                      This lesson is locked
                                    </h3>

                                    <p className="text-gray-500 mb-5">
                                      Purchase this course to unlock all lessons
                                    </p>

                                    <button
                                      onClick={
                                        handlePurchase
                                      }
                                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition"
                                    >
                                      Buy Course
                                    </button>

                                  </div>
                                </div>

                              )}

                            </div>
                          );
                        }
                      )}

                    </div>
                  </div>
                )
              )}

            </div>
          </div>

          {/* LIVE SESSIONS */}
          {course.liveSessions
            ?.length > 0 && (

            <div className="bg-white rounded-3xl border shadow-sm p-6">

              <h2 className="text-3xl font-black mb-6">
                Private Live Sessions
              </h2>

              <div className="space-y-5">

                {course.liveSessions.map(
                  (
                    session,
                    index
                  ) => (

                    <div
                      key={index}
                      className="border rounded-2xl p-5"
                    >

                      <div className="flex justify-between items-start gap-5 flex-wrap">

                        <div>

                          <h3 className="text-xl font-black mb-2">
                            {session.title}
                          </h3>

                          <p className="text-gray-500 mb-2">
                            Platform:
                            {" "}
                            {
                              session.platform
                            }
                          </p>

                          <p className="text-gray-500">
                            {new Date(
                              session.meetingDate
                            ).toLocaleString()}
                          </p>

                        </div>

                        {(isTeacher ||
                          isAdmin ||
                          isPurchased) ? (

                          <a
                            href={
                              session.meetingLink
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-bold transition"
                          >
                            Join Session
                          </a>

                        ) : (

                          <button className="bg-gray-200 text-gray-500 px-5 py-3 rounded-xl font-bold">
                            Locked
                          </button>

                        )}

                      </div>
                    </div>
                  )
                )}

              </div>
            </div>
          )}

        </div>

        {/* RIGHT */}
        <div>

          <div className="bg-white rounded-3xl border shadow-sm p-6 sticky top-24">

            <h2 className="text-3xl font-black mb-6">
              Course Info
            </h2>

            <div className="space-y-4 text-gray-700">

              <div className="flex justify-between">
                <span className="font-semibold">
                  Teacher
                </span>

                <span>
                  {course.teacherName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">
                  Category
                </span>

                <span>
                  {course.category}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">
                  Sections
                </span>

                <span>
                  {course.sections
                    ?.length || 0}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-semibold">
                  Live Sessions
                </span>

                <span>
                  {course.liveSessions
                    ?.length || 0}
                </span>
              </div>

            </div>

            {/* BUY BUTTON */}
            {!isTeacher &&
              !isAdmin &&
              !isPurchased && (

                <button
                  onClick={
                    handlePurchase
                  }
                  className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black transition"
                >
                  Buy Course
                </button>

              )}

            {/* PURCHASED */}
            {isPurchased && (

              <div className="w-full mt-8 bg-green-100 text-green-700 py-4 rounded-2xl font-black text-center">
                ✅ Purchased
              </div>

            )}

            {/* TEACHER / ADMIN */}
            {(isTeacher ||
              isAdmin) && (

              <div className="w-full mt-8 bg-orange-100 text-orange-700 py-4 rounded-2xl font-black text-center">
                👨‍🏫 Full Access
              </div>

            )}

          </div>
        </div>
      </div>
    </div>
  );
}