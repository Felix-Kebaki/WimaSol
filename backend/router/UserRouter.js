const express = require("express");
const Protect = require("../middleware/authMiddleware");
const router = express.Router();
const {
  createUser,
  loginUser,
  getMe,
  logoutUser,
  getEmployees,
  getCustomers,
  getProfile,
  getOneUser,
} = require("../controller/UserController");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.post("/logout", Protect, logoutUser);
router.get("/me", Protect, getMe);
router.get("/getEmployees", Protect, adminMiddleware, getEmployees);
router.get("/getCustomers", Protect, adminMiddleware, getCustomers);
router.get("/getOneUser/:id", Protect, adminMiddleware, getOneUser);
router.get("/getProfile", Protect, getProfile);

module.exports = router;
