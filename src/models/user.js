const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);

/* first we create schema which is going to define 
 what fields/columns our table or collection will have and
 what would be the acceptable data type for the data each field or column will contain.
 then we pass this schema to our model so that whenever we create new row in table or collection 
 it is like creating an instance of the model each time new row/collection is added to table or model */
