const express = require("express");
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
    res.status(400).send("Error: " + err);
  }
});

module.exports = profileRouter;
