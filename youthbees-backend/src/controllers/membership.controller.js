import User from "../models/user.model.js";

export const upgradeMembership = async (req, res) => {
  try {
    const { type } = req.body; // basic / premium / pro
    const email = req.user.email;

    const plans = {
      basic: 5,
      premium: 10,
      pro: 20,
    };

    if (!plans[type]) {
      return res.status(400).json({ message: "Invalid plan" });
    }

    const user = await User.findOne({ email });

    // 🔥 only student can subscribe
    if (user.role !== "student") {
      return res.status(403).json({ message: "Only students can subscribe" });
    }

    user.membership = {
      type,
      discount: plans[type],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    };

    await user.save();

    res.json({
      message: "Subscription activated",
      membership: user.membership,
    });

  } catch (err) {
    res.status(500).json({ message: "Subscription failed" });
  }
  if (!user) {
  return res.status(404).json({ message: "User not found" });
}
};