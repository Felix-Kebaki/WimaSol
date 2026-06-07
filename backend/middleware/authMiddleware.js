const jwt = require("jsonwebtoken");
const User = require("../model/CustomerModel");
const Employee=require("../model/EmployeeModel")

const Protect = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ error: "Unauthorized-No token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized-Invalid token" });
    }
    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized - User not found" });
    }
    next();
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

const ProtectEmployee=async(req,res,next)=>{
    const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(401).json({ error: "Unauthorized-No token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized-Invalid token" });
    }
    req.employee = await Employee.findById(decoded.userId).select("-password");
    if (!req.employee) {
      return res.status(401).json({ error: "Unauthorized - Employee not found" });
    }
    next();
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
}

module.exports={ProtectEmployee,Protect}
