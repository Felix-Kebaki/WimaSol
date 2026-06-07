const express = require("express");
const {Protect,ProtectEmployee} = require("../middleware/authMiddleware");
const router = express.Router();
const {
  createUser,
  loginUser,
  getMe,
  logoutUser,
  getCustomers,
  getProfile,
  getOneUser,
} = require("../controller/CustomerController");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.post("/logout", Protect, logoutUser);
router.get("/me", Protect, getMe);
router.get("/getCustomers", ProtectEmployee, adminMiddleware, getCustomers);
router.get("/getOneCustomer/:id", ProtectEmployee, adminMiddleware, getOneUser);
router.get("/getProfile", Protect, getProfile);

module.exports = router;
