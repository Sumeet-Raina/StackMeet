const mongoose = require("mongoose");
// "mongodb+srv://searchsumeet:E7hYPQZVw7g8Crxj@stackmeet.tdy1uq7.mongodb.net/"; => this is refering to the cluster
const url =
  "mongodb+srv://searchsumeet:E7hYPQZVw7g8Crxj@stackmeet.tdy1uq7.mongodb.net/stackMeet"; // this is going to connect to stackMeet productiondb

//without stackMeet at the end of above url it creates a test db inside stackmeet on compass and connects to that test db when app runs
const connectDB = async () => {
  await mongoose.connect(url); //retruns a promise
};

module.exports = connectDB;
