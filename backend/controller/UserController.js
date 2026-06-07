const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/GenerateTokenAndSetCookie");
const capitalize = require("../utils/CapitalizeFirstLetter");

const createUser = async (req, res) => {
  const { firstname, lastname, email, password,phoneNumber, role } = req.body;
  try {
    if (!firstname || !lastname || !email || !password || !role || !phoneNumber) {
      return res.status(400).json({ error: "Input all fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      firstname: capitalize(firstname),
      lastname: capitalize(lastname),
      email,
      password: hashedPassword,
      role,
      phoneNumber
    });
    await user.save();

    generateTokenAndSetCookie(res, user._id);

    return res.status(201).json({
      message: "User registered successfully",
      userInfo: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Input all fields" });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res
        .status(404)
        .json({ error: "User with the email doesn't exists" });
    }

    const passedCheck = await bcrypt.compare(password, foundUser.password);
    if (!passedCheck) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    generateTokenAndSetCookie(res, foundUser._id);
    return res.status(200).json({
      message: "User logged in successfully",
      userInfo: { ...foundUser._doc, password: undefined },
    });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ message: "Authorized successfully" });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" });
    if (!employees) {
      return res.status(404).json({ error: "Unable to fetch employees" });
    }

    res.status(200).json(employees);
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customer = await User.find({ role: "customer" });
    if (!customer) {
      return res.status(404).json({ error: "Unable to fetch customers" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "Unable to fetch profile" });
    }
    res.status(200).json({ ...user._doc, password: undefined });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Unable to fetch user" });
    }
    res.status(200).json({...user._doc,password:undefined})
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

module.exports = {
  createUser,
  loginUser,
  getMe,
  logoutUser,
  getEmployees,
  getCustomers,
  getProfile,
  getOneUser,
};
