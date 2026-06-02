import admin from "../config/firebase.js";
import User from "../models/user.model.js";

export const authMiddleware = async (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify Firebase token
    const decoded =
      await admin.auth().verifyIdToken(token);

    // Find user from MongoDB
    const dbUser = await User.findOne({
      email: decoded.email,
    });

    if (!dbUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Attach FULL user
    req.user = dbUser;

    next();
  } catch (err) {
    console.error(err);

    res.status(401).json({
      message: "Invalid token",
    });
  }
};