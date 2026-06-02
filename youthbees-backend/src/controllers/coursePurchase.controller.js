import User from "../models/user.model.js";
import Course from "../models/course.model.js";

export const purchaseCourse = async (
  req,
  res
) => {
  try {
    const { courseId } = req.body;

    const email = req.user.email;

    // 🔥 find student
    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // 🔥 only students
    if (user.role !== "student") {
      return res.status(403).json({
        message:
          "Only students can purchase",
      });
    }

    // 🔥 find course
    const course = await Course.findById(
      courseId
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // 🔥 already purchased?
    const alreadyPurchased =
      user.purchasedCourses?.some(
        (item) =>
          item.course.toString() ===
          courseId
      );

    if (alreadyPurchased) {
      return res.status(400).json({
        message:
          "Course already purchased",
      });
    }

    // 🔥 membership discount
    let finalPrice =
      course.discountPrice ||
      course.price;

    if (
      user.membership &&
      user.membership.discount > 0
    ) {
      finalPrice =
        finalPrice -
        (finalPrice *
          user.membership.discount) /
          100;
    }

    // 🔥 add purchase
    user.purchasedCourses.push({
      course: course._id,

      courseTitle: course.title,

      teacherEmail: course.teacherEmail,

      progress: 0,

      pricePaid: finalPrice,
    });

    await user.save();

    res.json({
      message:
        "Course purchased successfully",

      finalPrice,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Purchase failed",
    });
  }
};