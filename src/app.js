const express = require("express");
const connectDB = require("../src/config/database");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("../src/routes/auth");
const profileRouter = require("../src/routes/profile");
const requestRouter = require("../src/routes/request");
const userRouter = require("../src/routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
