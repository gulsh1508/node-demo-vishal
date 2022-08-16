const mongoose = require("mongoose");
const urlp = require("./config.json");

const db = async () => {
  try {
    await mongoose.connect(urlp.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected to mongodb");
  } catch (err) {
    console.log(err.message);
    console.log("connection error");
  }
};
module.exports = db;
