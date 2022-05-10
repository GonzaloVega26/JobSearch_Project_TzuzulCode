function roleValidation(req, res, next) {
  if (req.user) {
    const role = req.user.role;
    if (role === "admin") {
     return next()
    }
  }

  return res.status(403).json({
    error: true,
    message: "Insufficient Permissions",
  });
}

module.exports = roleValidation;
