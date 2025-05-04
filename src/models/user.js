const mongoose = require("mongoose");
const { Schema } = mongoose;
var validator = require("validator");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      require: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address " + value);
        }
      },
    },
    password: {
      type: String,
      require: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong password " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value.toLowerCase())) {
          throw new Error("Gender data is not valid");
        }
        /*custom validator this will only run when a new object is created,
      but if you run update on an existing it will not run for it by default
      we will have to enable it for patch/update. for enabling it to update you have to add it runValidators to options  
      */
      },
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo url " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a description of user",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

/* first we create schema which is going to define 
 what fields/columns our table or collection will have and
 what would be the acceptable data type for the data each field or column will contain.
 then we pass this schema to our model so that whenever we create new row in table or collection 
 it is like creating an instance of the model each time new row/collection is added to table or model */
