import Course from "../models/course.model.js";
import User from "../models/user.model.js";

/* ================= CREATE COURSE ================= */

export const createCourse = async (req, res) => {
  try {
    const email = req.user.email;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 🔥 ONLY ACTIVE TEACHER
    if (user.role !== "teacher" || user.status !== "active") {
      return res.status(403).json({
        message: "Only approved teachers can create courses",
      });
    }

    const {
      title,
      description,
      category,
      price,
      discountPrice,
      banner,
      sections,
      liveSessions,
    } = req.body;

    const course = await Course.create({
      title,
      description,
      category,
      price,
      discountPrice,
      banner,
      sections,
      liveSessions,

      teacher: user._id,
      teacherName: `${user.firstName} ${user.lastName}`,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to create course",
    });
  }
};

/* ================= MY COURSES ================= */

export const getMyCourses = async (req, res) => {
  try {
    const teacher = await User.findOne({
      email: req.user.email,
    });

    const courses = await Course.find({
      teacher: teacher._id,
    }).sort({ createdAt: -1 });

    res.json(courses);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};

/* ================= UPDATE COURSE ================= */

export const updateCourse = async (req, res) => {
  try {
    const teacher = await User.findOne({
      email: req.user.email,
    });

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // 🔥 OWNER CHECK
    if (course.teacher.toString() !== teacher._id.toString()) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Course updated",
      course: updated,
    });

  } catch (err) {
    res.status(500).json({
      message: "Update failed",
    });
  }
};
export const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch course",
    });
  }
};
export const getAllCourses = async (
  req,
  res
) => {
  try {
    const courses = await Course.find({
      status: "published",
    }).sort({ createdAt: -1 });

    res.json(courses);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};