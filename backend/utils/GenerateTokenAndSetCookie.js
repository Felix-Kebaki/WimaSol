const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
  const genToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const token = res.cookie("token", genToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
  return token;
};

module.exports = generateTokenAndSetCookie;
