import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import API_BASE_URL from "../config/api";

export default function TeacherAnalytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = await auth.currentUser.getIdToken();

        const res = await axios.get(
          `${API_BASE_URL}/api/teacher/analytics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(res.data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchAnalytics();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">

      <h1 className="text-4xl font-black mb-10">
        Teacher Analytics
      </h1>

      {/* STATS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <Card
          title="Total Earnings"
          value={`৳${data.totalEarnings}`}
        />

        <Card
          title="Total Students"
          value={data.totalStudents}
        />

        <Card
          title="Total Courses"
          value={data.totalCourses}
        />

        <Card
          title="Enrollments"
          value={data.totalEnrollments}
        />

      </div>

      {/* COURSES */}
      <div className="bg-white rounded-3xl border shadow-sm p-6">

        <h2 className="text-3xl font-black mb-8">
          Your Courses
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {data.courses.map((course) => (
            <div
              key={course._id}
              className="border rounded-2xl overflow-hidden"
            >

              <img
                src={course.banner}
                alt={course.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">

                <h3 className="text-xl font-black mb-2">
                  {course.title}
                </h3>

                <p className="text-gray-500 mb-4">
                  {course.category}
                </p>

                <div className="flex justify-between text-sm font-bold">

                  <span>
                    Sections: {course.sections?.length || 0}
                  </span>

                  <span>
                    ৳{course.discountPrice || course.price}
                  </span>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-3xl border shadow-sm p-6">

      <p className="text-gray-500 font-semibold mb-3">
        {title}
      </p>

      <h2 className="text-4xl font-black">
        {value}
      </h2>

    </div>
  );
}