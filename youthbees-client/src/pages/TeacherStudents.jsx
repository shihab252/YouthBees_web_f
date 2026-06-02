import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import API_BASE_URL from "../config/api";

export default function TeacherStudents() {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = await auth.currentUser.getIdToken();

        const res = await axios.get(
          `${API_BASE_URL}/api/teacher/students`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStudents(res.data);

      } catch (err) {
        console.error(err);

      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-6 md:p-10">

      <h1 className="text-4xl font-black mb-10">
        My Students
      </h1>

      {loading ? (

        <div className="text-center text-xl font-bold">
          Loading...
        </div>

      ) : students.length === 0 ? (

        <div className="bg-white rounded-3xl p-10 text-center border shadow-sm">

          <h2 className="text-2xl font-black mb-3">
            No students yet
          </h2>

          <p className="text-gray-500">
            Students who purchase your courses will appear here.
          </p>

        </div>

      ) : (

        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-100">
                <tr>

                  <th className="text-left p-5 font-black">
                    Student
                  </th>

                  <th className="text-left p-5 font-black">
                    Email
                  </th>

                  <th className="text-left p-5 font-black">
                    Course
                  </th>

                  <th className="text-left p-5 font-black">
                    Progress
                  </th>

                  <th className="text-left p-5 font-black">
                    Paid
                  </th>

                  <th className="text-left p-5 font-black">
                    Purchase Date
                  </th>

                </tr>
              </thead>

              <tbody>

                {students.map((student, index) => (

                  <tr
                    key={index}
                    className="border-t"
                  >

                    <td className="p-5 font-semibold">
                      {student.studentName}
                    </td>

                    <td className="p-5 text-gray-600">
                      {student.email}
                    </td>

                    <td className="p-5 font-bold">
                      {student.courseTitle}
                    </td>

                    <td className="p-5">

                      <div className="w-40 bg-gray-200 rounded-full h-3 overflow-hidden">

                        <div
                          className="bg-green-600 h-full"
                          style={{
                            width: `${student.progress}%`,
                          }}
                        />

                      </div>

                      <p className="text-sm font-bold mt-2">
                        {student.progress}%
                      </p>

                    </td>

                    <td className="p-5 font-black text-green-700">
                      ৳{student.pricePaid}
                    </td>

                    <td className="p-5 text-gray-500">
                      {new Date(
                        student.purchasedAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}