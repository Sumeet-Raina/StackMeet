const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    }); // creating new instance of the User model and passing user data
    await user.save(); // this will save data on database
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }

  res.send("User added successfully!");
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();
      // Add the token to cookie and send the response back to the user
      res.cookie(
        "token",
        token,
        { httpOnly: true },
        { expires: new Date(Date.now() + 8 * 3600000) }
      );
      res.send(user);
    } else {
      throw new Error("Invalid credentials.");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successfull!!");
});

module.exports = authRouter;
