const mongoose = require("mongoose");

const Register = new mongoose.Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
  ProfileImage: {
    type: String,
  },
});
const register = mongoose.model("register", Register);
module.exports = register;
