import User from "../models/user.model.js";

export const getPendingTeachers = async (
  req,
  res
) => {
  try {
    const users = await User.find({
      role: "teacher",
      status: "pending",
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch pending teachers",
    });
  }
};

export const approveTeacher = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    await User.findByIdAndUpdate(id, {
      status: "active",
    });

    res.json({
      message: "Teacher approved",
    });
  } catch (err) {
    res.status(500).json({
      message: "Approval failed",
    });
  }
};

export const suspendUser = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    await User.findByIdAndUpdate(id, {
      status: "suspended",
    });

    res.json({
      message: "User suspended",
    });
  } catch (err) {
    res.status(500).json({
      message: "Suspend failed",
    });
  }
};

export const getAllUsers = async (
  req,
  res
) => {
  try {
    const users = await User.find();

    const grouped = {
  pendingTeachers: users.filter(
    (u) =>
      u.role === "teacher" &&
      u.status === "pending"
  ),

  activeTeachers: users.filter(
    (u) =>
      u.role === "teacher" &&
      u.status === "active"
  ),

  suspendedTeachers: users.filter(
    (u) =>
      u.role === "teacher" &&
      u.status === "suspended"
  ),

  students: users.filter(
    (u) => u.role === "student"
  ),

  partners: users.filter(
    (u) => u.role === "partner"
  ),

  affiliates: users.filter(
    (u) => u.role === "affiliate"
  ),
};

    res.json(grouped);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};
export const unsuspendUser = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    await User.findByIdAndUpdate(id, {
      status: "active",
    });

    res.json({
      message: "User unsuspended",
    });
  } catch (err) {
    res.status(500).json({
      message: "Unsuspend failed",
    });
  }
};