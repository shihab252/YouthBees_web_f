import User from "../models/user.model.js";

/* REGISTER */
export const register = async (req, res) => {
  try {
    const { email, role } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({
      ...req.body,
      role,
      status: role === "teacher" ? "pending" : "active",
    });

    res.json({ message: "User created" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { email, email_verified } = req.user;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ update verification
    if (email_verified) {
      user.emailVerified = true;
      await user.save();
    }

    // 🔥 teacher approval
    if (user.role === "teacher" && user.status === "pending") {
      return res.status(403).json({
        message: "Waiting for admin approval",
      });
    }

    res.json({
      role: user.role,
      user,
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};