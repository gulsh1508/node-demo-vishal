const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  ProductLabel: {
    type: String,
  },
  ProductDescription: {
    type: String,
  },
  ProductImage: {
    type: String,
  },
});
const product = mongoose.model("product", Product);
module.exports = product;
