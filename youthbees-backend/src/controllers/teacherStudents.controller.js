import User from "../models/user.model.js";

export const getTeacherStudents = async (
  req,
  res
) => {
  try {
    const teacherEmail = req.user.email;

    const students = await User.find({
      role: "student",
      purchasedCourses: {
        $exists: true,
        $ne: [],
      },
    });

    const filteredStudents = [];

    students.forEach((student) => {
      student.purchasedCourses.forEach((course) => {

        if (
          course.teacherEmail === teacherEmail
        ) {
          filteredStudents.push({
            studentId: student._id,

            studentName:
              `${student.firstName || ""} ${student.lastName || ""}`,

            email: student.email,

            phone: student.phone,

            courseTitle: course.courseTitle,

            progress: course.progress,

            purchasedAt: course.purchasedAt,

            pricePaid: course.pricePaid,
          });
        }
      });
    });

    res.json(filteredStudents);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch students",
    });
  }
};