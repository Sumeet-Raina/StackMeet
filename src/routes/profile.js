const express = require("express");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; // this user is coming from auth middleware now which we attached to req obj

    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });
    loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully.`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const keys = Object.keys(req.body);
    const hasOnlyPassword =
      keys.length === 2 &&
      keys[0] === "oldPassword" &&
      keys[1] === "newPassword";

    if (hasOnlyPassword) {
      const newPassword = req.body.newPassword;
      const oldPassword = req.body.oldPassword;
      const oldPasswordHash = loggedInUser.password;

      const match = await bcrypt.compare(oldPassword, oldPasswordHash);
      if (match) {
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        loggedInUser.password = newPasswordHash;
        await loggedInUser.save();
      }
    }
    res.send("Password updated successfully");
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
});

module.exports = profileRouter;
