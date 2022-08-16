const mongoose = require("mongoose");

const User = new mongoose.Schema({
  Email: {
    type: String,
    require: false,
  },
  Password: {
    type: String,
    require: false,
  },
});
const user = mongoose.model("user", User);
module.exports = user;
