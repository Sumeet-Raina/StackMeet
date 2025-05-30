const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please login.");
    }

    const decodedObj = await jwt.verify(token, "STACKMEET@app$6");
    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found.");
    }
    req.user = user; // this is pure js we are adding user to request object here like adding user key to req obj
    next(); // this next is used here to move back to request handler
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = { userAuth };
