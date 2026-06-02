import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import API_BASE_URL from "../config/api";

export default function UpdateCourse() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  const [msg, setMsg] = useState("");

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

  /* ================= BASIC ================= */

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SECTION ================= */

  const addSection = () => {
    setCourse({
      ...course,
      sections: [
        ...course.sections,
        {
          title: "",
          lectures: [],
        },
      ],
    });
  };

  const removeSection = (index) => {
    const updated = course.sections.filter(
      (_, i) => i !== index
    );

    setCourse({
      ...course,
      sections: updated,
    });
  };

  const handleSectionTitle = (index, value) => {
    const updated = [...course.sections];

    updated[index].title = value;

    setCourse({
      ...course,
      sections: updated,
    });
  };

  /* ================= LECTURES ================= */

  const addLecture = (sectionIndex) => {
    const updated = [...course.sections];

    updated[sectionIndex].lectures.push({
      title: "",
      videoUrl: "",
    });

    setCourse({
      ...course,
      sections: updated,
    });
  };

  const removeLecture = (
    sectionIndex,
    lectureIndex
  ) => {
    const updated = [...course.sections];

    updated[sectionIndex].lectures =
      updated[sectionIndex].lectures.filter(
        (_, i) => i !== lectureIndex
      );

    setCourse({
      ...course,
      sections: updated,
    });
  };

  const handleLectureChange = (
    sectionIndex,
    lectureIndex,
    field,
    value
  ) => {
    const updated = [...course.sections];

    updated[sectionIndex].lectures[
      lectureIndex
    ][field] = value;

    setCourse({
      ...course,
      sections: updated,
    });
  };

  /* ================= LIVE SESSIONS ================= */

  const addSession = () => {
    setCourse({
      ...course,
      liveSessions: [
        ...course.liveSessions,
        {
          title: "",
          platform: "",
          meetingLink: "",
          meetingDate: "",
        },
      ],
    });
  };

  const removeSession = (index) => {
    const updated = course.liveSessions.filter(
      (_, i) => i !== index
    );

    setCourse({
      ...course,
      liveSessions: updated,
    });
  };

  const handleSessionChange = (
    index,
    field,
    value
  ) => {
    const updated = [...course.liveSessions];

    updated[index][field] = value;

    setCourse({
      ...course,
      liveSessions: updated,
    });
  };

  /* ================= UPDATE ================= */

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token =
        await auth.currentUser.getIdToken();

      await axios.put(
        `${API_BASE_URL}/api/course/update/${id}`,
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMsg("✅ Course updated successfully");

    } catch (err) {
      console.error(err);

      setMsg("❌ Failed to update course");
    }
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl border shadow-sm p-8">

        <h1 className="text-4xl font-black mb-10">
          Update Course
        </h1>

        <form
          onSubmit={handleUpdate}
          className="space-y-10"
        >

          {/* ================= BASIC ================= */}

          <div className="space-y-6">

            <h2 className="text-2xl font-black">
              Course Information
            </h2>

            {/* TITLE */}
            <div>
              <label className="block font-bold mb-2">
                Course Title
              </label>

              <input
                name="title"
                value={course.title}
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block font-bold mb-2">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={course.description}
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className="block font-bold mb-2">
                Category
              </label>

              <input
                name="category"
                value={course.category}
                onChange={handleChange}
                className="w-full border rounded-2xl px-4 py-3"
              />
            </div>

            {/* PRICE */}
            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block font-bold mb-2">
                  Original Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={course.price}
                  onChange={handleChange}
                  className="w-full border rounded-2xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block font-bold mb-2">
                  Discount Price
                </label>

                <input
                  type="number"
                  name="discountPrice"
                  value={course.discountPrice}
                  onChange={handleChange}
                  className="w-full border rounded-2xl px-4 py-3"
                />
              </div>

            </div>

            {/* BANNER */}
            {course.banner && (
              <div>
                <label className="block font-bold mb-3">
                  Current Banner
                </label>

                <img
                  src={course.banner}
                  alt={course.title}
                  className="rounded-2xl h-64 w-full object-cover"
                />
              </div>
            )}

          </div>

          {/* ================= CURRICULUM ================= */}

          <div>

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-black">
                Course Curriculum
              </h2>

              <button
                type="button"
                onClick={addSection}
                className="bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold"
              >
                + Add Section
              </button>

            </div>

            <div className="space-y-6">

              {course.sections?.map(
                (section, sIndex) => (

                  <div
                    key={sIndex}
                    className="border rounded-3xl overflow-hidden"
                  >

                    {/* SECTION HEADER */}
                    <div className="bg-gray-100 p-5 flex justify-between items-center gap-5">

                      <input
                        value={section.title}
                        onChange={(e) =>
                          handleSectionTitle(
                            sIndex,
                            e.target.value
                          )
                        }
                        className="bg-white border rounded-xl px-4 py-3 w-full font-bold"
                        placeholder="Section Title"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeSection(sIndex)
                        }
                        className="bg-red-100 text-red-600 px-4 py-3 rounded-xl font-bold"
                      >
                        Delete
                      </button>

                    </div>

                    {/* LECTURES */}
                    <div className="p-5 space-y-5">

                      {section.lectures?.map(
                        (lecture, lIndex) => (

                          <div
                            key={lIndex}
                            className="border rounded-2xl p-5"
                          >

                            <div className="flex justify-between items-center mb-5">

                              <h3 className="font-black text-lg">
                                Lecture {lIndex + 1}
                              </h3>

                              <button
                                type="button"
                                onClick={() =>
                                  removeLecture(
                                    sIndex,
                                    lIndex
                                  )
                                }
                                className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold"
                              >
                                Delete
                              </button>

                            </div>

                            {/* LECTURE TITLE */}
                            <div className="mb-4">
                              <label className="block font-bold mb-2">
                                Lecture Title
                              </label>

                              <input
                                value={lecture.title}
                                onChange={(e) =>
                                  handleLectureChange(
                                    sIndex,
                                    lIndex,
                                    "title",
                                    e.target.value
                                  )
                                }
                                className="w-full border rounded-xl px-4 py-3"
                              />
                            </div>

                            {/* VIDEO URL */}
                            <div>
                              <label className="block font-bold mb-2">
                                YouTube Video URL
                              </label>

                              <input
                                value={lecture.videoUrl}
                                onChange={(e) =>
                                  handleLectureChange(
                                    sIndex,
                                    lIndex,
                                    "videoUrl",
                                    e.target.value
                                  )
                                }
                                className="w-full border rounded-xl px-4 py-3"
                              />
                            </div>

                          </div>
                        )
                      )}

                      {/* ADD LECTURE */}
                      <button
                        type="button"
                        onClick={() =>
                          addLecture(sIndex)
                        }
                        className="bg-green-600 text-white px-5 py-3 rounded-2xl font-bold"
                      >
                        + Add Lecture
                      </button>

                    </div>
                  </div>
                )
              )}

            </div>
          </div>

          {/* ================= LIVE SESSIONS ================= */}

          <div>

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-black">
                Private Live Sessions
              </h2>

              <button
                type="button"
                onClick={addSession}
                className="bg-indigo-600 text-white px-5 py-3 rounded-2xl font-bold"
              >
                + Add Session
              </button>

            </div>

            <div className="space-y-5">

              {course.liveSessions?.map(
                (session, index) => (

                  <div
                    key={index}
                    className="border rounded-2xl p-5"
                  >

                    <div className="flex justify-between items-center mb-5">

                      <h3 className="text-xl font-black">
                        Session {index + 1}
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          removeSession(index)
                        }
                        className="bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold"
                      >
                        Delete
                      </button>

                    </div>

                    <div className="space-y-4">

                      {/* TITLE */}
                      <div>
                        <label className="block font-bold mb-2">
                          Session Title
                        </label>

                        <input
                          value={session.title}
                          onChange={(e) =>
                            handleSessionChange(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          className="w-full border rounded-xl px-4 py-3"
                        />
                      </div>

                      {/* PLATFORM */}
                      <div>
                        <label className="block font-bold mb-2">
                          Platform
                        </label>

                        <select
                          value={session.platform}
                          onChange={(e) =>
                            handleSessionChange(
                              index,
                              "platform",
                              e.target.value
                            )
                          }
                          className="w-full border rounded-xl px-4 py-3"
                        >
                          <option value="">
                            Select Platform
                          </option>

                          <option value="Zoom">
                            Zoom
                          </option>

                          <option value="Google Meet">
                            Google Meet
                          </option>
                        </select>
                      </div>

                      {/* LINK */}
                      <div>
                        <label className="block font-bold mb-2">
                          Meeting Link
                        </label>

                        <input
                          value={session.meetingLink}
                          onChange={(e) =>
                            handleSessionChange(
                              index,
                              "meetingLink",
                              e.target.value
                            )
                          }
                          className="w-full border rounded-xl px-4 py-3"
                        />
                      </div>

                      {/* DATE */}
                      <div>
                        <label className="block font-bold mb-2">
                          Date & Time
                        </label>

                        <input
                          type="datetime-local"
                          value={
                            session.meetingDate
                              ? new Date(
                                  session.meetingDate
                                )
                                  .toISOString()
                                  .slice(0, 16)
                              : ""
                          }
                          onChange={(e) =>
                            handleSessionChange(
                              index,
                              "meetingDate",
                              e.target.value
                            )
                          }
                          className="w-full border rounded-xl px-4 py-3"
                        />
                      </div>

                    </div>
                  </div>
                )
              )}

            </div>
          </div>

          {/* ================= UPDATE BUTTON ================= */}

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-lg transition">
            Update Course
          </button>

          {/* MESSAGE */}
          {msg && (
            <p className="text-center font-black text-lg">
              {msg}
            </p>
          )}

        </form>
      </div>
    </div>
  );
}