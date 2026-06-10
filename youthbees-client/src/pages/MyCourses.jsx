import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Pencil,
  Eye,
  Layers3,
} from "lucide-react";
import API_BASE_URL from "../config/api";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = await auth.currentUser.getIdToken();

        const res = await axios.get(
          `${API_BASE_URL}/api/course/my-courses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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

  // 🔥 total lectures count
  const getLectureCount = (sections = []) => {
    let total = 0;

    sections.forEach((section) => {
      total += section.lectures?.length || 0;
    });

    return total;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="text-indigo-600" />

        <h1 className="text-3xl font-black">
          My Courses
        </h1>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading courses...
        </div>

      ) : courses.length === 0 ? (

        <div className="bg-white rounded-2xl p-10 text-center border">
          <h2 className="text-2xl font-bold mb-3">
            No courses yet
          </h2>

          <p className="text-gray-500">
            Start creating your first course
          </p>
        </div>

      ) : (

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {courses.map((c) => (

            <div
              key={c._id}
              className="bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-lg transition"
            >

              {/* BANNER */}
              <div className="relative">

                <img
                  src={c.banner}
                  alt={c.title}
                  className="h-52 w-full object-cover"
                />

                <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-bold">
                  ৳{c.discountPrice || c.price}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">

                <h2 className="text-xl font-black mb-2 line-clamp-2">
                  {c.title}
                </h2>

                <p className="text-gray-500 text-sm mb-4">
                  {c.category}
                </p>

                {/* STATS */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">

                  <Layers3 size={16} />

                  <span>
                    {c.sections?.length || 0} Sections
                  </span>

                  <span>•</span>

                  <span>
                    {getLectureCount(c.sections)} Lessons
                  </span>

                </div>

                {/* ACTIONS */}
                <div className="grid grid-cols-2 gap-3">

                  {/* PREVIEW */}
                  <button
                    onClick={() =>
                      navigate(`/course/${c._id}`)
                    }
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition"
                  >
                    <Eye size={18} />
                    Preview
                  </button>

                  {/* UPDATE */}
                  <button
                    onClick={() =>
                      navigate(`/dashboard/teacher/update-course/${c._id}`)
                    }
                    className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 py-3 rounded-xl font-bold transition"
                  >
                    <Pencil size={18} />
                    Update
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}