import User from "../models/user.model.js";

/* ================= UPDATE PROFILE ================= */

export const updateProfile = async (
  req,
  res
) => {
  try {
    const email = req.user.email;

    const updates = req.body;

    const user =
      await User.findOneAndUpdate(
        { email },
        updates,
        { new: true }
      );

    res.json({
      message: "Profile updated",
      user,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Update failed",
    });
  }
};

/* ================= GET CURRENT USER ================= */

export const getMe = async (
  req,
  res
) => {
  try {
    const user = await User.findOne({
      email: req.user.email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to fetch user",
    });
  }
};