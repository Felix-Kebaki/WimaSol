const express = require("express");
const {Protect,ProtectEmployee} = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  createEmployee,
  loginEmployee,
  logoutEmployee,
  getAllEmployess,
  getAvailableEmployees,
  deleteEmployee,
  editEmployee,
} = require("../controller/EmployeeController");
const router = express.Router();

router.post("/createEmployee",ProtectEmployee,adminMiddleware, createEmployee);
router.post("/loginEmployee", loginEmployee);
router.post("/logoutEmployee", ProtectEmployee, logoutEmployee);
router.get("/getEmployees", ProtectEmployee, adminMiddleware, getAllEmployess);
router.get(
  "/getFreeEmployees/:id",
  ProtectEmployee,
  adminMiddleware,
  getAvailableEmployees,
);
router.delete("/deleteEmployees/:id", ProtectEmployee, adminMiddleware, deleteEmployee);
router.put("/editEmployees/:id", ProtectEmployee, adminMiddleware, editEmployee);

module.exports = router;
