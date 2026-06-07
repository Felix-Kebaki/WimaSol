const Employee = require("../model/EmployeeModel");
const Ticket = require("../model/TicketModel");
const bcrypt = require("bcryptjs");
const capitalize = require("../utils/CapitalizeFirstLetter");
const generateTokenAndSetCookie=require("../utils/GenerateTokenAndSetCookie")

const createEmployee = async (req, res) => {
  const { firstname, lastname, email, phoneNumber, role, password } = req.body;
  try {
    if (!firstname || !lastname || !email || !role || !phoneNumber) {
      return res.status(400).json({ error: "Input all fields" });
    }

    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return res.status(409).json({ error: "Employee already exists" });
    }

    const setpassword = password || "wimasol";
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(setpassword, salt);

    let employeeNo;
    let exists = true;
    while (exists) {
      employeeNo = `EMP-${Math.floor(100000 + Math.random() * 900000)}`;

      exists = await Employee.findOne({ employeeNo });
    }

    const employee = new Employee({
      firstname: capitalize(firstname),
      lastname: capitalize(lastname),
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      employeeNo,
    });
    await employee.save();
    return res.status(201).json({
      message: "Registered successfully",
    });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const loginEmployee = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Input all fields" });
    }

    const foundEmployee = await Employee.findOne({ email });
    if (!foundEmployee) {
      return res
        .status(404)
        .json({ error: "Employee with the email doesn't exists" });
    }

    const passedCheck = await bcrypt.compare(password, foundEmployee.password);
    if (!passedCheck) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    generateTokenAndSetCookie(res, foundEmployee._id);
    return res.status(200).json({
      message: "Logged in successfully",
      userInfo: { ...foundEmployee._doc, password: undefined },
    });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const logoutEmployee = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const getAllEmployess = async (req, res) => {
  try {
    const all = await Employee.find();
    return res.status(200).json(all);
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const getAvailableEmployees = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Unable to fetch the ticket" });
    }

    const hours = ticket.preferredVisitHours;
    const day = ticket.preferredVisitDay;

    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);

    const assignedTickets = await Ticket.find({
      preferredVisitDay: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
      preferredVisitHours: hours,
      technician: { $exists: true },
      status: {
        $in: ["Assigned", "Scheduled", "In_Progress"],
      },
    }).select("technician");

    const busyEmployees = assignedTickets.map((ticket) => ticket.technician);

    const availableEmployees = await Employee.find({
      role: "employee",
      _id: {
        $nin: busyEmployees,
      },
    });

    return res.status(200).json(availableEmployees);
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee is not found" });
    }

    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(422).json({ error: "Unable to delete employee" });
    }
    return res.status(200).json({ message: "Employee successfully deleted" });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const editEmployee = async (req, res) => {
  try {
    
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

module.exports = {
  createEmployee,
  loginEmployee,
  logoutEmployee,
  getAllEmployess,
  getAvailableEmployees,
  deleteEmployee,
  editEmployee,
};
