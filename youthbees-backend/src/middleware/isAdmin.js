export const isAdmin = async (
  req,
  res,
  next
) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access only",
      });
    }

    next();
  } catch (err) {
    res.status(500).json({
      message: "Authorization failed",
    });
  }
};