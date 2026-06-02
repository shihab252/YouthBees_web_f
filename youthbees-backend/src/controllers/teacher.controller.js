import Course from "../models/course.model.js";
import User from "../models/user.model.js";

export const getTeacherAnalytics = async (
  req,
  res
) => {
  try {
    const teacherEmail = req.user.email;

    // teacher courses
    const courses = await Course.find({
      teacherEmail,
    });

    const courseIds = courses.map(
      (course) => course._id.toString()
    );

    // students
    const students = await User.find({
      purchasedCourses: {
        $exists: true,
        $ne: [],
      },
    });

    let totalStudents = 0;
    let totalEnrollments = 0;
    let totalEarnings = 0;

    students.forEach((student) => {
      student.purchasedCourses?.forEach((item) => {
        const courseId = item.course?.toString();

        if (courseIds.includes(courseId)) {
          totalEnrollments += 1;

          totalEarnings +=
            item.pricePaid || 0;
        }
      });
    });

    const uniqueStudents = new Set();

    students.forEach((student) => {
      student.purchasedCourses?.forEach((item) => {
        const courseId = item.course?.toString();

        if (courseIds.includes(courseId)) {
          uniqueStudents.add(student.email);
        }
      });
    });

    totalStudents = uniqueStudents.size;

    res.json({
      totalCourses: courses.length,
      totalStudents,
      totalEnrollments,
      totalEarnings,
      courses,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to load analytics",
    });
  }
};