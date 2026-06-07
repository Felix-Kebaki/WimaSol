const adminMiddleware = (req, res, next) => {
  if (req.employee.role !== "admin") {
    return res.status(403).json({
      error: "Access denied. Admins only.",
    });
  }

  next();
};

module.exports=adminMiddleware