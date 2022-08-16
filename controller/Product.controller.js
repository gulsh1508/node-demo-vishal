const Product = require("../model/Product.model");
const fs = require("fs");
const { validationResult } = require("express-validator");

exports.ProductPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const ProductData = new Product({
    ProductLabel: req.body.ProductLabel,
    ProductDescription: req.body.ProductDescription,
    ProductImage: "/uploads/" + req.file.filename,
  });
  ProductData.save()
    .then((data) => {
      res.status(200).json({
        success: true,
        message:
          "Congratulations, Product Section has been successfully created",
        data: [data],
      });
    })
    .catch(() => {
      res.json({
        success: false,
        message: "Error",
        error_code: 500,
        data: {},
      });
    });
};

exports.getProductDetails = (req, res) => {
  Product.find()
    .then((data) => {
      res.status(200).json({
        status: 1,
        message: "Product Details Section Details fetch successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: 0,
        message: "Wrong Value",
      });
    });
};

exports.getProductByID = async (req, res) => {
  Product.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        message: "Product Details Fetch successfully",
        data: [result],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: 0,
        message: "Wrong ID",
      });
    });
};

exports.EditProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const oldImage = await Product.findOne({ _id: req.params.id });
  let img = oldImage.ProductImage;
  let result = img.substring(8);
  let path = String(`./uploads/${result}`);
  if (req.file) {
    fs.unlink(path, (err) => {
      var data = {
        $set: {
          ProductLabel: req.body.ProductLabel,
          ProductDescription: req.body.ProductDescription,
          ProductImage: "/uploads/" + req.file.filename,
        },
      };
      Product.findByIdAndUpdate({ _id: req.params.id }, data)
        .then((result) => {
          res.status(200).json({
            status: 1,
            message: "Product Details has been updated Successfully",
            result: [result],
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            status: 0,
            Message: "!Invalid Updated",
          });
        });
    });
  } else {
    var data = {
      $set: {
        ProductLabel: req.body.ProductLabel,
        ProductDescription: req.body.ProductDescription,
      },
    };
    Product.findByIdAndUpdate({ _id: req.params.id }, data)
      .then((result) => {
        res.status(200).json({
          status: 1,
          message: "Product Details has been updated Successfully",
          result: [result],
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          status: 0,
          Message: "!Invalid Updated",
        });
      });
  }
};

exports.deleteProductByID = async (req, res) => {
  const oldImage = await Product.findOne({ _id: req.params.id });
  let img = oldImage.ProductImage;
  let result = img.substring(8);
  let path = String(`./uploads/${result}`);
  fs.unlink(path, (res) => {
    console.log(res);
  });
  Product.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        status: 1,
        message: "Account is Deleted Successfully",
        result: [result],
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 0,
        messsage: "We couldn't Complete this action",
        error: err,
      });
    });
};
