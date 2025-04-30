const express = require("express");
const connectDB = require("./config/database");
require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userDetails = req.body;
  const user = new User(userDetails); // creating new instance of the User model and passing user data

  try {
    await user.save(); // this will save data on database
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }

  res.send("User added successfully!");
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error fetching the user by email: " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({}); // it is like select * from table
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Error fetching the user feed: " + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data, { returnDocument: "after" });
    res.send("User updated successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

connectDB()
  .then(() => {
    console.log("DB connection established...");
    app.listen(3000, () => {
      console.log("server is successfully listening on port 3000...");
    });
  })
  .catch((err) => {
    console.error("DBconnection failed" + err);
  });
